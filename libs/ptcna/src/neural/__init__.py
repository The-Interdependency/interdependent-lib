"""Neural layer — the only differentiable layer of PTCNA.

Neural tensors arranged as a back-propagating network (weights). Circle, seed,
and core layers consume neural tensors as auditing/timing tensors; they do not
differentiate. Migrated verbatim from The-Interdependency/pcna (core/).

The seed/circle audit aggregation has been extracted to `ptcna.seed.seed_audit`
and `ptcna.circle.circle_audit`; the neural engine delegates to them.

The prime-ring tensor is `ring_core.RingCore` (the phi/psi/omega rings). It was
renamed from the pre-consolidation `ptca_core.PTCACore` — it is a neural-layer
object, not the core layer, so it no longer carries a `ptca` token.
"""
