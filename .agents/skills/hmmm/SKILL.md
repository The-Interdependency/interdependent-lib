---
name: hmmm
description: Mandatory boundary object for unresolved constraints. Use this when recording unknowns that must remain honest, non-auto-resolved, and explicitly transitioned between delivered output and living continuation.
---

# hmmm — unresolved-constraint boundary object

Use this skill whenever work contains uncertainty that is material to correctness, safety, or scope.

## Core rule

`hmmm` is mandatory when a claim is not yet verified. Do not guess. Do not silently close unknowns.

## Object contract

Represent each `hmmm` as a first-class record with required fields:

- `id`: stable snake_case identifier.
- `layer`: scope boundary (example: `UCNS-A`, `UCNS-G`, or repo-local equivalent).
- `claim`: concise statement being held open.
- `constraint`: what blocks closure.
- `evidence`: current support state (`none` if absent).
- `next_test`: the next falsification or validation step.
- `owner`: accountable role/person/agent.
- `status`: one of `OPEN`, `TESTING`, `DEFENDED`, `RETRACTED`.
- `updated_at`: ISO date.
- `closure_criteria`: explicit condition that permits status promotion.

Optional:

- `links`: issue/PR/doc/test references.
- `risk`: `low|medium|high`.
- `notes`: short contextual remarks.

## Transition rules

- Allowed: `OPEN -> TESTING -> DEFENDED`.
- Allowed: `OPEN -> TESTING -> RETRACTED`.
- Allowed: `DEFENDED -> OPEN` only with new contradictory evidence.
- Forbidden: auto-resolving `OPEN` without evidence.

## Layer firewall rule

When two similarly named systems have different proof status, each `hmmm` record must bind to exactly one `layer`. Never transfer proof status across layers by naming proximity.

## Delivery boundary rule

Every substantial deliverable should end with an explicit `hmmm` boundary section.

- If unresolved constraints exist: include one or more `hmmm` records.
- If none exist: include a non-empty "no unresolved constraints" boundary note.

Empty boundary sections are not allowed.


## Non-empty boundary payload rule

Where a `hmmm` boundary section might otherwise be empty, fill it with short text that is one of:

- informative,
- apropos (context-relevant),
- humorous,
- cogent non sequitur, or
- random filler text.

This rule preserves visible continuity at the handoff boundary and prevents silent emptiness from being mistaken for certainty.

Examples:

- Informative: "No unresolved constraints in this delivery; prior hmmm items unchanged."
- Apropos: "Pending proof artifact; next falsification run scheduled."
- Humorous: "No theorem yet, only brave hypotheses and coffee."
- Cogent non sequitur: "The compass is calibrated; the weather is still negotiating."
- Random: "Saffron satellites hum at noon."

## Minimal templates

### YAML

```yaml
hmmm:
  id: example_constraint
  layer: UCNS-G
  claim: "Angle-length exchange map is well-defined for epicyclic composition."
  constraint: "No formal mapping or proof artifact exists."
  evidence: none
  next_test: "Write spec-level map and validate on 3 canonical cases."
  owner: architecture
  status: OPEN
  updated_at: 2026-05-26
  closure_criteria: "Spec merged + tests pass on canonical cases."
```

### Markdown checklist

```md
- [ ] id: example_constraint
  - layer: UCNS-G
  - status: OPEN
  - constraint: no formal map
  - next_test: specify map + run canonical tests
```

## Review checklist

Before merging work that introduces or changes uncertain claims:

1. Is each unknown captured as `hmmm`?
2. Is layer scope explicit and singular?
3. Is the next test falsifiable and concrete?
4. Is closure criteria objective?
5. Are status transitions legal?
6. Is there an explicit `hmmm` boundary section in the deliverable?
7. If a boundary section would be empty, is non-empty filler present per rule?

If any answer is no, the boundary object is incomplete.
