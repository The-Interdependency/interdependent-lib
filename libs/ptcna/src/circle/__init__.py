"""Circle layer — auditing/timing tensors: neural tensors → circles.

Every circle is itself a tensor. Non-differentiable (auditing/timing only).

The circle-audit aggregation now lives here (`circle_audit`), extracted from the
neural engine (`PCNAEngine._pcta_circle_audit`). The neural engine delegates to
it. The circle *primitive* (`ThetaTensor.circle_audit`) still lives in
`ptcna.neural.theta` — it operates on the neural theta tensor; promoting a
standalone circle tensor type is a further reconciliation step (docs/architecture.md).
"""

from .audit import circle_audit

__all__ = ["circle_audit"]
