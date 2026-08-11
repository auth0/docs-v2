"""CLI entry point for Auth0 Rate Limit Drift Monitor."""

import sys
import argparse
import logging
from pathlib import Path
from datetime import datetime

from .config import (
    load_tier_mapping,
    get_github_token,
    get_github_tokens,
    TERRAFORM_REPO,
    TERRAFORM_PATH,
    DOCS_REPO,
    DOCS_PATH,
    DEFAULT_OUTPUT_DIR
)
from .github_client import GitHubClient
from .parsers.terraform import TerraformParser
from .parsers.documentation import DocumentationParser
from .comparison import RateLimitComparator
from .reporting import ReportGenerator
from .pr_manager import PRManager
from .models import RateLimitSpecification, TierLimits


def setup_logging(verbose: bool = False):
    """Configure logging."""
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description='Auth0 Rate Limit Drift Monitoring Agent',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    parser.add_argument(
        '--output-dir',
        type=str,
        default=DEFAULT_OUTPUT_DIR,
        help=f'Report output directory (default: {DEFAULT_OUTPUT_DIR})'
    )

    parser.add_argument(
        '--github-token',
        type=str,
        help='GitHub token (or use GITHUB_TOKEN env var or gh CLI)'
    )

    parser.add_argument(
        '--create-issue',
        action='store_true',
        help='Create GitHub issue if critical drifts found'
    )

    parser.add_argument(
        '--create-pr',
        action='store_true',
        help='Create GitHub pull request to fix drifts'
    )

    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Enable debug logging'
    )

    parser.add_argument(
        '--config',
        type=str,
        help='Path to tier_mapping.json config file'
    )

    args = parser.parse_args()

    # Setup logging
    setup_logging(args.verbose)
    logger = logging.getLogger(__name__)

    try:
        # Get GitHub tokens (supports separate tokens for different repos)
        if args.github_token:
            # Single token provided via CLI
            tokens = {'atko': args.github_token, 'auth0': args.github_token}
            logger.info('Using token from --github-token argument')
        else:
            # Try multi-token support
            tokens = get_github_tokens()
            if tokens['atko'] == tokens['auth0']:
                logger.info('Using single token for both repositories')
            else:
                logger.info('Using separate tokens for atko-cic and auth0 repos')

        logger.info('Starting drift monitoring...')

        # Load configuration
        logger.info('Loading tier mapping configuration...')
        tier_mapping = load_tier_mapping(args.config)
        logger.info(f'Loaded mapping for {len(tier_mapping)} tiers')

        # Initialize components with separate clients
        atko_client = GitHubClient(tokens['atko'])
        auth0_client = GitHubClient(tokens['auth0'])
        tf_parser = TerraformParser()
        doc_parser = DocumentationParser()
        comparator = RateLimitComparator(tier_mapping)

        # Fetch Terraform spec (using atko client for private repo)
        logger.info(f'Fetching Terraform spec from {TERRAFORM_REPO}...')
        tf_content, tf_timestamp = atko_client.fetch_terraform_spec(
            TERRAFORM_REPO,
            TERRAFORM_PATH
        )
        logger.info(f'Successfully fetched Terraform spec ({len(tf_content)} bytes)')

        # Fetch documentation files (using auth0 client for public repo)
        logger.info(f'Fetching documentation files from {DOCS_REPO}...')
        doc_files = auth0_client.fetch_documentation_files(DOCS_REPO, DOCS_PATH)
        logger.info(f'Successfully fetched {len(doc_files)} documentation files')

        # Parse Terraform
        logger.info('Parsing Terraform HCL...')
        tf_raw = tf_parser.parse_locals_block(tf_content)
        tf_normalized = tf_parser.normalize_terraform_tiers(tf_raw, tier_mapping)
        tf_spec = RateLimitSpecification(
            source='terraform',
            timestamp=datetime.now().isoformat(),
            tiers=tf_normalized,
            raw_data=tf_raw
        )
        logger.info(f'Parsed {len(tf_normalized)} Terraform tiers')

        # Parse documentation
        logger.info('Parsing documentation MDX files...')
        doc_tiers = {}
        for filename, (content, _) in doc_files.items():
            tier_name = filename
            endpoints = doc_parser.parse_mdx_file(content)

            doc_tiers[filename] = TierLimits(
                tier_name=tier_name,
                terraform_name=filename,
                code_tier=tier_name,
                auth_api_burst=0,  # Will be determined by comparison
                mgmt_api_burst=0,
                endpoints=endpoints,
                source='documentation'
            )

        doc_spec = RateLimitSpecification(
            source='documentation',
            timestamp=datetime.now().isoformat(),
            tiers=doc_tiers
        )
        logger.info(f'Parsed {len(doc_tiers)} documentation tiers with {sum(len(t.endpoints) for t in doc_tiers.values())} total endpoints')

        # Compare
        logger.info('Comparing specifications...')
        comparison = comparator.compare(tf_spec, doc_spec)

        # Log summary
        logger.info('--- Drift Detection Summary ---')
        logger.info(f'Total Drifts: {comparison.summary["total_drifts"]}')
        logger.info(f'Critical: {comparison.summary["critical"]}')
        logger.info(f'Warnings: {comparison.summary["warning"]}')
        logger.info(f'Info: {comparison.summary["info"]}')

        # Generate reports
        logger.info('Generating reports...')
        output_dir = Path(args.output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

        # JSON report
        json_report = ReportGenerator.generate_json_report(comparison)
        json_path = output_dir / f'drift_report_{timestamp}.json'
        json_path.write_text(json_report)
        logger.info(f'JSON report: {json_path}')

        # Markdown report
        md_report = ReportGenerator.generate_markdown_report(comparison)
        md_path = output_dir / f'drift_report_{timestamp}.md'
        md_path.write_text(md_report)
        logger.info(f'Markdown report: {md_path}')

        # Latest symlinks
        latest_json = output_dir / 'drift_report_latest.json'
        latest_json.write_text(json_report)

        latest_md = output_dir / 'drift_report_latest.md'
        latest_md.write_text(md_report)
        logger.info('Updated latest reports')

        # Create GitHub issue if requested and critical drifts found
        if args.create_issue and comparison.summary['critical'] > 0:
            logger.info('Creating GitHub issue for critical drifts...')
            issue_format = ReportGenerator.generate_github_issue_format(comparison, DOCS_REPO)

            try:
                issue_url = auth0_client.create_github_issue(
                    DOCS_REPO,
                    issue_format['title'],
                    issue_format['body'],
                    issue_format['labels']
                )
                logger.info(f'✅ Created GitHub issue: {issue_url}')
            except Exception as e:
                logger.error(f'Failed to create GitHub issue: {e}')

        # Create PR if requested
        if args.create_pr and comparison.summary['total_drifts'] > 0:
            logger.info('Creating GitHub pull request to fix drifts...')

            try:
                pr_manager = PRManager(auth0_client, tier_mapping)
                pr_url = pr_manager.create_pr_for_drifts(comparison, DOCS_REPO)

                if pr_url:
                    logger.info(f'✅ Created pull request: {pr_url}')
                else:
                    logger.warning('No PR created (no fixable drifts or no changes generated)')

            except Exception as e:
                logger.error(f'Failed to create pull request: {e}', exc_info=True)

        # Print recommendations
        if comparison.recommendations:
            logger.info('\n--- Recommendations ---')
            for rec in comparison.recommendations:
                logger.info(f'  - {rec}')

        logger.info('\nDrift monitoring complete!')

        # Exit with error code if critical drifts found
        if comparison.summary['critical'] > 0:
            sys.exit(1)
        else:
            sys.exit(0)

    except Exception as e:
        logger.error(f'Error during drift monitoring: {e}', exc_info=True)
        sys.exit(2)


if __name__ == '__main__':
    main()
