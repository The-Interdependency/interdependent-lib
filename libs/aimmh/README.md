# AIMMH — AI Multimodel Multimodal Hub

**Source repo:** [The-Interdependency/aimmh](https://github.com/The-Interdependency/aimmh)
**Language:** Python 3.11+  **PyPI:** [`aimmh-lib`](https://pypi.org/project/aimmh-lib/)
**Letters:** 5

---

## What it is

`aimmh-lib` is a zero-dependency async Python library for multi-model AI conversation orchestration. It powers the [Emergent](https://emergentapp.interdependentway.org) platform and is fully usable standalone.

### Interaction patterns

| Pattern | Description |
|---------|-------------|
| `fan_out` | Send one prompt to N models in parallel |
| `daisy_chain` | A → B → C sequentially; each sees the previous response |
| `room_all` | All models see each other's responses in each round |
| `room_synthesized` | Responses synthesized first, then drive the next round |
| `council` | Each model synthesizes all responses including its own |
| `roleplay` | DM-driven roleplay with initiative ordering and reactions |

---

## Install

```bash
pip install aimmh-lib
# or via the meta-package
pip install interdependent-lib[aimmh]
```

---

## Usage

### Functional API

```python
import asyncio
from aimmh_lib import fan_out

async def call_model(model_id: str, messages: list[dict]) -> str:
    return f"Response from {model_id}"

async def main():
    results = await fan_out(
        call_fn=call_model,
        model_ids=["gpt-4o", "claude-sonnet-4-6", "gemini-2.0-flash"],
        messages=[{"role": "user", "content": "What is consciousness?"}],
    )
    for r in results:
        print(f"{r.model_id}: {r.content}")

asyncio.run(main())
```

### Instantiation API

```python
from aimmh_lib import MultiModelHub

hub = MultiModelHub(call_model)

results = await hub.fan_out(["gpt-4o", "claude-sonnet-4-6"], messages)
results = await hub.council(["gpt-4o", "claude-sonnet-4-6"], "What is love?")
```

### Stateful single-model conversations

```python
from aimmh_lib import ModelInstance

gpt = ModelInstance(call_model, "gpt-4o", system_context="You are a Socratic tutor.")
r1 = await gpt.send("What is entropy?")
r2 = await gpt.send("Give me an example.")  # history carries over
gpt.clear()  # reset to fresh state
```

---

## Package layout

| File | Purpose |
|------|---------|
| `aimmh_lib/__init__.py` | Public API (`fan_out`, `daisy_chain`, `room_all`, etc.) |
| `aimmh_lib/conversations.py` | All six interaction-pattern implementations |
| `aimmh_lib/adapters.py` | Backend adapters (`make_call_fn`) |

---

## See also

- [Source README →](https://github.com/The-Interdependency/aimmh/blob/main/README.md)
- [Live app →](https://emergentapp.interdependentway.org)
- [PyPI →](https://pypi.org/project/aimmh-lib/)
