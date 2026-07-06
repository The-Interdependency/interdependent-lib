"""PTCNA — Prime Tensor Circled Neural Architecture.

One architecture, four layers. Each layer's tensors divide into the next; every
circle, seed, and core is itself a tensor.

    neural  → base neural tensors        (the ONLY back-propagating layer)
    circle  → neural tensors → circles   (auditing / timing tensors)
    seed    → circles → seeds            (auditing / timing tensors)
    core    → seeds → cores              (auditing / timing; fiqs gate internal
                                          propagation per Fick's law J = -D grad(phi))

Consolidates the former The-Interdependency repos pcna (neural), pcta (seed),
and pcsa (core). PCEA (encryption guardian) stays a separate, orthogonal repo.
PTCNA is the single upstream that feeds interdependent-lib.
"""

__version__ = "0.1.0"
__license__ = "MPL-2.0"

from . import neural, circle, seed, core  # noqa: F401

__all__ = ["neural", "circle", "seed", "core", "__version__"]
