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
    for key in ("pcea", "ucns", "ptcna", "zfae", "aimmh", "metapat"):
        assert key in result
    # All values are booleans.
    for v in result.values():
        assert isinstance(v, bool)


def test_prime_tensor_stack_consolidated_into_single_ptcna_key():
    """pcna/pcta/pcsa were consolidated into the single ptcna package
    (neural/circle/seed/core). The old per-layer keys must be gone, and ptcna
    probes its package-unique import name."""
    reg = interdependent_lib._REGISTRY
    assert reg["ptcna"] == "ptcna"
    for gone in ("pcna", "pcta", "pcsa", "ptsa"):
        assert gone not in reg, f"{gone} should be consolidated into ptcna"
    assert isinstance(interdependent_lib.available()["ptcna"], bool)


def test_ptcna_has_no_extra_until_published_and_ptca_lib_superseded():
    """ptcna is a source-only probe until it ships to PyPI (no extra yet), and
    the superseded ptca-lib dist must no longer be pinned anywhere."""
    text = _pyproject_text()
    assert "ptca-lib" not in text, "ptca-lib is superseded by the ptcna consolidation"
    assert "ptca " not in text and "\nptca" not in text, "no ptca extra should remain"


def test_metapat_registered_with_unique_import_target_and_no_extra():
    """METAPAT (FLAR) is a registry key probing its package-unique import name,
    but has no extra until it ships a stable PyPI release (dependency policy)."""
    assert interdependent_lib._REGISTRY["metapat"] == "metapat"
    assert isinstance(interdependent_lib.available()["metapat"], bool)
    text = _pyproject_text()
    assert "metapat" not in text, (
        "metapat must not appear in pyproject extras before a stable PyPI release"
    )


def test_ucns_dependency_floor_is_locked_in_ucns_and_all_extras():
    text = _pyproject_text()
    assert 'ucns  = ["ucns>=0.9.1"]' in text
    assert '"ucns>=0.9.1"' in text
    assert "ucns>=0.8.0" not in text


def test_readme_mentions_ucns_floor():
    text = README.read_text(encoding="utf-8")
    assert "ucns>=0.9.1" in text
