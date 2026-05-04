# libs — Interdependency Sub-Libraries

This directory contains per-library documentation and stub folders for each acronym library that `interdependent-lib` aggregates.

| Folder | Package | PyPI name | Description |
|--------|---------|-----------|-------------|
| [pcna/](pcna/README.md) | `pcna` | *(source-only)* | Prime Circled Neural Architecture — modular neural engine |
| [pcea/](pcea/README.md) | `pcea` | `pcea` | Prime Circular Encryption Algorithm |
| [ptca/](ptca/README.md) | `ptca` | `ptca-lib` | Prime Tensor Circular Architecture |
| [ucns/](ucns/README.md) | `ucns` | `ucns` | Unit Circle Number System |
| [zfae/](zfae/README.md) | `zfae` | *(source-only)* | Zeta Function Alpha Echo |
| [aimmh/](aimmh/README.md) | `aimmh_lib` | `aimmh-lib` | AI Multimodel Multimodal Hub |

---

## Keeping these folders up to date

The `.github/workflows/sync-libs.yml` workflow can pull the latest source files from each upstream repo on demand or on a schedule. Run it manually from the **Actions** tab or enable the `schedule:` trigger for automatic weekly syncs.
