#!/usr/bin/env python3
"""
Script to check for redirects on broken links from Auth0 documentation pages.

This script:
1. Reads the broken.mdx file to extract .mdx file paths and their broken links
2. Converts .mdx files to URLs by removing .mdx and adding base URL
3. Uses Selenium to visit each page and check for redirects on broken links
4. Generates a report mapping broken links to their redirects
"""

import re
import time
import json
import csv
from urllib.parse import urljoin, urlparse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from datetime import datetime

class RedirectChecker:
    def __init__(self, base_url="https://auth0.com", headless=True, timeout=10):
        """
        Initialize the redirect checker.

        Args:
            base_url (str): Base URL for the documentation site
            headless (bool): Run browser in headless mode
            timeout (int): Timeout for page loads in seconds
        """
        self.base_url = base_url.rstrip('/')
        self.timeout = timeout
        self.results = []

        # Setup Chrome options
        chrome_options = Options()
        if headless:
            chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')

        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.set_page_load_timeout(self.timeout)
        except Exception as e:
            print(f"Error initializing Chrome driver: {e}")
            print("Make sure ChromeDriver is installed and in PATH")
            raise

    def parse_broken_mdx(self, file_path):
        """
        Parse the broken.mdx file to extract .mdx files and their broken links.

        Args:
            file_path (str): Path to the broken.mdx file

        Returns:
            list: List of dictionaries with 'mdx_file' and 'broken_links'
        """
        parsed_data = []
        current_mdx_file = None
        current_broken_links = []

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()

                    if not line:
                        continue

                    # Check if line is an .mdx file path
                    if line.endswith('.mdx'):
                        # Save previous entry if exists
                        if current_mdx_file and current_broken_links:
                            parsed_data.append({
                                'mdx_file': current_mdx_file,
                                'broken_links': current_broken_links.copy()
                            })

                        current_mdx_file = line
                        current_broken_links = []

                    # Check if line is a broken link (starts with ⎿)
                    elif line.startswith('⎿'):
                        broken_link = line[1:].strip()  # Remove ⎿ symbol and whitespace
                        if broken_link:
                            current_broken_links.append(broken_link)

                # Add the last entry
                if current_mdx_file and current_broken_links:
                    parsed_data.append({
                        'mdx_file': current_mdx_file,
                        'broken_links': current_broken_links.copy()
                    })

        except FileNotFoundError:
            print(f"Error: Could not find file {file_path}")
            return []
        except Exception as e:
            print(f"Error parsing file {file_path}: {e}")
            return []

        return parsed_data

    def mdx_to_url(self, mdx_path):
        """
        Convert .mdx file path to URL by removing .mdx extension and adding base URL.

        Args:
            mdx_path (str): Path to .mdx file

        Returns:
            str: Full URL to the documentation page
        """
        # Remove .mdx extension
        url_path = mdx_path.replace('.mdx', '')

        # Remove 'docs/' prefix if it exists and add it back after base URL
        if url_path.startswith('docs/'):
            url_path = url_path[5:]  # Remove 'docs/'

        # Construct full URL
        full_url = f"{self.base_url}/docs/{url_path}"
        return full_url

    def check_link_redirect(self, page_url, broken_link):
        """
        Check if a broken link on a page has a redirect.

        Args:
            page_url (str): URL of the page containing the broken link
            broken_link (str): The broken link to check

        Returns:
            dict: Result containing original link, final URL, and redirect status
        """
        result = {
            'page_url': page_url,
            'original_link': broken_link,
            'final_url': None,
            'redirect_detected': False,
            'status': 'unknown',
            'error': None
        }

        try:
            print(f"  Checking link: {broken_link}")

            # First, try to visit the page
            self.driver.get(page_url)
            time.sleep(2)  # Wait for page to load

            # Look for the broken link on the page
            link_found = False

            # Try different strategies to find the link
            selectors = [
                f"a[href='{broken_link}']",
                f"a[href*='{broken_link.split('/')[-1]}']",  # Try partial match with last segment
            ]

            for selector in selectors:
                try:
                    links = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if links:
                        link_element = links[0]
                        link_found = True

                        # Get the current URL before clicking
                        original_url = self.driver.current_url

                        # Click the link
                        self.driver.execute_script("arguments[0].click();", link_element)

                        # Wait for navigation or timeout
                        time.sleep(3)

                        # Check if URL changed (indicating redirect)
                        final_url = self.driver.current_url

                        if final_url != original_url:
                            result['final_url'] = final_url
                            result['redirect_detected'] = True
                            result['status'] = 'redirect_found'
                        else:
                            result['status'] = 'no_redirect'

                        break

                except Exception as e:
                    continue

            if not link_found:
                # Try direct navigation to the broken link
                if broken_link.startswith('/'):
                    full_broken_url = self.base_url + broken_link
                elif broken_link.startswith('http'):
                    full_broken_url = broken_link
                else:
                    full_broken_url = urljoin(page_url, broken_link)

                try:
                    self.driver.get(full_broken_url)
                    time.sleep(2)

                    final_url = self.driver.current_url

                    if final_url != full_broken_url:
                        result['final_url'] = final_url
                        result['redirect_detected'] = True
                        result['status'] = 'direct_redirect_found'
                    else:
                        result['status'] = 'no_redirect_direct'

                except Exception as e:
                    result['error'] = f"Direct navigation failed: {str(e)}"
                    result['status'] = 'error'

        except TimeoutException:
            result['error'] = "Page load timeout"
            result['status'] = 'timeout'
        except WebDriverException as e:
            result['error'] = f"WebDriver error: {str(e)}"
            result['status'] = 'webdriver_error'
        except Exception as e:
            result['error'] = f"Unexpected error: {str(e)}"
            result['status'] = 'error'

        return result

    def process_all_pages(self, broken_mdx_path):
        """
        Process all pages and their broken links.

        Args:
            broken_mdx_path (str): Path to the broken.mdx file
        """
        print("Parsing broken.mdx file...")
        parsed_data = self.parse_broken_mdx(broken_mdx_path)

        if not parsed_data:
            print("No data found in broken.mdx file")
            return

        print(f"Found {len(parsed_data)} pages with broken links")

        for i, page_data in enumerate(parsed_data, 1):
            mdx_file = page_data['mdx_file']
            broken_links = page_data['broken_links']

            print(f"\n[{i}/{len(parsed_data)}] Processing: {mdx_file}")
            print(f"  Found {len(broken_links)} broken links")

            page_url = self.mdx_to_url(mdx_file)
            print(f"  Page URL: {page_url}")

            for broken_link in broken_links:
                result = self.check_link_redirect(page_url, broken_link)
                self.results.append(result)

                if result['redirect_detected']:
                    print(f"    ✓ Redirect found: {broken_link} -> {result['final_url']}")
                else:
                    print(f"    ✗ No redirect: {broken_link} ({result['status']})")

    def generate_reports(self, output_prefix="redirect_report"):
        """
        Generate reports in multiple formats.

        Args:
            output_prefix (str): Prefix for output files
        """
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        # Generate JSON report
        json_file = f"{output_prefix}_{timestamp}.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)

        # Generate CSV report
        csv_file = f"{output_prefix}_{timestamp}.csv"
        with open(csv_file, 'w', newline='', encoding='utf-8') as f:
            if self.results:
                writer = csv.DictWriter(f, fieldnames=self.results[0].keys())
                writer.writeheader()
                writer.writerows(self.results)

        # Generate summary report
        summary_file = f"{output_prefix}_summary_{timestamp}.txt"
        self.generate_summary_report(summary_file)

        print(f"\nReports generated:")
        print(f"  JSON: {json_file}")
        print(f"  CSV: {csv_file}")
        print(f"  Summary: {summary_file}")

    def generate_summary_report(self, filename):
        """
        Generate a human-readable summary report.

        Args:
            filename (str): Output filename for summary
        """
        total_links = len(self.results)
        redirects_found = sum(1 for r in self.results if r['redirect_detected'])

        status_counts = {}
        for result in self.results:
            status = result['status']
            status_counts[status] = status_counts.get(status, 0) + 1

        with open(filename, 'w', encoding='utf-8') as f:
            f.write("Auth0 Documentation Redirect Report\n")
            f.write("=" * 40 + "\n\n")
            f.write(f"Total broken links checked: {total_links}\n")
            f.write(f"Redirects found: {redirects_found}\n")
            f.write(f"Success rate: {(redirects_found/total_links*100):.1f}%\n\n")

            f.write("Status Summary:\n")
            for status, count in status_counts.items():
                f.write(f"  {status}: {count}\n")

            f.write("\nRedirects Found:\n")
            f.write("-" * 20 + "\n")
            for result in self.results:
                if result['redirect_detected']:
                    f.write(f"Page: {result['page_url']}\n")
                    f.write(f"  {result['original_link']} -> {result['final_url']}\n\n")

    def close(self):
        """Close the browser driver."""
        if hasattr(self, 'driver'):
            self.driver.quit()

def main():
    """Main function to run the redirect checker."""
    import argparse

    parser = argparse.ArgumentParser(description='Check for redirects on broken Auth0 documentation links')
    parser.add_argument('--base-url', default='https://auth0.com',
                       help='Base URL for the documentation site (default: https://auth0.com)')
    parser.add_argument('--broken-file', default='broken.mdx',
                       help='Path to the broken.mdx file (default: broken.mdx)')
    parser.add_argument('--headless', action='store_true', default=True,
                       help='Run browser in headless mode (default: True)')
    parser.add_argument('--timeout', type=int, default=10,
                       help='Timeout for page loads in seconds (default: 10)')
    parser.add_argument('--output', default='redirect_report',
                       help='Output file prefix (default: redirect_report)')

    args = parser.parse_args()

    checker = None
    try:
        print("Starting Auth0 Documentation Redirect Checker")
        print(f"Base URL: {args.base_url}")
        print(f"Broken file: {args.broken_file}")
        print(f"Headless mode: {args.headless}")
        print("-" * 50)

        checker = RedirectChecker(
            base_url=args.base_url,
            headless=args.headless,
            timeout=args.timeout
        )

        checker.process_all_pages(args.broken_file)
        checker.generate_reports(args.output)

        print("\nRedirect checking complete!")

    except KeyboardInterrupt:
        print("\nProcess interrupted by user")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if checker:
            checker.close()

if __name__ == "__main__":
    main()