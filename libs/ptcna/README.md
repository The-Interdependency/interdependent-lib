# PTCNA — Prime Tensor Circled Neural Architecture

**Source repo:** [The-Interdependency/ptcna](https://github.com/The-Interdependency/ptcna)
**Language:** Python 3.10+
**PyPI:** `ptcna>=0.1.1`
**Candidate pair:** PTCNA `c5fa9a599498f19c8345f2790a0636542dfbc6a1`
with UCNS `b7b6f35cce69c273860923489a1c8b5372d14eb0`.
**Consolidates:** the former `pcna`, `pcta`, and `pcsa` repos.

---

## What it is

PTCNA is **one architecture, four layers** — the prime-tensor compute stack that
used to be spread across separate repos, now unified because they were only ever
layers of one thing:

| Module | Layer | Divides… → … | Tensor kind |
|--------|-------|--------------|-------------|
| `ptcna.neural` | neural | (base) neural tensors | neural — **the only back-propagating layer** |
| `ptcna.circle` | circle | neural tensors → circles | auditing / timing |
| `ptcna.seed`   | seed   | circles → seeds | auditing / timing |
| `ptcna.core`   | core   | seeds → cores | auditing / timing (fiqs gate internal propagation per Fick's law) |

Every circle, seed, and core is itself a tensor. Back-propagation lives only in
the neural layer; the other three are auditing/timing tensors. See the canonical
[prime-tensor stack map](../../docs/prime-tensor-stack.md).

The `0.1.1` runtime uses one shared `CircleTensor` across structural layers and
keeps reverse-mode state in `ptcna.neural.NeuralScalar`. UCNS integration is
typed and suspended pending the exact producer profile. EDCM measurements are
external inputs; PTCNA ships no shadow EDCM module.

## Status in the bundle

- Registered in `interdependent_lib._REGISTRY` as `ptcna` → import name `ptcna`.
- The `ptcna` extra pins `ptcna>=0.1.1` and replaces the former
  `pcna`/`pcta`/`pcsa` intent.
- The previously-published core-layer dist is superseded by this consolidation.

## Boundary

PCEA (encryption guardian) is **not** part of PTCNA — it is orthogonal and stays
its own repo. Naming these terms transfers no theorem/proof/empirical status.
