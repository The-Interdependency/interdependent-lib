# Changelog

All notable changes to `interdependent-lib` will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

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
