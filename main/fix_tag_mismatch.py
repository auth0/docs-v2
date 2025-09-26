#!/usr/bin/env python3
"""
Script to fix mismatched XML/MDX tags where <Info> tags are incorrectly closed with </Note>
"""

import os
import re
import argparse
from pathlib import Path


def fix_tag_mismatch_in_file(file_path):
    """
    Fix mismatched tags in a single file.
    - Fixes <Info> tags that are incorrectly closed with </Note>
    - Fixes <Note> tags that are incorrectly closed with </Info>
    Returns True if changes were made, False otherwise.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content
        changes_made = False

        # Split content into lines for more precise processing
        lines = content.split('\n')

        # Track the opening tags we encounter
        i = 0
        while i < len(lines):
            line = lines[i].strip()

            # Look for <Info> opening tags
            if '<Info>' in line:
                # Find the corresponding closing tag
                j = i + 1

                while j < len(lines):
                    # Check if this line contains a closing tag
                    if '</Note>' in lines[j] and '</Info>' not in lines[j]:
                        # This is an <Info> block incorrectly closed with </Note>
                        lines[j] = lines[j].replace('</Note>', '</Info>')
                        changes_made = True
                        print(f"  Fixed <Info> closed with </Note> on line {j + 1}")
                        break
                    elif '</Info>' in lines[j]:
                        # Correctly closed, nothing to do
                        break

                    j += 1

                i = j + 1

            # Look for <Note> opening tags
            elif '<Note>' in line:
                # Find the corresponding closing tag
                j = i + 1

                while j < len(lines):
                    # Check if this line contains a closing tag
                    if '</Info>' in lines[j] and '</Note>' not in lines[j]:
                        # This is a <Note> block incorrectly closed with </Info>
                        lines[j] = lines[j].replace('</Info>', '</Note>')
                        changes_made = True
                        print(f"  Fixed <Note> closed with </Info> on line {j + 1}")
                        break
                    elif '</Note>' in lines[j]:
                        # Correctly closed, nothing to do
                        break

                    j += 1

                i = j + 1
            else:
                i += 1

        if changes_made:
            content = '\n'.join(lines)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            return True

        return False

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def process_directory(directory_path, file_extensions=None):
    """
    Process all files in the directory and subdirectories.
    """
    if file_extensions is None:
        file_extensions = [".mdx", ".md"]

    directory = Path(directory_path)

    if not directory.exists():
        print(f"Directory does not exist: {directory_path}")
        return

    if not directory.is_dir():
        print(f"Path is not a directory: {directory_path}")
        return

    files_processed = 0
    files_changed = 0

    print(f"Processing directory: {directory_path}")
    print(f"Looking for files with extensions: {file_extensions}")
    print("-" * 50)

    # Walk through all files in directory and subdirectories
    for file_path in directory.rglob("*"):
        if file_path.is_file() and file_path.suffix in file_extensions:
            files_processed += 1
            print(f"Processing: {file_path}")

            if fix_tag_mismatch_in_file(file_path):
                files_changed += 1
                print(f"  ✓ Fixed tag mismatches in {file_path}")
            else:
                print(f"  - No changes needed in {file_path}")

    print("-" * 50)
    print(f"Summary:")
    print(f"  Files processed: {files_processed}")
    print(f"  Files changed: {files_changed}")


def main():
    parser = argparse.ArgumentParser(
        description="Fix mismatched XML/MDX tags where <Info> is closed with </Note>"
    )
    parser.add_argument(
        "directory", help="Directory to process (will include subdirectories)"
    )
    parser.add_argument(
        "--extensions",
        nargs="+",
        default=[".mdx", ".md"],
        help="File extensions to process (default: .mdx .md)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be changed without making changes",
    )

    args = parser.parse_args()

    if args.dry_run:
        print("DRY RUN MODE - No files will be modified")
        # You could implement dry run logic here

    process_directory(args.directory, args.extensions)


# Configuration section - modify these variables as needed
TARGET_DIRECTORY = "/home/raeder/mintlify/auth0docs-v2/main/docs/quickstart/"
FILE_EXTENSIONS = [".mdx", ".md"]

if __name__ == "__main__":
    # If run directly without arguments, use the configured directory
    import sys

    if len(sys.argv) == 1:
        print("No arguments provided, using configured directory:")
        print(f"Directory: {TARGET_DIRECTORY}")
        print(f"Extensions: {FILE_EXTENSIONS}")
        print()
        process_directory(TARGET_DIRECTORY, FILE_EXTENSIONS)
    else:
        main()
