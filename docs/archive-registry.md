# Archive registry — the ancestors

This is the single canonical list of The Interdependency's **archived
repositories**: repos whose work continues under a successor and which are
retained read-only for provenance. It lives in the aggregator for the same
reason the coherence-prime canon and the stack map do — it is org-level fact
belonging to no single leaf, citable from anywhere without inverting the
dependency graph (see `docs/chapter-4.md`).

Doctrine:

- **Archive, never delete.** An archived repo is an ancestor: read-only,
  tombstoned, and permanently citable as provenance.
- **Tombstone before (or with) archival.** The first lines of an archived
  repo's `README.md` name the archival date and the successor.
- **Do not build against an ancestor.** Successors carry the maintained code;
  ancestors carry the history.
- **Rescue before archival.** Any content absent from the successor is copied
  there first, with provenance, or the absence is recorded as deliberate.
- **Add a row here in the same change that archives a repo.**

## Registry

| Archived repo | Date | Successor | Notes |
|---|---|---|---|
| `edcmbone` | 2026-07-28 | [`edcm`](https://github.com/The-Interdependency/edcm) | L0 text-primitive layer absorbed into `edcm/measurement/` (frozen canon data, parser, metrics, compress, closed-token layer). Consolidation provenance pinned machine-readably in `edcm`'s `MEASUREMENT_AUTHORITY` record (`edcmbone-provenance-only-v1`). |
| `pcna` | 2026-07-28 | [`ptcna`](https://github.com/The-Interdependency/ptcna) | Neural layer of the consolidated stack (`ptcna.neural`). Rescued before archival: `scripts/proof_check.py` (spectral relabeling-equivalence check on the n=7 circulants — not evidence for the 7:3 choice). The old app server (`backend/`, `frontend/`) was deliberately not migrated. |
| `pcta` | 2026-07-28 | [`ptcna`](https://github.com/The-Interdependency/ptcna) | Seed layer of the consolidated stack (`ptcna.seed`). Fully superseded; diffs vs the successor are the recorded consolidation refactors only. |
| `pcsa` | 2026-07-28 | [`ptcna`](https://github.com/The-Interdependency/ptcna) | Core layer of the consolidated stack (`ptcna.core`, incl. `prime_core` fiqs). Rescued before archival: the stratified-core design notes, now `ptcna/core/prime_core/PROVENANCE.md` (historical; subordinate to the root gradient invariant). |
| `a0replite` | 2026-07-28 | [`a0`](https://github.com/The-Interdependency/a0) | Replit deployment lane; stale 112 days at archival. Remaining Replit references in `a0` (`README.md`, `replit.md`, `DEPLOYMENT.md`, and the `replit.interdependentway.org` hostname) are a separate, still-open edit pass. |

## hmmm

- `odysseus-a0` is stale with no identified successor; its disposition is
  deliberately unresolved (maintainer decision, not an agent's) and it is
  **not** an ancestor until that decision is made.
- This registry records org-level archival facts only; it transfers no
  license, theorem, proof, or empirical status between repositories.
