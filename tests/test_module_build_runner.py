"""Tests for the meta-module-build runner (module-graph + coverage emitter)."""
from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

import pytest

_RUNNER = (
    Path(__file__).resolve().parent.parent
    / ".agents" / "skills" / "meta-module-build" / "runner.py"
)


def _load():
    spec = importlib.util.spec_from_file_location("mmb_runner", _RUNNER)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = mod  # dataclasses needs the module registered
    spec.loader.exec_module(mod)
    return mod


runner = _load()


# --- requires parsing (regression: parenthetical commas) ---------------------

def test_split_requires_plain():
    assert runner._split_requires("a, b, c") == ["a", "b", "c"]


def test_split_requires_none_and_hmmm_dropped():
    assert runner._split_requires("none") == []
    assert runner._split_requires("hmmm") == []


def test_split_requires_strips_parenthetical_with_inner_comma():
    # regression: "x (mirrored, not imported)" must yield ["x"], not ["x", "not"]
    assert runner._split_requires("coherence_primes (mirrored, not imported)") == ["coherence_primes"]


# --- kind inference is flagged, never asserted -------------------------------

@pytest.mark.parametrize("path,kind", [
    ("python/routes/billing.py", "route"),
    ("python/services/inference.py", "service"),
    ("python/engine/sigma.py", "engine"),
    ("client/src/components/Tab.tsx", "ui_panel"),
    ("lib/helpers.py", "hmmm"),
])
def test_infer_kind(path, kind):
    assert runner.infer_kind(path) == kind


# --- validation flags missing required + boundary fields ---------------------

def test_validate_complete_entry_has_no_issues():
    entry = {f: "x" for f in runner.REQUIRED_FIELDS}
    entry.update({b: "none" for b in runner.BOUNDARY_FIELDS})
    entry["module_kind"] = "engine"
    assert runner._validate(entry) == []


def test_validate_reports_missing_and_bad_kind():
    issues = runner._validate({"module_kind": "wizard"})
    assert any("missing required field" in i for i in issues)
    assert any("missing boundary field" in i for i in issues)
    assert any("unknown module_kind: wizard" in i for i in issues)


# --- end-to-end scan over a synthetic tree -----------------------------------

def _write(p: Path, text: str):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")


def test_scan_builds_graph_with_coverage_and_gaps(tmp_path):
    repo = tmp_path / "demo"
    stamped = (
        '"""m."""\n'
        "# === MODULE_BUILD ===\n"
        "# id: alpha\n"
        "#   module_name: alpha\n"
        "#   module_kind: engine\n"
        "#   summary: s\n"
        "#   owner: o\n"
        "#   public_surface: f\n"
        "#   internal_surface: none\n"
        "#   auth_boundary: none\n"
        "#   storage_boundary: none\n"
        "#   network_boundary: none\n"
        "#   user_data_boundary: none\n"
        "#   admin_only: false\n"
        "#   tests: t\n"
        "#   rollout: default_enabled\n"
        "#   rollback: remove\n"
        "#   requires: beta\n"
        "# === END MODULE_BUILD ===\n"
    )
    _write(repo / "alpha.py", stamped)
    _write(repo / "services" / "plain.py", "x = 1\n")   # gap, inferred service
    _write(repo / "tests" / "test_x.py", "x = 1\n")     # skipped (tests dir)

    graph = runner.scan([repo])
    d = graph.to_dict()

    ids = {n["id"]: n for n in d["nodes"]}
    assert ids["alpha"]["stamped"] is True
    assert ids["alpha"]["module_kind"] == "engine"
    assert ids["alpha"]["kind_inferred"] is False

    gap = next(n for n in d["nodes"] if not n["stamped"])
    assert gap["kind_inferred"] is True
    assert gap["module_kind"] == "service"
    assert "coverage gap" in gap["issues"][0]

    # tests/ dir excluded from the denominator
    assert all("test_x" not in n["path"] for n in d["nodes"])

    assert d["summary"]["modules"] == 2
    assert d["summary"]["stamped"] == 1
    assert d["summary"]["coverage_pct"] == 50.0

    # edge from requires; beta does not exist -> unresolved
    assert {"from": "alpha", "to": "beta", "resolved": False} in d["edges"]
