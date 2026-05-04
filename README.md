# interdependent-lib

> A unified PyPI meta-package that brings together the four-letter and five-letter acronym libraries of [The Interdependency](https://github.com/The-Interdependency) into a single, installable collection.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Python 3.9+](https://img.shields.io/badge/python-3.9%2B-blue)](https://www.python.org/)
[![The Interdependency](https://img.shields.io/badge/org-The--Interdependency-blueviolet)](https://github.com/The-Interdependency)

---

## Overview

`interdependent-lib` is the convergence point for the mathematical and AI orchestration libraries developed under The Interdependency. Installing this package makes each sub-library available in a single step.

### Included Libraries

| Acronym | Full Name | Letters | Description |
|---------|-----------|---------|-------------|
| [PCEA](libs/pcea/README.md) | Prime Circular Encryption Algorithm | 4 | Neural architecture state encryption using prime-circular bijective encoding |
| [PTCA](libs/ptca/README.md) | Prime Tensor Circular Architecture | 4 | Sentinel channels, prime-node tensors, provenance hashing, and exchange mechanics |
| [UCNS](libs/ucns/README.md) | Unit Circle Number System | 4 | Recursive factorization theory and witness-matrix depth-2 solver |
| [PCNA](libs/pcna/README.md) | Prime Circled Neural Architecture | 4 | Modular neural engine with EDCM, PTCA, and zeta-function cores |
| [ZFAE](libs/zfae/README.md) | Zeta Function Alpha Echo | 4 | Zeta-function harmonic analysis and alpha-echo resonance |
| [AIMMH](libs/aimmh/README.md) | AI Multimodel Multimodal Hub | 5 | Zero-dependency async multi-model conversation orchestration |

---

## Installation

```bash
# Install the meta-package (all sub-libraries)
pip install interdependent-lib

# Install only specific libraries
pip install interdependent-lib[pcea]
pip install interdependent-lib[ptca]
pip install interdependent-lib[ucns]
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

Apache 2.0 — see [LICENSE](LICENSE).

## Author

Erin Patrick Spencer — [interdependentway.org](https://interdependentway.org)
