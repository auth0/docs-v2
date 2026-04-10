"""Comparison engine for detecting drift between Terraform and documentation."""

from datetime import datetime
from typing import Dict, List
from .models import (
    RateLimitSpecification,
    TierLimits,
    DriftReport,
    ComparisonResult
)


class RateLimitComparator:
    """Compare Terraform specs with documentation to detect drift."""

    def __init__(self, cross_reference_mapping: Dict):
        """
        Initialize comparator.

        Args:
            cross_reference_mapping: Maps Terraform tier names to documentation
        """
        self.mapping = cross_reference_mapping

    def compare(
        self,
        terraform_spec: RateLimitSpecification,
        documentation_spec: RateLimitSpecification
    ) -> ComparisonResult:
        """
        Main comparison logic to detect drift.

        Args:
            terraform_spec: Parsed Terraform specification
            documentation_spec: Parsed documentation specification

        Returns:
            ComparisonResult with drifts, summary, and recommendations
        """
        drifts = []
        summary = {
            'total_drifts': 0,
            'critical': 0,
            'warning': 0,
            'info': 0,
            'missing_endpoints': 0,
            'value_mismatches': 0,
            'undocumented': 0,
            'hidden_tiers': 0
        }

        # Compare each Terraform tier
        for tf_tier_name, tf_tier_limits in terraform_spec.tiers.items():
            # Check visibility flag - skip hidden tiers
            if not tf_tier_limits.docs_visible:
                summary['hidden_tiers'] += 1
                continue

            # Check if tier is in mapping at all
            if tf_tier_name not in self.mapping:
                drifts.append(DriftReport(
                    drift_type='unmapped_tier',
                    tier_name=tf_tier_name,
                    endpoint_name='*',
                    severity='warning',
                    message=f'New tier "{tf_tier_name}" found in Terraform but not in tier_mapping.json',
                    remediation=f'Add {tf_tier_name} to config/tier_mapping.json if it should be documented, or ignore if intentionally unreleased'
                ))
                summary['warning'] += 1
                continue

            # Get corresponding documentation tier using mapping
            mapping_info = self.mapping.get(tf_tier_name, {})
            doc_file = mapping_info.get('doc_file', '')

            # Find matching documentation tier by filename
            doc_tier_limits = self._find_doc_tier_by_file(
                documentation_spec.tiers,
                doc_file
            )

            if not doc_tier_limits:
                drifts.append(DriftReport(
                    drift_type='missing_tier_documentation',
                    tier_name=tf_tier_name,
                    endpoint_name='*',
                    severity='critical',
                    message=f'Tier {tf_tier_name} is in tier_mapping.json but documentation file not found (expected: {doc_file})',
                    remediation=f'Create documentation file {doc_file} in docs-v2 or update tier_mapping.json'
                ))
                summary['critical'] += 1
                continue

            # Compare endpoints within tier
            tier_drifts = self._compare_tier_endpoints(
                tf_tier_name,
                tf_tier_limits,
                doc_tier_limits
            )
            drifts.extend(tier_drifts)

        # Update summary counts
        for drift in drifts:
            if drift.severity == 'critical':
                summary['critical'] += 1
            elif drift.severity == 'warning':
                summary['warning'] += 1
            else:
                summary['info'] += 1

            if 'missing' in drift.drift_type or 'undocumented' in drift.drift_type:
                if 'missing_endpoint_in_terraform' in drift.drift_type:
                    summary['missing_endpoints'] += 1
                else:
                    summary['undocumented'] += 1
            elif 'mismatch' in drift.drift_type:
                summary['value_mismatches'] += 1

        summary['total_drifts'] = len(drifts)

        return ComparisonResult(
            timestamp=datetime.now().isoformat(),
            terraform_spec=terraform_spec,
            documentation_spec=documentation_spec,
            drifts=drifts,
            summary=summary,
            recommendations=self._generate_recommendations(drifts)
        )

    def _find_doc_tier_by_file(
        self,
        doc_tiers: Dict[str, TierLimits],
        doc_file: str
    ) -> TierLimits:
        """Find documentation tier by matching filename."""
        for tier in doc_tiers.values():
            if tier.terraform_name == doc_file:
                return tier
        return None

    def _compare_tier_endpoints(
        self,
        tier_name: str,
        tf_tier: TierLimits,
        doc_tier: TierLimits
    ) -> List[DriftReport]:
        """Compare individual endpoints within a tier."""
        drifts = []

        # Check each Terraform endpoint
        for endpoint_name, tf_limit in tf_tier.endpoints.items():
            doc_limit = doc_tier.endpoints.get(endpoint_name)

            if not doc_limit:
                # Endpoint in Terraform but not documented
                drifts.append(DriftReport(
                    drift_type='undocumented_endpoint',
                    tier_name=tier_name,
                    endpoint_name=endpoint_name,
                    terraform_value=tf_limit.burst_limit,
                    documented_value=None,
                    severity='warning',
                    message=f'Endpoint {endpoint_name} defined in Terraform but not documented',
                    remediation=f'Add {endpoint_name} to documentation for {tier_name}'
                ))
                continue

            # Compare burst limits
            if tf_limit.burst_limit and doc_limit.burst_limit:
                if tf_limit.burst_limit != doc_limit.burst_limit:
                    mismatch_pct = self._calculate_mismatch_percentage(
                        tf_limit.burst_limit,
                        doc_limit.burst_limit
                    )

                    severity = 'critical' if mismatch_pct > 20 else 'warning'

                    drifts.append(DriftReport(
                        drift_type='burst_value_mismatch',
                        tier_name=tier_name,
                        endpoint_name=endpoint_name,
                        terraform_value=tf_limit.burst_limit,
                        documented_value=doc_limit.burst_limit,
                        severity=severity,
                        message=f'Burst limit mismatch: Terraform={tf_limit.burst_limit}, Docs={doc_limit.burst_limit} ({mismatch_pct:.1f}% diff)',
                        remediation=f'Update documentation to {tf_limit.burst_limit} or verify Terraform value'
                    ))

            # Compare sustained limits
            if tf_limit.sustained_limit and doc_limit.sustained_limit:
                if tf_limit.sustained_limit != doc_limit.sustained_limit:
                    mismatch_pct = self._calculate_mismatch_percentage(
                        tf_limit.sustained_limit,
                        doc_limit.sustained_limit
                    )

                    severity = 'critical' if mismatch_pct > 20 else 'warning'

                    drifts.append(DriftReport(
                        drift_type='sustained_value_mismatch',
                        tier_name=tier_name,
                        endpoint_name=endpoint_name,
                        terraform_value=tf_limit.sustained_limit,
                        documented_value=doc_limit.sustained_limit,
                        severity=severity,
                        message=f'Sustained limit mismatch: Terraform={tf_limit.sustained_limit}/min, Docs={doc_limit.sustained_limit}/min ({mismatch_pct:.1f}% diff)',
                        remediation=f'Update documentation to {tf_limit.sustained_limit}/min or verify Terraform value'
                    ))

        # Check for endpoints in documentation but not in Terraform
        for endpoint_name, doc_limit in doc_tier.endpoints.items():
            if endpoint_name not in tf_tier.endpoints:
                drifts.append(DriftReport(
                    drift_type='missing_endpoint_in_terraform',
                    tier_name=tier_name,
                    endpoint_name=endpoint_name,
                    terraform_value=None,
                    documented_value=doc_limit.burst_limit,
                    severity='info',
                    message=f'Endpoint {endpoint_name} documented but not found in Terraform spec',
                    remediation=f'Add {endpoint_name} to Terraform or remove from documentation if deprecated'
                ))

        return drifts

    @staticmethod
    def _calculate_mismatch_percentage(value1: int, value2: int) -> float:
        """Calculate percentage difference between two values."""
        if value1 == 0:
            return 100.0 if value2 != 0 else 0.0

        return abs((value1 - value2) / value1) * 100

    @staticmethod
    def _generate_recommendations(drifts: List[DriftReport]) -> List[str]:
        """Generate actionable recommendations from drift findings."""
        recommendations = []

        critical_drifts = [d for d in drifts if d.severity == 'critical']
        if critical_drifts:
            recommendations.append(
                f'URGENT: {len(critical_drifts)} critical drift(s) detected. '
                'These should be addressed immediately to prevent customer confusion.'
            )

        # Group by type
        by_type = {}
        for drift in drifts:
            by_type.setdefault(drift.drift_type, []).append(drift)

        if by_type.get('undocumented_endpoint'):
            count = len(by_type['undocumented_endpoint'])
            recommendations.append(
                f'{count} endpoint(s) in Terraform lack documentation. '
                'Update docs-v2 to maintain documentation accuracy.'
            )

        if by_type.get('missing_endpoint_in_terraform'):
            count = len(by_type['missing_endpoint_in_terraform'])
            recommendations.append(
                f'{count} endpoint(s) are documented but missing from Terraform. '
                'Verify if these are legacy endpoints or need to be added to Terraform.'
            )

        if by_type.get('burst_value_mismatch') or by_type.get('sustained_value_mismatch'):
            mismatch_count = len(by_type.get('burst_value_mismatch', [])) + len(by_type.get('sustained_value_mismatch', []))
            recommendations.append(
                f'{mismatch_count} value mismatch(es) detected. '
                'Review and align Terraform and documentation values.'
            )

        if not recommendations:
            recommendations.append('No drift detected. Terraform and documentation are aligned.')

        return recommendations
