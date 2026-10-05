from __future__ import annotations

from dataclasses import dataclass, replace

from .operators import DegradationOperator
from .schema import Corpus, Document, Token, TokenMetadata


@dataclass(frozen=True, slots=True)
class LB1Config:
    strip_lemma: bool = True
    strip_gloss: bool = True
    strip_translation: bool = True
    strip_dictionary_links: bool = True


class LB1SemanticStripper(DegradationOperator[LB1Config]):
    version = "LB1-semantic-strip/v1"

    def transform(self, corpus: Corpus, config: LB1Config, seed: int) -> Corpus:
        # seed is intentionally unused: LB-1 is deterministic and non-stochastic.
        del seed

        out_documents: list[Document] = []
        for doc in corpus.documents:
            out_tokens: list[Token] = []
            for token in doc.tokens:
                md = token.metadata
                stripped = TokenMetadata(
                    lemma=None if config.strip_lemma else md.lemma,
                    gloss=None if config.strip_gloss else md.gloss,
                    translation=None if config.strip_translation else md.translation,
                    dictionary_links=() if config.strip_dictionary_links else md.dictionary_links,
                    morphology=dict(md.morphology),
                    proper_name=md.proper_name,
                    toponym=md.toponym,
                )
                out_tokens.append(replace(token, metadata=stripped))
            out_documents.append(replace(doc, tokens=tuple(out_tokens)))

        output = replace(corpus, documents=tuple(out_documents))

        if corpus.sign_sequences() != output.sign_sequences():
            raise AssertionError("LB-1 invariant violated: sign sequences changed")

        return output
