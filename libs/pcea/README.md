# PCEA — Prime Circular Encryption Algorithm

**Source repo:** [The-Interdependency/PCEA](https://github.com/The-Interdependency/PCEA)
**Language:** Python 3.9+  **PyPI:** [`pcea`](https://pypi.org/project/pcea/)
**Letters:** 4

---

## What it is

PCEA is a pure-Python, zero-dependency library implementing a prime-circular bijective base encryption algorithm for neural architecture state. It encrypts integer sequences using the relationship between the current state and the previous (last) state, cycling over the first 53 primes.

### Algorithm

For each index `i`:

1. Select prime `p = PRIME_CIRCLE[i % 53]` (circular indexing over 53 primes: 2, 3, 5, …, 241)
2. Decompose `state[i]` into bijective base-`p` digits — each digit in `{1, …, p}`
3. Extract key digits from `last_state[i % L]` in standard base `p`
4. Shift each digit additively mod `p`, staying within `{1, …, p}`
5. Reconstruct the encrypted value

```
encrypt: e_j = ((v_j - 1 + k_j) mod p) + 1
decrypt: v_j = ((e_j - 1 - k_j) mod p) + 1
```

---

## Install

```bash
pip install pcea
# or via the meta-package
pip install interdependent-lib[pcea]
```

---

## Usage

```python
from pcea import encrypt_state, decrypt_state, PCEAInstance

# Stateless — caller manages last_state
state      = [1000, 2000, 3000]
last_state = [500,  600,  700]

encrypted = encrypt_state(state, last_state)
recovered = decrypt_state(encrypted, last_state)
assert recovered == state

# Stateful — instance advances last_state automatically
enc = PCEAInstance(seed=[1, 2, 3])
dec = PCEAInstance(seed=[1, 2, 3])

e1 = enc.encrypt([100, 200, 300])
e2 = enc.encrypt([400, 500, 600])

assert dec.decrypt(e1) == [100, 200, 300]
assert dec.decrypt(e2) == [400, 500, 600]
```

---

## Package layout

| File | Purpose |
|------|---------|
| `pcea/__init__.py` | Public API (`encrypt_state`, `decrypt_state`, `PCEAInstance`) |
| `pcea/cipher.py` | Core cipher implementation |
| `pcea/codec.py` | Bijective base-p encode/decode |
| `pcea/instance.py` | Stateful `PCEAInstance` class |
| `pcea/kdf.py` | Key-derivation helpers |
| `pcea/primes.py` | Prime-circle constant |

---

## See also

- [Source README →](https://github.com/The-Interdependency/PCEA/blob/main/README.md)
