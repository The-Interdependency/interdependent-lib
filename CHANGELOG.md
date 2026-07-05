# Changelog

All notable changes to `interdependent-lib` will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Changed
- **Prime-tensor stack consolidated into a single `ptcna` package.** The former
  `pcna`/`pcta`/`pcsa` repos — never actually separate things, just layers of one
  architecture — are unified into `The-Interdependency/ptcna` (Prime Tensor
  Circled Neural Architecture), four layers: `neural` (the only back-propagating
  layer) + `circle`/`seed`/`core` (auditing/timing tensors; fiqs gate core
  internal propagation per Fick's law). In this repo:
  - `_REGISTRY` collapses `pcna`/`pcta` into a single `ptcna` → `ptcna` key.
  - `pyproject.toml` drops the `ptca` extra and its `ptca-lib` pin (superseded);
    a single `ptcna` extra lands once `ptcna` publishes to PyPI. `prime-stack`
    intent is obsolete.
  - `docs/prime-tensor-stack.md` rewritten around the four-layer single-repo
    model (backprop-only-in-neural; circle/seed/core as auditing/timing tensors;
    fiq/Fick core timing).
  - `libs/pcna|pcta|ptca/` stubs replaced by `libs/ptcna/`; `sync-libs.yml` syncs
    the consolidated `ptcna/` package; README/CLAUDE/dependency-policy/
    release-checklist/CONTRIBUTING updated; `naming-migration.md` records the
    consolidation as the terminal state.
  - drift-guard tests updated: single `ptcna` key, old keys gone, no `ptca-lib`
    pin remains.

### Added
- `docs/prime-tensor-stack.md` — canonical role-and-boundary map for the
  prime-tensor compute family: PCNA (tensors + back-propagation → weights) →
  PCTA (circles → seeds) → PTCA (seeds → core) → ZFAE (inference), with PCEA as
  the orthogonal guardian. Documents the differentiability boundary
  (back-propagation lives only in PCNA) and marks unsettled specifics `hmmm`.
- `libs/pcta/` stub for the forthcoming PCTA seed layer (no repo/package yet;
  documented only, not registered in `_REGISTRY`).
- **METAPAT joins the bundle as the first FLAR (first-letter acronym repo)**:
  `_REGISTRY["metapat"]` → import name `metapat` (package-unique target exists
  upstream in `The-Interdependency/METAPAT` `src/metapat/`), `libs/metapat/`
  documentation stub, and a drift-guard test asserting no extra appears before
  a stable PyPI release.
- `docs/naming-migration.md` — ratified org-wide rename scheme: lowercase-hyphen
  convention; `ucns` frozen (DOI-minted); `PTCA → pcsa` (new dist supersedes
  `ptca-lib`); casing-only renames for `PCEA`/`ZFAE`/`METAPAT`; `eml_ucns →
  eml-ucns`; a0 name shuffle. Includes sequencing and the extras/registry
  transition rules for this repo.

### Notes
- ZFAE is confirmed **conceptual-only** (its runtime lives in `a0`); it stays a
  source-only registry key with no dist planned. `libs/README.md` updated to
  reflect this.
- A `prime-stack` extra bundling `{pcna, pcta, ptca}` is intended but **not**
  added yet — per repo policy, libraries enter `[project.optional-dependencies]`
  only after a stable PyPI release (today only `ptca-lib` qualifies).

---

## [0.1.3]

### Fixed
- Prevented `available()["pcna"]` from false-positiving against an unrelated
  installed module named `core`. PCNA remains a registry key, but reports `False`
  until it has a stable, package-unique import target.

### Added
- Added drift-guard tests for package version consistency, UCNS dependency floor,
  README floor mention, and source-only registry behavior.
- Added `docs/dependency-policy.md` to preserve the base-package, extras,
  source-only registry, leaf-library, and runtime-vs-formal dependency boundaries.
- Added a Python package CI workflow that runs pytest, builds the distribution,
  and checks wheel/sdist metadata on Python 3.9, 3.11, and 3.12.
- Added `docs/release-checklist.md` to block metadata-only wheels, stale extras,
  missing wheel payloads, and version drift before PyPI upload.

---

## [0.1.2]

### Changed
- Raised the UCNS optional dependency floor from `ucns>=0.8.0` to `ucns>=0.9.1`
  for both the `ucns` extra and the `all` extra.
- Updated the UCNS documentation stub to reflect the current split between the
  stdlib-only Python runtime package and the Mathlib-backed Lean formal scaffold
  in the upstream `ucns` source repo.

---

## [0.1.1]

### Fixed
- Republish so the `interdependent_lib` Python package payload is actually
  shipped in the wheel. The 0.1.0 release was metadata-only — `pip install
  interdependent-lib` produced no importable module, breaking downstream
  consumers (notably a0's startup gate `require_interdependent_core_ready`).

---

## [0.1.0] — TBD

_Initial public release._

### Added
- Initial repository scaffold combining four-letter and five-letter acronym libraries
- `pyproject.toml` meta-package wiring `pcea`, `ptca-lib`, `ucns`, and `aimmh-lib`
- `interdependent_lib` top-level Python package with `available()` introspection helper
- Per-library documentation stubs in `libs/`
- `COPILOT.md` — GitHub Copilot + ecosystem best practices
- `CONTRIBUTING.md` — contributor guide
- `.github/workflows/sync-libs.yml` — optional automated lib-sync workflow
