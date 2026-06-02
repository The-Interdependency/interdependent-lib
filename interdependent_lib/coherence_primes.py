"""
interdependent_lib.coherence_primes
===================================
Canonical, single-source-of-truth implementation of the **coherence-prime**
(a.k.a. *consciousness coherence prime*) sequence for The Interdependency.

Definition (fully pinned)
-------------------------
Base set::

    C0 = {3, 5, 7}

For any prime ``p > 7``, ``p`` is a coherence prime iff:

    1. ``(p - 1) % 4 == 0``           — p ≡ 1 mod 4
    2. ``(p - 1) // 4`` is square-free — no repeated prime factors
    3. every prime factor of ``(p - 1) // 4`` is **already a coherence prime**

Condition 3 makes the set *recursive* (genealogical ancestry), not a flat
sieve against a fixed universe. This is the distinguishing property: a
coherence prime's quarter-shifted predecessor kernel must decompose only into
*earlier coherence primes*.

Verified sequence::

    3, 5, 7, 13, 29, 53, 61, 157, 349, 421, 733, 1061, 1093, 1709, 1741, ...

Rejection examples::

    17: kernel = (17 - 1) // 4 = 4 = 2²   — not square-free
    19: (19 - 1) % 4 = 2 ≠ 0              — fails condition 1

Why this module exists
----------------------
The definition was previously re-implemented divergently across repos. In
particular, a static "factor universe" approximation (a frozen set capped at
421) silently disagrees with the recursive rule for primes whose kernel
factors through a coherence prime above the cap — the smallest such prime is
**4373** (kernel 1093, itself a coherence prime). This module is the canonical
recursive implementation; downstream packages should match its behaviour.

This module is pure-math and has **no dependencies** — it lives in the shared
meta-package so it can be referenced as canon without inverting the dependency
graph (leaf libraries must not import the aggregator).

Public API
----------
``is_coherence_prime(p)``, ``sequence_up_to(limit)``, ``nth(k)``.
"""
from __future__ import annotations

import threading

# === MODULE_BUILD ===
# id: coherence_primes
#   module_name: coherence_primes
#   module_kind: engine
#   summary: canonical recursive coherence-prime sequence registry (single source of truth)
#   owner: Erin Spencer
#   public_surface: is_coherence_prime, sequence_up_to, nth
#   internal_surface: _build_up_to, _is_prime, _is_squarefree, _prime_factors
#   auth_boundary: none
_LOCK = threading.Lock()
#   network_boundary: none
#   user_data_boundary: none
#   admin_only: false
#   tests: tests.test_coherence_primes
#   rollout: default_enabled (re-exported from interdependent_lib package root)
#   rollback: remove this module and its three package-root re-exports
#   requires: none
#   since: 2026-06-02
#   unresolved: none
# === END MODULE_BUILD ===

# Base coherence set C0.
_BASE: frozenset[int] = frozenset({3, 5, 7})

# Lazily-grown caches. The recursive rule means we must admit primes in
# ascending order so that condition 3 can consult the already-admitted set.
_CACHE: list[int] = sorted(_BASE)
_KNOWN: set[int] = set(_BASE)
_SCANNED_TO: int = max(_BASE)


def _is_prime(n: int) -> bool:
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    d = 3
    while d * d <= n:
        if n % d == 0:
            return False
        d += 2
    return True


def _is_squarefree(n: int) -> bool:
    d = 2
    while d * d <= n:
        if n % (d * d) == 0:
            return False
        d += 1
    return True


def _prime_factors(n: int) -> set[int]:
    factors: set[int] = set()
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.add(d)
            n //= d
        d += 1
    if n > 1:
        factors.add(n)
    return factors


def _build_up_to(limit: int) -> None:
    """Extend the caches so every coherence prime ``<= limit`` is admitted.

    Idempotent and monotonic: ``_SCANNED_TO`` guards against re-scanning, which
    also prevents duplicate admissions into ``_CACHE``.
    """
    global _SCANNED_TO
    if limit <= _SCANNED_TO:
        return
    for p in range(_SCANNED_TO + 1, limit + 1):
        if not _is_prime(p):
            continue
        if p in _BASE:
            continue
        if (p - 1) % 4 != 0:
            continue
        kernel = (p - 1) // 4
        if not _is_squarefree(kernel):
            continue
        # Condition 3: recursive ancestry — every kernel factor already admitted.
        if _prime_factors(kernel) <= _KNOWN:
            _CACHE.append(p)
            _KNOWN.add(p)
    _SCANNED_TO = limit


def is_coherence_prime(p: int) -> bool:
    """Return ``True`` if ``p`` is a coherence prime."""
    if p < 2:
        return False
    _build_up_to(p)
    return p in _KNOWN


def sequence_up_to(limit: int) -> list[int]:
    """All coherence primes ``<= limit``, ascending."""
    _build_up_to(limit)
    return [x for x in _CACHE if x <= limit]


def nth(k: int) -> int:
    """Return the ``k``-th coherence prime, 1-indexed. Scans forward as needed."""
    if k < 1:
        raise ValueError(f"k must be >= 1, got {k}")
    target = max(_SCANNED_TO * 2, 1_000)
    while len(_CACHE) < k:
        _build_up_to(target)
        target *= 4
    return _CACHE[k - 1]


__all__ = ["is_coherence_prime", "sequence_up_to", "nth"]
