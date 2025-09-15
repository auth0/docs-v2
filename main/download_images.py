#!/usr/bin/env python3
"""
Script to download Contentful images from MDX files and organize them locally.
"""

import os
import re
import subprocess
from pathlib import Path
from urllib.parse import urlparse

def find_contentful_urls():
    """Find all Contentful image URLs in MDX files."""
    urls = set()

    # Use grep to find all Contentful URLs
    result = subprocess.run([
        'grep', '-r', '--include=*.mdx',
        r'https://images\.ctfassets\.net/[^)\s]*',
        '.'
    ], capture_output=True, text=True)

    for line in result.stdout.splitlines():
        # Extract URLs from the grep output
        matches = re.findall(r'https://images\.ctfassets\.net/[^)\s]*', line)
        for match in matches:
            # Clean up URL (remove any trailing characters that aren't part of the URL)
            url = re.sub(r'[)\]}>"\s]*$', '', match)
            urls.add(url)

    return sorted(urls)

def download_image(url, base_dir="images"):
    """Download a single image preserving the path structure."""
    try:
        parsed = urlparse(url)
        # Remove the leading slash and split the path
        path_parts = parsed.path.lstrip('/').split('/')

        # Create the local path: images/cdy7uua7fh8z/3BoGW9NEYKPBkfk2tPBL7l/...
        local_path = Path(base_dir) / Path(*path_parts)

        # Create directories if they don't exist
        local_path.parent.mkdir(parents=True, exist_ok=True)

        # Download using curl
        result = subprocess.run([
            'curl', '-L', '--silent', '--fail',
            '-o', str(local_path), url
        ], capture_output=True)

        if result.returncode == 0:
            print(f"✓ Downloaded: {url} -> {local_path}")
            return True
        else:
            print(f"✗ Failed to download: {url}")
            return False

    except Exception as e:
        print(f"✗ Error downloading {url}: {e}")
        return False

def main():
    """Main function to download all Contentful images."""
    print("Finding Contentful image URLs...")
    urls = find_contentful_urls()

    print(f"Found {len(urls)} unique Contentful image URLs")

    if not urls:
        print("No URLs found!")
        return

    # Create images directory
    os.makedirs("images", exist_ok=True)

    successful = 0
    failed = 0

    for i, url in enumerate(urls, 1):
        print(f"\n[{i}/{len(urls)}] Downloading: {url}")
        if download_image(url):
            successful += 1
        else:
            failed += 1

    print(f"\n=== Summary ===")
    print(f"Total URLs: {len(urls)}")
    print(f"Successfully downloaded: {successful}")
    print(f"Failed: {failed}")

if __name__ == "__main__":
    main()