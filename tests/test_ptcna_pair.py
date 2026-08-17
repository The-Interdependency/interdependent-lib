"""Tests for the exactly pinned UCNS/PTCNA compatibility pair."""

import json

import pytest

import interdependent_lib.ptcna_pair as pair

# === CHECKS ===
# id: check_interdependent_pair_exact
#   proves: interdependent_pair_pins_exact_producers
#   call: self::test_pair_receipt_is_exact_and_deterministic
#   requires: python3
#   timeout: 10
#   mutates: none
#   cleanup: none
#
# id: check_interdependent_pair_drift
#   proves: interdependent_pair_rejects_install_drift
#   call: self::test_installed_pair_rejects_unattributed_install
#   requires: python3
#   timeout: 10
#   mutates: none
#   cleanup: none
# === END CHECKS ===


class _Distribution:
    def __init__(self, commit: str | None) -> None:
        self.commit = commit

    def read_text(self, name: str) -> str | None:
        assert name == "direct_url.json"
        if self.commit is None:
            return None
        return json.dumps({"vcs_info": {"commit_id": self.commit}})


def test_pair_receipt_is_exact_and_deterministic() -> None:
    first = pair.build_pair_receipt()
    assert first == pair.build_pair_receipt()
    assert first["ucns"]["commit"] == pair.UCNS_COMMIT
    assert first["ptcna"]["commit"] == pair.PTCNA_COMMIT
    assert first["compatibility"] == "SURVIVED"
    assert first["boundaries"]["usefulness_established"] is False


def test_installed_pair_validates_runtime(monkeypatch: pytest.MonkeyPatch) -> None:
    commits = {"ucns": pair.UCNS_COMMIT, "ptcna": pair.PTCNA_COMMIT}
    monkeypatch.setattr(pair, "distribution", lambda name: _Distribution(commits[name]))
    status = type("Status", (), {"adapter_active": True})()
    runtime = type(
        "Runtime",
        (),
        {
            "UCNS_PRODUCER_COMMIT": pair.UCNS_COMMIT,
            "UCNS_RECEIPT_SHA256": pair.UCNS_RECEIPT_SHA256,
            "require_ucns_integration": staticmethod(lambda: status),
        },
    )()
    monkeypatch.setattr(pair, "import_module", lambda name: runtime)
    assert pair.validate_installed_pair()["compatibility"] == "SURVIVED"


@pytest.mark.parametrize("name", ["ucns", "ptcna"])
def test_installed_pair_rejects_drift(
    monkeypatch: pytest.MonkeyPatch, name: str
) -> None:
    commits = {"ucns": pair.UCNS_COMMIT, "ptcna": pair.PTCNA_COMMIT}
    commits[name] = "0" * 40
    monkeypatch.setattr(pair, "distribution", lambda key: _Distribution(commits[key]))
    with pytest.raises(pair.PairValidationError, match="differs"):
        pair.validate_installed_pair()


def test_installed_pair_rejects_unattributed_install(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(pair, "distribution", lambda _name: _Distribution(None))
    with pytest.raises(pair.PairValidationError, match="lacks exact VCS"):
        pair.validate_installed_pair()
