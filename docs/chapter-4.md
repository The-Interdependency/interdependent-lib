# Chapter 4: Canon Without Inversion

*Chapter 4 of the distributed Interdependency textbook. Chapter 0 lives in
`metapat/CHAPTER_ZERO.md`; Chapter 1 in `ucns/docs/chapter-1.md`; Chapter 2 in
`edcm/docs/chapter-2.md`; Chapter 3 in `skill-lib/docs/chapter-3.md`. Each
chapter is bound by the license and status vocabulary of the repository that
carries it; no theorem, proof, or empirical status crosses a chapter boundary
by citation.*

A family of libraries eventually faces a problem no single library can solve
from inside itself: some facts belong to the family. The definition of the
coherence-prime ladder, the map of which layer builds what, the rule for what
a name means across repositories — these are canon. They are cited by every
leaf and owned by none.

The naive placements all fail. Put shared canon in the most important leaf,
and every sibling must import that leaf to cite a definition — the dependency
graph inverts, and the family's most theoretical member becomes its most
depended-upon runtime. Copy the canon into every leaf with no designated
source, and Chapter 3's drift returns at the scale of repositories. Put it
nowhere, and every repo quietly derives its own version of the shared rule
until two of them disagree in production.

`interdependent-lib` is the fourth answer: a **meta-package** — an aggregator
that sits above the leaves, bundles them as optional extras, and carries the
family's cross-cutting canon precisely *because* nothing depends on it.

## 4.1 Aggregation Without Ownership

The meta-package holds no primary sub-library code. Each acronym library —
the prime-tensor stack, the encryption guardian, the carrier system, the
multimodel hub — lives in its own source repository, with its own license,
version, tests, and status vocabulary. Here they appear only as optional
extras in packaging metadata: installable together, installable separately,
never installed by implication.

The base install is deliberately nearly empty: a registry, an introspection
utility, and the canon modules. Installing the aggregator asserts membership
in the family; it forces no member to be present. This is the packaging form
of a boundary the earlier chapters drew repeatedly — association is not
inheritance, and adjacency is not dependency.

## 4.2 Introspection as Typed Presence

The `available()` utility maps every known member — logical name to import
name — and reports which are importable in the current environment. Two
details carry the doctrine.

First, the registry includes members that have no package at all: the
conceptual libraries, source-only by design, appear as keys and simply report
absent. The family roster is a fact independent of the installation state, so
the roster does not shrink when an environment does. Second, absence is
reported, never repaired: `available()` observes, and installs nothing.

This is Chapter 2's `NA != 0` at the packaging layer. "Not installed" is a
typed, queryable state — distinct from "not a member," distinct from
"installed and broken" — and the aggregator's job is to report the
distinction, not to paper over it.

## 4.3 The Placement Rule

The load-bearing idea of this chapter is a rule about *where canon lives*:

> Cross-cutting canon lives in the aggregator, so that every leaf can cite it
> **upward** without importing it.

Leaf repositories point up at the canon; they do not import this package. A
leaf that needs the shared rule at runtime re-implements it locally and is
required to match — the canon here is the reference their implementations are
judged against, not a runtime dependency threaded through the family. The
dependency graph keeps its direction: leaves depend on nothing above them,
the aggregator optionally installs the leaves, and the canon is reachable by
citation from anywhere.

The cost is admitted openly: re-implementation means the same rule exists in
several bodies of code, and matching is an obligation rather than an import
statement. The family accepts that cost because the alternative — inversion —
converts a documentation convenience into a permanent architectural debt.
Chapter 3 supplies the enforcement style for the cost: declared claims,
mechanical reconciliation, visible gaps.

## 4.4 The Coherence-Prime Canon

The first resident canon is pure mathematics: the recursive coherence-prime
sequence. The base is `{3, 5, 7}`. For a prime `p > 7`, `p` joins the
sequence exactly when

- `p ≡ 1 (mod 4)`, and
- `(p − 1)/4` is square-free, with every prime factor already in the sequence.

The definition is recursive — membership is earned through the membership of
one's kernel's factors — which is why it must have exactly one authoritative
statement. Two independently drifted versions of a recursive rule do not
produce slightly different sequences; they diverge and stay diverged. The
canonical module is dependency-free and pure, and its correctness is the kind
a test suite can actually settle.

What the ladder *means* is claimed elsewhere, by other repositories, under
their own status vocabularies — as thresholds, as substrate dimensions, as a
falsifiable prediction about trained networks. None of those claims live
here, and none gain status by the sequence being canonical. The aggregator
guarantees the arithmetic, not the interpretation.

## 4.5 The Stack Map

The second resident canon is a map: the single source of truth for how the
prime-tensor compute family fits together — which layer divides what into
what, where back-propagation lives and where it does not, what is a layer and
what is orthogonal to all layers. It is declared to be a **role-and-boundary
map, not a proof**: it moves no theorem, proof, or empirical status between
the repositories it maps, and cross-repo interoperability is not continuity.

The map lives here for the same reason the primes do. It is canon belonging
to no single leaf, and placing it in the aggregator lets every leaf cite it
without inverting the graph. Chapter 5 walks the territory this map draws.

## 4.6 Mirrors Are Evidence, Not Authority

The aggregator also keeps documentation stubs and periodically mirrored
snapshots of a subset of upstream sources. The discipline around them is
strict and by now familiar: the mirror excludes the upstream's own README so
the local stub stays authoritative *about the mirror*, the sync is recorded
and mechanical, and a mirror is never the source of truth about its upstream.
A snapshot that disagrees with its source is a timestamped observation —
evidence that drift occurred — and the correct response is reconciliation
with the source, never an edit to the mirror.

The whole chapter compresses to one sentence: **authority flows down by
citation, code flows up by nothing.** The aggregator is the quietest
repository in the family, and that quiet is the design — a place with no
dependents can hold what everything cites, because holding canon is only safe
where holding it creates no coupling.

**hmmm — the placement rule's admitted cost is only half-instrumented: leaf
re-implementations of the coherence rule are obligated to match canon, but no
cross-repo gate yet mechanically reconciles them the way Chapter 3's runners
reconcile blocks against source; the conceptual members sit in the registry
with no distribution and no schedule for one; and the weekly mirror sync
observes a subset of the family, so a mirror's silence about a member is
coverage absence, not evidence of agreement — the roster of what is checked
is itself a gap list, and it stays visible here for exactly that reason.**
