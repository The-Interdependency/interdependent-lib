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

__version__ = "0.1.3"
__author__ = "Erin Patrick Spencer"
__email__ = "wayseer@interdependentway.org"
__license__ = "MPL-2.0"

# Canonical, dependency-free primitives that belong to no single sub-library.
# The coherence-prime sequence is foundational to UCNS / PCNA / PTCA, so its
# single source of truth lives here in the aggregator. Leaf libraries must not
# import this package (that would invert the dependency graph), so they match
# this behaviour rather than importing it.
from interdependent_lib.coherence_primes import (
    is_coherence_prime,
    nth,
    sequence_up_to,
)

# Registry of optional sub-libraries: logical_name -> stable import name.
# A value of None means the library has no stable, package-unique import target
# yet. This avoids false positives from generic module names such as "core".
_REGISTRY: dict[str, str | None] = {
    # Four-letter acronym libraries
    "pcea": "pcea",
    "ptca": "ptca",
    "ucns": "ucns",
    "pcna": None,            # source-only; no package-unique import target yet
    "zfae": "zfae",          # source-only unless installed manually from source
    # Five-letter acronym libraries
    "aimmh": "aimmh_lib",
}


def available() -> dict[str, bool]:
    """Return a dict showing which optional sub-libraries are importable.

    Source-only libraries without a stable import target deliberately report
    False rather than probing generic module names that could collide with
    unrelated packages.
    """
    import importlib.util

    return {
        name: (False if import_name is None else importlib.util.find_spec(import_name) is not None)
        for name, import_name in _REGISTRY.items()
    }


__all__ = [
    "__version__",
    "available",
    "is_coherence_prime",
    "sequence_up_to",
    "nth",
]
