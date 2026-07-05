#!/data/data/com.termux/files/usr/bin/bash
#
# rename-repos.sh — org-wide repo renames for The-Interdependency
# Ratified scheme: interdependent-lib/docs/naming-migration.md
#
# Runs the renames in the SAFE ORDER (casing first, a0 shuffle, PTCA->pcsa last).
# GitHub redirects renamed repo URLs, but NOT import paths or PyPI dist names —
# so this must land before any dist pins the old names.
#
# Termux setup:
#   pkg install gh git
#   gh auth login          # needs 'repo' + 'admin:org' scope to rename
#
# Usage:
#   ./rename-repos.sh --dry-run     # print what would happen, change nothing
#   ./rename-repos.sh               # interactive: confirm each rename
#   ./rename-repos.sh --yes         # no prompts (careful)
#
set -euo pipefail

ORG="The-Interdependency"

DRY_RUN=0
ASSUME_YES=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --yes|-y)  ASSUME_YES=1 ;;
    -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "unknown arg: $arg" >&2; exit 2 ;;
  esac
done

# ── The a0 shuffle needs a parking name for the CURRENT a0 repo. ──────────────
# The migration doc leaves this open (hmmm). Set it deliberately before running
# the a0 section, or the script will stop and ask.
A0_LEGACY_NAME="${A0_LEGACY_NAME:-}"   # e.g. a0-legacy, a0-v1, a0-archive

# ── helpers ──────────────────────────────────────────────────────────────────
c_green() { printf '\033[32m%s\033[0m\n' "$*"; }
c_yellow(){ printf '\033[33m%s\033[0m\n' "$*"; }
c_red()   { printf '\033[31m%s\033[0m\n' "$*"; }

need() { command -v "$1" >/dev/null 2>&1 || { c_red "missing: $1 (pkg install $1)"; exit 1; }; }
need gh
need git

gh auth status >/dev/null 2>&1 || { c_red "not logged in — run: gh auth login"; exit 1; }

repo_exists() { gh repo view "$ORG/$1" >/dev/null 2>&1; }

confirm() {
  [ "$ASSUME_YES" = 1 ] && return 0
  local ans
  read -r -p "  proceed? [y/N] " ans
  [ "$ans" = y ] || [ "$ans" = Y ]
}

# rename OLD -> NEW, but only if OLD exists and NEW does not.
# GitHub repo names are case-insensitive, so a pure-casing rename (PCEA->pcea)
# is applied via a two-hop through a temp name to force the stored casing.
rename_repo() {
  local old="$1" new="$2" note="${3:-}"
  echo
  c_yellow "── $old  →  $new ${note:+($note)}"

  if repo_exists "$new" && ! repo_exists "$old"; then
    c_green "  already done (only '$new' exists) — skip"; return 0
  fi
  if ! repo_exists "$old"; then
    c_red "  source '$old' not found — skip (check the name / already renamed?)"; return 0
  fi
  if repo_exists "$new" && [ "${old,,}" != "${new,,}" ]; then
    c_red "  target '$new' ALREADY EXISTS and differs from '$old' — refusing to clobber"; return 1
  fi

  # pure-casing change: same name ignoring case -> two-hop
  if [ "${old,,}" = "${new,,}" ] && [ "$old" != "$new" ]; then
    local tmp="${new}-casingtmp-$$"
    echo "  casing-only: $old -> $tmp -> $new"
    if [ "$DRY_RUN" = 1 ]; then c_green "  [dry-run] would two-hop via $tmp"; return 0; fi
    confirm || { echo "  skipped"; return 0; }
    gh repo rename "$tmp" --repo "$ORG/$old" --yes
    gh repo rename "$new" --repo "$ORG/$tmp" --yes
    c_green "  renamed (casing) -> $new"
    return 0
  fi

  echo "  gh repo rename $new --repo $ORG/$old"
  if [ "$DRY_RUN" = 1 ]; then c_green "  [dry-run] would rename"; return 0; fi
  confirm || { echo "  skipped"; return 0; }
  gh repo rename "$new" --repo "$ORG/$old" --yes
  c_green "  renamed -> $new"
}

c_yellow "== The-Interdependency repo renames =="
[ "$DRY_RUN" = 1 ] && c_yellow "   (DRY RUN — no changes)"
echo "   FROZEN, not renamed: ucns (DOI 10.5281/zenodo.20665340)"
echo "   keep as-is:          pcna, pcta"

# ── 1. casing-only / punctuation renames (lowest risk) ───────────────────────
rename_repo PCEA     pcea      "casing"
rename_repo ZFAE     zfae      "casing; conceptual repo, runtime in a0"
rename_repo METAPAT  metapat   "casing; FLAR"
rename_repo eml_ucns eml-ucns  "underscore->hyphen; archive instead if defunct"

# ── 2. the a0 shuffle: free 'a0', then promote a0-betatest ───────────────────
echo
c_yellow "── a0 shuffle"
if repo_exists a0-betatest || repo_exists a0; then
  if [ -z "$A0_LEGACY_NAME" ]; then
    c_red "  A0_LEGACY_NAME is unset — the current 'a0' needs a parking name."
    c_red "  Re-run with:  A0_LEGACY_NAME=a0-legacy ./rename-repos.sh"
    c_red "  (skipping a0 shuffle for now)"
  else
    rename_repo a0          "$A0_LEGACY_NAME" "park the old a0"
    rename_repo a0-betatest a0                "promote betatest to canonical a0"
  fi
else
  c_green "  neither a0 nor a0-betatest present — skip"
fi

# ── 3. PTCA -> pcsa (LAST — rewrites import paths + needs a new PyPI dist) ────
echo
c_yellow "── PTCA -> pcsa  (do this LAST)"
c_red "  Reminder: after this rename, publish a NEW dist 'pcsa' and ABANDON"
c_red "  'ptca-lib' (never re-release it). Update interdependent-lib extras,"
c_red "  _REGISTRY, docs/prime-tensor-stack.md, and libs/ptca/ in the same PR."
rename_repo PTCA pcsa "seed/core stratum; new dist supersedes ptca-lib"

echo
c_green "== done =="
echo "Renamed repo URLs redirect automatically. Next, in code:"
echo "  - interdependent-lib: add pcsa extra + prime-stack; keep ptca alias 1 minor"
echo "  - pcna: core/ -> pcna/ package rename; ptca_core.py -> pcsa_core.py"
echo "  - sweep docs/tables to pcsa only after 'pcsa' exists on PyPI"
