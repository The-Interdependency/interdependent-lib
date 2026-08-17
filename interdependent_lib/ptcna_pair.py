"""Publish and verify the exact UCNS/PTCNA compatibility pair.

Usage::

    from interdependent_lib import validate_installed_pair

    receipt = validate_installed_pair()
    assert receipt["compatibility"] == "SURVIVED"

The validator requires VCS installation metadata for both packages and rejects
moving, registry-only, editable, or otherwise unattributed installations. The
pair proves exact integration compatibility only, not architectural usefulness.
"""
from __future__ import annotations

from hashlib import sha256
from importlib import import_module
from importlib.metadata import distribution
import json
from typing import Any, Mapping

# === MODULE_BUILD ===
# id: interdependent_lib_ptcna_pair
#   module_name: ptcna_pair
#   module_kind: adapter
#   summary: publishes and fail-closed verifies the compatible exactly pinned UCNS/PTCNA producer pair
#   owner: Erin Spencer
#   public_surface: UCNS_COMMIT, PTCNA_COMMIT, PairValidationError, build_pair_receipt, validate_installed_pair
#   internal_surface: _canonical_bytes, _installed_commit
#   auth_boundary: none
#   storage_boundary: read installed distribution metadata
#   network_boundary: none
#   user_data_boundary: none
#   admin_only: false
#   tests: tests/test_ptcna_pair.py
#   rollout: explicit ptcna and all extras pinned to exact Git commits
#   rollback: remove pair exports and exact extras without modifying either producer
#   requires: ucns_ptcna_candidate_state, ptcna_ucns_integration
#   since: 0.1.5
#   unresolved: continuous seven-fold geometry, representative efficacy, production privacy
# === END MODULE_BUILD ===

# === CONTRACTS ===
# id: interdependent_pair_pins_exact_producers
#   given: the compatibility receipt is built
#   then: it names the exact merged UCNS and PTCNA commits and no moving reference
#   class: evidence
#
# id: interdependent_pair_rejects_install_drift
#   given: either installed distribution lacks matching VCS commit metadata or runtime receipt identity
#   then: validation fails before the pair is reported compatible
#   class: safety
# === END CONTRACTS ===

# === BOUNDARIES ===
# id: interdependent_pair_validation_boundary
#   summary: reads local installed-distribution identities and the PTCNA runtime receipt without network, writes, authentication, user-data, or administrative effects
#   auth_boundary: none
#   storage_boundary: read installed distribution metadata
#   network_boundary: none
#   user_data_boundary: none
#   admin_only: false
#   pii: none
#   secrets: none
#   owner: Erin Spencer
#   since: 0.1.5
# === END BOUNDARIES ===

UCNS_COMMIT = "b7b6f35cce69c273860923489a1c8b5372d14eb0"
PTCNA_COMMIT = "c5fa9a599498f19c8345f2790a0636542dfbc6a1"
UCNS_RECEIPT_SHA256 = "51aff240fb74d7183d2e004ebf0e7c65b4a613458b2ff0a83ba919eef8774b4a"


class PairValidationError(RuntimeError):
    """Raised when installed identities do not equal the published pair."""


def _canonical_bytes(value: Mapping[str, Any]) -> bytes:
    return (json.dumps(value, sort_keys=True, separators=(",", ":")) + "\n").encode()


def build_pair_receipt() -> dict[str, Any]:
    payload = {
        "schema": "interdependent-lib.ucns-ptcna-pair",
        "version": "1.0.0",
        "ucns": {"repository": "The-Interdependency/ucns", "commit": UCNS_COMMIT},
        "ptcna": {"repository": "The-Interdependency/ptcna", "commit": PTCNA_COMMIT},
        "compatibility": "SURVIVED",
        "boundaries": {
            "authority_transfer": False,
            "proof_status_transfer": False,
            "usefulness_established": False,
            "production_privacy_established": False,
        },
    }
    return {**payload, "receipt_sha256": sha256(_canonical_bytes(payload)).hexdigest()}


def _installed_commit(name: str) -> str:
    raw = distribution(name).read_text("direct_url.json")
    if raw is None:
        raise PairValidationError(f"{name} lacks exact VCS installation metadata")
    try:
        metadata = json.loads(raw)
        commit = metadata["vcs_info"]["commit_id"]
    except (KeyError, TypeError, json.JSONDecodeError) as exc:
        raise PairValidationError(f"{name} VCS metadata is invalid") from exc
    if not isinstance(commit, str) or len(commit) != 40:
        raise PairValidationError(f"{name} VCS commit is not exact")
    return commit


def validate_installed_pair() -> dict[str, Any]:
    """Fail closed unless installed metadata and runtime identities match."""

    identities = {"ucns": UCNS_COMMIT, "ptcna": PTCNA_COMMIT}
    for name, expected in identities.items():
        if _installed_commit(name) != expected:
            raise PairValidationError(f"{name} installed commit differs from published pair")
    ptcna = import_module("ptcna")
    if ptcna.UCNS_PRODUCER_COMMIT != UCNS_COMMIT:
        raise PairValidationError("PTCNA runtime names a different UCNS producer")
    if ptcna.UCNS_RECEIPT_SHA256 != UCNS_RECEIPT_SHA256:
        raise PairValidationError("PTCNA runtime names a different UCNS receipt")
    status = ptcna.require_ucns_integration()
    if not status.adapter_active:
        raise PairValidationError("PTCNA runtime did not activate the exact state")
    return build_pair_receipt()


__all__ = [
    "UCNS_COMMIT", "PTCNA_COMMIT", "UCNS_RECEIPT_SHA256",
    "PairValidationError", "build_pair_receipt", "validate_installed_pair",
]
