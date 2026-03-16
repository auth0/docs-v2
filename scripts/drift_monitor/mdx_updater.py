"""MDX file updater for fixing rate limit drift."""

import re
from typing import Dict, List, Tuple
from .models import DriftReport, EndpointLimit


class MDXUpdater:
    """Update MDX files to fix rate limit drift."""

    def update_mdx_file(
        self,
        mdx_content: str,
        drifts: List[DriftReport],
        terraform_endpoints: Dict[str, EndpointLimit]
    ) -> Tuple[str, List[str]]:
        """
        Update MDX file content with correct values from Terraform.

        Args:
            mdx_content: Original MDX file content
            drifts: List of drift reports for this tier
            terraform_endpoints: Endpoint limits from Terraform

        Returns:
            Tuple of (updated_content, list_of_changes)
        """
        updated_content = mdx_content
        changes = []

        # Only process drifts that need fixing
        for drift in drifts:
            if drift.drift_type in ['burst_value_mismatch', 'sustained_value_mismatch']:
                endpoint_name = drift.endpoint_name
                tf_endpoint = terraform_endpoints.get(endpoint_name)

                if not tf_endpoint:
                    continue

                # Try to update this endpoint in the HTML table
                result = self._update_endpoint_in_table(
                    updated_content,
                    endpoint_name,
                    tf_endpoint,
                    drift.drift_type
                )

                if result:
                    updated_content, change_msg = result
                    changes.append(change_msg)

            elif drift.drift_type == 'undocumented_endpoint':
                # Auto-add new endpoint row to table
                endpoint_name = drift.endpoint_name
                tf_endpoint = terraform_endpoints.get(endpoint_name)

                if not tf_endpoint:
                    continue

                # Try to add this endpoint to the Management API table
                result = self._add_endpoint_to_table(
                    updated_content,
                    endpoint_name,
                    tf_endpoint
                )

                if result:
                    updated_content, change_msg = result
                    changes.append(change_msg)

        return updated_content, changes

    def _update_endpoint_in_table(
        self,
        content: str,
        endpoint_name: str,
        tf_endpoint: EndpointLimit,
        drift_type: str
    ) -> Tuple[str, str]:
        """
        Update a specific endpoint in HTML table.

        Args:
            content: MDX content
            endpoint_name: Endpoint to update (snake_case)
            tf_endpoint: Correct values from Terraform
            drift_type: Type of drift being fixed

        Returns:
            Tuple of (updated_content, change_description) or None if not found
        """
        # Convert endpoint_name to display format for matching
        # e.g., "user_info" -> "User Info"
        display_name = self._to_display_name(endpoint_name)

        # Pattern to match table rows
        # Matches: <tr>...</tr> blocks
        tr_pattern = r'<tr>(.*?)</tr>'

        matches = list(re.finditer(tr_pattern, content, re.DOTALL | re.IGNORECASE))

        for match in matches:
            row_content = match.group(1)

            # Check if this row contains our endpoint
            if display_name.lower() not in row_content.lower():
                continue

            # Extract current values
            td_pattern = r'<td[^>]*>(.*?)</td>'
            cells = re.findall(td_pattern, row_content, re.DOTALL | re.IGNORECASE)

            if len(cells) < 4:
                continue  # Not enough columns

            # Typical format:
            # [0] = Endpoint name/link
            # [1] = Method (GET/POST)
            # [2] = Burst limit
            # [3] = Sustained limit
            # [4] = Limit Type (optional)

            # Update the row
            new_row = match.group(0)

            if drift_type == 'burst_value_mismatch':
                # Update burst limit (typically 3rd column, index 2)
                new_row = self._update_cell_value(
                    new_row,
                    cell_index=2,
                    new_value=str(tf_endpoint.burst_limit)
                )
                change_msg = (
                    f"Updated '{display_name}' burst limit: "
                    f"{cells[2].strip()} → {tf_endpoint.burst_limit}"
                )

            elif drift_type == 'sustained_value_mismatch':
                # Update sustained limit (typically 4th column, index 3)
                # Need to preserve the time unit (e.g., "/minute", "/second")
                old_sustained = cells[3].strip()
                time_unit = self._extract_time_unit(old_sustained)
                new_value = f"{tf_endpoint.sustained_limit}{time_unit}"

                new_row = self._update_cell_value(
                    new_row,
                    cell_index=3,
                    new_value=new_value
                )
                change_msg = (
                    f"Updated '{display_name}' sustained limit: "
                    f"{old_sustained} → {new_value}"
                )

            # Replace in content
            content = content.replace(match.group(0), new_row)

            return content, change_msg

        return None

    def _update_cell_value(self, row: str, cell_index: int, new_value: str) -> str:
        """Update a specific cell in a table row."""
        # Pattern to match <td>...</td>
        td_pattern = r'<td[^>]*>.*?</td>'
        cells = list(re.finditer(td_pattern, row, re.DOTALL | re.IGNORECASE))

        if cell_index >= len(cells):
            return row

        cell_match = cells[cell_index]
        old_cell = cell_match.group(0)

        # Preserve opening tag, replace content
        opening_tag_match = re.match(r'<td[^>]*>', old_cell, re.IGNORECASE)
        opening_tag = opening_tag_match.group(0) if opening_tag_match else '<td>'

        new_cell = f"{opening_tag}{new_value}</td>"

        # Replace in row
        return row.replace(old_cell, new_cell)

    def _add_endpoint_to_table(
        self,
        content: str,
        endpoint_name: str,
        tf_endpoint: EndpointLimit
    ) -> Tuple[str, str]:
        """
        Add a new endpoint row to the Management API HTML table.

        Args:
            content: MDX content
            endpoint_name: Endpoint to add (snake_case)
            tf_endpoint: Endpoint limits from Terraform

        Returns:
            Tuple of (updated_content, change_description) or None if table not found
        """
        # Look for Management API table within Accordion
        # Pattern: <Accordion title="Management API...">...<tbody>...</tbody>...</Accordion>
        mgmt_accordion_pattern = r'<Accordion[^>]+title="[^"]*Management API[^"]*"[^>]*>(.*?)</Accordion>'

        accordion_match = re.search(mgmt_accordion_pattern, content, re.DOTALL | re.IGNORECASE)

        if not accordion_match:
            return None

        accordion_content = accordion_match.group(1)

        # Find the </tbody> tag to insert before
        tbody_close_match = re.search(r'</tbody>', accordion_content, re.IGNORECASE)

        if not tbody_close_match:
            return None

        # Generate display name for endpoint
        display_name = self._to_display_name(endpoint_name)

        # Determine method (default to GET for read operations, POST for write)
        if 'write' in endpoint_name or 'create' in endpoint_name:
            method = '<code>POST</code>'
        elif 'delete' in endpoint_name:
            method = '<code>DELETE</code>'
        elif 'update' in endpoint_name:
            method = '<code>PATCH</code>'
        else:
            method = '<code>GET</code>'

        # Determine limit type
        if 'user' in endpoint_name:
            limit_type = 'Per User'
        elif 'organization' in endpoint_name:
            limit_type = 'Per Organization'
        else:
            limit_type = 'Global'

        # Convert sustained limit to appropriate time unit
        # Most Management API limits are per minute
        sustained_value = tf_endpoint.sustained_limit
        sustained_display = f'{sustained_value}/minute'

        # Generate new table row
        new_row = f'''<tr>
<td>{display_name}</td>
<td>{method}</td>
<td>{tf_endpoint.burst_limit}</td>
<td>{sustained_display}</td>
<td>{limit_type}</td>
</tr>
'''

        # Find the position to insert (before </tbody>)
        full_accordion_start = accordion_match.start(1)
        tbody_close_pos = full_accordion_start + tbody_close_match.start()

        # Insert the new row
        updated_content = (
            content[:tbody_close_pos] +
            new_row +
            content[tbody_close_pos:]
        )

        change_msg = f"Added '{display_name}' endpoint: burst={tf_endpoint.burst_limit}, sustained={sustained_display}"

        return updated_content, change_msg

    @staticmethod
    def _to_display_name(endpoint_name: str) -> str:
        """
        Convert snake_case endpoint name to display name.

        Examples:
            user_info -> User Info
            get_token -> Get Token
            mgmt_api_prod -> Mgmt Api Prod
        """
        words = endpoint_name.split('_')
        return ' '.join(word.capitalize() for word in words)

    @staticmethod
    def _extract_time_unit(sustained_value: str) -> str:
        """
        Extract time unit from sustained limit value.

        Examples:
            "5/minute" -> "/minute"
            "20/second" -> "/second"
            "50/hour" -> "/hour"
        """
        # Remove HTML tags if present
        clean_value = re.sub(r'<[^>]+>', '', sustained_value).strip()

        # Extract time unit
        if '/minute' in clean_value:
            return '/minute'
        elif '/second' in clean_value:
            return '/second'
        elif '/hour' in clean_value:
            return '/hour'
        elif '/day' in clean_value:
            return '/day'

        return '/minute'  # Default

    def generate_pr_description(
        self,
        drifts: List[DriftReport],
        changes_by_file: Dict[str, List[str]]
    ) -> str:
        """
        Generate PR description summarizing changes.

        Args:
            drifts: All drift reports
            changes_by_file: Dict of filename -> list of changes

        Returns:
            Markdown PR description
        """
        lines = []

        lines.append("## Rate Limit Documentation Update")
        lines.append("")
        lines.append("This PR automatically updates rate limit documentation to match the")
        lines.append("Terraform specifications from `atko-cic/layer0-base`.")
        lines.append("")

        # Summary
        critical = sum(1 for d in drifts if d.severity == 'critical')
        warning = sum(1 for d in drifts if d.severity == 'warning')

        lines.append("### Summary")
        lines.append("")
        lines.append(f"- **Critical Drifts Fixed:** {critical}")
        lines.append(f"- **Warnings Addressed:** {warning}")
        lines.append(f"- **Files Updated:** {len(changes_by_file)}")
        lines.append("")

        # Changes by file
        lines.append("### Changes")
        lines.append("")

        for filename, changes in sorted(changes_by_file.items()):
            lines.append(f"#### `{filename}`")
            lines.append("")
            for change in changes:
                lines.append(f"- {change}")
            lines.append("")

        # Source
        lines.append("### Source of Truth")
        lines.append("")
        lines.append("**Terraform:** [`atko-cic/layer0-base/terraform/v2/modules/auth0/services/rate-limits-api2.tf`]")
        lines.append("(https://github.com/atko-cic/layer0-base/blob/main/terraform/v2/modules/auth0/services/rate-limits-api2.tf)")
        lines.append("")

        # Footer
        lines.append("---")
        lines.append("")
        lines.append("🤖 *This PR was automatically generated by the Auth0 Rate Limit Drift Monitor*")
        lines.append("")
        lines.append("**Review Checklist:**")
        lines.append("- [ ] Verify updated values match Terraform specs")
        lines.append("- [ ] Check that no formatting was broken")
        lines.append("- [ ] Confirm changes align with Private Cloud tier definitions")

        return '\n'.join(lines)
