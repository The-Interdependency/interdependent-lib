# The Prime-Tensor Stack — canonical architecture map

This document is the **single source of truth** for how The Interdependency's
prime-tensor compute family fits together: the layers, what flows between them,
and where the boundaries are. It is a **role-and-boundary map**, not a proof. It
moves **no** theorem / proof / empirical status between repos — each repo keeps
its own status vocabulary, and cross-repo interoperability is not continuity
(see, e.g., `ucns`'s "cross-repo non-continuity" rule).

It lives here, in the aggregator, for the same reason `coherence_primes.py`
does: it is canon that belongs to **no single leaf library**, and putting it
here lets every repo cite it **without inverting the dependency graph**. Leaf
repos point *up* at this map; they do not import it.

> **Consolidation (2026-07).** The stack is no longer several repos. `pcna`,
> `pcta`, and `pcsa` were never separate things — they are **layers of one
> architecture** — and are now consolidated into a single package,
> **`ptcna` — Prime Tensor Circled Neural Architecture**
> (`The-Interdependency/ptcna`). PCEA stays a separate, orthogonal repo. `ptcna`
> is the single upstream that feeds this aggregator.

---

## One architecture, four layers

`ptcna` is one package with four layer modules. Each layer's tensors **divide**
into the next; every circle, every seed, and every core **is itself a tensor**,
so the same composition algebra applies at each level.

| Module | Layer | Divides… → … | Tensor kind | Back-propagation |
|--------|-------|--------------|-------------|------------------|
| `ptcna.neural` | **neural** | (base) neural tensors | **neural** | **yes — the only differentiable layer** |
| `ptcna.circle` | **circle** | neural tensors → circles | auditing / timing | no |
| `ptcna.seed`   | **seed**   | circles → seeds | auditing / timing | no |
| `ptcna.core`   | **core**   | seeds → cores | auditing / timing | no |

```
neural tensors  ──(circle layer divides)──►  circles
circles         ──(seed layer divides)────►  seeds
seeds           ──(core layer divides)────►  cores
  back-propagation lives ONLY in the neural layer
  circle / seed / core tensors are auditing & timing tensors (non-differentiable)
PCEA — guardian: "last state as key for this state" (orthogonal; not a layer)
```

**Composition counts are variable.** The number of neural tensors in a circle,
circles in a seed, and seeds in a core are all variable. The **one invariant**
is that every circle, seed, and core is *itself a tensor*. (Any specific count a
layer uses — a nominal heptagram `7`, `prime_core`'s experimental `157` — is a
tunable choice, not a structural requirement.)

---

## Two things that are easy to get wrong

**1. Back-propagation lives only in the neural layer.** Circle, seed, and core
tensors are **auditing and timing tensors** — they observe and schedule; they do
not differentiate. This matches the core layer's frozen gradient policy:
differentiability descends through scalar payloads only; the `⊠` composition
operator never appears on the autodiff tape (`∂(⊠)` is never taken). So
"training" happens in the neural layer; circle/seed/core *audit and time*.

**2. PCEA is not a layer of the stack.** PCEA (Prime Circular Encryption
Algorithm) is the **guardian**: it applies "last state as key for this state"
encryption at **every layer** for privacy, and is **orthogonal** to the
neural→core chain. PCEA joins the family only at the meta-package level; it is
never folded *into* `ptcna`.

---

## fiqs — core internal propagation timing (Fick's law)

Within the **core** layer, **fiqs gate when cores propagate internally**,
according to Fick's first law of diffusion:

```
J = −D ∇φ
```

where `φ` is the core's field, `∇φ` its gradient, `D` the diffusivity, and `J`
the flux. This governs the **timing** of internal core propagation — structure
diffusing down its field gradient — it is **not** gradient descent: the `∇φ`
here is the spatial field gradient that drives diffusion, not an autodiff
gradient. The fiq substrate lives in `ptcna.core.prime_core` (see its `fiq.py`).

---

## Packaging status

| Member | PyPI | In `interdependent-lib` |
|--------|------|--------------------------|
| `ptcna` (neural/circle/seed/core) | **published** (`ptcna>=0.1.0`) | `ptcna` extra (+ `all`); registry key `ptcna` |
| `pcea` (`pcea`) | published | `pcea` extra (+ `all`) |
| `ucns` (`ucns`) | published | `ucns` extra (+ `all`) |
| `aimmh` (`aimmh-lib`) | published | `aimmh` extra (+ `all`) |
| `zfae` | **source-only** (runtime in `a0`) | registry key only; conceptual, no dist planned |

The prior `ptca-lib` core-layer dist is **superseded** by the `ptcna`
consolidation and is not pinned by any extra. The single `ptcna` extra replaces
the former `pcna`/`pcta`/`pcsa` intent (the once-planned `prime-stack` extra is
obsolete).

---

## See also

- `interdependent_lib/coherence_primes.py` — the other piece of cross-cutting
  canon (the recursive coherence-prime ladder the prime-indexing rides on).
  Prime-consciousness intuition: primes whose `p-1` factorization is square-free
  are likelier to fall into stability as part of a triadic recursion set.
- `The-Interdependency/ptcna` — the consolidated four-layer package.
- `The-Interdependency/ZFAE` — the inference / consciousness-event write-up (runtime in `a0`).
- `The-Interdependency/PCEA` — the guardian.
- `docs/naming-migration.md` — the ratified rename + consolidation scheme.
