# PCNA — Prime Circled Neural Architecture

**Source repo:** [The-Interdependency/pcna](https://github.com/The-Interdependency/pcna)
**Language:** Python 3.9+
**PyPI:** *(not yet published as a standalone package — use source)*
**Letters:** 4

---

## What it is

PCNA is a modular neural engine that integrates:

- **EDCM** (Energy Dissonance Circuit Model) — energy-state tracking
- **PTCA core** — prime-tensor routing
- **Zeta-function analysis** — frequency-domain harmonic probes
- **Topology / theta / sigma layers** — geometric neural membrane modules
- **Memory core** — persistent activation state
- **Helix visualisation** — ASCII / matplotlib helix rendering of state

---

## Core modules

| File | Purpose |
|------|---------|
| `core/pcna.py` | Main PCNA engine class |
| `core/edcm.py` | Energy Dissonance Circuit Model |
| `core/ptca_core.py` | Prime-tensor circular core |
| `core/zeta.py` | Zeta-function harmonic analysis |
| `core/tensor_engine.py` | Tensor computation layer |
| `core/topology.py` | Topological state mapping |
| `core/theta.py` | Theta-function modulation |
| `core/sigma.py` | Sigma-function normalization |
| `core/memory_core.py` | Persistent memory manager |
| `core/merge.py` | State-merge utilities |
| `core/helix_vis.py` | Helix visualisation |
| `core/routing_loop.py` | Async routing loop |

---

## Install (from source)

```bash
git clone https://github.com/The-Interdependency/pcna.git
cd pcna
pip install -r requirements.txt
```

---

## Quick start

```python
# From within the pcna repo
import sys
sys.path.insert(0, "/path/to/pcna")
from core.pcna import PCNAEngine

engine = PCNAEngine()
engine.run()
```

---

## See also

- [Full README →](https://github.com/The-Interdependency/pcna/blob/main/README.md)
- [Quick Start →](https://github.com/The-Interdependency/pcna/blob/main/QUICK_START.md)
- [Project README →](https://github.com/The-Interdependency/pcna/blob/main/PROJECT_README.md)
