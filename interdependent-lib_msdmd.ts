import { defineMsdmdCollection } from "./.agents/skills/msdmd/collection";

export default defineMsdmdCollection({
  "declarations": [
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_validate, infer_kind, _discover_repo_roots, _load_parser",
        "module_kind": "instrument",
        "module_name": "runner",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "scan, ModuleGraph, Node, main",
        "requires": "none",
        "rollback": "remove runner.py; the msdmd universal parser it builds on is unaffected",
        "rollout": "default_enabled (CLI + importable library on the meta-module-build skill)",
        "since": "2026-06-02",
        "storage_boundary": "read",
        "summary": "walks repo roots, parses MODULE_BUILD blocks, emits module-graph + coverage",
        "tests": "tests.test_module_build_runner",
        "unresolved": "visualizer wiring (e.g. a0 SigmaCore) intentionally out of scope for v1",
        "user_data_boundary": "none"
      },
      "file": ".agents/skills/meta-module-build/runner.py",
      "id": "meta_module_build_runner"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_build_up_to, _is_prime, _is_squarefree, _prime_factors",
        "module_kind": "engine",
        "module_name": "coherence_primes",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "is_coherence_prime, sequence_up_to, nth",
        "requires": "none",
        "rollback": "remove this module and its three package-root re-exports",
        "rollout": "default_enabled (re-exported from interdependent_lib package root)",
        "since": "2026-06-02",
        "summary": "canonical recursive coherence-prime sequence registry (single source of truth)",
        "tests": "tests.test_coherence_primes",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "interdependent_lib/coherence_primes.py",
      "id": "coherence_primes"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_validate_seed, _contributors, _encrypt_element, _decrypt_element",
        "module_kind": "engine",
        "module_name": "cipher",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "encrypt_seed, decrypt_seed, encrypt_state, decrypt_state, CIRCLE_COUNT, TENSOR_COUNT, DEFAULT_WORD_BITS",
        "requires": "pcea_codec, pcea_kdf, pcea_primes",
        "rollback": "remove module and its references",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "prime-circular Mobius disk cipher: fixed-width base-p digit encode with SHA-256 keyed additive shift",
        "tests": "tests.test_cipher",
        "unresolved": "security-critical module; changes require independent crypto review",
        "user_data_boundary": "none"
      },
      "file": "libs/pcea/src/cipher.py",
      "id": "pcea_cipher"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "adapter",
        "module_name": "codec",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "mobius_encode, mobius_decode, digit_count, to_fixed, from_fixed",
        "requires": "none",
        "rollback": "remove module and its references",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Mobius disk codec: signed<->unsigned position mapping and fixed-width base-p digit encoding",
        "tests": "tests.test_codec",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/pcea/src/codec.py",
      "id": "pcea_codec"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "schema",
        "module_name": "contract",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "DECISION, SECURITY_INVARIANT, FORBIDDEN_UCNS_SYMBOLS, RUNTIME_MODULES, contract_statement",
        "requires": "none",
        "rollback": "remove module and its references",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "PCEA<->UCNS interface-contract constants and guardrails (single source of truth)",
        "tests": "tests.test_contract_spec",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/pcea/src/contract.py",
      "id": "pcea_contract"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_zero_seed",
        "module_kind": "service",
        "module_name": "instance",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "PCEAInstance",
        "requires": "pcea_cipher",
        "rollback": "remove module and its references",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "stateful PCEA session that auto-advances last_state so sender/receiver stay synchronized",
        "tests": "tests.test_instance",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/pcea/src/instance.py",
      "id": "pcea_instance"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "kdf",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "key_stream",
        "requires": "none",
        "rollback": "remove module and its references",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "hash-based key-stream derivation keyed by hierarchical address plus heptagram neighbors",
        "tests": "tests.test_kdf",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/pcea/src/kdf.py",
      "id": "pcea_kdf"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_sieve",
        "module_kind": "schema",
        "module_name": "primes",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "prime_at, PRIME_CIRCLE, CIRCLE_SIZE",
        "requires": "none",
        "rollback": "remove module and its references",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "fixed 53-prime circle used as the circular bases for prime-circular base encryption",
        "tests": "tests.test_primes",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/pcea/src/primes.py",
      "id": "pcea_primes"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_build_coherence_up_to, _is_prime, _prime_factors",
        "module_kind": "engine",
        "module_name": "constants",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "SEED_COUNT, CIRCLES_PER_SEED, TENSORS_PER_CIRCLE, TENSOR_DIM, TENSOR_LEAVES, PARAM_COUNT, CIRCLE_ROUTING_STEP, SEED_ROUTING_STEP, is_coherence_prime",
        "requires": "coherence_primes (mirrored from interdependent_lib, not imported \u2014 would invert the dependency graph)",
        "rollback": "revert is_coherence_prime to the prior frozen-universe implementation",
        "rollout": "default_enabled (imported by prime_core.core via prime_core.__init__)",
        "since": "2026-06-02 (manifest added; module predates the doctrine)",
        "storage_boundary": "none",
        "summary": "frozen PTCA composition counts plus the recursive coherence-prime guard",
        "tests": "prime_core.tests.test_constants_coherence_prime",
        "unresolved": "composition counts SEED_COUNT/TENSOR_DIM remain provisional pending the absent canon documents",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/core/prime_core/constants.py",
      "id": "prime_core_constants"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "edcm",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "compute_metrics, check_directives, check_alerts, delta_between, METRIC_NAMES, ALERT_HIGH, ALERT_LOW, DIRECTIVES",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Six-family EDCM coherence metrics (cm, da, drift, dvg, int_val, tbf) computed from response text, with alert thresholds and corrective directive firing.",
        "tests": "tests/test_edcm_engine.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/edcm.py",
      "id": "pcna_edcm"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "instrument",
        "module_name": "helix_vis",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "generate_helix_data, visualize",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "write",
        "summary": "Visualizes the spectral state of a 7-seed Meta Router by plotting the complex descriptor Z over a simulated trajectory and saving an animation.",
        "tests": "hmmm",
        "unresolved": "saves to hardcoded pcna_helix.gif with no config (Known Issues)",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/helix_vis.py",
      "id": "pcna_helix_vis"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "seed_instance",
        "module_kind": "service",
        "module_name": "main",
        "network_boundary": "external",
        "owner": "Erin Spencer",
        "public_surface": "app, PCNASeed, health, topology, receive_delta, startup, shutdown, tick_loop",
        "requires": "pcna_topology, pcna_tensor_engine",
        "rollback": "do not launch this process; use root-level main.py seed runner instead",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Minimal FastAPI seed-runner process (compute/meta/sentinel/global) exposing health/topology/receive_delta routes with an aiohttp networking placeholder.",
        "tests": "hmmm",
        "unresolved": "BROKEN alt entry point \u2014 imports from non-existent src.core.* (do not use per CLAUDE.md)",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/main.py",
      "id": "pcna_core_main"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_recompute_hub_avg, _reset",
        "module_kind": "engine",
        "module_name": "memory_core",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "MemoryCore",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Parameterized in-memory ring (long-term N=19/seed=19, short-term N=17/seed=17) with round-robin write, content-addressed query, and flush_to() transfer on positive reward.",
        "tests": "hmmm",
        "unresolved": "query() is defined but never called anywhere (Known Issues)",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/memory_core.py",
      "id": "pcna_memory_core"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_fed_avg, _blend_core",
        "module_kind": "engine",
        "module_name": "merge",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "InstanceMerge",
        "requires": "pcna_ring_core, pcna_pcna",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Stateless multi-instance merge operator for PCNAEngine meshes with three modes (absorb, fork, converge) via federated averaging; all output dicts use theta_* keys.",
        "tests": "hmmm",
        "unresolved": "fork() time-seeds its RNG \u2014 rapid calls may collide (Known Issues)",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/merge.py",
      "id": "pcna_merge"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_tensor_to_b64, _b64_to_tensor, _CHECKPOINT_DIR, PCNAEngine._project, PCNAEngine._inject, PCNAEngine._propagate, PCNAEngine._seed_audit, PCNAEngine._circle_audit, PCNAEngine._coherence_score",
        "module_kind": "engine",
        "module_name": "pcna",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "PCNAEngine, RING_WEIGHTS, WINNER_RINGS",
        "requires": "pcna_ring_core, pcna_memory_core, pcna_theta",
        "rollback": "remove import and call sites; checkpoints under .checkpoints/ can be deleted",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "write",
        "summary": "Six-ring PCNA inference engine (phi/psi/omega/theta/memory_l/memory_s) running project->inject->propagate->seed-audit->circle-audit->coherence, with RING_WEIGHTS scoring and numpy checkpointing.",
        "tests": "hmmm",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/pcna.py",
      "id": "pcna_pcna"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_adj_distances, RingCore._adjacents, _propagate_node, _recompute_coherence",
        "module_kind": "engine",
        "module_name": "ring_core",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "RingCore, DIMS, PHASES, HEPT_SITES",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Base prime-ring tensor (shape [N,DIMS=4,PHASES=7,HEPT_SITES=7]) with heptagram Euler-step propagation and coherence = 1 - |ring - hub|_mean; substrate for Phi/Psi/Omega/Sigma.",
        "tests": "hmmm",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/ring_core.py",
      "id": "pcna_ring_core"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "worker",
        "module_name": "routing_loop",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "GlobalRouterZero",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Intended GlobalRouterZero routing loop worker \u2014 currently only a print stub that announces initialization.",
        "tests": "hmmm",
        "unresolved": "only a print stub \u2014 GlobalRouterZero not implemented (Known Stubs)",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/routing_loop.py",
      "id": "pcna_routing_loop"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_sigma, SigmaRing._core, SigmaRing._watched, SigmaRing._pending, SigmaRing._last_check",
        "module_kind": "engine",
        "module_name": "sigma",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "SigmaRing, get_sigma, N, SEED",
        "requires": "pcna_ring_core",
        "rollback": "remove import and call sites; callers already degrade gracefully if it raises",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "read",
        "summary": "N=41 filesystem observer ring wrapping RingCore; tracks watched file mtimes and drains content-changed events on a content_interval cadence, injecting coherence into Psi.",
        "tests": "hmmm",
        "unresolved": "structural_interval is stored but never acted on (Known Issues)",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/sigma.py",
      "id": "pcna_sigma"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "tensor_engine",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "TensorState, MarkovRecursion",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Tensor engine primitives \u2014 TensorState (E[a,t,m,c]) with spectral descriptor Z = Sum E.e^(i*theta), and a MarkovRecursion updater that enforces approximate mass conservation.",
        "tests": "tests/test_tensor_engine.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/tensor_engine.py",
      "id": "pcna_tensor_engine"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_gen_instance_id, _derive_key_id, _compute_blueprint_hash, _shard_blueprint, ThetaTensor._recompute_coherence",
        "module_kind": "engine",
        "module_name": "theta",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "ThetaTensor, GATE_THRESHOLD, N",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "N=29 standalone microkernel gate ring with ragged per-node circle counts, SHA-256 blueprint sharding, and gate control via GATE_THRESHOLD=0.45.",
        "tests": "hmmm",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/theta.py",
      "id": "pcna_theta"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_initialize_topology, _heptagram_neighbors",
        "module_kind": "engine",
        "module_name": "topology",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "PCNATopology, Seed, SeedRole",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Stable seed-id topology \u2014 maps compute-shard neighbors to global seed IDs, computes heptagram neighbors and sentinel scan paths, and serializes to JSON for HTTP responses.",
        "tests": "tests/tests_topology.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/topology.py",
      "id": "pcna_topology"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_get_default_pcna, ZetaEngine._coherence_from_metrics, ZetaEngine._sigma_nudge_factors, ZetaEngine._theta_gate_factor",
        "module_kind": "engine",
        "module_name": "zeta",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "ZetaEngine, _zeta_engine",
        "requires": "pcna_edcm, pcna_pcna, pcna_sigma",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "ZFAE evaluator that scores each assistant response via EDCM (no LLM) and nudges PCNAEngine.phi, with per-directory resolution control and a module-level singleton.",
        "tests": "hmmm",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/neural/zeta.py",
      "id": "pcna_zeta"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_build_coherence_up_to, _is_prime, _prime_factors",
        "module_kind": "engine",
        "module_name": "constants",
        "network_boundary": "none",
        "owner": "Erin Patrick Spencer",
        "public_surface": "NOMINAL_CIRCLES_PER_SEED, SEED_ROUTING_STEP, HEPTAGRAM_VERTICES, is_coherence_prime, coherence_primes_up_to, nth_coherence_prime",
        "requires": "coherence_primes (mirrored from interdependent_lib, NOT imported \u2014 importing the aggregator would invert the dependency graph)",
        "rollback": "none (greenfield module; revert the file)",
        "rollout": "default_enabled (imported by pcta.compose via pcta.__init__)",
        "since": "2026-06-05 (greenfield scaffold of the layer-2 seed package)",
        "storage_boundary": "none",
        "summary": "layer-2 heptagram routing motif and the recursive coherence-prime guard (composition counts are variable)",
        "tests": "tests.test_constants",
        "unresolved": "none (PCTA acronym, variable-count rule, and \"motion\" = Fickian flux J = \u2212D \u2207\u03c6 all resolved by maintainer)",
        "user_data_boundary": "none"
      },
      "file": "libs/ptcna/src/seed/constants.py",
      "id": "pcta_constants"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "adapter",
        "module_name": "a0_safe",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "identity, describe, canonical, factor, UCNSObjectRecord, FactorizationResult",
        "requires": "ucns_object_record, ucns_factorization_result, ucns_serialization, ucns_canonical",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "A0-safe public facade for inspecting, identifying, canonicalizing, and factoring UCNS objects via evidence-bearing scoped envelopes.",
        "tests": "ucns_recursive/tests/test_a0_safe.py, tests/test_certified_negative_results.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/a0_safe.py",
      "id": "ucns_a0_safe"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_object_to_data, _object_from_data, _require",
        "module_kind": "adapter",
        "module_name": "bridge",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "BRIDGE_SCHEMA, BRIDGE_SCHEMA_VERSION, BridgeValidationError, BridgeImport, export_bridge_record, import_bridge_record",
        "requires": "ucns_canonical, ucns_serialization",
        "rollback": "remove module and its re-exports; sibling adapters fall back to repo-local encodings",
        "rollout": "default_enabled additive public API; sibling repos consume the record shape, not UCNS internals",
        "since": "2026-07-12",
        "storage_boundary": "none",
        "summary": "Versioned neutral bridge record plus fail-closed import/export adapter between actual UCNSObjects and sibling repositories, preserving equality and stable hash and carrying provenance without theorem status.",
        "tests": "tests/test_bridge_round_trip.py, tests/test_stack_contract_suite.py, tests/test_bridge_certification_boundary.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/bridge.py",
      "id": "ucns_bridge"
    },
    {
      "block": "CONTRACTS",
      "fields": {
        "call": "contracts.test_addition_boundary.contract_addition_boundary",
        "class": "correctness",
        "given": "the derived candidate addition (top-level sequence concatenation)",
        "then": "no second primitive operation exists in the base geometry; r is"
      },
      "file": "libs/ucns/src/canonical.py",
      "id": "addition_boundary"
    },
    {
      "block": "CONTRACTS",
      "fields": {
        "call": "contracts.test_associativity_triples.contract_multiply_associativity",
        "class": "correctness",
        "given": "TRIPLES of normalized objects at mixed depths, including",
        "then": "multiply(multiply(a, b), c) == multiply(a, multiply(b, c));"
      },
      "file": "libs/ucns/src/canonical.py",
      "id": "multiply_associativity"
    },
    {
      "block": "CONTRACTS",
      "fields": {
        "call": "contracts.test_commutator.contract_multiply_commutativity_ruling",
        "class": "correctness",
        "given": "normalized objects; the separating witnesses B1 = [0,1] and",
        "then": "multiply is non-commutative in general; the (r, theta, z, w)"
      },
      "file": "libs/ucns/src/canonical.py",
      "id": "multiply_commutativity_ruling"
    },
    {
      "block": "CONTRACTS",
      "fields": {
        "call": "contracts.test_identity_two_sided.contract_multiply_identity",
        "class": "correctness",
        "given": "the theta=0 origin e = UCNSObject(1, 1, [(0, None)], [0]) and",
        "then": "multiply(e, a) == a and multiply(a, e) == a (two-sided, checked"
      },
      "file": "libs/ucns/src/canonical.py",
      "id": "multiply_identity"
    },
    {
      "block": "CONTRACTS",
      "fields": {
        "call": "contracts.test_multiply_canonical.contract_multiply_well_defined",
        "class": "correctness",
        "given": "normalized nonempty UCNSObjects at mixed depths, plus gauge-shifted",
        "then": "multiply is total, its output is normalized with n_dec a multiple of"
      },
      "file": "libs/ucns/src/canonical.py",
      "id": "multiply_well_defined"
    },
    {
      "block": "CONTRACTS",
      "fields": {
        "call": "contracts.test_structure_axioms.contract_structure_naming",
        "class": "correctness",
        "given": "obligations O1-O5 discharged (well-definedness, identity,",
        "then": "(nonempty normalized objects, multiply, e) is a non-commutative,"
      },
      "file": "libs/ucns/src/canonical.py",
      "id": "structure_naming"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "normalize, _compute_n_min, _star, _disk_flip",
        "module_kind": "engine",
        "module_name": "canonical",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "UCNSObject, multiply, is_unit, is_multiplicative_unit, lcm, UNIT",
        "requires": "none",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Core UCNS algebraic objects and operations - UCNSObject, the ordered-concatenation product, and unit predicates.",
        "tests": "ucns_recursive/tests/test_depth2_full_domain.py, ucns_recursive/tests/test_canonical_constructor_validation.py, tests/test_canonical_constructor_validation.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/canonical.py",
      "id": "ucns_canonical"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "service",
        "module_name": "canonical_factorization",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "enumerate_factorizations, canonical_factorization, canonical_key, SEQ_PRIME",
        "requires": "ucns_carrier_support_pruning",
        "rollback": "remove module and its re-exports",
        "rollout": "additive module; no existing surface modified",
        "since": "2026-06-10",
        "storage_boundary": "none",
        "summary": "Deterministic canonical choice among all catalogue-bounded left-factor factorizations of P, selected by lexicographic canonical-bytes order over a v0.6-complete enumeration.",
        "tests": "ucns.tests.test_canonical_factorization",
        "unresolved": "canonical selection under payload-catalogue (factor_search_v08) semantics",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/canonical_factorization.py",
      "id": "ucns_canonical_factor_selection"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_obj_key",
        "module_kind": "engine",
        "module_name": "catalogue",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "build_catalogue_d1, build_catalogue_d2_oracle",
        "requires": "ucns_canonical, ucns_domains",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Catalogue builders enumerating canonical depth-1 oracle atoms and depth-2 oracle-class UCNSObjects for factor decomposition.",
        "tests": "tests.test_catalogue, tests.test_oracle_catalogue_equivalence",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/catalogue.py",
      "id": "ucns_catalogue"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_required_catalogue_for_domain, _structural_tokens",
        "module_kind": "engine",
        "module_name": "catalogue_coverage",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "CatalogueCoverage, CATALOGUE_COVERAGE_RULE_VERSION, COVERAGE_CANONICAL_EXACT, COVERAGE_CANONICAL_SUPERSET, COVERAGE_UNCERTIFIED, check_catalogue_coverage, validate_catalogue_coverage, coverage_matches_search_report",
        "requires": "ucns_domains, ucns_factor_search_v08, ucns_serialization",
        "rollback": "remove module and public re-exports",
        "rollout": "additive evidence surface; no FactorizationResult integration",
        "since": "2026-07-11",
        "storage_boundary": "none",
        "summary": "Recomputable catalogue-coverage records bound to an exact supplied catalogue fingerprint, domain label, and required catalogue rule version; makes no primality-certification claim.",
        "tests": "tests/test_catalogue_coverage.py",
        "unresolved": "negative-result certification deliberately remains separate",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/catalogue_coverage.py",
      "id": "ucns_catalogue_coverage"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_recursive_obj_key",
        "module_kind": "engine",
        "module_name": "catalogue_d3",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "is_in_oracle_class_d3, D3CatalogueResult, build_catalogue_d3_oracle",
        "requires": "ucns_canonical, ucns_domains, ucns_catalogue",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "DRAFT depth-3 oracle-class predicate and bounded catalogue enumerator (build_catalogue_d3_oracle) carrying a coverage attestation against Lemma 8.",
        "tests": "ucns.tests.test_catalogue_d3",
        "unresolved": "DRAFT - depth-3 constructive-vs-multiplicative D'' coverage equivalence, payload_basis/chirality interaction, and size-budget exhaustion gating are all unproven (hmmm A/B/C in module docstring)",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/catalogue_d3.py",
      "id": "ucns_catalogue_d3"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "service",
        "module_name": "catalogue_pruning",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "PAYLOAD_PRUNING_RULE_NAME, PAYLOAD_PRUNING_RULE_VERSION, PAYLOAD_PRUNING_PRESERVES_COVERAGE, prime_support, carrier_lcm, prune_catalogue, payload_support, prune_payload_catalogue",
        "requires": "none",
        "rollback": "pass prune=False to factor_search_v08, or remove the module and the prune kwarg",
        "rollout": "prune_catalogue opt-in for left-factor catalogues; prune_payload_catalogue default-on inside factor_search_v08 (prune=False escape hatch)",
        "since": "2026-06-09",
        "storage_boundary": "none",
        "summary": "Sound named and versioned catalogue pre-filter removing factor candidates whose carrier prime support escapes the product carrier's prime support, justified by the Carrier-LCM Law.",
        "tests": "ucns.tests.test_catalogue_pruning, tests/test_factor_search_provenance.py, tests/test_certified_negative_results.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/catalogue_pruning.py",
      "id": "ucns_carrier_support_pruning"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "core",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "UCN, TAU",
        "requires": "none",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Defines UCN, the fundamental angle-on-unit-circle numeric primitive with group arithmetic, similarity, and compact serialization.",
        "tests": "tests.test_core",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/core.py",
      "id": "ucns_core"
    },
    {
      "block": "CONTRACTS",
      "fields": {
        "call": "contracts.test_quotient_solvability.contract_division_theory",
        "class": "correctness",
        "given": "normalized nonempty A, P (left) or B, P (right) of finite depth",
        "then": "left_quotients/right_quotients return exactly the set of X over"
      },
      "file": "libs/ucns/src/division_theory.py",
      "id": "division_theory"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "left_quotients, right_quotients, _left_payload_solutions, _right_payload_solutions, _dedup",
        "module_kind": "engine",
        "module_name": "division_theory",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "none",
        "requires": "ucns_canonical",
        "rollback": "keep ucns.left_quotient greedy primitives as the standing surface",
        "rollout": "this IS \"division and the like\"; importable, not re-exported from ucns/__init__",
        "since": "2026-07-10",
        "storage_boundary": "none",
        "summary": "left/right quotient solvability and multiplicity for multiply - complete finite solution-set enumeration",
        "tests": "contracts.test_quotient_solvability",
        "unresolved": "none for enumeration; AlignedComplete cancellativity proof remains a formal/ obligation",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/division_theory.py",
      "id": "division_theory"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "domain_status",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "DomainProofStatus, DomainStatusMetadata, VERIFIED_DOMAIN_LABELS, domain_status_metadata, status_for_object, is_verified_domain_label, seq_prime_requires_scope",
        "requires": "ucns_canonical",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Typed domain-level prerequisite metadata; bare labels never certify SEQ-PRIME, and result-level certainty is delegated to ucns.factorization_result.",
        "tests": "ucns_recursive/tests/test_domain_status.py, tests/test_certified_negative_results.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/domain_status.py",
      "id": "ucns_domain_status"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_generate_canonical_catalogue, _oracle_atom_key, _CANONICAL_ORACLE_KEYS",
        "module_kind": "engine",
        "module_name": "domains",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "DEPTH_MAX, A_PLUS_MAX, N_MIN_MAX, S2, ORACLE_ATOM_PAYLOADS, ORACLE_CATALOGUE_RULE_VERSION, generate_payload_catalogue, in_domain, depth_of, is_oracle_atom, is_in_oracle_class, verified_domain_status",
        "requires": "ucns_canonical",
        "rollback": "restore geometric-bounds oracle classification (reintroduces catalogue mismatch)",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Defines the frozen depth-2 geometry, canonical oracle catalogue, and exact catalogue-membership predicates used to scope oracle claims.",
        "tests": "tests/test_oracle_catalogue_equivalence.py, ucns_recursive/tests/test_depth2_full_domain.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/domains.py",
      "id": "ucns_domains"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_to_signal",
        "module_kind": "engine",
        "module_name": "embedding",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "UCNEmbedding",
        "requires": "ucns_epicycle",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "High-level UCNS embedding API that encodes data to unit-circle phase vectors via epicycle/FFT decomposition and compares them.",
        "tests": "tests.test_embedding",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/embedding.py",
      "id": "ucns_embedding"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_next_pow2, _fft_inplace",
        "module_kind": "engine",
        "module_name": "epicycle",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "fft, ifft, EpicycleDecomposition",
        "requires": "none",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Pure-Python radix-2 FFT plus EpicycleDecomposition, representing signals as weighted unit-circle rotations for phase fingerprints.",
        "tests": "tests.test_epicycle",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/epicycle.py",
      "id": "ucns_epicycle"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "adapter",
        "module_name": "evidence",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "UCNSEvidence, no_proof_status, evidence_from_construction, evidence_from_bridge_import, evidence_from_factorization_result",
        "requires": "ucns_canonical, ucns_factorization_result, ucns_domain_status, ucns_bridge",
        "rollback": "remove module and its re-exports; consumers fall back to reading FactorizationResult directly",
        "rollout": "default_enabled additive public API",
        "since": "2026-07-12",
        "storage_boundary": "none",
        "summary": "Non-boolean downstream evidence envelope distinguishing construction success, search exhaustion, validated coverage, certified domain-relative negatives, theorem-layer status vocabulary, and absence of proof status.",
        "tests": "tests/test_stack_contract_suite.py, tests/test_bridge_certification_boundary.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/evidence.py",
      "id": "ucns_evidence"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_canonical_bytes, _digest, _exact_fields, _strict_bool, _strict_int, _strict_str, _strict_string_tuple, _strict_hex_digest, _status_values",
        "module_kind": "schema",
        "module_name": "evidence_envelope",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "BRIDGE_RECORD_SCHEMA_ID, BRIDGE_RECORD_SCHEMA_VERSION, FACTORIZATION_EVIDENCE_SCHEMA_ID, FACTORIZATION_EVIDENCE_SCHEMA_VERSION, UCNSBridgeRecord, UCNSFactorizationEvidence, bridge_record, factorization_evidence",
        "requires": "ucns_object_record, ucns_factorization_result, ucns_serialization, ucns_domain_status",
        "rollback": "remove envelope exports while preserving object_record and factorization_result",
        "rollout": "default_enabled",
        "since": "2026-07-12",
        "storage_boundary": "deterministic serialization only; no persistence",
        "summary": "versioned deterministic bridge records and factorization evidence envelopes binding UCNS stable identity, canonical serialization, typed domain status, exhaustive-search provenance, catalogue coverage, pruning policy, and negative-certification scope.",
        "tests": "tests.test_evidence_envelope",
        "unresolved": "cryptographic producer authentication is not provided; evidence digests are tamper-evident content identities only",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/evidence_envelope.py",
      "id": "ucns_evidence_envelope"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_prepare_search_catalogues, _search_exhaustive",
        "module_kind": "engine",
        "module_name": "factor_search_v08",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "factor_search_v08, factor_search_report, FactorSearchReport, payload_catalogue_fingerprint",
        "requires": "ucns_canonical, ucns_domains, ucns_host_recovery, ucns_payload_system, ucns_witness_matrix, ucns_serialization, ucns_carrier_support_pruning",
        "rollback": "remove report API while retaining factor_search_v08 and _search_exhaustive",
        "rollout": "factor_search_v08 unchanged; factor_search_report additive",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Exhaustive catalogue-bounded factorization with a compatibility sentinel API and a provenance-bearing search report that makes no certification claim.",
        "tests": "tests/test_exhaustive_factor_search.py, tests/test_factor_search_provenance.py, tests/test_certified_negative_results.py, ucns_recursive/tests/test_depth2_oracle.py",
        "unresolved": "negative-result certification lives only in ucns.factorization_result",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/factor_search_v08.py",
      "id": "ucns_factor_search_v08"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_pruning_is_recognized, _negative_certification_reasons, _claim_scope",
        "module_kind": "engine",
        "module_name": "factorization_result",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "FactorizationResultKind, FactorizationResult, NEGATIVE_CERTIFICATION_POLICY_VERSION, factorization_result",
        "requires": "ucns_canonical, ucns_domain_status, ucns_domains, ucns_factor_search_v08, ucns_catalogue_coverage, ucns_carrier_support_pruning, ucns_serialization",
        "rollback": "retain provenance and coverage evidence but set negative_result_certified and seq_prime_is_absolute false",
        "rollout": "default_enabled for A0-facing envelopes; raw factor_search_v08 remains catalogue-relative",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "A0-facing factorization envelope that certifies negative results only from frozen-domain membership, validated catalogue coverage, exact search-report binding, exhaustive untruncated search, recognized sound pruning, a complete declared domain, and a non-unit target.",
        "tests": "tests/test_certified_negative_results.py, tests/test_one_shot_catalogue.py, ucns_recursive/tests/test_factorization_result.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/factorization_result.py",
      "id": "ucns_factorization_result"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_r, _theta, _zw, ThetaDegenerate",
        "module_kind": "engine",
        "module_name": "geometry_bridge",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "GeometricPoint, ucns_a_to_g, compose, homomorphism_check, HomomorphismResult, check_injectivity",
        "requires": "ucns.canonical (UCNSObject, multiply)",
        "rollback": "remove export from ucns/__init__.py",
        "rollout": "default_enabled",
        "storage_boundary": "none",
        "summary": "proves UCNS-A outer-product algebra homomorphic to UCNS-G geometry via (r, theta, z, w) coordinate mapping verified over 2500 pairs",
        "tests": "ucns_recursive.tests.test_geometry_bridge",
        "unresolved": "injectivity-proof-analytical, degenerate-theta-canonical-form, depth>1-payload-lifting",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/geometry_bridge.py",
      "id": "ucns_geometry_bridge"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "host_recovery",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "recover_host_angles, recover_face_structures",
        "requires": "ucns_canonical",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Recovers the candidate A/B host angle sequences and enumerates consistent face-bit assignments from a normalised product object P.",
        "tests": "ucns_recursive/tests/test_depth2_full_domain.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/host_recovery.py",
      "id": "ucns_host_recovery"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_left_quotient_payload",
        "module_kind": "engine",
        "module_name": "left_quotient",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "left_quotient, right_quotient",
        "requires": "ucns_canonical",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Constructive left/right quotient primitives implementing the v0.6 left-quotient completeness theorem; recovers B (or A) from a product, else None.",
        "tests": "ucns.tests.test_left_quotient",
        "unresolved": "v0.6 completeness scope-corrected 2026-07-10 (counterexample; complete on flat divisors only; full enumeration in ucns.division_theory); right_quotient dual additionally uses the left payload helper and misses more",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/left_quotient.py",
      "id": "ucns_left_quotient"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "mobius",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "MobiusTransform, poincare_distance, disk_to_circle, circle_to_disk",
        "requires": "none",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Mobius (bilinear) transformations of the Poincare unit disk plus hyperbolic-distance and disk/circle projection helpers.",
        "tests": "tests.test_mobius",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/mobius.py",
      "id": "ucns_mobius"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "object_record",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "UCNSObjectRecord, object_record",
        "requires": "ucns_canonical, ucns_domain_status, ucns_domains, ucns_serialization",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Builds a self-describing inspection record (canonical identity, domain-status metadata, structural facts) for any UCNS object without invoking factorization.",
        "tests": "ucns.tests.test_object_record",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/object_record.py",
      "id": "ucns_object_record"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_globally_consistent",
        "module_kind": "engine",
        "module_name": "payload_system",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "normalize_payload_catalogue, iter_payload_system_solutions, solve_payload_system",
        "requires": "ucns_canonical",
        "rollback": "restore the greedy first-quotient solver",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Normalizes payload catalogues and exhaustively enumerates every assignment satisfying the coupled product equations, with a first-solution compatibility wrapper.",
        "tests": "tests/test_exhaustive_factor_search.py, tests/test_factor_search_provenance.py, ucns_recursive/tests/test_depth2_full_domain.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/payload_system.py",
      "id": "ucns_payload_system"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_byte_to_angle, _angle_to_byte, _safe_n_dec, _make_sentinel_cells, _encode_bytes, _encode_list, _encode_dict, _count_leading_sentinels",
        "module_kind": "engine",
        "module_name": "recursive_codec",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "recursive_encode, recursive_decode, EncodingError",
        "requires": "ucns_canonical",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Recursive encoder/decoder between Python values (bytes/list/tuple/dict and coercible leaves) and UCNSObject, with type recovered from leading-sentinel count.",
        "tests": "ucns.tests.test_recursive_codec",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/recursive_codec.py",
      "id": "ucns_codec"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "find_right_factor_or_sentinel, find_left_factor_or_sentinel",
        "module_kind": "engine",
        "module_name": "recursive_quotient",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "find_left_factor, find_right_factor, left_quotient, right_quotient",
        "requires": "ucns_canonical, ucns_left_quotient",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Payload-level single-equation factor finders (find_left_factor / find_right_factor) that enumerate a candidate catalogue, plus re-exports of the left/right quotient primitives.",
        "tests": "ucns.tests.test_left_quotient",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/recursive_quotient.py",
      "id": "ucns_quotient"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_fraction_to_data",
        "module_kind": "engine",
        "module_name": "serialization",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "CANONICAL_SERIALIZATION_VERSION, DEFAULT_HASH_ALGORITHM, canonical_data, canonical_json, canonical_bytes, stable_hash, stable_hash_bytes",
        "requires": "ucns_canonical",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Canonical deterministic JSON serialization and stable SHA-256 hashing for UCNS recursive objects, mirroring UCNSObject equality policy for content addressing and identity.",
        "tests": "ucns.tests.test_serialization",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/serialization.py",
      "id": "ucns_serialization"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_check_same_length",
        "module_kind": "engine",
        "module_name": "similarity",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "phase_cosine, arc_distance, hyperbolic_cosine, top_k_overlap",
        "requires": "none",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Similarity and distance metrics (phase-cosine, arc, hyperbolic, top-k overlap) over UCNS angle-list embeddings.",
        "tests": "tests.test_similarity",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/similarity.py",
      "id": "ucns_similarity"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "store",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "UCNSStore, Match, OutOfDomainError",
        "requires": "ucns_canonical, ucns_domains, ucns_left_quotient, ucns_codec",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "UCNSStore - an in-memory keyed corpus of UCNSObjects with proof-backed algebraic retrieval (left_factors, is_left_factor, factor_decompose) and optional verified-domain enforcement.",
        "tests": "ucns.tests.test_store",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/store.py",
      "id": "ucns_store"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "witness_matrix",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "Witness, WitnessMatrix, build_witness_matrix",
        "requires": "ucns_canonical",
        "rollback": "remove module and its re-exports",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Witness and WitnessMatrix types plus build_witness_matrix; verifies per-cell factor products and row/column global consistency for a host factorisation candidate.",
        "tests": "ucns.tests.test_failure_boundary_e109",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "libs/ucns/src/witness_matrix.py",
      "id": "ucns_witness_matrix"
    }
  ],
  "edges": [
    {
      "from": "addition_boundary",
      "kind": "calls",
      "source_block": "CONTRACTS",
      "source_id": "addition_boundary",
      "to": "contracts.test_addition_boundary.contract_addition_boundary"
    },
    {
      "from": "division_theory",
      "kind": "calls",
      "source_block": "CONTRACTS",
      "source_id": "division_theory",
      "to": "contracts.test_quotient_solvability.contract_division_theory"
    },
    {
      "from": "multiply_associativity",
      "kind": "calls",
      "source_block": "CONTRACTS",
      "source_id": "multiply_associativity",
      "to": "contracts.test_associativity_triples.contract_multiply_associativity"
    },
    {
      "from": "multiply_commutativity_ruling",
      "kind": "calls",
      "source_block": "CONTRACTS",
      "source_id": "multiply_commutativity_ruling",
      "to": "contracts.test_commutator.contract_multiply_commutativity_ruling"
    },
    {
      "from": "multiply_identity",
      "kind": "calls",
      "source_block": "CONTRACTS",
      "source_id": "multiply_identity",
      "to": "contracts.test_identity_two_sided.contract_multiply_identity"
    },
    {
      "from": "multiply_well_defined",
      "kind": "calls",
      "source_block": "CONTRACTS",
      "source_id": "multiply_well_defined",
      "to": "contracts.test_multiply_canonical.contract_multiply_well_defined"
    },
    {
      "from": "structure_naming",
      "kind": "calls",
      "source_block": "CONTRACTS",
      "source_id": "structure_naming",
      "to": "contracts.test_structure_axioms.contract_structure_naming"
    },
    {
      "from": "coherence_primes",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "coherence_primes",
      "to": "Erin Spencer"
    },
    {
      "from": "coherence_primes",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "coherence_primes",
      "to": "none"
    },
    {
      "from": "division_theory",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "division_theory",
      "to": "Erin Spencer"
    },
    {
      "from": "division_theory",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "division_theory",
      "to": "ucns_canonical"
    },
    {
      "from": "meta_module_build_runner",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "meta_module_build_runner",
      "to": "Erin Spencer"
    },
    {
      "from": "meta_module_build_runner",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "meta_module_build_runner",
      "to": "none"
    },
    {
      "from": "pcea_cipher",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_cipher",
      "to": "Erin Spencer"
    },
    {
      "from": "pcea_cipher",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_cipher",
      "to": "pcea_codec"
    },
    {
      "from": "pcea_cipher",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_cipher",
      "to": "pcea_kdf"
    },
    {
      "from": "pcea_cipher",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_cipher",
      "to": "pcea_primes"
    },
    {
      "from": "pcea_codec",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_codec",
      "to": "Erin Spencer"
    },
    {
      "from": "pcea_codec",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_codec",
      "to": "none"
    },
    {
      "from": "pcea_contract",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_contract",
      "to": "Erin Spencer"
    },
    {
      "from": "pcea_contract",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_contract",
      "to": "none"
    },
    {
      "from": "pcea_instance",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_instance",
      "to": "Erin Spencer"
    },
    {
      "from": "pcea_instance",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_instance",
      "to": "pcea_cipher"
    },
    {
      "from": "pcea_kdf",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_kdf",
      "to": "Erin Spencer"
    },
    {
      "from": "pcea_kdf",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_kdf",
      "to": "none"
    },
    {
      "from": "pcea_primes",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_primes",
      "to": "Erin Spencer"
    },
    {
      "from": "pcea_primes",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcea_primes",
      "to": "none"
    },
    {
      "from": "pcna_core_main",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_core_main",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_core_main",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_core_main",
      "to": "pcna_tensor_engine"
    },
    {
      "from": "pcna_core_main",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_core_main",
      "to": "pcna_topology"
    },
    {
      "from": "pcna_edcm",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_edcm",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_edcm",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_edcm",
      "to": "none"
    },
    {
      "from": "pcna_helix_vis",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_helix_vis",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_helix_vis",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_helix_vis",
      "to": "none"
    },
    {
      "from": "pcna_memory_core",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_memory_core",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_memory_core",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_memory_core",
      "to": "none"
    },
    {
      "from": "pcna_merge",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_merge",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_merge",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_merge",
      "to": "pcna_pcna"
    },
    {
      "from": "pcna_merge",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_merge",
      "to": "pcna_ring_core"
    },
    {
      "from": "pcna_pcna",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_pcna",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_pcna",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_pcna",
      "to": "pcna_memory_core"
    },
    {
      "from": "pcna_pcna",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_pcna",
      "to": "pcna_ring_core"
    },
    {
      "from": "pcna_pcna",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_pcna",
      "to": "pcna_theta"
    },
    {
      "from": "pcna_ring_core",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_ring_core",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_ring_core",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_ring_core",
      "to": "none"
    },
    {
      "from": "pcna_routing_loop",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_routing_loop",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_routing_loop",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_routing_loop",
      "to": "none"
    },
    {
      "from": "pcna_sigma",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_sigma",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_sigma",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_sigma",
      "to": "pcna_ring_core"
    },
    {
      "from": "pcna_tensor_engine",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_tensor_engine",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_tensor_engine",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_tensor_engine",
      "to": "none"
    },
    {
      "from": "pcna_theta",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_theta",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_theta",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_theta",
      "to": "none"
    },
    {
      "from": "pcna_topology",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_topology",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_topology",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_topology",
      "to": "none"
    },
    {
      "from": "pcna_zeta",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_zeta",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_zeta",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_zeta",
      "to": "pcna_edcm"
    },
    {
      "from": "pcna_zeta",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_zeta",
      "to": "pcna_pcna"
    },
    {
      "from": "pcna_zeta",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_zeta",
      "to": "pcna_sigma"
    },
    {
      "from": "pcta_constants",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcta_constants",
      "to": "Erin Patrick Spencer"
    },
    {
      "from": "pcta_constants",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcta_constants",
      "to": "NOT imported \u2014 importing the aggregator would invert the dependency graph)"
    },
    {
      "from": "pcta_constants",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcta_constants",
      "to": "coherence_primes (mirrored from interdependent_lib"
    },
    {
      "from": "prime_core_constants",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "prime_core_constants",
      "to": "Erin Spencer"
    },
    {
      "from": "prime_core_constants",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "prime_core_constants",
      "to": "coherence_primes (mirrored from interdependent_lib"
    },
    {
      "from": "prime_core_constants",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "prime_core_constants",
      "to": "not imported \u2014 would invert the dependency graph)"
    },
    {
      "from": "ucns_a0_safe",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_a0_safe",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_a0_safe",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_a0_safe",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_a0_safe",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_a0_safe",
      "to": "ucns_factorization_result"
    },
    {
      "from": "ucns_a0_safe",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_a0_safe",
      "to": "ucns_object_record"
    },
    {
      "from": "ucns_a0_safe",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_a0_safe",
      "to": "ucns_serialization"
    },
    {
      "from": "ucns_bridge",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_bridge",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_bridge",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_bridge",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_bridge",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_bridge",
      "to": "ucns_serialization"
    },
    {
      "from": "ucns_canonical",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_canonical",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_canonical",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_canonical",
      "to": "none"
    },
    {
      "from": "ucns_canonical_factor_selection",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_canonical_factor_selection",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_canonical_factor_selection",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_canonical_factor_selection",
      "to": "ucns_carrier_support_pruning"
    },
    {
      "from": "ucns_carrier_support_pruning",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_carrier_support_pruning",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_carrier_support_pruning",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_carrier_support_pruning",
      "to": "none"
    },
    {
      "from": "ucns_catalogue",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_catalogue",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_catalogue",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue",
      "to": "ucns_domains"
    },
    {
      "from": "ucns_catalogue_coverage",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue_coverage",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_catalogue_coverage",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue_coverage",
      "to": "ucns_domains"
    },
    {
      "from": "ucns_catalogue_coverage",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue_coverage",
      "to": "ucns_factor_search_v08"
    },
    {
      "from": "ucns_catalogue_coverage",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue_coverage",
      "to": "ucns_serialization"
    },
    {
      "from": "ucns_catalogue_d3",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue_d3",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_catalogue_d3",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue_d3",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_catalogue_d3",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue_d3",
      "to": "ucns_catalogue"
    },
    {
      "from": "ucns_catalogue_d3",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_catalogue_d3",
      "to": "ucns_domains"
    },
    {
      "from": "ucns_codec",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_codec",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_codec",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_codec",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_core",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_core",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_core",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_core",
      "to": "none"
    },
    {
      "from": "ucns_domain_status",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_domain_status",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_domain_status",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_domain_status",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_domains",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_domains",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_domains",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_domains",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_embedding",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_embedding",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_embedding",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_embedding",
      "to": "ucns_epicycle"
    },
    {
      "from": "ucns_epicycle",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_epicycle",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_epicycle",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_epicycle",
      "to": "none"
    },
    {
      "from": "ucns_evidence",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_evidence",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence",
      "to": "ucns_bridge"
    },
    {
      "from": "ucns_evidence",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_evidence",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence",
      "to": "ucns_domain_status"
    },
    {
      "from": "ucns_evidence",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence",
      "to": "ucns_factorization_result"
    },
    {
      "from": "ucns_evidence_envelope",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence_envelope",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_evidence_envelope",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence_envelope",
      "to": "ucns_domain_status"
    },
    {
      "from": "ucns_evidence_envelope",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence_envelope",
      "to": "ucns_factorization_result"
    },
    {
      "from": "ucns_evidence_envelope",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence_envelope",
      "to": "ucns_object_record"
    },
    {
      "from": "ucns_evidence_envelope",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_evidence_envelope",
      "to": "ucns_serialization"
    },
    {
      "from": "ucns_factor_search_v08",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factor_search_v08",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_factor_search_v08",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factor_search_v08",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_factor_search_v08",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factor_search_v08",
      "to": "ucns_carrier_support_pruning"
    },
    {
      "from": "ucns_factor_search_v08",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factor_search_v08",
      "to": "ucns_domains"
    },
    {
      "from": "ucns_factor_search_v08",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factor_search_v08",
      "to": "ucns_host_recovery"
    },
    {
      "from": "ucns_factor_search_v08",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factor_search_v08",
      "to": "ucns_payload_system"
    },
    {
      "from": "ucns_factor_search_v08",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factor_search_v08",
      "to": "ucns_serialization"
    },
    {
      "from": "ucns_factor_search_v08",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factor_search_v08",
      "to": "ucns_witness_matrix"
    },
    {
      "from": "ucns_factorization_result",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factorization_result",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_factorization_result",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factorization_result",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_factorization_result",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factorization_result",
      "to": "ucns_carrier_support_pruning"
    },
    {
      "from": "ucns_factorization_result",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factorization_result",
      "to": "ucns_catalogue_coverage"
    },
    {
      "from": "ucns_factorization_result",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factorization_result",
      "to": "ucns_domain_status"
    },
    {
      "from": "ucns_factorization_result",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factorization_result",
      "to": "ucns_domains"
    },
    {
      "from": "ucns_factorization_result",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factorization_result",
      "to": "ucns_factor_search_v08"
    },
    {
      "from": "ucns_factorization_result",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_factorization_result",
      "to": "ucns_serialization"
    },
    {
      "from": "ucns_geometry_bridge",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_geometry_bridge",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_geometry_bridge",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_geometry_bridge",
      "to": "multiply)"
    },
    {
      "from": "ucns_geometry_bridge",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_geometry_bridge",
      "to": "ucns.canonical (UCNSObject"
    },
    {
      "from": "ucns_host_recovery",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_host_recovery",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_host_recovery",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_host_recovery",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_left_quotient",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_left_quotient",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_left_quotient",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_left_quotient",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_mobius",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_mobius",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_mobius",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_mobius",
      "to": "none"
    },
    {
      "from": "ucns_object_record",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_object_record",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_object_record",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_object_record",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_object_record",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_object_record",
      "to": "ucns_domain_status"
    },
    {
      "from": "ucns_object_record",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_object_record",
      "to": "ucns_domains"
    },
    {
      "from": "ucns_object_record",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_object_record",
      "to": "ucns_serialization"
    },
    {
      "from": "ucns_payload_system",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_payload_system",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_payload_system",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_payload_system",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_quotient",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_quotient",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_quotient",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_quotient",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_quotient",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_quotient",
      "to": "ucns_left_quotient"
    },
    {
      "from": "ucns_serialization",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_serialization",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_serialization",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_serialization",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_similarity",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_similarity",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_similarity",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_similarity",
      "to": "none"
    },
    {
      "from": "ucns_store",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_store",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_store",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_store",
      "to": "ucns_canonical"
    },
    {
      "from": "ucns_store",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_store",
      "to": "ucns_codec"
    },
    {
      "from": "ucns_store",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_store",
      "to": "ucns_domains"
    },
    {
      "from": "ucns_store",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_store",
      "to": "ucns_left_quotient"
    },
    {
      "from": "ucns_witness_matrix",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_witness_matrix",
      "to": "Erin Spencer"
    },
    {
      "from": "ucns_witness_matrix",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "ucns_witness_matrix",
      "to": "ucns_canonical"
    }
  ],
  "gaps": [],
  "repo": "interdependent-lib",
  "source_commit": "c8ffb82"
});
