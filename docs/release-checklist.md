# Release Checklist

Use this checklist before publishing `interdependent-lib` to PyPI.

The goal is to prevent repeat failures such as metadata-only wheels, version drift,
stale extras, and docs that claim more than the package actually installs.

## 1. Clean local state

```sh
git status --short
```

Release from a clean working tree or from a branch whose diff is intentionally
reviewed.

## 2. Version consistency

Confirm all version declarations agree:

```sh
python - <<'PY'
import re
from pathlib import Path
import interdependent_lib

pyproject = Path('pyproject.toml').read_text(encoding='utf-8')
version = re.search(r'^version\s*=\s*"([^"]+)"', pyproject, re.M).group(1)
print('pyproject:', version)
print('package:  ', interdependent_lib.__version__)
assert version == interdependent_lib.__version__
PY
```

## 3. Dependency floor consistency

Check that meaningful dependency floors appear in both the direct extra and the
`all` extra. Today the most important floor is UCNS:

```sh
grep -n 'ucns>=0.9.1' pyproject.toml README.md libs/ucns/README.md
```

Do not add Lean, Mathlib, model clients, GPU libraries, or network SDKs to the
base package. See `docs/dependency-policy.md`.

## 4. Test suite

```sh
python -m pip install -e '.[dev]'
pytest
```

The tests must at least guard:

- package `__version__` equals `pyproject.toml`;
- `available()` returns stable keys and booleans;
- the prime-tensor stack is a single `ptcna` registry key (the former
  pcna/pcta/pcsa keys are gone) and carries no extra until it publishes;
- UCNS dependency floor remains present in both `ucns` and `all` extras;
- README mentions the UCNS floor when the floor is meaningful.

## 5. Build artifacts

Remove old build outputs, then build fresh distributions:

```sh
rm -rf dist build *.egg-info
python -m build
python -m twine check dist/*
```

## 6. Wheel payload smoke test

Install the built wheel into a temporary environment and prove the importable
payload is present:

```sh
python -m venv /tmp/interdependent-lib-wheel-test
. /tmp/interdependent-lib-wheel-test/bin/activate
python -m pip install --upgrade pip
python -m pip install dist/interdependent_lib-*.whl
python - <<'PY'
import interdependent_lib
print(interdependent_lib.__version__)
print(interdependent_lib.available())
assert hasattr(interdependent_lib, 'available')
PY
deactivate
```

This is the step that prevents a metadata-only release from escaping again.

## 7. Extras smoke checks

At minimum, verify metadata resolution for extras without forcing source-only
libraries into the base package:

```sh
python -m pip install '.[ucns]'
python - <<'PY'
import interdependent_lib
print(interdependent_lib.available())
assert 'ucns' in interdependent_lib.available()
PY
```

Run broader extras checks before a public release:

```sh
python -m pip install '.[all]'
python - <<'PY'
import interdependent_lib
print(interdependent_lib.available())
PY
```

## 8. Changelog and tag discipline

Before upload:

- confirm `CHANGELOG.md` has an entry for the release version;
- confirm README install text matches the actual extras;
- tag only after the artifact passes tests, build, twine check, and wheel payload
  smoke test.

## 9. Upload

```sh
twine upload dist/*
```

After upload, install from PyPI in a fresh environment and repeat the import
smoke test.
