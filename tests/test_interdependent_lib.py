"""Basic smoke tests for interdependent_lib."""

import interdependent_lib


def test_version_exists():
    assert isinstance(interdependent_lib.__version__, str)
    assert interdependent_lib.__version__ != ""


def test_available_returns_dict():
    result = interdependent_lib.available()
    assert isinstance(result, dict)
    # All known sub-libs (PyPI and source-only) must appear as keys
    for key in ("pcea", "ptca", "ucns", "pcna", "zfae", "aimmh"):
        assert key in result
    # All values are booleans
    for v in result.values():
        assert isinstance(v, bool)
