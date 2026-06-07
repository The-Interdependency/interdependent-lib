# PTCA — Prime Tensor Core Architecture

**Source repo:** [The-Interdependency/PTCA](https://github.com/The-Interdependency/PTCA)
**Language:** Python 3.9+  **PyPI:** [`ptca-lib`](https://pypi.org/project/ptca-lib/)
**Letters:** 4

---

## What it is

PTCA is a pure-Python library providing:

- **Sentinel channels** — tagged signal lanes with priority ordering
- **Prime-node tensors** — tensors whose axes are indexed by prime numbers
- **Provenance hashing** — cryptographic provenance chains for tensor operations
- **Exchange mechanics** — deterministic prime-circular state-exchange protocol

---

## Install

```bash
pip install ptca-lib
# or via the meta-package
pip install interdependent-lib[ptca]
```

---

## Usage

```python
from ptca import PTCAInstance, SentinelChannel, PrimeTensor

# Create a PTCA instance
pt = PTCAInstance(primes=[2, 3, 5, 7])

# Sentinel channels
ch = SentinelChannel(name="alpha", priority=1)
pt.register(ch)

# Exchange mechanics
state_a = [10, 20, 30]
state_b = pt.exchange(state_a)
```

---

## Package layout

| File | Purpose |
|------|---------|
| `ptca/__init__.py` | Public API |
| `ptca/instance.py` | `PTCAInstance` — main engine class |
| `ptca/tensor.py` | `PrimeTensor` — prime-indexed tensor |
| `ptca/sentinels.py` | Sentinel channel primitives |
| `ptca/exchange.py` | Exchange protocol |
| `ptca/provenance.py` | Provenance hashing |
| `ptca/primes.py` | Prime utilities |
| `ptca/constants.py` | Shared constants |

---

## See also

- [Source repository →](https://github.com/The-Interdependency/PTCA)
