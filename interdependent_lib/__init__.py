"""
interdependent_lib
==================
Top-level entry point for the combined Interdependency library collection.

Importing this package does **not** require any sub-library to be installed.
Each sub-library is an optional dependency — install the extras you need:

    pip install interdependent-lib[pcea]
    pip install interdependent-lib[ucns]
    pip install interdependent-lib[aimmh]
    pip install interdependent-lib[all]

The prime-tensor stack is consolidated into the single ``ptcna`` package
(Prime Tensor Circled Neural Architecture — neural/circle/seed/core layers).
It is a source-only registry probe until it ships to PyPI, at which point it
gains a ``ptcna`` extra. See docs/naming-migration.md.
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
    # Prime-tensor stack — consolidated into ONE repo, four layers
    # (neural/circle/seed/core). Supersedes the former pcna/pcta/pcsa keys.
    "ptcna": "ptcna",        # Prime Tensor Circled Neural Architecture
    # Standalone libraries
    "pcea": "pcea",          # encryption guardian — orthogonal to the stack
    "ucns": "ucns",
    "zfae": "zfae",          # conceptual; runtime lives in a0 (source-only)
    # Five-letter acronym libraries
    "aimmh": "aimmh_lib",
    # First-letter acronym libraries (FLAR)
    "metapat": "metapat",    # Meta Energy Theory — Axioms, Postulates, And Theorems
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
