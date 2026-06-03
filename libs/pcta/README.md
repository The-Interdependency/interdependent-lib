# PCTA — seed layer (repo forthcoming)

**Role in the [prime-tensor stack](../../docs/prime-tensor-stack.md):** PCTA
organizes circle-tensors into **seeds** — **7 circles per seed**, the seed itself
a tensor. It sits between PCNA (layer 1: tensors + back-propagation) and PTCA
(layer 3: seeds → core), and its structural output ("motion") feeds ZFAE's
inference.

**Status:** PCTA does **not** yet have its own repository or PyPI package. It is
documented here as the canonical seed layer; it is **not** registered in
`interdependent_lib._REGISTRY` and has **no** extra until a repo + stable release
exist. The full acronym expansion is unsettled (`hmmm`).

See `docs/prime-tensor-stack.md` for the full layer map and the differentiability
boundary (back-propagation lives only in PCNA; PCTA composition is structural and
non-differentiable).
