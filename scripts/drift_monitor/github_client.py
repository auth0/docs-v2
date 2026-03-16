"""GitHub API client for fetching Terraform and documentation files."""

import base64
import requests
from typing import Dict, Tuple
from datetime import datetime


class GitHubClient:
    """Fetch files from GitHub repositories using authenticated API calls."""

    def __init__(self, github_token: str):
        """
        Initialize GitHub client.

        Args:
            github_token: GitHub API token with appropriate permissions
        """
        self.token = github_token
        self.headers = {
            'Authorization': f'token {github_token}',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Auth0-RateLimit-Monitor/1.0'
        }
        self.base_url = 'https://api.github.com'

    def fetch_terraform_spec(
        self,
        repo: str = "atko-cic/layer0-base",
        path: str = "terraform/v2/modules/auth0/services/rate-limits-api2.tf"
    ) -> Tuple[str, datetime]:
        """
        Fetch rate-limits-api2.tf from private repository.

        Args:
            repo: Repository name (owner/repo)
            path: File path within repository

        Returns:
            Tuple of (file_content, fetch_timestamp)
        """
        url = f'{self.base_url}/repos/{repo}/contents/{path}'

        try:
            response = requests.get(url, headers=self.headers, timeout=30)
            response.raise_for_status()

            data = response.json()

            # GitHub API returns base64-encoded content for files
            if 'content' in data:
                file_content = base64.b64decode(data['content']).decode('utf-8')
                return file_content, datetime.now()
            else:
                raise ValueError(f"No content found in response for {repo}/{path}")

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to fetch Terraform spec from {repo}: {str(e)}")

    def fetch_documentation_files(
        self,
        repo: str = "auth0/docs-v2",
        base_path: str = "main/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/rate-limit-configurations"
    ) -> Dict[str, Tuple[str, datetime]]:
        """
        Fetch all tier MDX files from documentation repository.

        Args:
            repo: Repository name (owner/repo)
            base_path: Base path to documentation files

        Returns:
            Dict of {filename: (content, fetch_timestamp)}
        """
        tier_files = [
            'tier-20-development-private-cloud.mdx',
            'tier-100-rps-private-cloud.mdx',
            'tier-500-rps-private-cloud.mdx',
            'tier-1500-rps-private-cloud.mdx',
            'tier-3000-rps-private-cloud.mdx',
            'tier-6000-rps-private-cloud.mdx',
            'tier-10000-rps-private-cloud.mdx',
            'tier-20000-rps-private-cloud.mdx',
        ]

        results = {}
        errors = []

        for filename in tier_files:
            try:
                url = f'{self.base_url}/repos/{repo}/contents/{base_path}/{filename}'

                response = requests.get(url, headers=self.headers, timeout=30)
                response.raise_for_status()

                data = response.json()

                if 'content' in data:
                    content = base64.b64decode(data['content']).decode('utf-8')
                    results[filename] = (content, datetime.now())
                else:
                    errors.append(f"No content found for {filename}")

            except requests.exceptions.RequestException as e:
                errors.append(f"Failed to fetch {filename}: {str(e)}")

        if errors:
            print(f"Warning: {len(errors)} files had fetch errors:")
            for error in errors:
                print(f"  - {error}")

        return results

    def create_github_issue(
        self,
        repo: str,
        title: str,
        body: str,
        labels: list = None
    ) -> str:
        """
        Create a GitHub issue with drift report.

        Args:
            repo: Repository name (owner/repo)
            title: Issue title
            body: Issue body (markdown)
            labels: List of label names

        Returns:
            Issue URL
        """
        url = f'{self.base_url}/repos/{repo}/issues'

        payload = {
            'title': title,
            'body': body,
            'labels': labels or ['drift-detection', 'rate-limits']
        }

        try:
            response = requests.post(url, headers=self.headers, json=payload, timeout=30)
            response.raise_for_status()

            issue_data = response.json()
            return issue_data['html_url']

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to create GitHub issue: {str(e)}")

    def get_repo_metadata(self, repo: str) -> dict:
        """
        Get repository metadata for audit trail.

        Args:
            repo: Repository name (owner/repo)

        Returns:
            Dict with repo metadata
        """
        url = f'{self.base_url}/repos/{repo}'

        try:
            response = requests.get(url, headers=self.headers, timeout=30)
            response.raise_for_status()

            data = response.json()

            return {
                'repo': repo,
                'last_updated': data.get('updated_at'),
                'default_branch': data.get('default_branch'),
                'url': data.get('html_url')
            }

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to get repo metadata for {repo}: {str(e)}")

    def get_default_branch_ref(self, repo: str) -> Tuple[str, str]:
        """
        Get the default branch reference (SHA).

        Args:
            repo: Repository name (owner/repo)

        Returns:
            Tuple of (branch_name, sha)
        """
        url = f'{self.base_url}/repos/{repo}'

        try:
            response = requests.get(url, headers=self.headers, timeout=30)
            response.raise_for_status()

            data = response.json()
            default_branch = data.get('default_branch', 'main')

            # Get the branch ref
            ref_url = f'{self.base_url}/repos/{repo}/git/refs/heads/{default_branch}'
            ref_response = requests.get(ref_url, headers=self.headers, timeout=30)
            ref_response.raise_for_status()

            ref_data = ref_response.json()
            sha = ref_data['object']['sha']

            return default_branch, sha

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to get default branch ref for {repo}: {str(e)}")

    def create_branch(self, repo: str, branch_name: str, from_sha: str) -> str:
        """
        Create a new branch from a SHA.

        Args:
            repo: Repository name (owner/repo)
            branch_name: Name for the new branch
            from_sha: SHA to branch from

        Returns:
            Branch ref
        """
        url = f'{self.base_url}/repos/{repo}/git/refs'

        payload = {
            'ref': f'refs/heads/{branch_name}',
            'sha': from_sha
        }

        try:
            response = requests.post(url, headers=self.headers, json=payload, timeout=30)
            response.raise_for_status()

            data = response.json()
            return data['ref']

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to create branch {branch_name}: {str(e)}")

    def update_file(
        self,
        repo: str,
        branch: str,
        file_path: str,
        content: str,
        commit_message: str
    ) -> str:
        """
        Update a file in a repository.

        Args:
            repo: Repository name (owner/repo)
            branch: Branch name
            file_path: Path to file in repo
            content: New file content
            commit_message: Commit message

        Returns:
            Commit SHA
        """
        # Get current file SHA
        url = f'{self.base_url}/repos/{repo}/contents/{file_path}'

        try:
            # Get current file to get SHA
            params = {'ref': branch}
            response = requests.get(url, headers=self.headers, params=params, timeout=30)

            if response.status_code == 200:
                current_file = response.json()
                file_sha = current_file['sha']
            else:
                file_sha = None  # File doesn't exist yet

            # Encode content
            content_bytes = content.encode('utf-8')
            content_base64 = base64.b64encode(content_bytes).decode('utf-8')

            # Update file
            payload = {
                'message': commit_message,
                'content': content_base64,
                'branch': branch
            }

            if file_sha:
                payload['sha'] = file_sha

            response = requests.put(url, headers=self.headers, json=payload, timeout=30)
            response.raise_for_status()

            data = response.json()
            return data['commit']['sha']

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to update file {file_path}: {str(e)}")

    def create_pull_request(
        self,
        repo: str,
        title: str,
        body: str,
        head_branch: str,
        base_branch: str = 'main'
    ) -> str:
        """
        Create a pull request.

        Args:
            repo: Repository name (owner/repo)
            title: PR title
            body: PR description (markdown)
            head_branch: Source branch
            base_branch: Target branch (default: main)

        Returns:
            PR URL
        """
        url = f'{self.base_url}/repos/{repo}/pulls'

        payload = {
            'title': title,
            'body': body,
            'head': head_branch,
            'base': base_branch
        }

        try:
            response = requests.post(url, headers=self.headers, json=payload, timeout=30)
            response.raise_for_status()

            data = response.json()
            return data['html_url']

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to create pull request: {str(e)}")
