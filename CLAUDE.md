# CLAUDE.md — interdependent-lib

This file gives AI assistants context needed to work effectively in this repository.

---

## What This Repo Is

`interdependent-lib` (pip package: **`interdependent-lib`**, v0.1.1) is a **unified PyPI meta-package** that bundles the four-letter and five-letter acronym libraries of [The Interdependency](https://github.com/The-Interdependency) into a single installable collection.

This repo holds **no primary sub-library code** — each acronym library lives in its own source repo. What this repo *does* provide:
- The `interdependent_lib` top-level package, which exposes:
  - an `available()` introspection utility
  - the canonical **coherence-prime** primitives (`is_coherence_prime`, `sequence_up_to`, `nth`) — see Architecture below
- Per-library documentation stubs in `libs/`
- Org-wide best-practice documentation in `COPILOT.md`

**Python requirement:** ≥ 3.9
**License:** AGPL-3.0-or-later, dual-licensed with a separate commercial option (see `LICENSE` and `LICENSE-COMMERCIAL.md`)

> Note: `LICENSE` is currently an interim notice — the full verbatim AGPL-3.0 text still has to be pasted in before any merge/public release.

---

## Bundled Libraries

Verified against `[project.optional-dependencies]` in `pyproject.toml`.

| Acronym | PyPI / requirement | Extra | Status | Description |
|---------|--------------------|-------|--------|-------------|
| PCEA  | `pcea>=0.1.0`     | `pcea`  | Packaged | Prime Circular Encryption Algorithm |
| PTCA  | `ptca-lib>=0.1.0` | `ptca`  | Packaged | Prime Tensor Circular Architecture |
| UCNS  | `ucns>=0.8.0`     | `ucns`  | Packaged | Unit Circle Number System |
| AIMMH | `aimmh-lib>=1.1.0`| `aimmh` | Packaged | AI Multimodel Multimodal Hub (five-letter) |
| PCNA  | —                 | —       | Source-only (not on PyPI) | Prime Circled Neural Architecture |
| ZFAE  | —                 | —       | Source-only (not on PyPI) | Zeta Function Alpha Echo |

The `all` extra installs the four packaged libraries together. `dev` installs `pytest>=8.0`, `build`, and `twine`. PCNA and ZFAE appear in `available()` and `libs/` but have no extra until they have stable PyPI releases.

---

## Repository Layout

```
interdependent_lib/
  __init__.py           Top-level package — exposes available() + re-exports coherence-prime API
  coherence_primes.py   Canonical recursive coherence-prime sequence (dependency-free, single source of truth)

libs/                   Per-library documentation stubs (no primary code lives here)
  README.md             Lib index + sync-workflow notes
  pcea/  ptca/  ucns/   Packaged libs (each has README.md; sync-libs.yml mirrors upstream into <name>/src)
  aimmh/                Packaged five-letter lib (README.md; sync-libs.yml mirrors into aimmh/src)
  pcna/                 Source-only lib: README.md + src/ (mirrored upstream core/ sources, present in tree)
  zfae/                 Source-only lib: README.md only (NOT synced by sync-libs.yml)

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
LICENSE                 AGPL-3.0-or-later (interim notice)
LICENSE-COMMERCIAL.md   Commercial-license option
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
- **`available()`** maps each known sub-library (logical name → import name) and
  reports which are importable in the current environment via `importlib.util.find_spec`.
  The registry includes source-only libs (`pcna` → `core`, `zfae` → `zfae`), so they are
  always present as keys but report `False` unless installed manually.
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
  default" comment). It syncs only a **subset** of libs — `pcea`, `ptca`, `ucns`,
  `pcna` (from upstream `core/`), and `aimmh` — **not** all `libs/<name>/src`:
  `zfae` has no sync step and is never mirrored. Each step excludes the upstream
  `README.md` so the stubs stay authoritative, then commits any changes with
  `[skip ci]`.

---

## Conventions & Gotchas

See `COPILOT.md` for comprehensive org-wide conventions. Critical ones:

- **This repo holds no primary lib code.** Changes to library *logic* belong in the
  source repos (PCEA, PTCA, ucns, pcna, ZFAE, aimmh), not here.
- **License is AGPL-3.0-or-later** (dual-licensed commercial). Note `COPILOT.md`,
  `CONTRIBUTING.md`, and `interdependent_lib/__init__.py` (`__license__ = "Apache-2.0"`)
  still reference "Apache 2.0" — these are known-stale; `pyproject.toml` and the
  `LICENSE`/`LICENSE-COMMERCIAL.md` files are authoritative; treat the AGPL/commercial
  dual license as current.
- **Author contact:** `wayseer@interdependentway.org` for PyPI metadata and git.
- **`requires-python = ">=3.9"`** for this meta-package and the four-letter libs.
- **Zero runtime dependencies** in `interdependent_lib/` itself — it declares only
  optional extras. Keep `coherence_primes.py` and the package core dependency-free.
- **Semantic versioning** (`MAJOR.MINOR.PATCH`). Keep `__version__` in
  `interdependent_lib/__init__.py` in sync with `version` in `pyproject.toml`
  (both currently `0.1.1`).
- **Commit style:** Conventional Commits (`feat(ucns):`, `chore(deps):`, `docs:`).

### Adding a New Sub-Library

1. Add it to `[project.optional-dependencies]` in `pyproject.toml` (and to `all`)
   once it has a stable PyPI release.
2. Add a `libs/<name>/README.md` stub and a row to `libs/README.md`.
3. Add it to `_REGISTRY` in `interdependent_lib/__init__.py` (and update the
   `test_available_returns_dict` key list in `tests/`).
4. Add an entry to `CHANGELOG.md`.
5. Update the tables in `README.md` and this file.

> **Do not** add PCNA or ZFAE to `[project.optional-dependencies]` until they have
> stable PyPI releases. They stay source-only (registry keys + `libs/` stubs).

---

## Agent module-build doctrine

Before adding a new module, route, service, adapter, schema, worker, engine,
UI panel, migration, or experiment, read:

`./.agents/skills/meta-module-build/SKILL.md`

New module work should start with a `MODULE_BUILD` block (see the example block at
the top of `coherence_primes.py`). Unknown fields must be marked `hmmm`, not guessed
— see `./.agents/skills/hmmm/SKILL.md`.

---

## Git Workflow

- Main branch: `main`
- Feature branches: `feat/<description>`, `fix/<description>`, `chore/<description>`, `docs/<description>`
- Commit style: Conventional Commits (see `COPILOT.md`)
- Author: Erin Patrick Spencer (wayseer@interdependentway.org)

---

## Related Repos

| Repo | Role |
|------|------|
| The-Interdependency/PCEA | PCEA source |
| The-Interdependency/PTCA | PTCA source |
| The-Interdependency/ucns | UCNS source |
| The-Interdependency/pcna | PCNA source (core/) |
| The-Interdependency/ZFAE | ZFAE source |
| The-Interdependency/aimmh | AIMMH source |
| The-Interdependency/a0 | Agent platform consuming these libraries |
