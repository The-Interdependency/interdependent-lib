# PCTA — Prime Circled Tensor Architecture (seed layer)

**Role in the [prime-tensor stack](../../docs/prime-tensor-stack.md):** PCTA
composes circles (carried by UCNS objects) into **seeds** — the seed is itself a
tensor. It sits between PCNA (layer 1: tensors → circles, back-propagation) and
PTCA (layer 3: seeds → core), and its structural output ("motion") feeds, via
PTCA cores, into ZFAE's inference. Composition counts are **variable** — the only
invariant is that every circle and seed is itself a tensor.

**Status:** PCTA now has its own repository
([The-Interdependency/pcta](https://github.com/The-Interdependency/pcta)) but is
**not** yet on PyPI. It is **not** registered in `interdependent_lib._REGISTRY`
and has **no** extra until a stable release ships.

See `docs/prime-tensor-stack.md` for the full layer map and the differentiability
boundary (back-propagation lives only in PCNA; PCTA composition is structural and
non-differentiable).
