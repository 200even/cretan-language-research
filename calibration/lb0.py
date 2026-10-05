from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Mapping

from .errors import CorpusValidationError
from .schema import Corpus, Document, Token, TokenMetadata


@dataclass(frozen=True, slots=True)
class LB0Config:
    control_id: str = "CONTROL-000"
    source_description: str = "Mycenaean Greek positive control"


def _tuple_str(value: Any) -> tuple[str, ...]:
    if value is None:
        return ()
    if not isinstance(value, (list, tuple)):
        raise CorpusValidationError("expected a sequence")
    return tuple(str(item) for item in value)


def normalize_control_json(raw: Mapping[str, Any], config: LB0Config = LB0Config()) -> Corpus:
    """Normalize an already-exported control JSON object into the frozen schema.

    This adapter intentionally requires explicit fields instead of guessing a DĀMOS/LGM
    export layout. Source-specific importers must map their raw format into this contract.
    """
    raw_documents = raw.get("documents")
    if not isinstance(raw_documents, list):
        raise CorpusValidationError("LB-0 input requires a top-level 'documents' list")

    documents: list[Document] = []
    for d_index, raw_doc in enumerate(raw_documents):
        if not isinstance(raw_doc, Mapping):
            raise CorpusValidationError(f"documents[{d_index}] must be an object")
        document_id = str(raw_doc.get("document_id", "")).strip()
        if not document_id:
            raise CorpusValidationError(f"documents[{d_index}] missing document_id")
        raw_tokens = raw_doc.get("tokens")
        if not isinstance(raw_tokens, list):
            raise CorpusValidationError(f"{document_id}: tokens must be a list")

        tokens: list[Token] = []
        for t_index, raw_token in enumerate(raw_tokens):
            if not isinstance(raw_token, Mapping):
                raise CorpusValidationError(f"{document_id}.tokens[{t_index}] must be an object")
            token_id = str(raw_token.get("token_id", "")).strip()
            if not token_id:
                raise CorpusValidationError(f"{document_id}.tokens[{t_index}] missing token_id")
            signs = _tuple_str(raw_token.get("signs"))
            if not signs:
                raise CorpusValidationError(f"{token_id}: empty sign sequence")

            md = raw_token.get("metadata") or {}
            if not isinstance(md, Mapping):
                raise CorpusValidationError(f"{token_id}: metadata must be an object")

            token = Token(
                token_id=token_id,
                signs=signs,
                open_left=bool(raw_token.get("open_left", False)),
                open_right=bool(raw_token.get("open_right", False)),
                interior_damage=tuple(int(x) for x in raw_token.get("interior_damage", ())),
                explicit_word_divider_after=bool(raw_token.get("explicit_word_divider_after", False)),
                metadata=TokenMetadata(
                    lemma=md.get("lemma"),
                    gloss=md.get("gloss"),
                    translation=md.get("translation"),
                    dictionary_links=_tuple_str(md.get("dictionary_links")),
                    morphology=dict(md.get("morphology") or {}),
                    proper_name=bool(md.get("proper_name", False)),
                    toponym=bool(md.get("toponym", False)),
                ),
            )
            tokens.append(token)

        documents.append(
            Document(
                document_id=document_id,
                tokens=tuple(tokens),
                context=dict(raw_doc.get("context") or {}),
            )
        )

    return Corpus(
        control_id=config.control_id,
        documents=tuple(documents),
        source_description=config.source_description,
        classifier_visible_metadata={},
    )
