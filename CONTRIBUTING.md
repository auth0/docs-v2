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

### Deploy previews

Mintlify automatically generates a deployment preview for any PR against `main`.

Additionally, for the `sus` and `tus` staging and testing environments, you can (force) push to the `staging` and `testing` branches, respectively. Please coordinate with the team for use of these environments.

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

## Translations

The `main` site uses [General Translation](https://generaltranslation.com/en-US/docs/overview/get-started) for automated translation. We only write and maintain English content in `docs/`; the `fr-ca` and `ja-jp` locale directories are generated automatically and should not be edited by hand.

A [GitHub Actions workflow](.github/workflows/translate.yml) runs the General Translation CLI on every push to `main` that touches translatable source files (`main/docs/**/*.mdx`, `main/docs/oas/**/*.json`, or `main/snippets/**/*.jsx`). It opens or updates a single automated PR (branch `automated/translations-update`) with the resulting translations, so locale content typically lags the English source by one PR cycle rather than updating instantly.

### How the `gt` CLI works

Translation behavior for `main` is configured in [`main/gt.config.json`](main/gt.config.json), which defines the target locales (`fr-ca`, `ja-jp`), which files are translatable, and how source paths map to locale paths.

[`main/gt-lock.json`](main/gt-lock.json) is the lockfile the CLI generates and maintains. For each source file it stores a content hash (and a hash per locale translation). When you run `gt translate`, the CLI hashes the current source files and compares them against the lockfile — only files whose hash has changed (new or edited content) get re-translated; everything else is left untouched. This keeps translation runs fast and avoids re-translating content that hasn't changed. Don't edit `gt-lock.json` by hand; it's maintained entirely by the CLI.

### Running `gt` locally

To run `gt` commands (e.g. `gt translate`) locally instead of relying on CI, create a `.env.local` file inside `main/` with your project credentials:

```
GT_PROJECT_ID=<your-project-id>
GT_API_KEY=<your-api-key>
```

Install the CLI globally with `npm i -g gt@latest`, then from inside `main/`, run commands with `gt <command>` (e.g. `gt translate`). Never commit `.env.local` — it contains a live API key.
