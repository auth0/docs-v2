"""Data models for rate limit drift monitoring."""

from dataclasses import dataclass, field
from typing import Dict, List, Optional
from datetime import datetime


@dataclass
class EndpointLimit:
    """Single endpoint rate limit with burst and sustained dimensions."""

    endpoint_name: str
    burst_limit: int = 0  # RPS - requests per second
    sustained_limit: int = 0  # RPM - requests per minute
    api_type: str = "unknown"  # "management_api", "auth_api", "scim_api", etc.
    burst_unit: str = "rps"
    sustained_unit: str = "rpm"
    additional_context: str = ""  # e.g., "per unique user ID"


@dataclass
class TierLimits:
    """All endpoints for a single tier."""

    tier_name: str  # e.g., "TIER_INTERNAL_DEV"
    terraform_name: str  # Original Terraform name
    code_tier: str  # from cross-reference table (e.g., "auth_api_dev")
    auth_api_burst: int = 0
    mgmt_api_burst: int = 0
    endpoints: Dict[str, EndpointLimit] = field(default_factory=dict)
    source: str = ""  # "terraform" or "documentation"
    raw_data: Optional[Dict] = None  # Original parsed data for audit
    docs_visible: bool = True  # Control visibility for drift monitoring (defaults to visible)


@dataclass
class RateLimitSpecification:
    """Complete specification from one source."""

    source: str  # "terraform" or "documentation"
    timestamp: str = ""
    tiers: Dict[str, TierLimits] = field(default_factory=dict)
    raw_data: Optional[Dict] = None
    parsing_errors: List[str] = field(default_factory=list)

    def __post_init__(self):
        if not self.timestamp:
            self.timestamp = datetime.now().isoformat()


@dataclass
class DriftReport:
    """Individual drift finding."""

    drift_type: str  # "missing_endpoint", "value_mismatch", "undocumented", etc.
    tier_name: str
    endpoint_name: str
    terraform_value: Optional[int] = None
    documented_value: Optional[int] = None
    severity: str = "info"  # "critical", "warning", "info"
    message: str = ""
    remediation: str = ""


@dataclass
class ComparisonResult:
    """Results of cross-source comparison."""

    timestamp: str
    terraform_spec: RateLimitSpecification
    documentation_spec: RateLimitSpecification
    drifts: List[DriftReport] = field(default_factory=list)
    summary: Dict = field(default_factory=dict)
    recommendations: List[str] = field(default_factory=list)

    def __post_init__(self):
        if not self.summary:
            self.summary = {
                'total_drifts': 0,
                'critical': 0,
                'warning': 0,
                'info': 0,
                'missing_endpoints': 0,
                'value_mismatches': 0,
                'undocumented': 0
            }
