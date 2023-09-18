---
title: "IDE linter and autocomplete for Score's JSON schema"
linkTitle: "JSON schema autocomplete"
weight: 10
description: >
  Reference documentation for the IDE linter and autocomplete for Score's JSON schema.
---

With the introduction of the JSON schema for Score, developers can now benefit from linter and autocomplete functionalities in their Integrated Development Environments (IDEs). IDEs like Visual Studio Code, JetBrains IDEs, and others support JSON schema validation and autocomplete out of the box or with extensions like [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) for VS Code.

<!--
## JSON schema

Score's JSON Schema is supported by [JSON Schema Store](https://www.schemastore.org/json/); however, you can define the schema manually in your IDE.

When you open a YAML file that matches the pattern you specified, VSCode will provide autocomplete suggestions and linting based on the Score JSON schema.
-->

## Configure your IDE

Consult your IDE or IDE's extension for specific details on how to do this.

Generally, you need to add the following lines to your IDE's settings:

```json
"json.schemas": [
  {
    "fileMatch": [
      "score.yaml",
      "score.yml"
    ],
    "url": "https://raw.githubusercontent.com/score-spec/schema/main/score-v1b1.json"
  }
]
```

For information on setting up autocompletion script for the shell, see [Enable autocomplete for shell]({{< relref "score-cli/enable-autocomplete" >}}).
