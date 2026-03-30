"""Configuration and constants for drift monitor."""

import json
import os
from pathlib import Path
from typing import Dict

# Repository configurations
TERRAFORM_REPO = "atko-cic/layer0-base"
TERRAFORM_PATH = "terraform/v2/modules/auth0/services/rate-limits-api2.tf"

DOCS_REPO = "auth0/docs-v2"
DOCS_PATH = "main/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/rate-limit-configurations"

# Drift detection thresholds
DRIFT_THRESHOLD_PERCENT = 20  # >20% difference = CRITICAL

# Default output directory
DEFAULT_OUTPUT_DIR = "./reports"


def load_tier_mapping(config_path: str = None) -> Dict:
    """
    Load tier mapping configuration from JSON file.

    Args:
        config_path: Path to tier_mapping.json (default: config/tier_mapping.json)

    Returns:
        Dict with tier mapping configuration
    """
    if config_path is None:
        # Try to find config file relative to this module
        module_dir = Path(__file__).parent
        config_path = module_dir.parent / "config" / "tier_mapping.json"

    config_path = Path(config_path)

    if not config_path.exists():
        raise FileNotFoundError(f"Tier mapping config not found: {config_path}")

    with open(config_path, 'r') as f:
        return json.load(f)


def get_github_token() -> str:
    """
    Get GitHub token from environment.

    Tries in order:
    1. GITHUB_TOKEN environment variable
    2. gh CLI auth token

    Returns:
        GitHub token string

    Raises:
        ValueError: If no token found
    """
    # Try environment variable first
    token = os.getenv('GITHUB_TOKEN')
    if token:
        return token

    # Try gh CLI
    try:
        import subprocess
        result = subprocess.run(
            ['gh', 'auth', 'token'],
            capture_output=True,
            text=True,
            check=True
        )
        token = result.stdout.strip()
        if token:
            return token
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass

    raise ValueError(
        "No GitHub token found. Set GITHUB_TOKEN environment variable "
        "or authenticate with 'gh auth login'"
    )


def get_github_tokens() -> dict:
    """
    Get GitHub tokens for different repositories.

    Supports separate tokens for private (atko-cic) and public (auth0) repos.

    Environment variables:
    - GITHUB_TOKEN_ATKO: Token for atko-cic/layer0-base (private)
    - GITHUB_TOKEN_AUTH0: Token for auth0/docs-v2 (public)
    - GITHUB_TOKEN: Fallback token for both (if separate tokens not provided)

    Returns:
        Dict with 'atko' and 'auth0' keys containing tokens
    """
    tokens = {}

    # Try specific tokens first
    atko_token = os.getenv('GITHUB_TOKEN_ATKO')
    auth0_token = os.getenv('GITHUB_TOKEN_AUTH0')

    # Fallback to general token
    general_token = os.getenv('GITHUB_TOKEN')

    # Try gh CLI if no env vars
    if not general_token and not atko_token and not auth0_token:
        try:
            import subprocess
            result = subprocess.run(
                ['gh', 'auth', 'token'],
                capture_output=True,
                text=True,
                check=True
            )
            general_token = result.stdout.strip()
        except (subprocess.CalledProcessError, FileNotFoundError):
            pass

    tokens['atko'] = atko_token or general_token
    tokens['auth0'] = auth0_token or general_token

    if not tokens['atko'] or not tokens['auth0']:
        raise ValueError(
            "No GitHub tokens found. Either:\n"
            "1. Set GITHUB_TOKEN for both repos, OR\n"
            "2. Set GITHUB_TOKEN_ATKO and GITHUB_TOKEN_AUTH0 separately"
        )

    return tokens
