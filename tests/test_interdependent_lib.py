"""Basic smoke and drift-guard tests for interdependent_lib."""

from pathlib import Path
import re

import interdependent_lib

ROOT = Path(__file__).resolve().parents[1]
PYPROJECT = ROOT / "pyproject.toml"
README = ROOT / "README.md"


def _pyproject_text() -> str:
    return PYPROJECT.read_text(encoding="utf-8")


def _project_version() -> str:
    match = re.search(r'^version\s*=\s*"([^"]+)"', _pyproject_text(), re.MULTILINE)
    assert match is not None, "pyproject.toml must declare [project] version"
    return match.group(1)


def test_version_exists():
    assert isinstance(interdependent_lib.__version__, str)
    assert interdependent_lib.__version__ != ""


def test_version_matches_pyproject():
    assert interdependent_lib.__version__ == _project_version()


def test_available_returns_dict():
    result = interdependent_lib.available()
    assert isinstance(result, dict)
    # All known sub-libs (PyPI and source-only) must appear as keys.
    for key in ("pcea", "ptca", "ucns", "pcna", "zfae", "aimmh"):
        assert key in result
    # All values are booleans.
    for v in result.values():
        assert isinstance(v, bool)


def test_pcna_source_only_does_not_probe_generic_core_module():
    """PCNA must not false-positive against an unrelated module named core."""
    assert interdependent_lib.available()["pcna"] is False


def test_ucns_dependency_floor_is_locked_in_ucns_and_all_extras():
    text = _pyproject_text()
    assert 'ucns  = ["ucns>=0.9.1"]' in text
    assert '"ucns>=0.9.1"' in text
    assert "ucns>=0.8.0" not in text


def test_readme_mentions_ucns_floor():
    text = README.read_text(encoding="utf-8")
    assert "ucns>=0.9.1" in text
