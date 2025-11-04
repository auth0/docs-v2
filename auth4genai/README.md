# Documentation for Auth0 for AI Agents

This directory contains the documentation for the Auth0 for AI Agents features in Auth0, which can be found at https://auth0.com/ai/docs.

## Mintlify Starter Kit

Click on `Use this template` to copy the Mintlify starter kit. The starter kit contains examples including

- Guide pages
- Navigation
- Customizations
- API Reference pages
- Use of popular components

### Development

**Okta employees: see our [internal docs](https://oktawiki.atlassian.net/wiki/spaces/DAFS/pages/3622310144/Auth4GenAI+docs+Mintlify+access+and+local+dev) on access and local dev.**

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) to preview the documentation changes locally. To install, use the following command

```
npm i -g mint
```

Run the following command at the root of your documentation (where `docs.json` is, so in this case, `/auth4genai`):

```
mint dev
```

### Publishing Changes

Install our Github App to auto propagate changes from your repo to your deployment. Changes will be deployed to production automatically after pushing to the default branch. Find the link to install on your dashboard.

#### Troubleshooting

- See [local dev guide](https://oktawiki.atlassian.net/wiki/spaces/DAFS/pages/3622310144/Auth4GenAI+docs+Mintlify+access+and+local+dev) for reference.
- If the dev environment isn't running - Run `mint update` to ensure you have the most recent version of the CLI.
- Page loads as a 404 - Make sure you are running in a folder with `docs.json`

## Custom React Components

Use the `snippets` folder to hold content we want to reuse throughout the application; for example, custom React components or JSON-style data. 
Note that when importing a component into a `.mdx` file, we must include everything that component imports as well.
For example: `SearchAndFilterGrid` imports `CustomCard`. When importing and using `SearchAndFilterGrid` in `/integrations/overview.mdx` file, we must also import `CustomCard`.

## Style Guide

### Code Blocks

When creating a code block of any size or language, be sure to include the options `wrap lines`.

Learn more about Mintlify code block options [here](https://mintlify.com/docs/code#code-block-options).

In this repo, code block instantiation follows this pattern:

` ```[language] [file name (optional)] wrap lines [highlight lines (optional)]`

For example:

```

```bash .env wrap lines
...

```

```

```typescript ./src/auth0/app wrap lines highlight={1,7-10}
...

```
