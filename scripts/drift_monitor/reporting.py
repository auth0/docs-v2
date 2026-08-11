"""Report generators for drift monitoring results."""

import json
from typing import Dict
from .models import ComparisonResult, DriftReport


class ReportGenerator:
    """Generate different report formats for drift detection results."""

    @staticmethod
    def generate_json_report(comparison: ComparisonResult) -> str:
        """
        Generate detailed JSON report.

        Args:
            comparison: Comparison result with drift findings

        Returns:
            JSON string
        """
        report = {
            'metadata': {
                'timestamp': comparison.timestamp,
                'terraform_source': comparison.terraform_spec.source,
                'documentation_source': comparison.documentation_spec.source,
                'total_tiers_compared': len(comparison.terraform_spec.tiers)
            },
            'summary': comparison.summary,
            'recommendations': comparison.recommendations,
            'drifts': [
                {
                    'type': drift.drift_type,
                    'tier': drift.tier_name,
                    'endpoint': drift.endpoint_name,
                    'severity': drift.severity,
                    'terraform_value': drift.terraform_value,
                    'documented_value': drift.documented_value,
                    'message': drift.message,
                    'remediation': drift.remediation
                }
                for drift in comparison.drifts
            ]
        }
        return json.dumps(report, indent=2)

    @staticmethod
    def generate_markdown_report(comparison: ComparisonResult) -> str:
        """
        Generate human-readable Markdown report.

        Args:
            comparison: Comparison result with drift findings

        Returns:
            Markdown string
        """
        lines = []

        # Header
        lines.append('# Auth0 Rate Limit Drift Report\n')
        lines.append(f'**Generated:** {comparison.timestamp}\n')
        lines.append('')

        # Summary
        summary = comparison.summary
        lines.append('## Summary\n')
        lines.append(f'- **Total Drifts:** {summary["total_drifts"]}')
        lines.append(f'- **Critical:** {summary["critical"]} ⚠️')
        lines.append(f'- **Warnings:** {summary["warning"]}')
        lines.append(f'- **Info:** {summary["info"]}')
        lines.append('')
        lines.append(f'- **Undocumented Endpoints:** {summary["undocumented"]}')
        lines.append(f'- **Value Mismatches:** {summary["value_mismatches"]}')
        lines.append(f'- **Missing in Terraform:** {summary["missing_endpoints"]}')
        if summary.get("hidden_tiers", 0) > 0:
            lines.append(f'- **Hidden Tiers:** {summary["hidden_tiers"]} (intentionally excluded from monitoring)')
        lines.append('')

        # Recommendations
        if comparison.recommendations:
            lines.append('## Recommendations\n')
            for i, rec in enumerate(comparison.recommendations, 1):
                lines.append(f'{i}. {rec}')
            lines.append('')

        # Drifts by severity
        if comparison.drifts:
            lines.append('## Drifts by Severity\n')

            # Critical drifts
            critical = [d for d in comparison.drifts if d.severity == 'critical']
            if critical:
                lines.append('### Critical Issues ⚠️\n')
                lines.append(ReportGenerator._format_drift_table(critical))
                lines.append('')

            # Warnings
            warnings = [d for d in comparison.drifts if d.severity == 'warning']
            if warnings:
                lines.append('### Warnings\n')
                lines.append(ReportGenerator._format_drift_table(warnings))
                lines.append('')

            # Info
            info = [d for d in comparison.drifts if d.severity == 'info']
            if info:
                lines.append('### Informational\n')
                lines.append(ReportGenerator._format_drift_table(info))
                lines.append('')

        # Drifts by tier
        if comparison.drifts:
            lines.append('## Drifts by Tier\n')
            drifts_by_tier = {}
            for drift in comparison.drifts:
                if drift.tier_name not in drifts_by_tier:
                    drifts_by_tier[drift.tier_name] = []
                drifts_by_tier[drift.tier_name].append(drift)

            for tier_name in sorted(drifts_by_tier.keys()):
                tier_drifts = drifts_by_tier[tier_name]
                lines.append(f'### {tier_name}\n')
                lines.append(f'**Drifts:** {len(tier_drifts)}\n')
                lines.append(ReportGenerator._format_drift_table(tier_drifts))
                lines.append('')

        return '\n'.join(lines)

    @staticmethod
    def _format_drift_table(drifts: list[DriftReport]) -> str:
        """Format a list of drifts as a markdown table."""
        lines = []

        # Table header
        lines.append('| Endpoint | Type | TF Value | Doc Value | Message |')
        lines.append('|----------|------|----------|-----------|---------|')

        # Table rows
        for drift in drifts:
            tf_val = str(drift.terraform_value) if drift.terraform_value is not None else 'N/A'
            doc_val = str(drift.documented_value) if drift.documented_value is not None else 'N/A'
            message = drift.message[:80] + '...' if len(drift.message) > 80 else drift.message

            lines.append(
                f'| {drift.endpoint_name} | '
                f'{drift.drift_type} | '
                f'{tf_val} | '
                f'{doc_val} | '
                f'{message} |'
            )

        return '\n'.join(lines)

    @staticmethod
    def generate_github_issue_format(
        comparison: ComparisonResult,
        repo: str = "auth0/docs-v2"
    ) -> Dict[str, str]:
        """
        Generate GitHub issue format for drift report.

        Args:
            comparison: Comparison result
            repo: Target repository for issue

        Returns:
            Dict with 'title', 'body', and 'labels'
        """
        critical_count = comparison.summary['critical']
        total_count = comparison.summary['total_drifts']

        # Title
        if critical_count > 0:
            title = f'🚨 Rate Limit Drift: {critical_count} Critical Issue(s) Detected'
        else:
            title = f'Rate Limit Drift: {total_count} Issue(s) Detected'

        # Body - generate condensed version for GitHub (65KB limit)
        lines = []

        lines.append('# Auth0 Rate Limit Drift Report\n')
        lines.append(f'**Generated:** {comparison.timestamp}\n')
        lines.append('')

        # Summary
        summary = comparison.summary
        lines.append('## Summary\n')
        lines.append(f'- **Total Drifts:** {summary["total_drifts"]}')
        lines.append(f'- **Critical:** {summary["critical"]} ⚠️')
        lines.append(f'- **Warnings:** {summary["warning"]}')
        lines.append(f'- **Info:** {summary["info"]}')
        if summary.get("hidden_tiers", 0) > 0:
            lines.append(f'- **Hidden Tiers:** {summary["hidden_tiers"]} (intentionally excluded from monitoring)')
        lines.append('')

        # Recommendations
        if comparison.recommendations:
            lines.append('## Recommendations\n')
            for i, rec in enumerate(comparison.recommendations, 1):
                lines.append(f'{i}. {rec}')
            lines.append('')

        # Critical drifts only (condensed)
        critical = [d for d in comparison.drifts if d.severity == 'critical']
        if critical:
            lines.append('## Critical Issues\n')
            for drift in critical[:10]:  # Limit to first 10
                lines.append(f'- **{drift.tier_name}** / {drift.endpoint_name}: {drift.message}')
            lines.append('')

        # Warning summary (don't list all)
        warnings = [d for d in comparison.drifts if d.severity == 'warning']
        if warnings:
            lines.append(f'## Warnings ({len(warnings)} total)\n')

            # Group by tier
            by_tier = {}
            for w in warnings:
                by_tier.setdefault(w.tier_name, []).append(w)

            for tier, tier_warnings in list(by_tier.items())[:5]:  # First 5 tiers
                lines.append(f'### {tier} ({len(tier_warnings)} warnings)')
                for w in tier_warnings[:5]:  # First 5 per tier
                    lines.append(f'- `{w.endpoint_name}`: {w.drift_type}')
                if len(tier_warnings) > 5:
                    lines.append(f'- _...and {len(tier_warnings) - 5} more_')
                lines.append('')

        # Link to full report
        lines.append('## Full Report\n')
        lines.append('Due to GitHub issue size limits, this is a condensed summary.')
        lines.append('For the complete drift analysis, see the attached report artifacts or run the tool locally.')
        lines.append('')

        # Footer
        lines.append('---\n')
        lines.append('_This issue was automatically generated by the Auth0 Rate Limit Drift Monitor._\n')
        lines.append(f'_Terraform Source: `atko-cic/layer0-base/terraform/v2/modules/auth0/services/rate-limits-api2.tf`_')

        body = '\n'.join(lines)

        return {
            'title': title,
            'body': body,
            'labels': ['drift-detection', 'rate-limits', 'documentation']
        }
