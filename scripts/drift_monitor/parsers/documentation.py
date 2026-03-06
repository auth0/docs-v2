"""MDX documentation parser for rate limit specifications."""

import re
from typing import Dict
from ..models import EndpointLimit

try:
    import frontmatter
except ImportError:
    frontmatter = None


class DocumentationParser:
    """Parse MDX rate limit documentation files."""

    def parse_mdx_file(self, mdx_content: str) -> Dict[str, EndpointLimit]:
        """
        Extract rate limits from MDX file.

        Expected structure:
        - Sections by API (Management API, Auth API, SCIM API, etc.)
        - Each endpoint as: "Name: X burst, Y/minute [context]"
        - Or in table format

        Args:
            mdx_content: Raw MDX file content

        Returns:
            Dict of endpoint_name -> EndpointLimit
        """
        # Remove frontmatter if present
        content = self._remove_frontmatter(mdx_content)

        endpoints = {}

        # Pattern 1: Look for Accordion sections (actual docs format)
        # <Accordion title="Authentication API: ...">...</Accordion>
        accordion_pattern = r'<Accordion[^>]+title="([^"]+)"[^>]*>(.*?)</Accordion>'

        for accordion_match in re.finditer(accordion_pattern, content, re.DOTALL | re.IGNORECASE):
            section_title = accordion_match.group(1)
            section_content = accordion_match.group(2)

            # Determine API type from section title
            api_type = self._infer_api_type(section_title)

            # Extract limits from this section
            section_limits = self._extract_limits_from_section(
                section_content,
                api_type
            )
            endpoints.update(section_limits)

        # Pattern 2: Look for markdown header sections (fallback)
        section_pattern = r'#+\s+([\w\s]+)\s*\n(.*?)(?=\n#+\s+|\Z)'

        for section_match in re.finditer(section_pattern, content, re.DOTALL):
            section_title = section_match.group(1)
            section_content = section_match.group(2)

            # Determine API type from section title
            api_type = self._infer_api_type(section_title)

            # Extract limits from this section (skip if already found in Accordion)
            section_limits = self._extract_limits_from_section(
                section_content,
                api_type
            )

            # Only add if not already found
            for name, limit in section_limits.items():
                if name not in endpoints:
                    endpoints[name] = limit

        return endpoints

    def _remove_frontmatter(self, mdx_content: str) -> str:
        """Remove YAML frontmatter from MDX content."""
        if frontmatter:
            try:
                post = frontmatter.loads(mdx_content)
                return post.content
            except Exception:
                pass

        # Fallback: remove frontmatter manually
        if mdx_content.startswith('---'):
            # Find second ---
            end_idx = mdx_content.find('---', 3)
            if end_idx != -1:
                return mdx_content[end_idx + 3:]

        return mdx_content

    def _extract_limits_from_section(
        self,
        content: str,
        api_type: str
    ) -> Dict[str, EndpointLimit]:
        """
        Extract individual endpoint limits from section content.

        Args:
            content: Section content
            api_type: API type ("management_api", "auth_api", etc.)

        Returns:
            Dict of endpoint_name -> EndpointLimit
        """
        limits = {}

        # Pattern 1: HTML table format (actual docs format)
        # <tr><td>Endpoint</td><td>Method</td><td>Burst</td><td>Sustained</td><td>Context</td></tr>
        tr_pattern = r'<tr>(.*?)</tr>'

        for tr_match in re.finditer(tr_pattern, content, re.DOTALL | re.IGNORECASE):
            row_content = tr_match.group(1)

            # Skip header rows
            if '<th' in row_content.lower():
                continue

            # Extract table cells
            td_pattern = r'<td[^>]*>(.*?)</td>'
            cells = re.findall(td_pattern, row_content, re.DOTALL | re.IGNORECASE)

            if len(cells) < 4:
                continue  # Need at least 4 columns

            # Extract endpoint name (remove HTML tags and links)
            endpoint_html = cells[0]
            endpoint_text = re.sub(r'<[^>]+>', '', endpoint_html).strip()

            if not endpoint_text or 'endpoint' in endpoint_text.lower():
                continue  # Skip headers or empty

            endpoint_name = self._normalize_endpoint_name(endpoint_text)

            # Extract burst limit (column 2, index 2 - after endpoint and method)
            try:
                burst_text = re.sub(r'<[^>]+>', '', cells[2]).strip()
                burst = int(burst_text.replace(',', ''))
            except (ValueError, IndexError):
                continue

            # Extract sustained limit (column 3, index 3)
            try:
                sustained_text = re.sub(r'<[^>]+>', '', cells[3]).strip()
                # Parse formats like "5/minute", "20/second", "50/hour"
                sustained_match = re.match(r'(\d+)\s*/\s*(\w+)', sustained_text)
                if sustained_match:
                    sustained_value = int(sustained_match.group(1))
                    time_unit = sustained_match.group(2)
                    sustained = self._normalize_to_per_minute(sustained_value, time_unit)
                else:
                    sustained = int(sustained_text.replace(',', ''))
            except (ValueError, IndexError):
                sustained = 0

            # Extract context (column 4, index 4 if exists)
            context = ""
            if len(cells) > 4:
                context = re.sub(r'<[^>]+>', '', cells[4]).strip()

            limits[endpoint_name] = EndpointLimit(
                endpoint_name=endpoint_name,
                burst_limit=burst,
                sustained_limit=sustained,
                api_type=api_type,
                additional_context=context
            )

        # Pattern 2: Markdown table format (fallback)
        # | Endpoint | Burst | Sustained |
        table_pattern = r'\|\s*(.+?)\s*\|\s*(\d+(?:,\d+)*)\s*\|\s*(\d+(?:,\d+)*)\s*\|'
        for match in re.finditer(table_pattern, content):
            endpoint_display = match.group(1).strip()

            # Skip header rows
            if 'endpoint' in endpoint_display.lower() or '---' in endpoint_display:
                continue

            endpoint_name = self._normalize_endpoint_name(endpoint_display)

            # Skip if already found in HTML tables
            if endpoint_name in limits:
                continue

            burst = int(match.group(2).replace(',', ''))
            sustained = int(match.group(3).replace(',', ''))

            # Try to extract context
            context = self._extract_context(content, endpoint_display)

            limits[endpoint_name] = EndpointLimit(
                endpoint_name=endpoint_name,
                burst_limit=burst,
                sustained_limit=sustained,
                api_type=api_type,
                additional_context=context
            )

        # Pattern 2: List format
        # - User Info: 10 burst, 5/minute (per unique user ID)
        # - Get Token: 30 burst, 30/second
        list_pattern = r'-\s+([^:]+):\s+(\d+(?:,\d+)*)\s+burst,\s+(\d+(?:,\d+)*)\s*/\s*(minute|second|hour|day)'

        for match in re.finditer(list_pattern, content):
            endpoint_display = match.group(1).strip()
            endpoint_name = self._normalize_endpoint_name(endpoint_display)
            burst = int(match.group(2).replace(',', ''))
            sustained_raw = int(match.group(3).replace(',', ''))
            time_unit = match.group(4)

            # Convert to per-minute if needed
            sustained = self._normalize_to_per_minute(sustained_raw, time_unit)

            # Extract context (usually in parentheses)
            context_match = re.search(rf'{re.escape(endpoint_display)}:.*?\(([^)]+)\)', content)
            context = context_match.group(1) if context_match else ""

            # Only add if not already found in table format
            if endpoint_name not in limits:
                limits[endpoint_name] = EndpointLimit(
                    endpoint_name=endpoint_name,
                    burst_limit=burst,
                    sustained_limit=sustained,
                    api_type=api_type,
                    additional_context=context
                )

        # Pattern 3: Inline format with "burst" and "sustained" keywords
        # Overall: 300 burst, 300/minute sustained
        inline_pattern = r'([^:\n]+):\s+(\d+(?:,\d+)*)\s+burst,\s+(\d+(?:,\d+)*)\s*/\s*(minute|second|hour|day)(?:\s+sustained)?'

        for match in re.finditer(inline_pattern, content):
            endpoint_display = match.group(1).strip()

            # Skip if it's part of a list item (starts with -)
            if endpoint_display.startswith('-'):
                continue

            endpoint_name = self._normalize_endpoint_name(endpoint_display)
            burst = int(match.group(2).replace(',', ''))
            sustained_raw = int(match.group(3).replace(',', ''))
            time_unit = match.group(4)

            sustained = self._normalize_to_per_minute(sustained_raw, time_unit)

            if endpoint_name not in limits:
                limits[endpoint_name] = EndpointLimit(
                    endpoint_name=endpoint_name,
                    burst_limit=burst,
                    sustained_limit=sustained,
                    api_type=api_type
                )

        return limits

    @staticmethod
    def _normalize_endpoint_name(display_name: str) -> str:
        """
        Normalize endpoint display name to snake_case identifier.

        Examples:
            "User Info" -> "user_info"
            "Get Token" -> "get_token"
            "Users (Read)" -> "users_read"
        """
        # Remove parentheses content
        name = re.sub(r'\([^)]*\)', '', display_name)
        # Convert to lowercase and replace spaces/special chars with underscore
        name = re.sub(r'[^\w]+', '_', name.lower())
        # Remove leading/trailing underscores
        name = name.strip('_')
        return name

    @staticmethod
    def _normalize_to_per_minute(value: int, time_unit: str) -> int:
        """Convert rate limit to per-minute basis."""
        conversions = {
            'second': 60,
            'minute': 1,
            'hour': 1 / 60,
            'day': 1 / (60 * 24)
        }
        multiplier = conversions.get(time_unit, 1)
        return int(value * multiplier)

    @staticmethod
    def _extract_context(content: str, endpoint_name: str) -> str:
        """Extract context information for an endpoint (e.g., 'per unique user ID')."""
        # Look for context in parentheses near the endpoint name
        pattern = rf'{re.escape(endpoint_name)}[^(]*\(([^)]+)\)'
        match = re.search(pattern, content, re.IGNORECASE)
        return match.group(1) if match else ""

    @staticmethod
    def _infer_api_type(section_title: str) -> str:
        """Infer API type from section header."""
        section_lower = section_title.lower()

        if 'management' in section_lower or 'mgmt' in section_lower:
            return 'management_api'
        elif 'auth' in section_lower or 'authentication' in section_lower:
            return 'auth_api'
        elif 'scim' in section_lower:
            return 'scim_api'
        elif 'universal' in section_lower or 'login' in section_lower:
            return 'universal_login'
        elif 'mfa' in section_lower:
            return 'mfa'

        return 'unknown'
