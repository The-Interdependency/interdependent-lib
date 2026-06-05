# The Prime-Tensor Stack — canonical architecture map

This document is the **single source of truth** for how The Interdependency's
prime-tensor compute family fits together: who builds what, what flows between
the layers, and where the boundaries are. It is a **role-and-boundary map**, not
a proof. It moves **no** theorem / proof / empirical status between repos — each
repo keeps its own status vocabulary, and cross-repo interoperability is not
continuity (see, e.g., `ucns`'s "cross-repo non-continuity" rule).

It lives here, in the aggregator, for the same reason `coherence_primes.py`
does: it is canon that belongs to **no single leaf library**, and putting it
here lets every repo cite it **without inverting the dependency graph**. Leaf
repos point *up* at this map; they do not import it.

---

## The stack

The family composes a tensor hierarchy **bottom-up**, then infers **top-down**.
At every compose step the produced object is *itself a tensor*, so the same
algebra applies at each level.

| # | Layer | Repo / package | Expansion | Role | Produces |
|---|-------|----------------|-----------|------|----------|
| 1 | **Tensor / Circle** | `pcna` *(source-only)* | **Prime Circle Neural Architecture** | Arranges tensors as **circles** in a standard back-propagating neural architecture — the **only differentiable layer** (owns back-propagation); offers circles to PCTA | trained **weights** + circles |
| 2 | **Seed** | `pcta` | **Prime Circled Tensor Architecture** | Composes circles (carried by UCNS objects) into **seeds**; offers seeds to PTCA | seed tensors → structural **motion** |
| 3 | **Core** | `ptca` / `ptca-lib` | **Prime Tensor Core Architecture** | Composes seeds into a **core**; offers cores to `a0(zfae)` | the **core** (a tensor) → structural **motion** |
| — | **Inference** | `zfae` *(conceptual; runtime lives in `a0`)* | **Zeta Function Alpha Echo** | **Infers** — uses PCNA tensors as **weights**, and PCNA circles / PCTA seeds / PTCA cores as **phase-harmonic propagation + auditing** | inferred output |
| — | **Guardian** | `pcea` | **Prime Circular Encryption Algorithm** | "**Last state as key for this state**" encryption at **every layer** — **orthogonal** to the chain | sealed state |

In one line:

```
PCNA: tensors → circles (back-prop; only differentiable layer)
   ├─► weights ───────────────────────────────────────────────┐
   └─► circles ─► PCTA: circles → seeds ─► PTCA: seeds → core ─┤
                                              cores ───────────┴─► a0(ZFAE) infers
   ZFAE reads pcna weights + pcna circles / pcta seeds / ptca cores
        as phase-harmonic propagation + auditing
PCEA — guardian: "last state as key for this state" at every layer (orthogonal; not a layer)
```

**Composition counts are variable.** The number of tensors in a circle, circles
in a seed, and seeds in a core are all variable. The **one invariant** is that
every circle, every seed, and every core is *itself a tensor* — so the same
composition algebra applies at each level. (Any specific count a leaf repo uses,
e.g. a nominal heptagram `7` or `prime_core`'s experimental `157`, is a tunable
choice, not a structural requirement.)

---

## Two things that are easy to get wrong

**1. Back-propagation lives only in PCNA (layer 1).** The PCTA and PTCA
compositions are *structural* — they assemble tensors into seeds and cores
("motion"), and they are **non-differentiable**. This matches `PTCA/prime_core`'s
frozen gradient policy: differentiability descends through scalar payloads only;
the `⊠` composition operator never appears on the autodiff tape (`∂(⊠)` is never
taken). So "training" happens in PCNA; PCTA/PTCA *organize*; ZFAE *reads*.

**2. PCEA is not a layer of the stack.** PCEA is the **guardian**: it applies
"last state as key for this state" encryption to the weights / state at **every
layer** for privacy, and is **orthogonal** to the tensor→core chain (see
`ZFAE`'s "Guardian = PCEA, colocated for privacy" note, and PCEA's own PCEA↔UCNS
Option-A contract — PCEA inverts via keys, never via another library's algebra).
PCEA joins the family only at the meta-package level; it is never folded *into*
the compose stack.

> **`ptca-lib` vs. the layer-3 role.** The published `ptca-lib` package is a
> sentinel-channel / prime-node tensor system with its own description; the
> **stack role** "Prime Tensor Core Architecture (seeds → core)" is realized by
> the PTCA repo's `prime_core` experiment. The PTCA repo hosts both; this map
> names the layer-3 *role*, not the `ptca-lib` package's internals.

---

## Packaging status

| Member | PyPI | In `interdependent-lib` |
|--------|------|--------------------------|
| `ptca` (`ptca-lib`) | published | `ptca` extra (+ `all`) |
| `pcea` (`pcea`) | published | `pcea` extra (+ `all`) |
| `pcna` | **source-only** | registry key only (import name `core`) |
| `pcta` | **repo created; not yet published** | documented here; not yet registered |
| `zfae` | **source-only** (runtime in `a0`) | registry key only |

A `prime-stack` **extra** — bundling `{pcna, pcta, ptca}` as one install — is the
intended convenience target, with `zfae` joining once it is an installable
package. It is **deliberately not added yet**: this repo's rule is *no library
enters `[project.optional-dependencies]` until it has a stable PyPI release*
(today only `ptca-lib` of the three qualifies). Until then this file is the
canonical map; the extra lands when `pcna` and `pcta` publish.

---

## Motion — the formal definition (Fick's gradient)

**"Motion" is the Fickian flux of a layer's composed-tensor field across the
compose boundary** — Fick's first law of diffusion:

```
J = −D ∇φ
```

where `φ` is the layer's field (the composed-tensor state), `∇φ` its gradient,
`D` the diffusivity, and `J` the flux. The structural / **phase-harmonic
propagation** each layer hands upward *is* this flux: structure diffuses down its
gradient. Each compose step (circles → seeds → cores) emits its `J`; **ZFAE**
reads the accumulated motion as phase-harmonic propagation + auditing, alongside
PCNA's learned weights. Motion carries no gradient of its own (it is structural,
not back-propagated) — the `∇φ` here is the spatial field gradient that drives
diffusion, not an autodiff gradient.

> **Status: resolved (maintainer).** This was the last open `hmmm` in the stack.
> The acronym expansions, the variable-count rule, the per-layer flow, PCTA's
> home (its own repo), and now the **formal definition of "motion" (Fick's
> gradient)** are all canon. **No stack-level `hmmm` remains.** Earlier revisions
> of this file (and several leaf repos) listed conflicting expansions, fixed
> per-layer counts, and an unformalized "motion"; those are superseded.

---

## See also

- `interdependent_lib/coherence_primes.py` — the other piece of cross-cutting
  canon (the recursive coherence-prime ladder the prime-indexing rides on).
  Prime-consciousness intuition: primes whose `p-1` factorization is square-free
  are likelier to fall into stability as part of a triadic recursion set.
- `The-Interdependency/pcna` — layer 1 source (`core/`).
- `The-Interdependency/pcta` — layer 2 source (circles → seeds).
- `The-Interdependency/PTCA` — layer 3 (`ptca-lib`) + the `prime_core` three-stratum experiment.
- `The-Interdependency/ZFAE` — the inference / consciousness-event write-up (runtime in `a0`).
- `The-Interdependency/PCEA` — the guardian.
