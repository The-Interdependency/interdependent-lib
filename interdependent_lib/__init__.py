"""
interdependent_lib
==================
Top-level entry point for the combined Interdependency library collection.

Importing this package does **not** require any sub-library to be installed.
Each sub-library is an optional dependency — install the extras you need:

    pip install interdependent-lib[pcea]
    pip install interdependent-lib[ptca]
    pip install interdependent-lib[ucns]
    pip install interdependent-lib[aimmh]
    pip install interdependent-lib[all]
"""

from __future__ import annotations

__version__ = "0.1.0"
__author__ = "Erin Patrick Spencer"
__email__ = "wayseer@interdependentway.org"
__license__ = "Apache-2.0"

# Registry of optional sub-libraries: logical_name -> import_name.
# Libraries marked "(source-only)" are not yet on PyPI; they will appear
# as False in available() unless installed manually from source.
_REGISTRY: dict[str, str] = {
    # Four-letter acronym libraries
    "pcea": "pcea",
    "ptca": "ptca",
    "ucns": "ucns",
    "pcna": "core",          # source-only: https://github.com/The-Interdependency/pcna
    "zfae": "zfae",          # source-only: https://github.com/The-Interdependency/ZFAE
    # Five-letter acronym libraries
    "aimmh": "aimmh_lib",
}


def available() -> dict[str, bool]:
    """Return a dict showing which optional sub-libraries are importable."""
    import importlib.util

    return {
        name: importlib.util.find_spec(import_name) is not None
        for name, import_name in _REGISTRY.items()
    }


__all__ = ["__version__", "available"]
