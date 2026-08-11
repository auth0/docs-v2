#!/usr/bin/env python3
"""
Automated sync script for GitHub Actions.
Parses ratelimits.txt and updates documentation files locally.
"""

import os
import sys
import re
from pathlib import Path

import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def parse_ratelimits_txt(content):
    """Parse ratelimits.txt markdown tables into structured data."""
    apis = {}
    current_api = None

    lines = content.split('\n')
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        # Look for API section headers
        if line.startswith('## ') and 'Rate Limits' in line:
            current_api = line.replace('##', '').replace('Rate Limits', '').strip()
            apis[current_api] = {'endpoints': []}
            i += 1
            continue

        # Parse table header and data rows
        if current_api and line.startswith('|') and 'Rate Limit' in line:
            # Found table header - skip header and separator
            i += 2

            # Parse data rows
            while i < len(lines):
                row = lines[i].strip()
                if not row.startswith('|'):
                    break

                cells = [c.strip() for c in row.split('|')[1:-1]]

                if len(cells) >= 15:  # Expecting all tier columns
                    endpoint_name = cells[0]
                    method = cells[1] if cells[1] != '-' else None

                    # Extract tier values (RPS, RPM pairs for each tier)
                    tiers = {
                        'Dev': {'rps': cells[2], 'rpm': cells[3]},
                        'Basic': {'rps': cells[4], 'rpm': cells[5]},
                        'Performance': {'rps': cells[6], 'rpm': cells[7]},
                        'Performance Plus': {'rps': cells[8], 'rpm': cells[9]},
                        '30X': {'rps': cells[10], 'rpm': cells[11]},
                        '60X': {'rps': cells[12], 'rpm': cells[13]},
                        '100X': {'rps': cells[14], 'rpm': cells[15] if len(cells) > 15 else '-'}
                    }

                    apis[current_api]['endpoints'].append({
                        'name': endpoint_name,
                        'method': method,
                        'tiers': tiers
                    })

                i += 1
            continue

        i += 1

    return apis


def generate_table_rows(endpoints, tier_name):
    """Generate HTML table rows for a given tier."""
    rows = []

    tier_mapping = {
        'tier-20-development-private-cloud': 'Dev',
        'tier-100-rps-private-cloud': 'Basic',
        'tier-500-rps-private-cloud': 'Performance',
        'tier-1500-rps-private-cloud': 'Performance Plus',
        'tier-3000-rps-private-cloud': '30X',
        'tier-6000-rps-private-cloud': '60X',
        'tier-10000-rps-private-cloud': '100X'
    }

    tier_key = tier_mapping.get(tier_name.replace('.mdx', ''))

    for endpoint in endpoints:
        tier_data = endpoint['tiers'].get(tier_key, {})
        rps = tier_data.get('rps', '-')
        rpm = tier_data.get('rpm', '-')

        # Format sustained limit
        if rpm != '-':
            sustained = f"{rpm}/minute"
        elif rps != '-':
            sustained = f"{rps}/second"
        else:
            sustained = '-'

        method_html = f'<code>{endpoint["method"]}</code>' if endpoint["method"] else '—'

        row = f'''<tr>
<td>{endpoint["name"]}</td>
<td>{method_html}</td>
<td>{rps}</td>
<td>{sustained}</td>
</tr>'''
        rows.append(row)

    return '\n'.join(rows)


def update_documentation_file(content, api_section, table_rows, api_name):
    """Update a specific API section in the documentation with new table rows."""

    # Find the accordion for this API
    accordion_pattern = rf'(<Accordion[^>]+title="[^"]*{re.escape(api_name)}[^"]*"[^>]*>)(.*?)(</Accordion>)'

    match = re.search(accordion_pattern, content, re.DOTALL | re.IGNORECASE)

    if not match:
        logger.warning(f"Could not find accordion for {api_name}")
        return content

    opening_tag = match.group(1)
    accordion_content = match.group(2)
    closing_tag = match.group(3)

    # Replace tbody content
    tbody_pattern = r'<tbody>(.*?)</tbody>'

    new_tbody = f'<tbody>\n{table_rows}\n</tbody>'

    if re.search(tbody_pattern, accordion_content, re.DOTALL):
        updated_accordion = re.sub(tbody_pattern, new_tbody, accordion_content, flags=re.DOTALL)
    else:
        logger.warning(f"Could not find tbody in {api_name} section")
        return content

    # Reconstruct full content
    updated_content = content[:match.start()] + opening_tag + updated_accordion + closing_tag + content[match.end():]

    return updated_content


def main():
    """Main execution function - updates local files."""

    print("\n" + "="*70)
    print("  Rate Limit Documentation Auto-Sync")
    print("="*70 + "\n")

    # Read ratelimits.txt from /tmp (fetched by workflow)
    ratelimits_path = '/tmp/ratelimits.txt'
    if not os.path.exists(ratelimits_path):
        logger.error(f"ratelimits.txt not found at {ratelimits_path}")
        sys.exit(1)

    logger.info(f"Reading {ratelimits_path}...")
    with open(ratelimits_path, 'r') as f:
        ratelimits_content = f.read()

    # Parse ratelimits.txt
    logger.info("Parsing ratelimits.txt...")
    apis = parse_ratelimits_txt(ratelimits_content)

    logger.info(f"Found {len(apis)} API sections")
    for api_name, api_data in apis.items():
        logger.info(f"  - {api_name}: {len(api_data['endpoints'])} endpoints")

    # Find documentation directory
    docs_base_path = Path('main/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/rate-limit-configurations')

    if not docs_base_path.exists():
        logger.error(f"Documentation directory not found: {docs_base_path}")
        sys.exit(1)

    # Update all tier files
    doc_files = [
        'tier-20-development-private-cloud.mdx',
        'tier-100-rps-private-cloud.mdx',
        'tier-500-rps-private-cloud.mdx',
        'tier-1500-rps-private-cloud.mdx',
        'tier-3000-rps-private-cloud.mdx',
        'tier-6000-rps-private-cloud.mdx',
        'tier-10000-rps-private-cloud.mdx'
    ]

    updated_count = 0

    for doc_file in doc_files:
        logger.info(f"\nProcessing {doc_file}...")

        try:
            file_path = docs_base_path / doc_file

            if not file_path.exists():
                logger.warning(f"  File not found: {file_path}")
                continue

            # Read current content
            with open(file_path, 'r') as f:
                current_content = f.read()

            updated_content = current_content

            # Update each API section
            for api_name, api_data in apis.items():
                table_rows = generate_table_rows(api_data['endpoints'], doc_file)
                updated_content = update_documentation_file(
                    updated_content,
                    api_data,
                    table_rows,
                    api_name
                )

            if updated_content == current_content:
                logger.info(f"  No changes needed")
                continue

            # Write updated content
            with open(file_path, 'w') as f:
                f.write(updated_content)

            logger.info(f"  ✅ Updated")
            updated_count += 1

            # Stage the file for git
            os.system(f'git add "{file_path}"')

        except Exception as e:
            logger.error(f"  ❌ Failed: {e}")
            import traceback
            traceback.print_exc()

    # Commit changes if any
    if updated_count > 0:
        logger.info(f"\n📝 Committing {updated_count} updated file(s)...")
        commit_message = f"Update rate limits across {updated_count} tier file(s)\n\nAuto-synced from atko-cic/layer0-base/docs/ratelimits.txt"
        os.system(f'git commit -m "{commit_message}"')

    print("\n" + "="*70)
    print(f"  ✅ Sync Complete! Updated {updated_count} file(s)")
    print("="*70 + "\n")


if __name__ == '__main__':
    main()
