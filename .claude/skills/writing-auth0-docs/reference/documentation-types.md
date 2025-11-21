# Documentation Types

Documentation is read by developers in different ways, depending on the situation. Good documentation supports the situation and helps the developer find the information needed to complete the task at hand.

In support of this, there are three documentation types:
- Concept
- Guide
- Reference

Some developers prefer to read explanatory documentation first and fully before delving into instructive documentation, while other developers start with instructive documentation, and dip into explanatory documentation only as needed. All developers use reference documentation to look up the specifics of APIs as they work with them.

## Concept

Concept documentation helps readers understand a field, concept, or architecture. It is best used for explaining the big picture and design constraints and should be written from the perspective of the developer who is using the system, not from the perspective of the developer who has built it or from the perspective of the system.

In concept documentation, it is often useful to include simple architecture charts and drawings. Additionally, mention and link to the standards and APIs that are being used, so that readers have a point of reference to find additional information. Explain when implementations differ from commonly accepted standards to minimize frustration.

Concept documentation can be read and understood as one document, either in parts or as a whole. Readers may skip a chapter or section, but reading the whole document will help them understand the complete picture.

When describing a feature of the product or technology, try to answer the following questions:
- Who is going to use it?
- What does the feature or technology do?
- When is the feature or technology used?
- Where does it fit into the workflow?
- Why is the feature or technology required/needed/wanted?
- How does the feature or technology work?

Do not include instructions on how to use the feature. Break the usage content into tasks and subtasks and create separate docs for each as appropriate. Provide links to those tasks.

Do not include reference content in a concept doc. Create a separate reference doc and link to it.

Do not explain industry standards that your audience should be familiar with. You might explain how an industry standard ties in with your concept, but you should not explain the basics of that industry standard.

Use simple titles that include the subject only. Avoid words like "Learn about..." and "Introduction to..."

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Custom Database Connections | Custom Database Connections Overview<br>Getting started with custom database connections |
| Hook Extensibility Points | Learning About Extensibility Points When Using Hooks |
| Web Tokens | Why Use JSON Web Tokens (JWTs) vs. Simple Web Tokens (SWTs) |

## Guide

Guides help readers complete a particular task. Developers read instructive documentation with a specific goal in mind, so we should write it to help them get from A to B in the shortest time possible. Instead of in-depth explanations of concepts, guides should explain concepts that are touched in one or two sentences and refer to explanatory documentation for details.

Every instructive documentation should start with a goal: explain what the developer will be able to achieve by following the guide. Make the instructive documentation you write easy to follow by minimizing assumptions and listing all prerequisites. This includes familiarity with programming languages, concepts, installed developer tools, required user accounts, and so on. Each step of the instructions should make clear why it needs to be followed.

Examples are crucial in making instructive documentation easy to follow. Many developers simply copy and paste the examples, so make sure that there is an example for each step along the guide, and that the examples can be copied, pasted and executed. Whenever the developer needs to replace values in the example, highlight these placeholders.

Similar to Concept documentation, guides can be read and understood as one document, either in parts or as a whole. Readers may skip a chapter or section, but reading the whole document will help them understand the complete picture.

When describing a feature of the product or technology, answer the following questions during a task analysis:
- Who typically does the task (audience)?
- What is the goal of the task?
- Why is the task needed (examples)?
- When and where in the workflow should the task take place?

Do not add too much conceptual information in the introduction. Link to the parent concept docs.

Do not add reference sections (tables, lists, best practices, troubleshooting information) that could or may be linked to or used by other guides and concepts. Make them separate docs and link to them.

Use task-oriented titles that describe the performance goals. Avoid functional wording that uses Auth0-specific feature names.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| Use Your Own Database | How to connect a custom database<br>Connecting a custom database |
| Assign and change users | The User Management Tab |

## Reference

Reference documentation is made up of short articles that describe one item in a structured way and are consumed like a dictionary or encyclopedia. You don't read the dictionary—you consult it. This kind of documentation will frequently be looked up and consumed bit by bit.

Like instructive documentation, reference documentation is task-oriented, but the task at hand is a smaller fragment that typically involves refreshing a developer's memory on API usage or configuration parameters.

Some examples that should be reference docs are:
- Logs
- Files
- Restrictions and limitations
- Grant types
- Settings
- Error codes
- Troubleshooting

Write reference documentation so that each item (class, method, API function) can stand on its own. Make references to other items browsable through links. Include examples.

Use simple, straight-forward titles with as few acronyms as possible. Identify what the items or facts relate to and what they are.

| ✅ **Preferred** | ❌ **Discouraged** |
| --- | --- |
| JSON Web Key Set Property Example | JWKS Demo Tenant Example Properties |
| JSON Web Token Structure | The JWS Structure of a JWT in Auth0 |
| Troubleshoot Custom Domains | Troubleshooting Custom Domains |
| Multi-Tenant Deployment Scenario | How to Setup Multi-Tenant Environments |
