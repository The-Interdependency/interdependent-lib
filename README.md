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
| [PTCNA](libs/ptcna/README.md) | Prime Tensor Circled Neural Architecture | — | The prime-tensor stack, consolidated into one repo, four layers (neural/circle/seed/core). Supersedes the former PCNA/PCTA/PCSA |
| [PCEA](libs/pcea/README.md) | Prime Circular Encryption Algorithm | 4 | Neural architecture state encryption ("last state as key") at every layer; orthogonal guardian |
| [UCNS](libs/ucns/README.md) | Unit Circle Number System | 4 | Recursive factorization theory, witness-matrix quotient solver, A0-safe factorization envelopes, and Mathlib-backed formal scaffold upstream |
| [ZFAE](libs/zfae/README.md) | Zeta Function Alpha Echo | 4 | Inference engine (conceptual; runtime in `a0`) — reads neural weights + circles / seeds / cores as phase-harmonic propagation |
| [AIMMH](libs/aimmh/README.md) | AI Multimodel Multimodal Hub | 5 | Zero-dependency async multi-model conversation orchestration |

---

## Installation

```bash
# Install the meta-package (base package only; extras install sub-libraries)
pip install interdependent-lib

# Install only specific libraries
pip install interdependent-lib[pcea]
pip install interdependent-lib[ucns]   # ucns>=0.9.1
pip install interdependent-lib[aimmh]
pip install interdependent-lib[ptcna]  # the consolidated prime-tensor stack

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

The stack is one package — **PTCNA** (Prime Tensor Circled Neural Architecture) —
with four layers. PCEA is the orthogonal guardian; ZFAE is the conceptual
inference cap (runtime in `a0`). Composition counts are **variable** at every
level — the only invariant is that every circle, seed, and core is itself a
tensor. The canonical role-and-boundary map lives in
**[docs/prime-tensor-stack.md](docs/prime-tensor-stack.md)**:

```
neural tensors ─(circle layer)─► circles ─(seed layer)─► seeds ─(core layer)─► cores
  back-propagation lives ONLY in the neural layer
  circle / seed / core are auditing & timing tensors (non-differentiable);
    fiqs gate core internal propagation per Fick's law (J = −D ∇φ)
PCEA — guardian: "last state as key for this state" at every layer (orthogonal; not a layer)
```

---

## Library Details

See `libs/` for per-library documentation and source links:

- [`libs/ptcna/`](libs/ptcna/README.md) — PTCNA (consolidated stack: neural/circle/seed/core)
- [`libs/pcea/`](libs/pcea/README.md) — PCEA (orthogonal guardian)
- [`libs/ucns/`](libs/ucns/README.md) — UCNS
- [`libs/zfae/`](libs/zfae/README.md) — ZFAE (conceptual; runtime in `a0`)
- [`libs/aimmh/`](libs/aimmh/README.md) — AIMMH (five-letter)
- [`libs/metapat/`](libs/metapat/README.md) — METAPAT (FLAR)

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
