# Session Handoff — The Interdependency (all repos)

**Date:** 2026-06-05
**Scope:** org-wide work across the 14 in-scope repos, centered on (a) a "living-spec"
manifest system, (b) author-metadata standardization, and (c) establishing + propagating
a canonical **prime-tensor stack** architecture model.
**Author identity (canonical, use everywhere):** `Erin Patrick Spencer <wayseer@interdependentway.org>`

> How to use this: read "Current state" + "Pick up here" first. The living-spec and
> conventions sections are reference. Nothing below is blocked on understanding the
> math — it's packaging/docs/process state.

---

## 1. Current state (TL;DR)

- A **living-spec manifest tool** is now vendored + CI-gated in `ucns`, `edcmbone`, `PCEA`,
  `PTCA` (and pending in `pcna` via an open draft PR). It generates the factual block in
  each repo's `CLAUDE.md` from `pyproject.toml` + the repo tree and fails CI on drift.
- The **prime-tensor stack** is now canonically documented in
  `interdependent-lib/docs/prime-tensor-stack.md` and reconciled into `pcna`, `PTCA`,
  `edcmbone`, `ZFAE`.
- **Author metadata** standardized to the canonical identity in `ucns` + `edcmbone`
  (PCEA/PTCA were already correct).
- **Two things remain blocked on the maintainer** (see §4).

---

## 2. Merged this session (all on `main`)

| Repo | PR | What |
|------|----|------|
| skill-lib | #6 | **Canonical** `manifest` living-spec generator (`manifest/generate.py` + `SKILL.md`). Merge SHA `ddec346`. |
| ucns | #49 | Wheel packaging fix — bundle `ucns_recursive` so wheel-only `import ucns` works. |
| ucns | #50 | Wire living-spec (generated block + drift gate). |
| ucns | #51 | Author standardization → canonical identity. |
| edcmbone | #97 | Wire living-spec (uses `backend/pyproject.toml`). |
| edcmbone | #98 | Author email gmail → `wayseer@interdependentway.org`. |
| edcmbone | #99 | Prime-tensor stack cross-reference (PCNA/PCTA terms). |
| PCEA | #18 | Wire living-spec. |
| PTCA | #9 | Wire living-spec (PTCA's **first** GitHub Actions workflow). |
| PTCA | #10 | Stack-role reconciliation (layer 3: seeds → core). |
| interdependent-lib | #14 | **Canonical** `docs/prime-tensor-stack.md` + `libs/pcta/` stub. |
| pcna | #11 | Stack-role reconciliation (layer 1; inference-boundary tension flagged `hmmm`). |
| ZFAE | #5 | Stack inference-layer note (consumes weights + motion). |

All merged green. (Red `claude`/`copilot` bot checks seen during the session were
rate-limit noise, never gating.)

---

## 3. Open / in-flight

- **pcna #12 — DRAFT, intentionally held for the maintainer.** Branch `feat/package-pcna-core`.
  - Adds a root `pyproject.toml` packaging `core/` as the **`pcna`** distribution
    (deps `numpy>=1.21`; AGPL-3.0-or-later; py≥3.10; `namespaces = true` because `core/`
    is a PEP 420 namespace package with no `__init__.py`).
  - Wires the living-spec (block + drift gate + `manifest-check.yml`).
  - **Why held:** there is **no in-repo PyPI-publish workflow** (only `python-app.yml`),
    but pcna PRs show an **org-level `submit-pypi` check**. It no-ops on PRs (24s success,
    identical before/after the pyproject), so a PR is safe — but **verify the org-level
    `submit-pypi` will not auto-publish `pcna 0.1.0` on push to `main`** before merging.
  - Local verification on the branch: `--check` clean, checksum `OK`, TOML valid.

---

## 4. Pick up here (blocked on the maintainer)

1. **`pcta` repo is created but NOT in session scope.** GitHub MCP + local clone can't
   reach `the-interdependency/pcta` until it's added to the environment's allowed-repos
   list (or a new session includes it). The in-session `add_repo` tool was **not available**
   this session. Once in scope: scaffold the **greenfield seed-layer** package
   (circles → seeds, 7 circles/seed; pyproject `pcta`; AGPL; canonical author), wire the
   living-spec, add CI, cite the stack canon. **Open question:** is there existing source
   to package, or is it truly greenfield? (Assume greenfield until told otherwise.)
2. **Merge pcna #12** after the `submit-pypi` publish-path is verified.
3. **`prime-stack` extra** in `interdependent-lib` (`{pcna, pcta, ptca}`): add it **only**
   once `pcna` and `pcta` are installable/published — the repo's standing rule is
   "no library enters `[project.optional-dependencies]` until it has a stable PyPI release."
   Until then, `pcta` stays documented-only (it is intentionally NOT in `_REGISTRY`).

---

## 5. The living-spec manifest system (how to extend it)

- **Canonical source:** `The-Interdependency/skill-lib`, `manifest/generate.py` + `manifest/SKILL.md`.
  Vendored copy SHA-256 (must match exactly): `a7100dd7895270498a1562aa9f4efc485e05b14e25c9fe0421a5bf3cb3b77408`.
- **Per-repo install:** copy both files to `.agents/skills/manifest/`, pin
  `generate.py.sha256` (`sha256sum generate.py > generate.py.sha256`), insert the marker
  pair into `CLAUDE.md`:
  ```
  <!-- BEGIN GENERATED:manifest -->
  <!-- END GENERATED:manifest -->
  ```
  then `python .agents/skills/manifest/generate.py --root . --write`.
- **CI gate** (`.github/workflows/manifest-check.yml`): `sha256sum -c generate.py.sha256`
  (no local fork) **and** `generate.py --root . --check` (no drift). `permissions: contents: read`.
- **Non-root pyproject:** edcmbone packages from `backend/pyproject.toml`, so it uses
  `--pyproject backend/pyproject.toml` everywhere (write/check/CI).
- **Behavior to know:** unknown fields surface as `hmmm` / `none` rather than guesses.
  Changing version/deps/author/CI/layout **requires** re-running `--write` or the gate fails
  — that's the point (a source change forces the block to follow).
- **Wired:** ucns, edcmbone, PCEA, PTCA (pcna pending via #12). **Not yet:** pcna (in #12),
  pcta (after scope), and the rest (a0, a0ucns, eml_ucns, aimmh, interdependent-lib, ZFAE,
  ai-tiw, edcm, skill-lib) — extend where it adds value; note some have no pyproject
  (e.g. edcm, eml_ucns minimal) so the generator has nothing to read.

---

## 6. Prime-tensor stack canon (single source of truth)

`interdependent-lib/docs/prime-tensor-stack.md`:

```
PCNA (tensors + backprop) ─► weights ┐
PCTA (circles → seeds) ─┐            ├─► ZFAE (inference) ─► output
PTCA (seeds → core)  ───┴─► motion ──┘
PCEA — guardian: seals the weights / state (orthogonal; not a layer)
```

- PCNA = layer 1: creates prime-indexed tensors, owns **back-propagation** (only
  differentiable layer), 7 tensors/circle → weights.
- PCTA = layer 2: circles → seeds (7 circles/seed). **Repo forthcoming / greenfield.**
- PTCA = layer 3: seeds → core. (`ptca-lib`; `prime_core/` is its in-repo experiment.)
- ZFAE = inference (weights + motion); runtime lives in `a0`, repo stays conceptual.
- PCEA = orthogonal guardian; joins only at meta level.
- **Boundary:** back-propagation lives ONLY in PCNA; PCTA/PTCA composition is structural,
  non-differentiable. No theorem/proof/status transfers between repos.
- **Still `hmmm` (do not encode as fact):** acronym expansions (PTCA/PCNA conflict across
  repos; PCTA has none), seeds-per-core (53 vs `prime_core`'s experimental 157), the formal
  definition of "motion."

---

## 7. Conventions to preserve

- **`hmmm` doctrine:** mark unknowns `hmmm`, never guess. (Org skill: `.agents/skills/hmmm`
  / `msdmd` / `meta-module-build`.)
- **Non-transfer discipline:** naming/consuming another repo's terms transfers no
  proof/empirical status. Keep it.
- **Branches:** descriptive (`feat/…`, `fix/…`, `chore/…`, `docs/…`); PR to `main`; never
  push to `main` directly. Draft PRs, then merge after CI. Conventional Commits.
- **Commit trailer:** end commit bodies (and PR bodies) with the session URL trailer the
  harness provides for *that* session (do not reuse a previous session's id).
- **Model identity:** never put the model identifier in commits/PRs/code/comments.
- **Squash-merge** was used for clean history; respect each repo's norms.

---

## 8. Improvement backlog (prioritized — see also the maintainer review)

**Release blockers**
1. **Licenses:** almost every repo has an *interim* LICENSE (verbatim text never pasted)
   and intra-repo contradictions (edcmbone AGPL-intent vs Apache pyproject; interdependent-lib
   `__license__="Apache-2.0"` vs AGPL pyproject; a0 MIT vs BUSL; pcna headers Apache vs AGPL).
   Pick one per repo; paste real text; make pyproject + README + headers + `__license__` agree.
2. **Broken committed test files neutering CI gates:** PCEA `tests/test_contract_spec.py`
   (merge-conflict IndentationError — and it's the file the contract gate runs);
   ucns `tests/test_docs_claim_guardrail.py` (syntax error). Fix or remove.
3. **CI coverage gaps:** ucns CI skips the (broken) top-level `tests/`; aimmh has no CI
   (only FUNDING.yml) and integration-only tests; edcm/eml_ucns thin. Green should mean the
   real suite passed.

**Maintainability**
4. **Stub sprawl / duplication:** edcmbone migration limbo (`edcmbone/` + `core/` stubs +
   nested `edcmbone/edcmbone/`) shadowing canonical `backend/src/edcmbone/`; pcna's
   `core/main.py` is known-broken; **a0 and a0ucns are near-identical full copies** (double
   maintenance). Decide canonical; delete or clearly quarantine.
5. **Pin the vocabulary** (the `hmmm` list in §6) — the stack can't be canonical while its
   layer names disagree across repos.
6. **Single version truth:** e.g. edcmbone `version.py` 1.0.1 vs package 0.1.0. The living-spec
   gate is the mechanism — extend it.

**Research credibility**
7. `formal/` Lean proofs are **all `sorry`**; Theorem N is "DEFENDED — awaiting external
   review"; ZFAE consciousness-primes is falsifiable-but-untested. Get the external review;
   discharge ≥1 `sorry`.
8. **Independent crypto review** of PCEA (`cipher.py`/`codec.py`/`kdf.py`) — its own docs
   require it, and PCEA is the guardian.

**Strengths to protect:** the `hmmm` doctrine, the non-transfer boundaries, the scoped status
vocabulary, and the living-spec drift gate. Point that same "enforce in CI, single source"
mindset at licenses + versions next.

---

## 9. Per-repo quick status

| Repo | Living-spec | Notes |
|------|-------------|-------|
| skill-lib | source | Canonical skills incl. `manifest`. Merge SHA `ddec346`. |
| ucns | ✅ wired | Packaging fixed; author standardized; broken top-level test still present. |
| edcmbone | ✅ wired (backend/) | Author fixed; stack cross-ref added; license + stub-sprawl issues open. |
| PCEA | ✅ wired | `test_contract_spec.py` merge conflict still open (blocks contract gate). |
| PTCA | ✅ wired | First CI added; stack role added; `prime_core/` is experimental, not packaged. |
| pcna | ⏳ in #12 | Packaging `core/` as `pcna` (draft, held). Stack role merged. |
| interdependent-lib | — | Hosts the stack canon + `coherence_primes`. `prime-stack` extra pending. |
| ZFAE | n/a (conceptual) | Inference-layer note merged. CC-BY interim license. |
| pcta | blocked | Repo created, not in scope. Greenfield seed layer to scaffold. |
| a0 / a0ucns | — | Near-duplicate platforms — reconcile. |
| aimmh | — | No CI; integration-only tests. |
| eml_ucns | — | Early stub; bridge `eml_tree_to_ucns` unfinished. |
| edcm | — | No pyproject/CI; consolidation repo. |
| ai-tiw | n/a (archive) | Content archive; no code. |

---

## 10. Recommended first actions for the new session

1. Confirm `pcta` is in scope; if so, scaffold it (greenfield seed layer) + wire living-spec.
2. With the maintainer: verify pcna `submit-pypi` publish path → merge pcna #12.
3. Add the `prime-stack` extra to interdependent-lib once pcna + pcta are installable.
4. Then start the backlog: licenses first (§8.1), then the two broken test files (§8.2).
5. If the maintainer resolves any `hmmm` (acronyms / "motion" / seeds-per-core), propagate
   from `interdependent-lib/docs/prime-tensor-stack.md` outward to the reconciled repos.
