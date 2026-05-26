"""Tests for the repo-local `hmmm` skill contract."""

from pathlib import Path


SKILL_PATH = Path('.agents/skills/hmmm/SKILL.md')
README_PATH = Path('.agents/skills/README.md')


def _read(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def test_hmmm_skill_is_registered_in_skills_readme():
    text = _read(README_PATH)
    assert "- `hmmm/` — mandatory unresolved-constraint boundary object" in text


def test_hmmm_skill_declares_required_frontmatter_fields():
    text = _read(SKILL_PATH)
    assert text.startswith("---\n")
    assert "name: hmmm" in text
    assert "description: Mandatory boundary object for unresolved constraints." in text


def test_hmmm_skill_includes_required_object_contract_fields():
    text = _read(SKILL_PATH)
    required_fields = (
        "- `id`: stable snake_case identifier.",
        "- `layer`: scope boundary",
        "- `claim`: concise statement being held open.",
        "- `constraint`: what blocks closure.",
        "- `evidence`: current support state",
        "- `next_test`: the next falsification or validation step.",
        "- `owner`: accountable role/person/agent.",
        "- `status`: one of `OPEN`, `TESTING`, `DEFENDED`, `RETRACTED`.",
        "- `updated_at`: ISO date.",
        "- `closure_criteria`: explicit condition that permits status promotion.",
    )
    for field in required_fields:
        assert field in text


def test_hmmm_skill_requires_explicit_non_empty_delivery_boundary():
    text = _read(SKILL_PATH)
    assert "Every substantial deliverable should end with an explicit `hmmm` boundary section." in text
    assert "If none exist: include a non-empty \"no unresolved constraints\" boundary note." in text
    assert "Empty boundary sections are not allowed." in text


def test_hmmm_skill_allows_non_empty_boundary_payload_modes():
    text = _read(SKILL_PATH)
    for mode in (
        "- informative,",
        "- apropos (context-relevant),",
        "- humorous,",
        "- cogent non sequitur, or",
        "- random filler text.",
    ):
        assert mode in text
