## Available Snippets

### ReleaseStageNotice

Adds a legal notice for release stages with consistent formatting and language.

Options:

Option | Description
-------|---------------
`feature` | The name of the feature. Displayed in the first sentence.
`stage`   | The release stage. Must be either `ea` or `beta`.
`terms`<br/>*(Optional)*   | Set to `true` to include the free trial terms.
`enterprise`<br/>*(Optional)* | Set to `true` to include the Enterprise plan requirement.
`contact`<br/>*(Optional)* | Set to a string (like `support` or `your Technical Account Manager`) to include participation instructions.

Example:

```
import { ReleaseStageNotice } from "/snippets/ReleaseStageNotice.jsx"

<ReleaseStageNotice
    feature="Flexible Password Policy"
    stage="ea"
    terms="true"
/>
```
