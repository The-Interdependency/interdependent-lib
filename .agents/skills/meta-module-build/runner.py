"""Meta-module-build runner — module-graph + coverage emitter.

Implements the "Runner behavior" section of ``meta-module-build/SKILL.md`` on
top of the ``msdmd`` universal parser. It walks one or more repository roots,
parses every ``MODULE_BUILD`` block, validates required fields, infers a kind
for unstamped files (flagged, never asserted as truth), and emits a single
module-graph document.

The emitted graph is the data layer a near-real-time filesystem visualizer
reads: a flat node list (one per declared manifest entry, plus one per
unstamped source file as a visible coverage gap), dependency edges from the
``requires`` field, and per-repo coverage rollups.

Pure stdlib, zero non-stdlib dependencies — safe to copy into any repo, like
the parser it builds on.

Usage:
    python runner.py [ROOT ...] [--json OUT] [--quiet]

    # all sibling repos from a workspace root
    python runner.py ..  --json module_graph.json

Library:
    from runner import scan, ModuleGraph
    graph = scan([Path("ucns"), Path("a0")])
    graph.to_dict()        # JSON-ready
    graph.coverage_table() # human summary string
"""
from __future__ import annotations

# === MODULE_BUILD ===
# id: meta_module_build_runner
#   module_name: runner
#   module_kind: instrument
#   summary: walks repo roots, parses MODULE_BUILD blocks, emits module-graph + coverage
#   owner: Erin Spencer
#   public_surface: scan, ModuleGraph, Node, main
#   internal_surface: _validate, infer_kind, _discover_repo_roots, _load_parser
#   auth_boundary: none
#   storage_boundary: read
#   network_boundary: none
#   user_data_boundary: none
#   admin_only: false
#   tests: tests.test_module_build_runner
#   rollout: default_enabled (CLI + importable library on the meta-module-build skill)
#   rollback: remove runner.py; the msdmd universal parser it builds on is unaffected
#   requires: none
#   since: 2026-06-02
#   unresolved: visualizer wiring (e.g. a0 SigmaCore) intentionally out of scope for v1
# === END MODULE_BUILD ===

import argparse
import importlib.util
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

# --- locate and load the sibling msdmd universal parser ----------------------
_PARSER_PATH = Path(__file__).resolve().parent.parent / "msdmd" / "parsers" / "universal.py"


def _load_parser():
    spec = importlib.util.spec_from_file_location("msdmd_universal", _PARSER_PATH)
    if spec is None or spec.loader is None:  # pragma: no cover - defensive
        raise ImportError(f"cannot load msdmd universal parser at {_PARSER_PATH}")
    mod = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = mod
    spec.loader.exec_module(mod)
    return mod


universal = _load_parser()

BLOCK = "MODULE_BUILD"

# Required fields per meta-module-build/SKILL.md "Field schema".
REQUIRED_FIELDS = (
    "module_name", "module_kind", "summary", "owner",
    "public_surface", "internal_surface", "tests", "rollout", "rollback",
)
BOUNDARY_FIELDS = (
    "auth_boundary", "storage_boundary", "network_boundary",
    "user_data_boundary", "admin_only",
)
VALID_KINDS = {
    "skill", "service", "route", "adapter", "engine", "instrument",
    "ui_panel", "schema", "migration", "worker", "experiment", "hmmm",
}

# Files that are real source but never doctrine "modules": exclude from the
# coverage denominator so the gap count reflects capability modules, not noise.
_NON_MODULE_NAMES = {"__init__.py", "__main__.py", "conftest.py", "setup.py"}
_NON_MODULE_DIRS = {
    "tests", "test", ".agents", ".github", "archive", "code",
    "docs", "examples", "benchmarks", "node_modules", "dist", "build",
}


def _skip_set() -> set[str]:
    return set(universal._DEFAULT_SKIP) | _NON_MODULE_DIRS


# --- kind inference for unstamped files (always flagged inferred) ------------
# (path-substring or suffix) -> inferred kind. First match wins; order matters.
_KIND_HINTS = (
    ("/routes/", "route"),
    ("_api.py", "route"),
    ("/services/", "service"),
    ("/engine/", "engine"),
    ("/engines/", "engine"),
    ("/adapters/", "adapter"),
    ("/workers/", "worker"),
    ("/migrations/", "migration"),
    ("/schema", "schema"),
    ("/models", "schema"),
    ("/components/", "ui_panel"),
    ("/pages/", "ui_panel"),
    (".tsx", "ui_panel"),
)


def infer_kind(rel_path: str) -> str:
    """Best-effort kind guess for an unstamped file. Returns 'hmmm' when no
    hint matches — never assert certainty the manifest hasn't declared."""
    # prepend a slash so a leading "services/foo.py" matches the "/services/"
    # hint just like a nested "python/services/foo.py" does.
    p = "/" + rel_path.lower()
    for needle, kind in _KIND_HINTS:
        if needle in p:
            return kind
    return "hmmm"


@dataclass
class Node:
    id: str
    path: str
    repo: str
    stamped: bool
    module_kind: str
    kind_inferred: bool = False
    summary: str = ""
    owner: str = ""
    boundaries: dict[str, str] = field(default_factory=dict)
    tests: str = ""
    requires: list[str] = field(default_factory=list)
    issues: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "path": self.path,
            "repo": self.repo,
            "stamped": self.stamped,
            "module_kind": self.module_kind,
            "kind_inferred": self.kind_inferred,
            "summary": self.summary,
            "owner": self.owner,
            "boundaries": self.boundaries,
            "tests": self.tests,
            "requires": self.requires,
            "issues": self.issues,
        }


@dataclass
class ModuleGraph:
    nodes: list[Node] = field(default_factory=list)
    edges: list[dict] = field(default_factory=list)
    repo_coverage: dict[str, dict] = field(default_factory=dict)

    def to_dict(self) -> dict:
        stamped = sum(1 for n in self.nodes if n.stamped)
        total = len(self.nodes)
        return {
            "schema": "module-graph/v1",
            "summary": {
                "modules": total,
                "stamped": stamped,
                "gaps": total - stamped,
                "coverage_pct": round(100 * stamped / total, 1) if total else 0.0,
            },
            "repo_coverage": self.repo_coverage,
            "nodes": [n.to_dict() for n in self.nodes],
            "edges": self.edges,
        }

    def coverage_table(self) -> str:
        rows = ["repo                 stamped   gaps   cov%",
                "-" * 44]
        for repo, c in sorted(self.repo_coverage.items()):
            rows.append(f"{repo:<20}{c['stamped']:>7}{c['gaps']:>7}{c['coverage_pct']:>7.1f}")
        s = self.to_dict()["summary"]
        rows.append("-" * 44)
        rows.append(f"{'TOTAL':<20}{s['stamped']:>7}{s['gaps']:>7}{s['coverage_pct']:>7.1f}")
        return "\n".join(rows)


def _validate(entry: dict) -> list[str]:
    issues: list[str] = []
    for f in REQUIRED_FIELDS:
        if not entry.get(f):
            issues.append(f"missing required field: {f}")
    for f in BOUNDARY_FIELDS:
        if not entry.get(f):
            issues.append(f"missing boundary field: {f}")
    kind = entry.get("module_kind", "")
    if kind and kind not in VALID_KINDS:
        issues.append(f"unknown module_kind: {kind}")
    return issues


def _split_requires(val: str) -> list[str]:
    # requires is a comma-separated list of ids, optionally followed by a
    # parenthetical note. Drop parenthetical spans first so commas inside a
    # note don't get mistaken for id separators, then take the leading token
    # of each comma part.
    val = re.sub(r"\([^)]*\)", "", val)
    out: list[str] = []
    for part in val.split(","):
        token = part.strip().split(" ")[0].strip()
        if token and token.lower() not in ("none", "hmmm"):
            out.append(token)
    return out


def scan(roots: Iterable[Path], *, skip: Iterable[str] | None = None) -> ModuleGraph:
    """Walk each root, build the module graph with coverage and gaps."""
    skip_set = set(skip) if skip is not None else _skip_set()
    graph = ModuleGraph()
    known_ids: set[str] = set()

    for root in roots:
        root = Path(root)
        repo = root.name
        annotated, gaps = universal.walk_tree(root, BLOCK, skip=skip_set)
        stamped_count = 0

        for path, entries in annotated:
            rel = str(path.relative_to(root))
            for entry in entries:
                node_id = entry.get("id") or f"{repo}:{rel}"
                boundaries = {b: entry.get(b, "") for b in BOUNDARY_FIELDS}
                node = Node(
                    id=node_id,
                    path=rel,
                    repo=repo,
                    stamped=True,
                    module_kind=entry.get("module_kind", "hmmm"),
                    kind_inferred=False,
                    summary=entry.get("summary", ""),
                    owner=entry.get("owner", ""),
                    boundaries=boundaries,
                    tests=entry.get("tests", ""),
                    requires=_split_requires(entry.get("requires", "")),
                    issues=_validate(entry),
                )
                graph.nodes.append(node)
                known_ids.add(node_id)
                stamped_count += 1

        for path in gaps:
            rel = str(path.relative_to(root))
            if path.name in _NON_MODULE_NAMES:
                continue
            graph.nodes.append(Node(
                id=f"{repo}:{rel}",
                path=rel,
                repo=repo,
                stamped=False,
                module_kind=infer_kind(rel),
                kind_inferred=True,
                issues=["coverage gap: no MODULE_BUILD manifest"],
            ))

        repo_gaps = sum(1 for n in graph.nodes if n.repo == repo and not n.stamped)
        repo_total = stamped_count + repo_gaps
        graph.repo_coverage[repo] = {
            "stamped": stamped_count,
            "gaps": repo_gaps,
            "coverage_pct": round(100 * stamped_count / repo_total, 1) if repo_total else 0.0,
        }

    # edges from requires -> ids that exist in the graph
    for node in graph.nodes:
        for dep in node.requires:
            graph.edges.append({"from": node.id, "to": dep, "resolved": dep in known_ids})

    return graph


def _discover_repo_roots(root: Path) -> list[Path]:
    """Resolve a scan target into roots.

    If ``root`` is itself a repo/package (has ``.git`` or ``pyproject.toml``),
    scan it whole — never descend into a packaged subdir (e.g. a monorepo's
    ``backend/pyproject.toml``), which would silently hide the rest of the repo.
    Only when ``root`` is a bare workspace do we expand to its repo-like
    children."""
    if (root / ".git").exists() or (root / "pyproject.toml").exists():
        return [root]
    children = [c for c in sorted(root.iterdir()) if c.is_dir() and not c.name.startswith(".")]
    repo_like = [c for c in children if (c / ".git").exists() or (c / "pyproject.toml").exists()]
    return repo_like or [root]


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="MODULE_BUILD module-graph + coverage runner")
    ap.add_argument("roots", nargs="*", default=["."],
                    help="repo or workspace roots to scan (default: cwd)")
    ap.add_argument("--json", dest="json_out", help="write the module graph to this path")
    ap.add_argument("--quiet", action="store_true", help="suppress the coverage table")
    args = ap.parse_args(argv)

    roots: list[Path] = []
    for r in args.roots:
        rp = Path(r)
        roots.extend(_discover_repo_roots(rp) if rp.is_dir() else [rp])

    graph = scan(roots)

    if args.json_out:
        Path(args.json_out).write_text(json.dumps(graph.to_dict(), indent=2), encoding="utf-8")
    if not args.quiet:
        print(graph.coverage_table())
        if args.json_out:
            print(f"\nmodule graph written to {args.json_out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
