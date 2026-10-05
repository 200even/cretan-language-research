class QuarantineBreachError(RuntimeError):
    """Raised when calibration attempts to consume forbidden target-derived data."""


class CorpusValidationError(ValueError):
    """Raised when a corpus violates the canonical calibration schema."""
