import os
import re
import csv

# Regex looks for the <Tooltip> component and pulls out tip, href, and the word
TOOLTIP_REGEX = re.compile(r'<Tooltip\s+[^>]*tip=["\']([^"\']+)["\'](?:\s+[^>]*href=["\']([^"\']+)["\'])?[^>]*>(.*?)</Tooltip>', re.DOTALL)

def extract_tooltips():
    base_dir = os.getcwd()
    results = []
    
    # Scanning every file in the current folder and subfolders
    for root, _, files in os.walk(base_dir):
        for file in files:
            if file.endswith(('.md', '.mdx')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        matches = TOOLTIP_REGEX.findall(content)
                        for tip, href, word in matches:
                            results.append({
                                'Word': word.strip(),
                                'Tooltip Tip': tip.strip(),
                                'Glossary Link': href.strip() if href else 'N/A',
                                'File Name': os.path.relpath(file_path, base_dir)
                            })
                except Exception as e:
                    print(f"Skipping {file}: {e}")
    return results

if __name__ == "__main__":
    data = extract_tooltips()
    output_file = 'auth0_tooltips_export.csv'
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['Word', 'Tooltip Tip', 'Glossary Link', 'File Name'])
        writer.writeheader()
        writer.writerows(data)
    print(f"\nSuccess! Created {output_file} with {len(data)} tooltips.")
    print(f"Location: {os.path.join(os.getcwd(), output_file)}")
