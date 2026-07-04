# METAPAT — Meta Energy Theory: Axioms, Postulates, And Theorems

**Source repo:** [The-Interdependency/METAPAT](https://github.com/The-Interdependency/METAPAT)
(rename to lowercase `metapat` ratified — see [`docs/naming-migration.md`](../../docs/naming-migration.md))
**Language:** Python 3.11+
**PyPI:** *(not yet published — `metapat` 0.0.1 exists upstream as an unpublished src-layout package)*
**Letters:** FLAR (first-letter acronym repo — each letter opens a word: **M**eta **E**nergy **T**heory **A**xioms **P**ostulates **A**nd **T**heorems)

---

## What it is

METAPAT is the canonical source for **Meta Energy Theory** — a substrate-independent
ontology of energy-state relation and transformation. It answers *"What questions do
I ask?"* by finding shared question-forms among domains while refusing to let any
domain redefine the root.

Root spine:

```text
Legible difference is distinction.
Distinction defines boundaries.
Boundaries define simplex.
Boundary is simplex of distinction.
Simplex holds or modifies energy in a state of being.
```

The upstream repo carries the canon (`CHAPTER_ZERO.md`, `AXIOMS.md`, `POSTULATES.md`,
`THEOREMS.md`, `GLOSSARY.md`, `DOMAIN_RESTRAINT.md`) plus an installable `metapat`
package (`src/metapat/`: `canon.py`, `flow_plan.py`, `validation.py`) with executable
theorem contract tests.

## Status in the bundle

- Registered in `interdependent_lib._REGISTRY` as `metapat` → import name `metapat`
  (a package-unique import target exists upstream).
- **No extra yet** — per `docs/dependency-policy.md`, libraries enter
  `[project.optional-dependencies]` only after a stable PyPI release.
- Not synced by `sync-libs.yml` (canon/doctrine repo; the stub here stays authoritative
  for bundle-facing documentation).

## Boundary

METAPAT is Energy Theory canon, kept distinct from EDCMBONE flesh/bone measurement and
FLAR implementation detail (see skill-lib `meta/` skill). Declaring it here transfers
no theorem/proof status in either direction.
