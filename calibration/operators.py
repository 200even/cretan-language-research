from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Generic, TypeVar

from .hashing import sha256_hex
from .quarantine import validate_quarantine
from .schema import Corpus, ProvenanceManifest


ConfigT = TypeVar("ConfigT")


@dataclass(frozen=True, slots=True)
class OperatorResult:
    corpus: Corpus
    manifest: ProvenanceManifest


class DegradationOperator(ABC, Generic[ConfigT]):
    version: str

    @abstractmethod
    def transform(self, corpus: Corpus, config: ConfigT, seed: int) -> Corpus:
        """Return a new corpus; implementations must not mutate input state."""

    def run(
        self,
        corpus: Corpus,
        config: ConfigT,
        manifest: ProvenanceManifest,
    ) -> OperatorResult:
        validate_quarantine(manifest)
        output = self.transform(corpus, config, manifest.rng_seed)
        output_hash = sha256_hex(output)
        return OperatorResult(
            corpus=output,
            manifest=manifest.with_output_hash(output_hash),
        )
