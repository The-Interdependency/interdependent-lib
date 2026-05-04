# CLAUDE.md — interdependent-lib

This file gives AI assistants context needed to work effectively in this repository.

---

## What This Repo Is

`interdependent-lib` (pip package: **`interdependent-lib`**, v0.1.0) is a **unified PyPI meta-package** that bundles the four-letter and five-letter acronym libraries of [The Interdependency](https://github.com/The-Interdependency) into a single installable collection.

This repo does **not** contain primary library code. It provides:
- The `interdependent_lib` top-level package with an `available()` utility
- Per-library documentation stubs in `libs/`
- Org-wide best-practice documentation in `COPILOT.md`

**Python requirement:** ≥ 3.9  
**License:** Apache 2.0

---

## Bundled Libraries

| Package | PyPI name | Status | Description |
|---------|-----------|--------|-------------|
| PCEA | `pcea>=0.1.0` | Packaged | Prime Circular Encryption Algorithm |
| PTCA | `ptca-lib>=0.1.0` | Packaged | Prime Tensor Circular Architecture |
| UCNS | `ucns>=0.8.0` | Packaged | Unit Circle Number System |
| AIMMH | `aimmh-lib>=1.1.0` | Packaged | AI Multimodel Multimodal Hub |
| PCNA | — | Not yet on PyPI | Prime Circled Neural Architecture |
| ZFAE | — | Not yet on PyPI | Zeta Function Alpha Echo |

---

## Repository Layout

```
interdependent_lib/
  __init__.py           Top-level package — exposes available() utility

libs/                   Per-library documentation stubs
  pcea/
    README.md
  ptca/
    README.md
  ucns/
    README.md
  pcna/
    README.md
  zfae/
    README.md
  aimmh/
    README.md

.github/                GitHub Actions workflows
pyproject.toml          Meta-package config (optional extras per library)
COPILOT.md              Org-wide best practices (Copilot, git, CI, docs, security)
CONTRIBUTING.md         Contribution guidelines
CHANGELOG.md            Version history
README.md
LICENSE                 Apache 2.0
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

---

## Development Workflow

```bash
# Install editable with dev tools
pip install -e ".[dev]"

# Run tests
pytest

# Build distribution packages
python -m build

# Upload to PyPI
twine upload dist/*
```

---

## Key Conventions

See `COPILOT.md` for comprehensive org-wide conventions. Critical ones:

- **Apache 2.0** license on all code.
- **Author contact:** `wayseer@interdependentway.org` for PyPI metadata and git.
- **`requires-python = ">=3.9"`** for this meta-package and 4-letter acronym libs.
- **Zero runtime dependencies** in `interdependent_lib/` itself — it only declares optional extras.
- **Semantic versioning** (`MAJOR.MINOR.PATCH`) for all packages.
- Commit style: **Conventional Commits** (`feat(ucns):`, `chore(deps):`, `docs(README):`).

### Adding a New Sub-Library

1. Add it to `[project.optional-dependencies]` in `pyproject.toml` once it has a stable PyPI release.
2. Add a `libs/<name>/README.md` stub.
3. Update the `available()` function in `interdependent_lib/__init__.py`.
4. Add an entry to `CHANGELOG.md`.
5. Update the table in `README.md`.

> **Do not** add PCNA or ZFAE to `[project.optional-dependencies]` until they have stable PyPI releases.

---

## Important Files

| File | Purpose |
|------|---------|
| `pyproject.toml` | Source of truth for package metadata and optional extras |
| `interdependent_lib/__init__.py` | `available()` utility and package marker |
| `COPILOT.md` | Org-wide best practices — read before contributing |
| `CONTRIBUTING.md` | Contributor workflow |
| `CHANGELOG.md` | Version history — update with each release |
| `libs/*/README.md` | Per-library documentation stubs |

---

## What Does Not Exist Yet

- PCNA and ZFAE are not yet PyPI-published — present in `libs/` stubs only
- Active CI workflows may or may not be configured (check `.github/` for current state)
- No type stubs

---

## Related Repos

| Repo | Role |
|------|------|
| The-Interdependency/pcea | PCEA source |
| The-Interdependency/ptca | PTCA source |
| The-Interdependency/ucns | UCNS source |
| The-Interdependency/pcna | PCNA source |
| The-Interdependency/a0 | Agent platform consuming these libraries |

---

## Git Workflow

- Main branch: `main`
- Feature branches: `feat/<description>`, `fix/<description>`, `chore/<description>`, `docs/<description>`
- Commit style: Conventional Commits (see `COPILOT.md` §3)
- Author: Erin Patrick Spencer (wayseer@interdependentway.org)
- License: Apache 2.0
