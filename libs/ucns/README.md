# UCNS — Unit Circle Number System

**Source repo:** [The-Interdependency/ucns](https://github.com/The-Interdependency/ucns)
**Language:** Python 3.8+  **PyPI:** [`ucns`](https://pypi.org/project/ucns/)
**Letters:** 4

---

## What it is

UCNS is a pure-Python, zero-dependency library that models numbers as positions on a Möbius disk with recursive epicycles. It provides:

- **Möbius disk representation** — numbers as points in hyperbolic (unit-disk) geometry
- **Epicycle decomposition** — recursive harmonic factorization
- **Witness-matrix solver** — depth-2 solver for prime factorization witnesses
- **Embedding utilities** — map integers into UCNS geometric space
- **Similarity measures** — cosine and hyperbolic distance between UCNS vectors

---

## Install

```bash
pip install ucns
# or via the meta-package
pip install interdependent-lib[ucns]
```

---

## Usage

```python
from ucns import UnitCircle, MobiusDisk, Epicycle

# Represent a number as a unit-circle point
uc = UnitCircle(value=42)
print(uc.angle)   # phase angle on the unit circle

# Möbius disk projection
disk = MobiusDisk()
z = disk.embed(42)       # complex coordinate in the open unit disk

# Epicycle decomposition
epi = Epicycle(depth=3)
harmonics = epi.decompose(42)
```

---

## Package layout

| File | Purpose |
|------|---------|
| `ucns/__init__.py` | Public API |
| `ucns/core.py` | `UnitCircle` and core number system |
| `ucns/mobius.py` | Möbius disk (hyperbolic plane) |
| `ucns/epicycle.py` | Recursive epicycle decomposition |
| `ucns/embedding.py` | Integer-to-UCNS embedding |
| `ucns/similarity.py` | Distance and similarity measures |

---

## Specification documents

- [UCNS Spec →](https://github.com/The-Interdependency/ucns/blob/main/ucns-spec.md)
- [Completeness Proof →](https://github.com/The-Interdependency/ucns/blob/main/ucns-v06-completeness-proof.md)
- [Depth-7 Frontier →](https://github.com/The-Interdependency/ucns/blob/main/depth7-frontier.md)

---

## See also

- [Source README →](https://github.com/The-Interdependency/ucns/blob/main/README.md)
