# libs — Interdependency Sub-Libraries

This directory contains per-library documentation and stub folders for each acronym library that `interdependent-lib` aggregates.

| Folder | Package | PyPI name | Description |
|--------|---------|-----------|-------------|
| [pcna/](pcna/README.md) | `pcna` | *(source-only)* | Prime Circle Neural Architecture — tensors → circles (stack layer 1, backprop → weights) |
| [pcea/](pcea/README.md) | `pcea` | `pcea` | Prime Circular Encryption Algorithm — guardian ("last state as key" at every layer) |
| [ptca/](ptca/README.md) | `ptca` | `ptca-lib` | Prime Tensor Core Architecture — seeds → core (stack layer 3) |
| [pcta/](pcta/README.md) | `pcta` | *(not yet on PyPI)* | Prime Circled Tensor Architecture — circles → seeds (stack layer 2); see [prime-tensor stack](../docs/prime-tensor-stack.md) |
| [ucns/](ucns/README.md) | `ucns` | `ucns` | Unit Circle Number System |
| [zfae/](zfae/README.md) | `zfae` | *(conceptual — runtime lives in `a0`, no dist planned)* | Zeta Function Alpha Echo |
| [aimmh/](aimmh/README.md) | `aimmh_lib` | `aimmh-lib` | AI Multimodel Multimodal Hub |
| [metapat/](metapat/README.md) | `metapat` | *(not yet on PyPI)* | Meta Energy Theory — Axioms, Postulates, And Theorems (FLAR — first-letter acronym repo) |

> Naming note: the `PTCA → pcsa` rename (and org-wide casing normalization) is
> ratified — see [`docs/naming-migration.md`](../docs/naming-migration.md). Names
> in this table track what is actually published/importable today and are swept
> when each rename lands.

---

## Keeping these folders up to date

The `.github/workflows/sync-libs.yml` workflow can pull the latest source files from each upstream repo on demand or on a schedule. Run it manually from the **Actions** tab or enable the `schedule:` trigger for automatic weekly syncs.
