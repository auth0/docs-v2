"""PR Manager for creating documentation fix pull requests."""

import logging
from datetime import datetime
from typing import Dict, List
from .models import ComparisonResult, RateLimitSpecification
from .github_client import GitHubClient
from .mdx_updater import MDXUpdater
from .config import DOCS_REPO, DOCS_PATH


class PRManager:
    """Manage creation of pull requests to fix drift."""

    def __init__(self, github_client: GitHubClient, tier_mapping: Dict):
        """
        Initialize PR Manager.

        Args:
            github_client: Configured GitHub client
            tier_mapping: Tier mapping configuration
        """
        self.github_client = github_client
        self.tier_mapping = tier_mapping
        self.mdx_updater = MDXUpdater()
        self.logger = logging.getLogger(__name__)

    def create_pr_for_drifts(
        self,
        comparison: ComparisonResult,
        repo: str = DOCS_REPO
    ) -> str:
        """
        Create a pull request to fix documentation drift.

        Args:
            comparison: Comparison result with drift findings
            repo: Target repository (default: auth0/docs-v2)

        Returns:
            PR URL
        """
        self.logger.info(f"Creating PR in {repo}...")

        # Filter for fixable drifts
        fixable_drifts = [
            d for d in comparison.drifts
            if d.drift_type in [
                'burst_value_mismatch',
                'sustained_value_mismatch',
                'undocumented_endpoint'  # Can now add missing endpoints
            ]
        ]

        if not fixable_drifts:
            self.logger.warning("No fixable drifts found")
            return None

        self.logger.info(f"Found {len(fixable_drifts)} fixable drift(s)")

        # Group drifts by documentation file
        drifts_by_file = self._group_drifts_by_file(fixable_drifts)

        self.logger.info(f"Will update {len(drifts_by_file)} file(s)")

        # Get base branch
        base_branch, base_sha = self.github_client.get_default_branch_ref(repo)
        self.logger.info(f"Base branch: {base_branch} (SHA: {base_sha[:8]})")

        # Create feature branch
        timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
        branch_name = f"drift-monitor/rate-limits-{timestamp}"

        self.logger.info(f"Creating branch: {branch_name}")
        self.github_client.create_branch(repo, branch_name, base_sha)

        # Update each affected file
        changes_by_file = {}

        for doc_file, file_drifts in drifts_by_file.items():
            self.logger.info(f"Processing {doc_file}...")

            # Get Terraform endpoints for this tier
            tf_tier = self._find_terraform_tier_for_doc_file(
                doc_file,
                comparison.terraform_spec
            )

            if not tf_tier:
                self.logger.warning(f"Could not find Terraform tier for {doc_file}")
                continue

            # Fetch current file content
            file_path = f"{DOCS_PATH}/{doc_file}"
            try:
                doc_files_dict = self.github_client.fetch_documentation_files(
                    repo,
                    DOCS_PATH
                )
                if doc_file not in doc_files_dict:
                    self.logger.warning(f"Could not fetch {doc_file}")
                    continue

                mdx_content, _ = doc_files_dict[doc_file]

            except Exception as e:
                self.logger.error(f"Failed to fetch {doc_file}: {e}")
                continue

            # Update the content
            updated_content, changes = self.mdx_updater.update_mdx_file(
                mdx_content,
                file_drifts,
                tf_tier.endpoints
            )

            if not changes:
                self.logger.warning(f"No changes generated for {doc_file}")
                continue

            changes_by_file[doc_file] = changes

            # Commit the updated file
            commit_message = f"Update rate limits in {doc_file}\n\n{chr(10).join('- ' + c for c in changes)}"

            self.logger.info(f"Committing changes to {doc_file}...")
            self.github_client.update_file(
                repo,
                branch_name,
                file_path,
                updated_content,
                commit_message
            )

        if not changes_by_file:
            self.logger.warning("No changes were committed")
            return None

        # Generate PR description
        pr_body = self.mdx_updater.generate_pr_description(
            comparison.drifts,
            changes_by_file
        )

        # Create PR
        pr_title = f"🔄 Update rate limit documentation ({len(changes_by_file)} file(s))"

        self.logger.info("Creating pull request...")
        pr_url = self.github_client.create_pull_request(
            repo,
            pr_title,
            pr_body,
            branch_name,
            base_branch
        )

        self.logger.info(f"✅ PR created: {pr_url}")
        return pr_url

    def _group_drifts_by_file(self, drifts) -> Dict[str, List]:
        """Group drifts by their documentation file."""
        by_file = {}

        for drift in drifts:
            # Find the doc file for this tier
            doc_file = self._get_doc_file_for_tier(drift.tier_name)

            if not doc_file:
                continue

            if doc_file not in by_file:
                by_file[doc_file] = []

            by_file[doc_file].append(drift)

        return by_file

    def _get_doc_file_for_tier(self, tier_name: str) -> str:
        """Get documentation filename for a Terraform tier."""
        mapping = self.tier_mapping.get(tier_name, {})
        return mapping.get('doc_file')

    def _find_terraform_tier_for_doc_file(
        self,
        doc_file: str,
        tf_spec: RateLimitSpecification
    ):
        """Find the Terraform tier that corresponds to a doc file."""
        # Find tier by matching doc_file in mapping
        for tier_name, mapping_info in self.tier_mapping.items():
            if mapping_info.get('doc_file') == doc_file:
                # Return the TierLimits from Terraform spec
                return tf_spec.tiers.get(tier_name)

        return None
