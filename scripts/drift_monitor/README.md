# Rate Limit Drift Monitor

Automated system to detect and sync rate limit documentation between engineering's source of truth (`atko-cic/layer0-base`) and customer-facing documentation (`auth0/docs-v2`).

## Problem

Auth0 Rate Limit Policy docs are perpetually out of sync with Rate Limit Policy schemas in the code. Engineering maintains rate limit configurations in `layer0-base/docs/ratelimits.txt`, which must be accurately reflected across 7 Private Cloud tier documentation files. Manual updates are error-prone and time-consuming.

## Solution

This tool provides:

1. **Drift Detection** - Compares engineering's source data with documentation
2. **Automated Sync** - Creates PRs automatically when changes are detected
3. **Continuous Monitoring** - Can run on schedule to catch any drift

## Architecture

```
┌─────────────────────────────────┐
│ atko-cic/layer0-base            │
│ docs/ratelimits.txt             │
│ (Engineering Source of Truth)   │
└────────────┬────────────────────┘
             │
             │ Fetched via GitHub API
             │
             ↓
┌─────────────────────────────────┐
│ Drift Monitor (this tool)       │
│ - Parses source data            │
│ - Compares with docs            │
│ - Generates updates             │
└────────────┬────────────────────┘
             │
             │ Creates PR if drift detected
             │
             ↓
┌─────────────────────────────────┐
│ auth0/docs-v2                   │
│ Rate limit documentation        │
│ (Customer-facing)               │
└─────────────────────────────────┘
```

## Prerequisites

- Python 3.11+
- GitHub CLI (`gh`) authenticated
- Access to both `auth0/docs-v2` and `atko-cic/layer0-base` repositories

## Installation

```bash
cd scripts/drift_monitor

# Install dependencies
pip install -r requirements.txt
```

## Usage

### Command Line (Manual Drift Detection)

```bash
# Run drift detection
python3 -m drift_monitor.cli

# Output formats
python3 -m drift_monitor.cli --output-format json
python3 -m drift_monitor.cli --output-format markdown
python3 -m drift_monitor.cli --output-format github-issue

# Verbose output
python3 -m drift_monitor.cli --verbose
```

### Environment Variables

```bash
# Required for GitHub API access
export GITHUB_TOKEN_AUTH0="ghp_..."  # Token for docs-v2
export ATKO_TOKEN="ghp_..."          # Token for layer0-base (read access)
```

## Configuration

### Tier Mapping

The tool maps Terraform tier names to documentation files. Edit `config.py` to modify:

```python
TIER_MAPPING = {
    'TIER_INTERNAL_DEV': 'tier-20-development-private-cloud',
    'TIER_BASIC': 'tier-100-rps-private-cloud',
    'TIER_PERFORMANCE': 'tier-500-rps-private-cloud',
    'TIER_PERFORMANCE_PLUS': 'tier-1500-rps-private-cloud',
    'TIER_PERFORMANCE_30X': 'tier-3000-rps-private-cloud',
    'TIER_PERFORMANCE_60X': 'tier-6000-rps-private-cloud',
    'TIER_PERFORMANCE_100X': 'tier-10000-rps-private-cloud',
}
```

## Automated Sync

To enable automated PR creation when drift is detected, use the `auto_sync.py` script:

```bash
python3 -m drift_monitor.auto_sync
```

This will:
1. Fetch latest `ratelimits.txt` from layer0-base
2. Parse all API sections
3. Generate updated HTML tables for each tier
4. Update all 7 tier MDX files locally
5. Commit changes to new branch
6. Create PR with detailed description

## GitHub Actions Integration

For continuous monitoring, set up a GitHub Action workflow (see `.github/workflows/sync-rate-limits.yml` example in the RFD documentation).

The workflow should:
- Run on schedule (e.g., daily at 9 AM UTC)
- Support manual trigger
- Check for existing PRs to avoid duplicates
- Include source commit SHA and author in PR description

## Data Sources

### Primary Source: ratelimits.txt

Engineering maintains a curated markdown file with rate limits:

**Location:** `atko-cic/layer0-base/docs/ratelimits.txt`

**Format:**
```markdown
## API2 Rate Limits

| Rate Limit | Type | Dev (RPS) | Dev (RPM) | Basic (RPS) | ... |
|------------|------|-----------|-----------|-------------|-----|
| MGMT API Prod | - | 50 | - | 250 | 250 | ... |
| Organizations Read | GET | 10 | 100 | 10 | 100 | ... |
```

**Contains 7 tier columns:**
- Dev (20 RPS)
- Basic (100 RPS)
- Performance (500 RPS)
- Performance Plus (1500 RPS)
- Performance 30X (3000 RPS)
- Performance 60X (6000 RPS)
- Performance 100X (10000 RPS)

### Documentation Target

**Location:** `main/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/rate-limit-configurations/`

**Files:**
- `tier-20-development-private-cloud.mdx`
- `tier-100-rps-private-cloud.mdx`
- `tier-500-rps-private-cloud.mdx`
- `tier-1500-rps-private-cloud.mdx`
- `tier-3000-rps-private-cloud.mdx`
- `tier-6000-rps-private-cloud.mdx`
- `tier-10000-rps-private-cloud.mdx`

## Components

- **`cli.py`** - Command-line interface
- **`config.py`** - Configuration and tier mappings
- **`models.py`** - Data models for rate limits
- **`parsers/`** - Parsers for different source formats:
  - `ratelimits.py` - Parses ratelimits.txt markdown tables
  - `documentation.py` - Parses MDX documentation files
  - `terraform.py` - (Legacy) Terraform/HCL parser
- **`comparison.py`** - Drift detection logic
- **`reporting.py`** - Report generation (JSON, Markdown, GitHub Issue)
- **`github_client.py`** - GitHub API client
- **`pr_manager.py`** - PR creation and management
- **`mdx_updater.py`** - Updates MDX files with new rate limits
- **`auto_sync.py`** - Automated sync script

## Example Output

### Drift Detection Report

```
Rate Limit Drift Report
Generated: 2026-02-25 17:40:00 UTC

Summary:
  Total Drifts: 12
  Critical: 2
  Warning: 8
  Info: 2

Critical Drifts:
  1. tier-500-rps-private-cloud.mdx
     Endpoint: Organizations Read
     Source: 50 RPS / 500/minute
     Docs: 10 RPS / 100/minute
     Severity: CRITICAL
```

### Automated PR

**Title:** 🔄 Sync rate limits from layer0-base

**Description includes:**
- Source commit SHA and link
- List of updated files
- Summary of changes
- Review checklist
- Link to workflow run

## Troubleshooting

### "Failed to fetch ratelimits.txt"

- Verify `ATKO_TOKEN` has access to `atko-cic/layer0-base`
- Check SAML SSO is authorized
- Verify token hasn't expired

### "No changes detected" but you know there are changes

- Check tier mapping is correct in `config.py`
- Verify endpoint names match exactly
- Run with `--verbose` to see comparison details

### PR creation fails

- Check for existing open PRs
- Verify bot has write permissions
- Review logs for errors

## Performance

- Drift detection: ~5-10 seconds
- PR creation: ~30-60 seconds
- API calls: ~15-20 per run (well within GitHub rate limits)

## Security

- No secrets in code or configuration files
- All tokens stored in environment variables (or GitHub Secrets for Actions)
- PRs created by bot account, not personal accounts
- All changes require human review before merge
- Read-only access to layer0-base (no writes)

## Contributing

1. Create feature branch
2. Write tests first
3. Implement feature
4. Update documentation
5. Submit PR

## Documentation

See `/Users/nick.gagliardi/Downloads/DOCS-RFD_ Rate Limit Drift Monitor-250226-221437.pdf` for comprehensive RFD documentation.
