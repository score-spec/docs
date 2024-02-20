---
title: "IDE linter for Score's JSON schema"
linkTitle: "JSON schema IDE linter"
weight: 10
description: >
  IDE linter for Score's JSON schema
---

With the introduction of the JSON schema for Score, developers can now benefit from linter functionalities in their Integrated Development Environments (IDEs). IDEs like Visual Studio Code, JetBrains IDEs, and others support JSON schema validation and autocomplete out of the box or with extensions like [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) for VS Code.

<!--
## JSON schema

Score's JSON Schema is supported by [JSON Schema Store](https://www.schemastore.org/json/); however, you can define the schema manually in your IDE.

When you open a YAML file that matches the pattern you specified, VSCode will provide autocomplete suggestions and linting based on the Score JSON schema.
-->

## Configure your IDE

Consult your IDE or IDE's extension for specific details on how to do this.

For instance, configuring Visual Studio Code (VSC) involves the following steps:

* Open your editor's Settings.
* Navigate to "Extensions" tab and select "YAML".
* Under the "Yaml: Custom Tags" section, click on "Edit in settings.json."
* Add the following JSON snippet:

```json

 "yaml.schemas": {
        "https://raw.githubusercontent.com/score-spec/schema/main/score-v1b1.json": "score.yaml"
    }
```

![VSC instructions](/static/images/VSC%20Score%20schema%20linting.png)