# libs — Interdependency Sub-Libraries

This directory contains per-library documentation and stub folders for each acronym library that `interdependent-lib` aggregates.

| Folder | Package | PyPI name | Description |
|--------|---------|-----------|-------------|
| [ptcna/](ptcna/README.md) | `ptcna` | *(source-only)* | Prime Tensor Circled Neural Architecture — one repo, four layers (neural/circle/seed/core); consolidates the former pcna/pcta/pcsa. See [prime-tensor stack](../docs/prime-tensor-stack.md) |
| [pcea/](pcea/README.md) | `pcea` | `pcea` | Prime Circular Encryption Algorithm — guardian ("last state as key" at every layer); orthogonal to the stack |
| [ucns/](ucns/README.md) | `ucns` | `ucns` | Unit Circle Number System |
| [zfae/](zfae/README.md) | `zfae` | *(conceptual — runtime lives in `a0`, no dist planned)* | Zeta Function Alpha Echo |
| [aimmh/](aimmh/README.md) | `aimmh_lib` | `aimmh-lib` | AI Multimodel Multimodal Hub |
| [metapat/](metapat/README.md) | `metapat` | *(not yet on PyPI)* | Meta Energy Theory — Axioms, Postulates, And Theorems (FLAR — first-letter acronym repo) |

> Naming note: the org-wide rename + the **prime-tensor stack consolidation**
> (pcna/pcta/pcsa → single `ptcna`) are ratified — see
> [`docs/naming-migration.md`](../docs/naming-migration.md). Names in this table
> track what is published/importable today.

---

## Keeping these folders up to date

The `.github/workflows/sync-libs.yml` workflow can pull the latest source files from each upstream repo on demand or on a schedule. Run it manually from the **Actions** tab or enable the `schedule:` trigger for automatic weekly syncs.
