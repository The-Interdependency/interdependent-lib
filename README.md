# interdependent-lib

> A unified PyPI meta-package that brings together the four-letter and five-letter acronym libraries of [The Interdependency](https://github.com/The-Interdependency) into a single, installable collection.

[![License: MPL-2.0](https://img.shields.io/badge/License-MPL--2.0-blue.svg)](LICENSE)
[![Python 3.9+](https://img.shields.io/badge/python-3.9%2B-blue)](https://www.python.org/)
[![The Interdependency](https://img.shields.io/badge/org-The--Interdependency-blueviolet)](https://github.com/The-Interdependency)

---

## Overview

`interdependent-lib` is the convergence point for the mathematical and AI orchestration libraries developed under The Interdependency. Installing this package makes each sub-library available in a single step.

### Included Libraries

| Acronym | Full Name | Letters | Description |
|---------|-----------|---------|-------------|
| [PCEA](libs/pcea/README.md) | Prime Circular Encryption Algorithm | 4 | Neural architecture state encryption ("last state as key") at every layer |
| [PTCA](libs/ptca/README.md) | Prime Tensor Core Architecture | 4 | Stack layer 3 — seeds → core. (`ptca-lib` ships the sentinel-channel / prime-node tensor system; the seeds→core role is `prime_core`.) |
| [PCTA](libs/pcta/README.md) | Prime Circled Tensor Architecture | 4 | Stack layer 2 — composes UCNS-carried circles → seeds |
| [UCNS](libs/ucns/README.md) | Unit Circle Number System | 4 | Recursive factorization theory, witness-matrix quotient solver, A0-safe factorization envelopes, and Mathlib-backed formal scaffold upstream |
| [PCNA](libs/pcna/README.md) | Prime Circle Neural Architecture | 4 | Stack layer 1 — tensors → circles in a back-propagating NN → weights |
| [ZFAE](libs/zfae/README.md) | Zeta Function Alpha Echo | 4 | Inference engine — pcna weights + circles / seeds / cores as phase-harmonic propagation |
| [AIMMH](libs/aimmh/README.md) | AI Multimodel Multimodal Hub | 5 | Zero-dependency async multi-model conversation orchestration |

---

## Installation

```bash
# Install the meta-package (base package only; extras install sub-libraries)
pip install interdependent-lib

# Install only specific libraries
pip install interdependent-lib[pcea]
pip install interdependent-lib[ptca]
pip install interdependent-lib[ucns]   # ucns>=0.9.1
pip install interdependent-lib[aimmh]

# Install everything
pip install interdependent-lib[all]
```

---

## Quick Start

```python
import interdependent_lib

# Check which sub-libraries are available in this environment
print(interdependent_lib.available())
```

---

## The Prime-Tensor Stack

PCNA, PCTA, PTCA and ZFAE form a single compute stack (PCEA is the orthogonal
guardian). Composition counts are **variable** at every level — the only
invariant is that every circle, seed, and core is itself a tensor. The canonical
role-and-boundary map lives in
**[docs/prime-tensor-stack.md](docs/prime-tensor-stack.md)**:

```
PCNA (tensors → circles, back-prop) ─► weights + circles ─► PCTA (circles → seeds)
  ─► seeds ─► PTCA (seeds → core) ─► cores ─► a0(ZFAE) infers
PCEA — guardian: "last state as key for this state" at every layer (orthogonal)
```

---

## Library Details

See `libs/` for per-library documentation and source links:

- [`libs/pcea/`](libs/pcea/README.md) — PCEA
- [`libs/ptca/`](libs/ptca/README.md) — PTCA
- [`libs/ucns/`](libs/ucns/README.md) — UCNS
- [`libs/pcna/`](libs/pcna/README.md) — PCNA
- [`libs/zfae/`](libs/zfae/README.md) — ZFAE
- [`libs/aimmh/`](libs/aimmh/README.md) — AIMMH (five-letter)

---

## Repository Structure

```
interdependent-lib/
├── README.md               ← you are here
├── COPILOT.md              ← GitHub Copilot + ecosystem best practices
├── CHANGELOG.md            ← version history
├── CONTRIBUTING.md         ← how to contribute
├── pyproject.toml          ← PyPI meta-package config
├── interdependent_lib/     ← top-level Python package
│   └── __init__.py
└── libs/                   ← per-library documentation and stubs
    ├── README.md
    ├── pcna/
    ├── pcea/
    ├── ptca/
    ├── ucns/
    ├── zfae/
    └── aimmh/
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

MPL-2.0 (Mozilla Public License 2.0) — see [LICENSE](LICENSE). Relicensed from
MIT to MPL-2.0 — weak copyleft: embed anywhere, but changes to these files must
be published. (Earlier history: AGPL-3.0-or-later + commercial, then MIT.)

## Author

Erin Patrick Spencer — [interdependentway.org](https://interdependentway.org)
