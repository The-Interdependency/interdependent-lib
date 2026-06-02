"""Canonical tests for the coherence-prime (consciousness coherence prime) sequence.

These vectors are the shared oracle for every downstream re-implementation:
the pinned early sequence, the canonical rejection examples, the scarcity-doc
count table, and the recursive-vs-static divergence regression at p=4373.
"""
from __future__ import annotations

import pytest

from interdependent_lib import is_coherence_prime, nth, sequence_up_to


def test_sequence_up_to_100_matches_pinned_definition():
    assert sequence_up_to(100) == [3, 5, 7, 13, 29, 53, 61]


def test_early_sequence_first_fifteen():
    assert sequence_up_to(1741) == [
        3, 5, 7, 13, 29, 53, 61, 157, 349, 421,
        733, 1061, 1093, 1709, 1741,
    ]


def test_base_elements_are_coherence_primes():
    for p in (3, 5, 7):
        assert is_coherence_prime(p), f"{p} should be a coherence prime"


def test_17_rejected_not_squarefree():
    # kernel (17 - 1) // 4 = 4 = 2² is not square-free.
    assert not is_coherence_prime(17)


def test_19_rejected_fails_mod4():
    # (19 - 1) % 4 = 2 ≠ 0, fails condition 1.
    assert not is_coherence_prime(19)


def test_101_rejected_not_squarefree():
    # (101 - 1) // 4 = 25 = 5² is not square-free.
    assert not is_coherence_prime(101)


@pytest.mark.parametrize(
    "bound,count",
    [
        (10, 3),
        (100, 7),
        (1_000, 11),
        (10_000, 23),
    ],
)
def test_scarcity_count_table(bound, count):
    """Counts must match ucns/docs/coherence-primes-scarcity.md §3."""
    assert len(sequence_up_to(bound)) == count


def test_recursive_ancestry_regression_4373():
    """4373 is the smallest prime where the recursive rule diverges from a
    static factor-universe capped at 421.

    (4373 - 1) // 4 = 1093, which is itself a coherence prime, so 4373 *is* a
    coherence prime. A frozen universe {3,..,421} wrongly rejects it because
    1093 is absent from the cap. This guards against reintroducing that bug.
    """
    assert is_coherence_prime(1093)          # the ancestor must be admitted...
    assert is_coherence_prime(4373)          # ...so the child qualifies.
    assert 4373 in sequence_up_to(5000)


def test_nth_returns_correct_elements():
    expected = [3, 5, 7, 13, 29, 53, 61, 157, 349, 421]
    for i, val in enumerate(expected, start=1):
        assert nth(i) == val


def test_nth_invalid_k_raises():
    with pytest.raises(ValueError):
        nth(0)


def test_sequence_is_strictly_ascending():
    seq = sequence_up_to(5000)
    assert seq == sorted(seq)
    assert len(seq) == len(set(seq))
