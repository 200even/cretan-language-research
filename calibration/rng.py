from __future__ import annotations

import random


RNG_CONTRACT = "python.random.Random/v1"


def isolated_rng(seed: int) -> random.Random:
    """Return a local RNG. Global random state is never touched."""
    if not isinstance(seed, int):
        raise TypeError("seed must be an int")
    return random.Random(seed)
