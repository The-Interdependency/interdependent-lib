# The Prime-Tensor Stack — role and boundary map

This document is the cross-repository role-and-boundary map for the prime-tensor
compute family. It is **not** a proof, and it moves no theorem, empirical,
measurement, or architectural status between repositories.

## 2026-08-17 PTCNA construction correction

The intended PTCNA is **not** the currently published four-layer runtime.

The intended dependency is:

```text
functioning conventional neural network
        ↓
UCNS audit
        ↓
source-bound relational evidence
        ↓
PTCNA construction derived from that evidence
        ↓
a0 / interdependent-lib consumption
```

Until UCNS performs that audit and PTCNA publishes a separately identified
architecture derived from the evidence, intended PTCNA construction is
**BLOCKED**.

The existing `ptcna>=0.1.1` package remains available as a **historical
pre-audit experimental scaffold**. This aggregator may expose/install that
package, but must not represent its neural/circle/seed/core structure, ring
sizes, weights, whole-string input projection, or sealed evaluation as the
intended PTCNA architecture.

For the intended PTCNA language path, the primitive input object is a **UCNS
Unicode-character gonol**. Conventional tokenizer ids, subword ids, whole-string
cryptographic fingerprints, and opaque external embeddings are not substitutes
for that primitive.

---

## Historical scaffold map

The currently published `ptcna` package consolidates the former `pcna`, `pcta`,
and `pcsa` repositories into one executable research scaffold. PCEA remains a
separate orthogonal repository.

| Module | Historical scaffold layer | Tensor kind | Back-propagation |
|--------|---------------------------|-------------|------------------|
| `ptcna.neural` | neural | neural | yes in the scaffold |
| `ptcna.circle` | circle | auditing / timing | no |
| `ptcna.seed`   | seed   | auditing / timing | no |
| `ptcna.core`   | core   | auditing / timing | no |

The candidate-state compatibility pair previously recorded between UCNS and
PTCNA remains historical construction evidence for that scaffold only. It does
not satisfy the restored requirement that UCNS first audit a functioning
conventional neural network.

The scaffold's frozen role-acquisition experiment also remains historical
sealed evidence: `ptcna.experimental.v1` scored `0.3333333333` versus
`0.9444444444` for its hashed-linear fallback, falsifying both declared
usefulness and superiority claims for that exact in-sample scope. This does not
evaluate the not-yet-built intended PTCNA.

---

## Authority boundaries

**UCNS** owns the neural-audit prerequisite, the relational evidence it produces,
and the Unicode-character gonols used as intended language-input primitives.

**PTCNA** owns preservation of its historical scaffold and, after the audit,
construction and evaluation of a new candidate derived from the exact UCNS
evidence.

**a0** may preserve or execute explicitly typed historical scaffold state, but a
future intended PTCNA region requires a new producer identity. a0 does not
inherit PTCNA architecture authority through integration.

**PCEA** remains orthogonal privacy/guardian infrastructure and is not promoted
into a PTCNA layer by this map.

**EDCM** remains an external measurement authority. PTCNA/a0 consumption of an
EDCM result transfers no measurement validity.

---

## Packaging status

| Member | Package status | Aggregator status |
|--------|----------------|-------------------|
| `ptcna` | published (`ptcna>=0.1.1`) | installable **historical scaffold** via `ptcna` extra |
| `pcea` | published | `pcea` extra (+ `all`) |
| `ucns` | published | `ucns` extra (+ `all`) |
| `aimmh` | published as `aimmh-lib` | `aimmh` extra (+ `all`) |
| `zfae` | repository/runtime authority remains separate | registry/runtime relation as declared by its consumers |

The prior `ptca-lib` core-layer distribution remains superseded by the `ptcna`
consolidation. That packaging fact does not promote the historical scaffold into
the intended architecture.

---

## Next integration boundary

`interdependent-lib` should not encode the unknown future PTCNA topology. When
PTCNA eventually publishes an audit-derived candidate, integration must pin its
new exact producer identity and preserve the historical package identity rather
than silently treating an upgrade as continuity.

## hmmm

The architecture recovered by the UCNS neural audit, the future PTCNA package
identity/API, and the exact compatibility boundary between the historical
scaffold and the audit-derived candidate remain unresolved. No missing detail in
this aggregator is permission to assume the result.
