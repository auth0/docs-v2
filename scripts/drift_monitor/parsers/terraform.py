"""Terraform HCL parser for rate limit specifications."""

import re
from typing import Dict
from ..models import TierLimits, EndpointLimit


class TerraformParser:
    """Parse Terraform HCL locals block for rate_limits_api2."""

    def parse_locals_block(self, hcl_content: str, locals_name: str = 'rate_limits_api2') -> Dict[str, Dict]:
        """
        Extract rate limits locals block from HCL.

        Args:
            hcl_content: Raw HCL file content
            locals_name: Name of the locals block (e.g., 'rate_limits_api2', 'rate_limits_mfa_api')

        Returns:
            Dict of tier_name -> {endpoint: value}
        """
        # Find the locals block (e.g., rate_limits_api2 = {)
        pattern = rf'{locals_name}\s*=\s*\{{'
        match = re.search(pattern, hcl_content)

        if not match:
            raise ValueError(f"Cannot find {locals_name} block in HCL")

        # Find the matching closing brace using brace counting
        start = match.end() - 1  # Position of opening {
        brace_count = 1
        i = start + 1

        while i < len(hcl_content) and brace_count > 0:
            if hcl_content[i] == '{':
                brace_count += 1
            elif hcl_content[i] == '}':
                brace_count -= 1
            i += 1

        if brace_count != 0:
            raise ValueError("Unmatched braces in rate_limits_api2 block")

        # Extract content between braces
        locals_content = hcl_content[start + 1:i - 1]
        tiers = self._extract_tiers(locals_content)
        return tiers

    def _extract_tiers(self, content: str) -> Dict[str, Dict]:
        """
        Extract individual tier definitions from locals content.

        Args:
            content: Content inside rate_limits_api2 block

        Returns:
            Dict of tier_name -> {field_name: value}
        """
        tiers = {}

        # Find tier blocks by matching TIER_NAME = { and then finding the matching }
        # We'll use a simple state machine approach
        i = 0
        while i < len(content):
            # Look for tier name pattern: word = {
            tier_match = re.match(r'\s*(\w+)\s*=\s*\{', content[i:])
            if not tier_match:
                i += 1
                continue

            tier_name = tier_match.group(1)
            brace_start = i + tier_match.end() - 1  # Position of opening {

            # Find matching closing brace
            brace_count = 1
            j = brace_start + 1
            while j < len(content) and brace_count > 0:
                if content[j] == '{':
                    brace_count += 1
                elif content[j] == '}':
                    brace_count -= 1
                j += 1

            # Extract content between braces
            tier_content = content[brace_start + 1:j - 1]

            # Extract all key-value pairs from tier
            endpoints = {}
            for line in tier_content.split('\n'):
                # Skip comments and empty lines
                line = line.split('#')[0].strip()
                if not line or '=' not in line:
                    continue

                # Match key = value pattern (numeric or boolean)
                kv_match = re.match(r'\s*(\w+)\s*=\s*(\d+)', line)
                if kv_match:
                    key, value = kv_match.groups()
                    endpoints[key] = int(value)
                else:
                    # Try to match boolean values
                    bool_match = re.match(r'\s*(\w+)\s*=\s*(true|false)', line, re.IGNORECASE)
                    if bool_match:
                        key, value = bool_match.groups()
                        endpoints[key] = value.lower() == 'true'

            if endpoints:  # Only add if we found any endpoints
                tiers[tier_name] = endpoints

            # Move past this tier
            i = j

        return tiers

    def normalize_terraform_tiers(
        self,
        tiers: Dict[str, Dict],
        tier_mapping: Dict[str, Dict]
    ) -> Dict[str, TierLimits]:
        """
        Convert parsed Terraform tiers to TierLimits entities.

        Args:
            tiers: Raw parsed tiers from parse_locals_block
            tier_mapping: Cross-reference mapping from config

        Returns:
            Dict of tier_name -> TierLimits
        """
        normalized = {}

        for terraform_name, endpoints_data in tiers.items():
            # Get mapping info
            mapping_info = tier_mapping.get(terraform_name, {})
            code_tier = mapping_info.get('code_tier', terraform_name)
            auth_api_burst = mapping_info.get('auth_api_rps', 0)
            mgmt_api_burst = mapping_info.get('mgmt_api_rps', 0)

            # Extract visibility flag (default to True for backward compatibility)
            docs_visible = endpoints_data.get('docs_visible', True)

            # Group endpoints by base name
            endpoint_limits = {}

            for field_name, value in endpoints_data.items():
                # Skip metadata fields
                if field_name == 'docs_visible':
                    continue

                endpoint_name = self._extract_endpoint_name(field_name)

                # Initialize endpoint if not exists
                if endpoint_name not in endpoint_limits:
                    endpoint_limits[endpoint_name] = EndpointLimit(
                        endpoint_name=endpoint_name,
                        api_type="management_api"  # Default, can be refined
                    )

                # Set burst or sustained limit based on field suffix
                if field_name.endswith('_rps'):
                    endpoint_limits[endpoint_name].burst_limit = value
                elif field_name.endswith('_per_minute') or field_name.endswith('_rpm'):
                    endpoint_limits[endpoint_name].sustained_limit = value

            # Create TierLimits entity
            normalized[terraform_name] = TierLimits(
                tier_name=terraform_name,
                terraform_name=terraform_name,
                code_tier=code_tier,
                auth_api_burst=auth_api_burst,
                mgmt_api_burst=mgmt_api_burst,
                endpoints=endpoint_limits,
                source="terraform",
                raw_data=endpoints_data,
                docs_visible=docs_visible
            )

        return normalized

    @staticmethod
    def _extract_endpoint_name(field_name: str) -> str:
        """
        Extract base endpoint name from Terraform field name.

        Examples:
            mgmt_api_prod_rps -> mgmt_api_prod
            users_write_per_minute -> users_write
            tenant_per_minutes_rpm -> tenant_per_minutes

        Args:
            field_name: Terraform field name

        Returns:
            Base endpoint name
        """
        # Remove common suffixes
        for suffix in ['_rps', '_per_minute', '_rpm']:
            if field_name.endswith(suffix):
                return field_name[:-len(suffix)]
        return field_name
