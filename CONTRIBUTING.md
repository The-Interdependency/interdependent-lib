# Contributing to interdependent-lib

Thank you for your interest in contributing! This document explains how the repository is organized and how to propose changes.

---

## Repository purpose

`interdependent-lib` is a **meta-package** and **documentation hub** that aggregates the individual Interdependency acronym libraries. Most library *code* lives in the source repos (pcna, PCEA, PTCA, ucns, ZFAE, aimmh). Changes to library logic belong there.

Contributions welcome here:
- Updating or improving the per-library `libs/*/README.md` stubs
- Bumping dependency versions in `pyproject.toml`
- Improving the `interdependent_lib/__init__.py` re-export surface
- Adding or improving GitHub Actions workflows
- Improving top-level documentation

---

## Development setup

```bash
git clone https://github.com/The-Interdependency/interdependent-lib.git
cd interdependent-lib
python -m venv .venv
source .venv/bin/activate
pip install -e ".[all,dev]"
```

---

## Running tests

```bash
pytest
```

---

## Submitting changes

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-change`
3. Make your changes and add or update tests where relevant.
4. Push and open a pull request against `main`.
5. A maintainer will review and merge.

---

## Code style

- Python 3.9+ compatible syntax
- No external runtime dependencies in `interdependent_lib/` core
- Docstrings on all public functions and classes

---

## License

By contributing you agree that your contributions will be licensed under the Apache 2.0 License.
