# Changelog

All notable changes to `interdependent-lib` will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- `docs/prime-tensor-stack.md` — canonical role-and-boundary map for the
  prime-tensor compute family: PCNA (tensors + back-propagation → weights) →
  PCTA (circles → seeds) → PTCA (seeds → core) → ZFAE (inference), with PCEA as
  the orthogonal guardian. Documents the differentiability boundary
  (back-propagation lives only in PCNA) and marks unsettled specifics `hmmm`.
- `libs/pcta/` stub for the forthcoming PCTA seed layer (no repo/package yet;
  documented only, not registered in `_REGISTRY`).

### Notes
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
