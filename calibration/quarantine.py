from __future__ import annotations

from .errors import QuarantineBreachError
from .schema import ParameterOrigin, ProvenanceManifest


def validate_quarantine(manifest: ProvenanceManifest) -> None:
    if manifest.target_data_access != "PROHIBITED":
        raise QuarantineBreachError(
            f"FATAL: calibration target_data_access={manifest.target_data_access!r}; expected 'PROHIBITED'."
        )
    if manifest.parameter_origin is ParameterOrigin.POST_QUARANTINE_TARGET_DERIVED:
        raise QuarantineBreachError(
            "FATAL: attempted to inject post-quarantine target-derived parameters into calibration."
        )
