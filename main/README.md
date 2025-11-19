# Auth0 Documentation

This repository contains source material for https://auth0.com/docs. **Please reach out to Auth0 Product Documentation before you open a PR or contribute to Auth0 Docs.**

## Editing Docs Content
* You can edit Docs content by using the GitHub web editor and editing a file. This is best suited for typos and small changes.
* You can also pull down the `/docs` repo to your computer via Git and edit files in your local editor, before pushing a new branch (or a branch to your own fork of the project). You can then go to GitHub.com and start a PR. 
We will be able to review the changes prior to merging.
  - Regardless of which option you use, again, please contact the Auth0 Documentation Team for contribution references.

### Set up your local environment

1. To set up Mintlify for local development, you need to install the [Mintlify CLI](https://mintlify.com/docs/installation).
2. Make sure you are using [Node.js](https://nodejs.org/en)v20.
3. Run the command `npm install mint -g`.
4. Navigate to the `/main` folder.
5. Run `mint dev`.
6. Preview the build in `localhost:3000`.

## Contribution workflow

To make a contribution to Auth0 Documentation:
1. Fork the repository, clone your fork, and create a new branch for your work. 
2. Use a descriptive name that reflects your changes:
  * `fix`: Update broken links, screenshots, typos, etc.
  * `feat`: Update documentation based on new features, such as a new quickstart or integration.
  * `refactor`: Update that doesn’t add features or fix bugs.
  *  Example: `fix/typo-in-code-sample`
3. In your local branch, make your necessary updates to the Markdown (.mdx) files. 
4. Commit your work with a clear commit message on what you changed and why, and push your local branch to your forked repo on GitHub.
5. Go to your forked repo on GitHub and create a pull request (PR). 
6. Complete the PR template, provide a clear title and a detailed description of your changes.
7. Contact the Auth0 Product Documentation team to request review and publication.

## Issues
If you find a bug or inaccuracy in the documentation content, please report it in this repository's [issues](https://github.com/auth0/docs-v2/issues) section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## License

This project is licensed under the MIT license. See the [LICENSE](../LICENSE) file for more info.