# CLAUDE.md — interdependent-lib

This file gives AI assistants context needed to work effectively in this repository.

---

## What This Repo Is

`interdependent-lib` (pip package: **`interdependent-lib`**, v0.1.2) is a **unified PyPI meta-package** that bundles the four-letter and five-letter acronym libraries of [The Interdependency](https://github.com/The-Interdependency) into a single installable collection.

This repo holds **no primary sub-library code** — each acronym library lives in its own source repo. What this repo *does* provide:
- The `interdependent_lib` top-level package, which exposes:
  - an `available()` introspection utility
  - the canonical **coherence-prime** primitives (`is_coherence_prime`, `sequence_up_to`, `nth`) — see Architecture below
- Per-library documentation stubs in `libs/`
- Org-wide best-practice documentation in `COPILOT.md`

**Python requirement:** ≥ 3.9
**License:** MPL-2.0 (see `LICENSE`). Relicensed from MIT to MPL-2.0 — weak copyleft: embed anywhere, but changes to these files must be published. (Earlier history: AGPL-3.0-or-later + commercial, then MIT.)

---

## Bundled Libraries

Verified against `[project.optional-dependencies]` in `pyproject.toml`.

| Acronym | PyPI / requirement | Extra | Status | Description |
|---------|--------------------|-------|--------|-------------|
| PTCNA | `ptcna>=0.1.0`    | `ptcna` | Packaged | Prime Tensor Circled Neural Architecture — one repo, four layers (neural/circle/seed/core). **Consolidates the former PCNA/PCTA/PCSA.** See `docs/prime-tensor-stack.md` |
| PCEA  | `pcea>=0.1.0`     | `pcea`  | Packaged | Prime Circular Encryption Algorithm (guardian — "last state as key" at every layer; orthogonal to the stack) |
| UCNS  | `ucns>=0.9.1`     | `ucns`  | Packaged | Unit Circle Number System; Python runtime stdlib-only; upstream formal scaffold is Mathlib-backed |
| AIMMH | `aimmh-lib>=1.1.0`| `aimmh` | Packaged | AI Multimodel Multimodal Hub (five-letter) |
| ZFAE  | —                 | —       | Conceptual (runtime lives in `a0`; no dist planned) | Zeta Function Alpha Echo (inference engine) |
| METAPAT | —               | —       | FLAR; registered, not yet on PyPI | Meta Energy Theory — Axioms, Postulates, And Theorems (first-letter acronym repo; canon + unpublished `metapat` 0.0.1 src-layout package) |

The prime-tensor stack is now the single `ptcna` package — neural (the only
back-propagating layer) + circle/seed/core (auditing/timing tensors). PCEA is the
orthogonal guardian; ZFAE is the conceptual inference cap (runtime in `a0`). The
canonical role-and-boundary map is `docs/prime-tensor-stack.md`.

The `all` extra installs the four packaged libraries together (pcea, ucns,
aimmh, ptcna). `dev` installs `pytest>=8.0`, `build`, and `twine`. The single
`ptcna` extra replaces the former per-repo PCNA/PCTA/PCSA intent. ZFAE and
METAPAT appear in `available()` and `libs/` but have no extra until they have
stable PyPI releases.

> **Naming migration + consolidation.** The org-wide rename scheme and the
> **prime-tensor stack consolidation** (pcna/pcta/pcsa → single `ptcna`;
> `ucns` frozen) are ratified — `docs/naming-migration.md` is the reference,
> including the extras/registry transition rules. Names above track what is
> published/importable today.

---

## Repository Layout

```
interdependent_lib/
  __init__.py           Top-level package — exposes available() + re-exports coherence-prime API
  coherence_primes.py   Canonical recursive coherence-prime sequence (dependency-free, single source of truth)

libs/                   Per-library documentation stubs (no primary code lives here)
  README.md             Lib index + sync-workflow notes
  pcea/  ucns/          Packaged libs (each has README.md; sync-libs.yml mirrors upstream into <name>/src)
  aimmh/                Packaged five-letter lib (README.md; sync-libs.yml mirrors into aimmh/src)
  ptcna/               Consolidated prime-tensor stack (README.md; sync-libs.yml mirrors ptcna/ into ptcna/src)
  metapat/  zfae/       Source-only libs: README.md only (NOT synced by sync-libs.yml)

tests/                  pytest suite
  test_interdependent_lib.py   Smoke tests for available() and __version__
  test_coherence_primes.py     Coherence-prime sequence correctness
  test_hmmm_skill.py           Contract tests for the repo-local hmmm skill

docs/                   Operational notes / handoffs (UCNS-related)
.agents/skills/         Repo-local agent skills (hmmm, meta-module-build, test-build, msdmd)
.github/workflows/
  sync-libs.yml         Manual + active-cron workflow mirroring a subset of upstream libs into libs/<name>/src (pcea/ptca/ucns/pcna/aimmh; NOT zfae)
pyproject.toml          Meta-package config — source of truth for metadata + optional extras
COPILOT.md              Org-wide best practices (Copilot, git, CI, docs, security)
CONTRIBUTING.md         Contribution guidelines
CHANGELOG.md            Version history
README.md
LICENSE                 MPL-2.0
```

---

## Installation

```bash
# All packaged libraries
pip install "interdependent-lib[all]"

# Individual libraries
pip install "interdependent-lib[pcea]"
pip install "interdependent-lib[ptca]"
pip install "interdependent-lib[ucns]"
pip install "interdependent-lib[aimmh]"

# Dev tooling (pytest, build, twine)
pip install "interdependent-lib[dev]"
```

Note: the base `pip install interdependent-lib` (no extras) installs only the
`interdependent_lib` package itself, which has zero runtime dependencies. The
README's "install all sub-libraries in one step" framing refers to the `[all]`
extra.

---

## Development Workflow

```bash
# Install editable with everything
pip install -e ".[all,dev]"

# Run tests (testpaths=tests, configured in pyproject.toml)
pytest

# Build distribution packages
python -m build

# Upload to PyPI
twine upload dist/*
```

---

## Architecture & Key Concepts

- **Meta-package model.** The repo is an aggregator. Sub-library code is owned by
  the individual source repos; here they are wired in only as optional extras in
  `pyproject.toml`. Installing this package never forces a sub-library to be present.
- **UCNS boundary.** `interdependent-lib[ucns]` now requires `ucns>=0.9.1`. The
  `ucns` Python runtime remains stdlib-only; the upstream `ucns/formal` layer is
  Lean/Mathlib-backed and is not a Python runtime dependency.
- **`available()`** maps each known sub-library (logical name → import name) and
  reports which are importable in the current environment via `importlib.util.find_spec`.
  The registry includes source-only libs (e.g. `zfae` → `zfae`), which are
  always present as keys but report `False` unless installed manually; packaged
  libs like `ptcna` → `ptcna` report `True` once their extra is installed.
- **Prime-tensor stack canon.** `docs/prime-tensor-stack.md` is the single source
  of truth for the consolidated stack: **PTCNA** (Prime Tensor Circled Neural
  Architecture) is one repo with four layers — `neural` (the only differentiable
  layer; owns back-propagation), and `circle` / `seed` / `core` (auditing and
  timing tensors; non-differentiable). Each layer's tensors divide into the next;
  every circle/seed/core is itself a tensor. Within the core layer, **fiqs gate
  internal propagation** per Fick's first law `J = −D ∇φ` (timing, not gradient
  descent). PCEA is the orthogonal guardian ("last state as key" at every layer),
  not a layer. Like the coherence-prime canon it lives in the aggregator so leaf
  repos cite it without inverting the dependency graph. **Composition counts are
  variable** — the only invariant is that every circle/seed/core is itself a
  tensor.
- **Coherence-prime canon.** `coherence_primes.py` is the single source of truth
  for the recursive coherence-prime sequence (base `{3,5,7}`, then `p≡1 mod 4`
  with a square-free kernel whose factors are all already coherence primes). It is
  pure-math and dependency-free. It lives in the aggregator deliberately so it can
  be referenced as canon **without inverting the dependency graph** — leaf libraries
  must *not* import this package; they re-implement the rule to match. The functions
  are re-exported from the package root (`interdependent_lib.is_coherence_prime`, etc.).
- **lib sync.** `.github/workflows/sync-libs.yml` mirrors upstream sources into
  `libs/<name>/src`. It has two triggers: `workflow_dispatch` (manual) and an
  active `schedule:` cron (`0 3 * * 1` — every Monday 03:00 UTC; the cron line is
  *not* commented out, so it runs despite the misleading inline "disabled by
  default" comment). It syncs only a **subset** of libs — `pcea`, `ucns`,
  `ptcna` (the consolidated stack), and `aimmh` — **not** all `libs/<name>/src`:
  `zfae` has no sync step and is never mirrored. Each step excludes the upstream
  `README.md` so the stubs stay authoritative, then commits any changes with
  `[skip ci]`.
