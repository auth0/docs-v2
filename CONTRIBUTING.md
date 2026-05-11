# Auth0 Docs Contribution Guide

Thanks for your interest in contributing to Auth0's docs!

## Before you start

Before you start working on a contribution to the docs, please coordinate with the appropriate team:

* The content in this repo is owned by the writers on the Product Documentation team, @project-docs-writers-codeowner.

* The code and API documentation in this repo is owned by the engineers on the Docs Management team, @project-docs-management-codeowner.

Both teams have additional resources, contextual information, and internal documentation to help you decide when and how to contribute.

### Contribution permissions

Auth0 employees can request write access to the repository via Terminus and use a [branch-based workflow](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) to propose changes.

### Pull requests

When you open a PR, the appropriate teams are assigned based on the repo `CODEOWNERS`. Approving reviews are required in order to merge.

We generally follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for PR titles. In particular, begin PR titles with the type (`feat`, `docs`, `fix`, `chore`, etc.) followed by a brief description.

## Platform and tooling

As described in the README, this is a [Mintlify](https://mintlify.com/) monorepo.

### Mintlify setup

You can [install the Mintlify CLI to preview the docs locally](https://www.mintlify.com/docs/installation#install-the-cli).

Auth0 employees need to disable the VPN when installing the CLI and running `mint dev` for the first time to allow the framework to download. After the initial download completes, you can re-enable your VPN.

The Mintlify CLI also provides some useful tools, like finding broken internal links with `mint broken-links` or checking accessibility with `mint a11y`.

### External link checking

We use [Lychee](https://lychee.cli.rs/) to check for broken non-local links. Our Lychee config is in [`lychee.toml`](lychee.toml).

For local link checking, run `lychee` from the root of the repo. Specify the config file and the path(s) you want to check. For example, to check everything in the main docs site:

```
lychee -c lychee.toml 'main/docs/**/*.mdx' 
```

Our CI uses the same Lychee config to check external links in PRs that change content files. The GitHub Action leaves a comment on the PR with a summary of the results and a list of any broken links.

## Content files

Each [page in Mintlify](https://www.mintlify.com/docs/organize/pages) is a Markdown file. This repo uses MDX, which is Markdown with support for React components.

This section summarizes some relevant information about content files, but see the [internal Auth0 Docs Style Guide](https://oktawiki.atlassian.net/wiki/spaces/DOCS/pages/2544472407/Auth0+Docs+Style+Guide) for full detail about writing, presentation, and more.

### Front matter for page metadata

Each Markdown file begins with front matter in YAML containing metadata for the page.

Of [Mintlify's built-in front matter fields](https://www.mintlify.com/docs/organize/pages#page-metadata), most pages here only need a `title` and `description`, and occasionally `sidebarTitle` to customize the sidebar link text.

We one use piece of custom front matter:

* `validatedOn` with a date in `yyyy-mm-dd` format to indicate when the content was last validated.

### URLs and navigation

The path and name of a file determine the slug for the corresponding page.

To add a page to the navigation, you need to [manually add it to the `docs.json`](https://www.mintlify.com/docs/organize/navigation) for that site.

### Components

Mintlify's [built-in component library](https://www.mintlify.com/docs/components) has a number of existing components.

Read [the Components page of our style guide](https://oktawiki.atlassian.net/wiki/spaces/DOCS/pages/4419420854/Components) for information on when and how to use components.

### Images and other media

Upload images or other files to the `/images` folders in the repository following our [screenshot use policy in our style guide](https://oktawiki.atlassian.net/wiki/spaces/DOCS/pages/2544472521/Multimedia+and+screenshot+use+policy).
