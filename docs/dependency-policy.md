# Dependency and Registry Policy

`interdependent-lib` is a coordination package. It should stay small.

## Base package rule

The base install:

```sh
pip install interdependent-lib
```

must install only the `interdependent_lib` package and its dependency-free shared
primitives. It must not pull UCNS, PCEA, PTCA, AIMMH, PCNA, PCTA, ZFAE, Lean,
Mathlib, model clients, GPU libraries, or network SDKs.

## Extras rule

Packaged libraries enter `[project.optional-dependencies]` only when they have a
stable PyPI package and a stable import name.

Current packaged extras:

- `pcea` -> `pcea>=0.1.0`
- `ucns` -> `ucns>=0.9.1`
- `aimmh` -> `aimmh-lib>=1.1.0`
- `ptcna` -> `ptcna>=0.1.0`

The prime-tensor stack (`pcna` / `pcta` / `pcsa`) is consolidated into the single
`ptcna` package, now published to PyPI and pinned by the `ptcna` extra (replacing
the former per-repo intent and the once-planned `prime-stack` extra). The
previously-published core-layer dist is superseded and no longer pinned.

The `all` extra is the union of packaged extras only. Source-only libraries do
not enter `all` until they have stable package releases.

## Source-only registry rule

`available()` is an importability probe, not a claim of installation authority.
A source-only project with no package-unique import target must be present as a
key but report `False` rather than probing a generic name.

Example: PCNA previously used import target `core`, which can collide with an
unrelated installed package. It now reports `False` until PCNA has a stable,
package-unique import name.

## Leaf-library boundary

Leaf libraries must not import `interdependent-lib`. That would invert the
dependency graph. Shared canon that must be visible to multiple leaf repos may
live here, but leaf repos should copy or reimplement the rule and test against
it rather than importing the aggregator.

## Runtime vs formal dependencies

Python runtime dependencies and formal-method dependencies are separate.

UCNS Python remains a stdlib-only runtime package. The upstream `ucns/formal`
Lean scaffold may depend on Mathlib. That Mathlib dependency must not be added
to `interdependent-lib` or to the Python `ucns` runtime dependency set.

## Preventive tests

The test suite should guard:

- package `__version__` matches `pyproject.toml`;
- UCNS dependency floor remains current in both `ucns` and `all` extras;
- source-only libraries with generic names do not false-positive in `available()`;
- user-facing docs mention dependency floors when those floors are meaningful.

When any of those tests fail, prefer changing the code or docs immediately over
letting package metadata drift.
