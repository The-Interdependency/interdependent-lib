# Naming Migration — Ratified Scheme

Ratified by the maintainer (2026-07-04), while nothing external depends on these
names. This is the single reference for the org-wide repo/dist/import renames.
GitHub redirects renamed repo URLs; **nothing redirects import paths or PyPI
dist names**, so everything here must land before any dist pins the old names.

## Convention

Lowercase-hyphen everywhere for repo names; lowercase for import names. PyPI
normalizes dist names to lowercase anyway.

## The scheme

| Current | New | Kind | Notes |
|---|---|---|---|
| `ucns` | `ucns` | **frozen** | DOI-minted (10.5281/zenodo.20665340); renaming breaks the Zenodo↔GitHub link. Do not rename. |
| `pcna` | `pcna` | keep | neural — leaf (stack layer 1) |
| `pcta` | `pcta` | keep | tensor — circle stratum (stack layer 2) |
| `PTCA` | **`pcsa`** | **rename + new dist** | seed — core stratum (stack layer 3). "Seed" names what the layer *is*; kills the one-keystroke `pcta`/`ptca` collision. PyPI: publish new dist `pcsa`; abandon `ptca-lib` (never re-release). |
| `PCEA` | `pcea` | casing only | encryption — orthogonal guardian |
| `ZFAE` | `zfae` | casing only | conceptual/doctrine repo; runtime lives in `a0` — no dist planned |
| `METAPAT` | `metapat` | casing only | FLAR canon repo; unpublished `metapat` 0.0.1 package exists upstream |
| `eml_ucns` | `eml-ucns` | punctuation | or archive if defunct |
| `a0` (old) | *(renamed aside)* | free the name | then `a0-betatest` → `a0` |

Result for the quartet: four P-C-\_-A tokens (`pcna`, `pcta`, `pcsa`, `pcea`),
unique meaningful middle letter, zero transpositions, uniform casing.

## Sequencing

1. Casing-only renames first (`PCEA`, `ZFAE`, `METAPAT`, `eml_ucns`) — lowest risk.
2. Free the `a0` name, then `a0-betatest` → `a0`.
3. `PTCA` → `pcsa` **last** — it rewrites import paths and requires a new PyPI dist.

Repo renames are maintainer clicks in GitHub Settings; they cannot be performed
via the API access available to org agents.

## Transition rules for this repo

- The `ptca` extra keeps pinning `ptca-lib>=0.1.0` (the published dist) until
  `pcsa` ships to PyPI. When it does: add a `pcsa` extra, update `all`, keep
  `ptca` as a deprecated alias for one minor release, then drop it.
- `_REGISTRY` keeps key `ptca` → import `ptca` until the upstream import name
  changes; then key `pcsa` → import `pcsa` (keep `ptca` key reporting `False`
  during the deprecation window only if anything still asks for it).
- `docs/prime-tensor-stack.md`, `libs/ptca/`, and the README/CLAUDE tables get
  swept to `pcsa` in the same change that adds the `pcsa` extra — not before,
  so docs never reference a dist that does not exist.
- PCNA's `core/ptca_core.py` (seeds → core consumer) is inside the rename blast
  radius and is renamed during the PCNA `core/` → `pcna/` packaging pass.

## Open (hmmm)

- `edcmbone` reconciliation: standalone repo vs canon's "subpackage of
  interdependent-lib". Either absorb + archive, or keep as dev-home and never
  publish it as its own dist. Unresolved.
- Dev-side shadows (`erinepshovel-code`: `UnitCircle`, `EDCM`,
  `Interdependent-core`) need dev-mirror labels or reconciliation.
