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

| # | Layer | Repo / package | Role | Composition | Produces |
|---|-------|----------------|------|-------------|----------|
| 1 | **Tensor / Circle** | `pcna` *(source-only)* | Creates the prime-indexed tensors and owns **back-propagation** — the only differentiable layer | **7 tensors per circle**; the circle is itself a tensor | trained **weights** |
| 2 | **Seed** | `pcta` *(repo forthcoming)* | Organizes circle-tensors into **seeds** | **7 circles per seed**; the seed is itself a tensor | seed tensors → structural **motion** |
| 3 | **Core** | `ptca` / `ptca-lib` | Organizes seeds into a **core** | seeds per core = `hmmm` (`prime_core` uses **157** experimentally) | the **core** (a tensor) → structural **motion** |
| — | **Inference** | `zfae` *(conceptual; runtime lives in `a0`)* | **Infers** | consumes PCNA **weights** + **motion** from the PCTA / PTCA transformers | inferred output |
| — | **Guardian** | `pcea` / `pcea` | Encryption / privacy seal — **orthogonal** to the chain | seals PCNA weights / inference state | sealed state |

In one line:

```
PCNA (tensors + backprop) ─► weights ┐
PCTA (circles → seeds) ─┐            ├─► ZFAE (inference) ─► output
PTCA (seeds → core)  ───┴─► motion ──┘
PCEA — guardian: seals the weights / state (orthogonal; not a layer)
```

---

## Two things that are easy to get wrong

**1. Back-propagation lives only in PCNA (layer 1).** The PCTA and PTCA
compositions are *structural* — they assemble tensors into seeds and cores
("motion"), and they are **non-differentiable**. This matches `PTCA/prime_core`'s
frozen gradient policy: differentiability descends through scalar payloads only;
the `⊠` composition operator never appears on the autodiff tape (`∂(⊠)` is never
taken). So "training" happens in PCNA; PCTA/PTCA *organize*; ZFAE *reads*.

**2. PCEA is not a layer of the stack.** PCEA is the **guardian**: it encrypts
PCNA's weights / the inference state for privacy and is **orthogonal** to the
tensor→core chain (see `ZFAE`'s "Guardian = PCEA, colocated for privacy" note,
and PCEA's own PCEA↔UCNS Option-A contract — PCEA inverts via keys, never via
another library's algebra). PCEA joins the family only at the meta-package
level; it is never folded *into* the compose stack.

---

## Packaging status

| Member | PyPI | In `interdependent-lib` |
|--------|------|--------------------------|
| `ptca` (`ptca-lib`) | published | `ptca` extra (+ `all`) |
| `pcea` (`pcea`) | published | `pcea` extra (+ `all`) |
| `pcna` | **source-only** | registry key only (import name `core`) |
| `pcta` | **no repo yet** | documented here; not yet registered |
| `zfae` | **source-only** (runtime in `a0`) | registry key only |

A `prime-stack` **extra** — bundling `{pcna, pcta, ptca}` as one install — is the
intended convenience target, with `zfae` joining once it is an installable
package. It is **deliberately not added yet**: this repo's rule is *no library
enters `[project.optional-dependencies]` until it has a stable PyPI release*
(today only `ptca-lib` of the three qualifies). Until then this file is the
canonical map; the extra lands when `pcna` and `pcta` publish.

---

## `hmmm` — unresolved; do not encode as fact

Per org doctrine these are open and must not be guessed:

- **Acronym expansions are inconsistent across repos** and are therefore *not*
  settled here. Examples: `PTCA` is "Probabilistic Tensor Context Architecture"
  in its own repo but "Prime Tensor Circular Architecture" in this aggregator's
  README; `PCNA` is "Prime Circular Neural Architecture" (its repo) vs "Prime
  Circled Neural Architecture" (aggregator). **`PCTA`** has no repo and no agreed
  expansion (edcmbone references an "EDCM-PCNA-PCTA Framework"). Canonical
  expansions: `hmmm`.
- **Seeds per core**: `157` is `prime_core`'s *experimental* count, not a
  defended invariant. Canonical value: `hmmm`.
- **Formal definition of "motion"** (what the PCTA/PTCA transformers hand to
  ZFAE, vs PCNA's learned weights): `hmmm` — described by role here, not
  formalized.
- **PCTA's home**: decided to be **its own repo** (consistent with one-lib-per-repo),
  pending creation; until then PCTA exists only as this documented layer.

---

## See also

- `interdependent_lib/coherence_primes.py` — the other piece of cross-cutting
  canon (the recursive coherence-prime ladder the prime-indexing rides on).
- `The-Interdependency/pcna` — layer 1 source (`core/`).
- `The-Interdependency/PTCA` — layer 3 (`ptca-lib`) + the `prime_core` three-stratum experiment.
- `The-Interdependency/ZFAE` — the inference / consciousness-event write-up (runtime in `a0`).
- `The-Interdependency/PCEA` — the guardian.
