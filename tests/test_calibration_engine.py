import unittest

from calibration.errors import QuarantineBreachError
from calibration.hashing import sha256_hex
from calibration.lb0 import normalize_control_json
from calibration.lb1 import LB1Config, LB1SemanticStripper
from calibration.quarantine import validate_quarantine
from calibration.rng import isolated_rng
from calibration.schema import ParameterOrigin, ProvenanceManifest


RAW_CONTROL = {
    "documents": [
        {
            "document_id": "TEST-1",
            "tokens": [
                {
                    "token_id": "TEST-1:1",
                    "signs": ["A", "KO", "SO"],
                    "open_left": False,
                    "open_right": True,
                    "metadata": {
                        "lemma": "example",
                        "gloss": "gold",
                        "translation": "example translation",
                        "dictionary_links": ["urn:test:1"],
                        "morphology": {"case": "nom"},
                        "proper_name": False,
                    },
                }
            ],
        }
    ]
}


class CalibrationEngineTests(unittest.TestCase):
    def test_quarantine_rejects_post_quarantine_target_parameters(self):
        manifest = ProvenanceManifest.calibration(
            parameter_origin=ParameterOrigin.POST_QUARANTINE_TARGET_DERIVED,
            source_hash="a" * 64,
            config_hash="b" * 64,
            operator_version="test/v1",
            rng_seed=1,
        )
        with self.assertRaises(QuarantineBreachError):
            validate_quarantine(manifest)

    def test_quarantine_rejects_target_access_flag(self):
        manifest = ProvenanceManifest(
            target_data_access="ALLOWED",
            parameter_origin=ParameterOrigin.CONTROL_DERIVED,
            source_hash="a" * 64,
            config_hash="b" * 64,
            operator_version="test/v1",
            rng_seed=1,
        )
        with self.assertRaises(QuarantineBreachError):
            validate_quarantine(manifest)

    def test_same_seed_same_rng_sequence(self):
        left = isolated_rng(8675309)
        right = isolated_rng(8675309)
        self.assertEqual(
            [left.random() for _ in range(16)],
            [right.random() for _ in range(16)],
        )

    def test_canonical_hash_is_repeatable(self):
        corpus = normalize_control_json(RAW_CONTROL)
        self.assertEqual(sha256_hex(corpus), sha256_hex(corpus))

    def test_lb1_preserves_sign_sequences(self):
        corpus = normalize_control_json(RAW_CONTROL)
        manifest = ProvenanceManifest.calibration(
            parameter_origin=ParameterOrigin.CONTROL_DERIVED,
            source_hash=sha256_hex(RAW_CONTROL),
            config_hash=sha256_hex(LB1Config()),
            operator_version=LB1SemanticStripper.version,
            rng_seed=0,
        )
        result = LB1SemanticStripper().run(corpus, LB1Config(), manifest)

        self.assertEqual(corpus.sign_sequences(), result.corpus.sign_sequences())
        token = result.corpus.documents[0].tokens[0]
        self.assertIsNone(token.metadata.lemma)
        self.assertIsNone(token.metadata.gloss)
        self.assertIsNone(token.metadata.translation)
        self.assertEqual(token.metadata.dictionary_links, ())
        # Morphology/entity flags are retained for later LB stages/scoring,
        # but remain outside classifier-visible metadata.
        self.assertEqual(token.metadata.morphology, {"case": "nom"})
        self.assertFalse(token.metadata.proper_name)

    def test_lb1_output_is_byte_reproducible(self):
        corpus = normalize_control_json(RAW_CONTROL)
        manifest = ProvenanceManifest.calibration(
            parameter_origin=ParameterOrigin.CONTROL_DERIVED,
            source_hash=sha256_hex(RAW_CONTROL),
            config_hash=sha256_hex(LB1Config()),
            operator_version=LB1SemanticStripper.version,
            rng_seed=0,
        )
        op = LB1SemanticStripper()
        a = op.run(corpus, LB1Config(), manifest)
        b = op.run(corpus, LB1Config(), manifest)
        self.assertEqual(a.manifest.output_hash, b.manifest.output_hash)
        self.assertEqual(sha256_hex(a.corpus), sha256_hex(b.corpus))


if __name__ == "__main__":
    unittest.main()
