from __future__ import annotations

from dataclasses import dataclass, field, replace
from enum import Enum
from typing import Any, Mapping


class ParameterOrigin(str, Enum):
    PRE_QUARANTINE_FROZEN = "PRE_QUARANTINE_FROZEN"
    CONTROL_DERIVED = "CONTROL_DERIVED"
    SYNTHETIC_PREREGISTERED = "SYNTHETIC_PREREGISTERED"
    POST_QUARANTINE_TARGET_DERIVED = "POST_QUARANTINE_TARGET_DERIVED"


@dataclass(frozen=True, slots=True)
class TokenMetadata:
    """Classifier-invisible annotations retained only for scoring/audit."""

    lemma: str | None = None
    gloss: str | None = None
    translation: str | None = None
    dictionary_links: tuple[str, ...] = ()
    morphology: Mapping[str, str] = field(default_factory=dict)
    proper_name: bool = False
    toponym: bool = False


@dataclass(frozen=True, slots=True)
class Token:
    token_id: str
    signs: tuple[str, ...]
    open_left: bool = False
    open_right: bool = False
    interior_damage: tuple[int, ...] = ()
    explicit_word_divider_after: bool = False
    metadata: TokenMetadata = field(default_factory=TokenMetadata)


@dataclass(frozen=True, slots=True)
class Document:
    document_id: str
    tokens: tuple[Token, ...]
    context: Mapping[str, Any] = field(default_factory=dict)


@dataclass(frozen=True, slots=True)
class Corpus:
    control_id: str
    documents: tuple[Document, ...]
    source_description: str
    classifier_visible_metadata: Mapping[str, Any] = field(default_factory=dict)

    def sign_sequences(self) -> tuple[tuple[str, ...], ...]:
        return tuple(token.signs for doc in self.documents for token in doc.tokens)


@dataclass(frozen=True, slots=True)
class ProvenanceManifest:
    target_data_access: str
    parameter_origin: ParameterOrigin
    source_hash: str
    config_hash: str
    operator_version: str
    rng_seed: int
    output_hash: str | None = None
    parent_output_hash: str | None = None
    rng_contract: str = "python.random.Random/v1"

    @classmethod
    def calibration(
        cls,
        *,
        parameter_origin: ParameterOrigin,
        source_hash: str,
        config_hash: str,
        operator_version: str,
        rng_seed: int,
        parent_output_hash: str | None = None,
    ) -> "ProvenanceManifest":
        return cls(
            target_data_access="PROHIBITED",
            parameter_origin=parameter_origin,
            source_hash=source_hash,
            config_hash=config_hash,
            operator_version=operator_version,
            rng_seed=rng_seed,
            parent_output_hash=parent_output_hash,
        )

    def with_output_hash(self, output_hash: str) -> "ProvenanceManifest":
        return replace(self, output_hash=output_hash)
