# UCNS — Unit Circle Number System

**Source repo:** [The-Interdependency/ucns](https://github.com/The-Interdependency/ucns)  
**Language:** Python 3.8+  **PyPI:** [`ucns`](https://pypi.org/project/ucns/)  
**Meta-package extra:** `interdependent-lib[ucns]` requires `ucns>=0.9.1`  
**Letters:** 4

---

## What it is

UCNS is the Unit Circle Number System library. The Python runtime package is
stdlib-only and provides recursive UCNS objects, canonical multiplication,
serialization, A0-safe factorization envelopes, and the `factor_search_v08`
witness-matrix recursive quotient solver.

The upstream source repo also carries the formal Lean scaffold for Theorem N.
That formal layer now depends on Mathlib in `formal/lakefile.lean`; Mathlib is a
Lean/formalization dependency, not a Python runtime dependency of `ucns`.

UCNS currently provides:

- **Recursive UCNS object algebra** — `UCNSObject`, `multiply`, unit predicates,
  canonical JSON, and stable hashing.
- **Witness-matrix factor search** — `factor_search_v08`, including the repaired
  right-singleton split boundary `p=n, q=1`.
- **Scoped factorization results** — A0-facing envelopes that prevent raw
  `SEQ-PRIME` from being overclaimed outside defended-complete domains.
- **Lineage geometry modules** — unit-circle, Möbius, epicycle, embedding, and
  similarity utilities available by submodule path.
- **Formal frontier scaffold** — Lean 4 statements for Theorem N and related
  claims, still `sorry`-backed until proof discharge.

---

## Install

```bash
pip install ucns>=0.9.1
# or via the meta-package
pip install "interdependent-lib[ucns]"
```

---

## Usage

```python
from fractions import Fraction
from ucns import UCNSObject, multiply, factor_search_v08

UNIT = None

s2 = UCNSObject(
    2,
    2,
    [(Fraction(0), UNIT), (Fraction(1), UNIT)],
    [0, 0],
)

product = multiply(s2, s2)
result = factor_search_v08(product)
```

For lineage geometry modules, import by submodule path:

```python
from ucns import core, embedding, epicycle, mobius, similarity
```

---

## Package layout

| Area | Purpose |
|------|---------|
| `ucns/` | Public Python API and lineage geometry modules |
| `ucns_recursive/` | Engine implementation re-exported by `ucns` |
| `formal/` | Lean 4 scaffold; Mathlib-backed; not yet formal verification while `sorry` remains |
| `docs/` | Specs, glossary, claim boundaries, reproducibility notes |

---

## Specification documents

- [UCNS README →](https://github.com/The-Interdependency/ucns/blob/main/README.md)
- [UCNS Spec →](https://github.com/The-Interdependency/ucns/blob/main/ucns-spec.md)
- [Theorem N →](https://github.com/The-Interdependency/ucns/blob/main/ucns-theorem-n.md)
- [Formal scaffold →](https://github.com/The-Interdependency/ucns/tree/main/formal)

---

## See also

- [Source README →](https://github.com/The-Interdependency/ucns/blob/main/README.md)
