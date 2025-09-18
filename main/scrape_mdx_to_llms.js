#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Custom file scraper to generate llms.txt from .mdx files
 * Uses docs.json to find rendered pages and extracts all content with sections
 */

class MDXScraper {
  constructor(baseURL = 'https://auth0-migration.mintlify.app') {
    this.output = [];
    this.mainFolder = path.join(__dirname, 'docs-v2', 'main');
    this.docsJsonPath = path.join(this.mainFolder, 'docs.json');
    this.renderedPages = new Set();
    this.baseURL = baseURL;
  }

  /**
   * Parse docs.json to get all pages that are actually rendered
   */
  parseDocsJson() {
    try {
      const docsContent = fs.readFileSync(this.docsJsonPath, 'utf-8');
      const docsJson = JSON.parse(docsContent);

      // Recursive function to extract all page paths from the navigation structure
      const extractPages = (obj) => {
        if (typeof obj === 'string') {
          // Direct page path
          if (obj.startsWith('/docs') || obj.startsWith('docs/')) {
            this.renderedPages.add(obj.replace(/^\//, '')); // Remove leading slash
          }
          return;
        }

        if (Array.isArray(obj)) {
          obj.forEach(extractPages);
          return;
        }

        if (typeof obj === 'object' && obj !== null) {
          // Handle pages arrays
          if (obj.pages) {
            extractPages(obj.pages);
          }

          // Handle other potential arrays with pages
          Object.values(obj).forEach(value => {
            if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
              extractPages(value);
            }
          });
        }
      };

      // Start extraction from navigation
      if (docsJson.navigation) {
        extractPages(docsJson.navigation);
      }

      console.log(`Found ${this.renderedPages.size} rendered pages in docs.json`);
      return Array.from(this.renderedPages);

    } catch (error) {
      console.warn(`Error parsing docs.json: ${error.message}`);
      return [];
    }
  }

  /**
   * Convert page path to file path
   */
  pageToFilePath(pagePath) {
    // Remove leading slash if present
    const cleanPath = pagePath.replace(/^\//, '');

    // Try different file extensions and variations
    const possiblePaths = [
      path.join(this.mainFolder, `${cleanPath}.mdx`),
      path.join(this.mainFolder, cleanPath, 'index.mdx'),
    ];

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }

    return null;
  }

  /**
   * Extract content from MDX file with comprehensive section and link extraction
   */
  extractContent(filePath, pagePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract frontmatter title
    const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
    let title = '';

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*['"]?([^'"\n]+)['"]?/);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    // If no frontmatter title, try to find first h1
    if (!title) {
      const h1Match = content.match(/^#\s+(.+)$/m);
      if (h1Match) {
        title = h1Match[1].trim();
      }
    }

    // Use page path as fallback
    if (!title) {
      const pathParts = pagePath.replace(/^docs\//, '').split('/');
      title = pathParts[pathParts.length - 1].replace(/-/g, ' ');
    }

    return {
      title,
      url: `${this.baseURL}/${pagePath}`,
      pagePath,
      sections: this.extractSectionsWithDescriptionsAndLinks(content)
    };
  }

  /**
   * Comprehensive extraction of sections with descriptions and links
   */
  extractSectionsWithDescriptionsAndLinks(content) {
    const sections = [];
    const lines = content.split('\n');
    let currentSection = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // 1. Extract markdown headers (##, ###, ####)
      if (line.match(/^#{2,4}\s+/)) {
        if (currentSection) sections.push(currentSection);

        const level = (line.match(/^#+/)[0]).length;
        const name = line.replace(/^#+\s+/, '').trim();

        currentSection = {
          level,
          name: this.cleanHeaderText(name),
          description: null,
          links: []
        };
      }

      // 2. Extract HTML headers (<h1>, <h2>, <h3>, <h4>)
      else if (line.match(/<h[1-4][^>]*>([^<]+)<\/h[1-4]>/)) {
        const match = line.match(/<h([1-4])[^>]*>([^<]+)<\/h[1-4]>/);
        if (match) {
          if (currentSection) sections.push(currentSection);

          const level = parseInt(match[1]) + 1; // Convert h1->##, h2->###, etc.
          const name = match[2].trim();

          currentSection = {
            level,
            name: this.cleanHeaderText(name),
            description: null,
            links: []
          };
        }
      }

      // 3. Extract descriptions (#####)
      else if (line.startsWith('##### ') && currentSection) {
        currentSection.description = line.substring(6).trim();
      }

      // 4. Extract ALL href attributes and collect links
      if (currentSection) {
        const foundLinks = this.extractLinksFromLine(line);
        currentSection.links.push(...foundLinks);
      }
    }

    if (currentSection) sections.push(currentSection);
    return sections;
  }

  /**
   * Clean header text from markdown formatting
   */
  cleanHeaderText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '$1')
               .replace(/\*(.*?)\*/g, '$1')
               .replace(/`(.*?)`/g, '$1')
               .replace(/\[(.*?)\]\([^)]*\)/g, '$1');
  }

  /**
   * Extract all links from a line of content
   */
  extractLinksFromLine(line) {
    const links = [];

    // Extract Card components with href and title
    const cardMatches = line.matchAll(/<Card[^>]+title=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/g);
    for (const match of cardMatches) {
      const title = match[1].trim();
      const href = match[2].trim();
      links.push({ title, href: this.normalizeUrl(href) });
    }

    // Extract Tooltip components with href and cta
    const tooltipMatches = line.matchAll(/<Tooltip[^>]+cta=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/g);
    for (const match of tooltipMatches) {
      const title = match[1].trim();
      const href = match[2].trim();
      links.push({ title, href: this.normalizeUrl(href) });
    }

    // Extract regular markdown links [text](href)
    const markdownMatches = line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
    for (const match of markdownMatches) {
      const title = match[1].trim();
      const href = match[2].trim();
      if (href.startsWith('/docs') || href.startsWith('docs/') || href.startsWith('http')) {
        links.push({ title, href: this.normalizeUrl(href) });
      }
    }

    // Extract any other href attributes
    const hrefMatches = line.matchAll(/href=["']([^"']+)["']/g);
    for (const match of hrefMatches) {
      const href = match[1].trim();

      // Skip if already captured above
      if (!links.some(link => link.href === this.normalizeUrl(href))) {
        // Try to extract title from nearby text
        let title = href.split('/').pop().replace(/-/g, ' ');
        links.push({ title, href: this.normalizeUrl(href) });
      }
    }

    return links;
  }

  /**
   * Normalize URL with base URL
   */
  normalizeUrl(href) {
    if (href.startsWith('http')) {
      return href;
    }

    if (href.startsWith('/')) {
      return `${this.baseURL}${href}`;
    }

    if (href.startsWith('docs/')) {
      return `${this.baseURL}/${href}`;
    }

    return href;
  }

  /**
   * Format content for llms.txt output (matching expected format)
   */
  formatForOutput(fileData) {
    let output = [];

    // Add page header with title and URL
    output.push(`# ${fileData.title}`);
    output.push(`Source: ${fileData.url}`);
    output.push('');

    // Add sections with descriptions and links
    if (fileData.sections.length > 0) {
      for (let i = 0; i < fileData.sections.length; i++) {
        const section = fileData.sections[i];

        // Add section header with proper markdown level
        const headerLevel = '#'.repeat(section.level);
        output.push(`${headerLevel} ${section.name}`);
        output.push('');

        // Add description if present
        if (section.description) {
          output.push(`##### ${section.description}`);
          output.push('');
        }

        // Add links as markdown list
        if (section.links.length > 0) {
          for (const link of section.links) {
            output.push(`- [${link.title}](${link.href})`);
          }
          output.push('');
        }

        // Add separator between sections (except for last section)
        if (i < fileData.sections.length - 1) {
          output.push('***');
          output.push('');
        }
      }

      // Add final separator
      output.push('---------');
    }

    return output.join('\n');
  }

  /**
   * Main scraping method using docs.json
   */
  scrape() {
    console.log('🔍 Parsing docs.json for rendered pages...');
    const renderedPages = this.parseDocsJson();

    if (renderedPages.length === 0) {
      console.warn('No rendered pages found in docs.json');
      return '';
    }

    let allOutput = [];
    let processedCount = 0;
    let errorCount = 0;

    for (const pagePath of renderedPages) {
      const filePath = this.pageToFilePath(pagePath);

      if (!filePath) {
        console.log(`⚠️  No file found for page: ${pagePath}`);
        continue;
      }

      console.log(`📄 Processing: ${pagePath}`);

      try {
        const fileData = this.extractContent(filePath, pagePath);
        const formattedOutput = this.formatForOutput(fileData);

        if (formattedOutput.trim()) {
          allOutput.push(formattedOutput);
          processedCount++;
        }
      } catch (error) {
        console.warn(`⚠️  Error processing ${pagePath}: ${error.message}`);
        errorCount++;
      }
    }

    console.log(`✅ Successfully processed ${processedCount} pages`);
    if (errorCount > 0) {
      console.log(`⚠️  Encountered errors in ${errorCount} pages`);
    }

    return allOutput.join('\n\n');
  }

  /**
   * Generate llms.txt file
   */
  generateLLMSFile() {
    console.log('🚀 Starting MDX scraping using docs.json...');

    const scrapedContent = this.scrape();

    if (!scrapedContent.trim()) {
      console.error('❌ No content was scraped');
      return null;
    }

    const outputPath = path.join(__dirname, 'llms.txt');

    // Add header to the file
    const header = `# Auth0 Documentation - LLMs.txt
# Generated from rendered pages listed in docs.json
# Structured format with sections, descriptions, and links
# Base URL: ${this.baseURL}
# Generated on: ${new Date().toISOString()}

`;

    const finalContent = header + scrapedContent;

    fs.writeFileSync(outputPath, finalContent, 'utf-8');
    console.log(`✅ Generated llms.txt with ${finalContent.length} characters`);
    console.log(`📍 File saved to: ${outputPath}`);

    return outputPath;
  }
}

// Run the scraper if called directly
if (require.main === module) {
  const scraper = new MDXScraper();
  scraper.generateLLMSFile();
}

module.exports = MDXScraper;