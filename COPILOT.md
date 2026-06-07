# COPILOT.md — GitHub Copilot & Ecosystem Best Practices

> *For The Interdependency — digital habits that carry over into visceral ones.*

---

## Table of Contents

1. [Working with GitHub Copilot](#1-working-with-github-copilot)
2. [Repository hygiene](#2-repository-hygiene)
3. [Branching and commit discipline](#3-branching-and-commit-discipline)
4. [Pull requests and code review](#4-pull-requests-and-code-review)
5. [Issues and project tracking](#5-issues-and-project-tracking)
6. [GitHub Actions and CI/CD](#6-github-actions-and-cicd)
7. [Security practices](#7-security-practices)
8. [Documentation as a first-class citizen](#8-documentation-as-a-first-class-citizen)
9. [The visceral dimension — being human on GitHub](#9-the-visceral-dimension--being-human-on-github)
10. [Interdependency-specific conventions](#10-interdependency-specific-conventions)

---

## 1. Working with GitHub Copilot

### Copilot as a pair programmer, not an oracle

- **Review every suggestion.** Copilot is trained on public code; it will confidently produce plausible-but-wrong completions. Read the output as carefully as you would a colleague's first draft.
- **Prompt with intent.** A comment like `# encrypt a list of integers using bijective base-p with a circular prime key` produces better completions than a blank line.
- **Keep functions small.** Copilot works best when the surrounding context is coherent. Functions under ~40 lines get sharper completions.
- **Name things well.** Descriptive variable and function names are the highest-leverage prompt engineering you can do.

### Copilot Chat

- Use `/explain` to understand unfamiliar code before modifying it.
- Use `/fix` to surface quick patches, then verify the fix makes logical sense.
- Use `/tests` to generate a first-draft test — always add edge cases by hand.
- Use `/doc` to scaffold a docstring, then fill in the *why* yourself.

### What Copilot doesn't replace

- Architectural thinking — Copilot doesn't know your system's invariants.
- Security review — treat any Copilot-generated cryptographic code as suspect until audited.
- Human judgment about trade-offs, timelines, and ethics.

---

## 2. Repository hygiene

### Every repo should have

| File | Purpose |
|------|---------|
| `README.md` | What it is, how to install, quick-start example |
| `LICENSE` | Legal clarity (AGPL-3.0-or-later + commercial, dual-licensed) |
| `.gitignore` | Keep build artifacts and secrets out of history |
| `CHANGELOG.md` | Auditable version history |
| `CONTRIBUTING.md` | Lower the barrier for collaborators |
| `pyproject.toml` | Single source of truth for package metadata |

### Keep `.gitignore` honest

Add entries *before* you accidentally commit them. Once a secret or a giant binary lands in history, it requires a destructive rewrite to remove.

### Pin versions in CI, float versions in libraries

- In `pyproject.toml` (library): use `>=` lower bounds, let pip resolve upward.
- In workflow YAML and `requirements.txt` (app): pin to exact versions (`==`) for reproducibility.

---

## 3. Branching and commit discipline

### Branch naming

```
feat/<short-description>      new capability
fix/<short-description>       bug fix
chore/<short-description>     maintenance, dependency bumps
docs/<short-description>      documentation-only changes
refactor/<short-description>  structural change, no behaviour change
```

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <imperative short summary>

[optional longer body]

[optional footer: Fixes #123]
```

Examples:
```
feat(pcea): add streaming encrypt mode for large tensors
fix(ucns): correct depth-2 witness matrix index off-by-one
chore(deps): bump aimmh-lib to 1.2.0
docs(README): add quick-start for interdependent-lib[all]
```

### The single-responsibility commit

One logical change per commit. If you need "and" in the message, split it. This makes `git bisect` and code review tractable.

---

## 4. Pull requests and code review

### Opening a PR

- Fill in the PR description template every time — it saves reviewer time.
- Link the relevant issue with `Fixes #N` or `Closes #N`.
- Mark as Draft if the work isn't ready for review; un-draft when it is.
- Keep PRs small (< 400 lines changed is a useful heuristic). Large PRs are reviewed poorly.

### Reviewing a PR

- Review the *intent* first (does this solve the right problem?), then the implementation.
- Distinguish blocking from non-blocking comments:
  - `nit:` — cosmetic, can be ignored or deferred
  - `suggestion:` — take it or leave it
  - *(no prefix)* — blocking; must be addressed before merge
- Approve when you'd be comfortable running the code in production.

### Merging

- Prefer **squash-merge** for feature branches to keep `main` history readable.
- Use **merge commit** only when the individual commits tell a story worth preserving.
- Never force-push `main` or any shared branch.

---

## 5. Issues and project tracking

### Writing a good issue

```markdown
## What happened
[Observed behavior]

## What was expected
[Desired behavior]

## Steps to reproduce
1.
2.
3.

## Environment
- Python version:
- OS:
- Package version:
```

### Labels to maintain

| Label | Color | Meaning |
|-------|-------|---------|
| `bug` | 🔴 red | Something is broken |
| `enhancement` | 🟢 green | New capability |
| `documentation` | 🔵 blue | Docs-only |
| `good first issue` | 🟣 purple | Suitable for new contributors |
| `help wanted` | 🟡 yellow | Maintainer requesting assistance |
| `wontfix` | ⚫ grey | Intentionally out of scope |

### Milestones

Use milestones to group issues into releases. A milestone titled `v0.2.0` should contain only issues that *must* ship in that version.

---

## 6. GitHub Actions and CI/CD

### Principle of least privilege

Give workflows only the permissions they need:

```yaml
permissions:
  contents: read   # default: don't give write unless the job needs it
```

Escalate per-job, not globally.

### Workflow patterns used in this repo

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `sync-libs.yml` | `workflow_dispatch` / `schedule` | Pull latest lib source from upstream repos |

### Caching

Cache pip installs and build artifacts to cut CI time:

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.cache/pip
    key: ${{ runner.os }}-pip-${{ hashFiles('**/pyproject.toml') }}
```

### Secrets management

- Store sensitive values in **Settings → Secrets and variables → Actions**.
- Never echo or log a secret, even in a debug step.
- Rotate secrets on a schedule; treat a leaked secret as already compromised.

---

## 7. Security practices

### Dependencies

- Run `pip audit` (or `safety check`) on every CI run.
- Review the diff of any dependency bump before merging a Dependabot PR.
- Avoid vendoring — it's worse than depending on a package manager.

### Code

- No `eval()`, `exec()`, or `pickle.loads()` on untrusted input.
- Cryptographic code (like PCEA) must be reviewed by a human with cryptography knowledge — do not trust Copilot-generated crypto implementations without independent verification.
- Validate all inputs at the boundary of the library (type checks, range checks).

### Secrets in code

- A secret that has ever been committed to a repo must be considered leaked — rotate it immediately.
- Use `git-secrets` or GitHub's push-protection feature to block accidental leaks.

---

## 8. Documentation as a first-class citizen

### The documentation hierarchy

```
README.md          ← orientation (what, why, install, quick-start)
CONTRIBUTING.md    ← how to help
CHANGELOG.md       ← what changed and when
docs/              ← deep reference (optional; use mkdocs or sphinx)
```

### Docstring standard

```python
def encrypt_state(state: list[int], last_state: list[int]) -> list[int]:
    """
    Encrypt *state* using *last_state* as the key schedule.

    Parameters
    ----------
    state : list[int]
        Pre-quantized integers to encrypt.
    last_state : list[int]
        Key schedule; must be non-empty.

    Returns
    -------
    list[int]
        Encrypted integers, same length as *state*.
    """
```

### README-driven development

Write the README before the code. If you can't explain what the library does in three sentences, the design isn't settled yet.

---

## 9. The visceral dimension — being human on GitHub

> The Interdependency isn't just code. These practices carry over into how we show up with each other.

### Presence over throughput

A thoughtful review that asks two genuine questions is worth more than ten shallow approvals. Slow down enough to understand what you're approving.

### Credit visibly

When a collaborator's idea improves your PR, mention it in the commit message or PR description:
```
feat(ucns): depth-7 witness pruning

Co-authored-by: [name] <email>
Inspired by the frontier discussion in #42.
```

### Disagreement is data

If you disagree with a design decision, open an issue and explain your reasoning. The conversation is the documentation. Silence is not consensus.

### Assume good intent, name bad patterns

Most confusing code was written by someone under pressure, not someone careless. Start reviews from curiosity, not suspicion. When you encounter a genuinely problematic pattern (not just style), name it clearly and explain why it matters.

### The README is a first impression

Newcomers to this organisation will land on a README before they see any code. Write it for the person who has never heard of prime-circular cryptography or the Unit Circle Number System — they may become the project's best contributor.

### Open source is care work

Triaging issues, writing docs, answering questions, and reviewing PRs are as valuable as writing new features. Acknowledge them as such.

---

## 10. Interdependency-specific conventions

| Convention | Rationale |
|------------|-----------|
| AGPL-3.0-or-later (+ commercial) on all library code | Strong copyleft with a commercial option, consistent across org |
| `wayseer@interdependentway.org` as author contact | Consistent identity for PyPI and git metadata |
| `requires-python = ">=3.9"` minimum (3.11 for async libs) | Balances modern syntax with broad deployability |
| Zero runtime dependencies in core libs | Maximises portability; optional extras for backend integrations |
| `[project.optional-dependencies]` for every external dep | Keeps the base install lightweight |
| Semantic versioning (`MAJOR.MINOR.PATCH`) | Predictable for downstream consumers |
| `CLAUDE.md` in repos that use Claude coding agents | Gives the agent per-repo context and constraints |
| `COPILOT.md` (this file) in the meta-repo | Centralized best-practices reference for the whole org |

---

*Last updated: 2026-05 — maintained in [interdependent-lib](https://github.com/The-Interdependency/interdependent-lib)*
