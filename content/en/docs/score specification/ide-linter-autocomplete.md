---
title: "IDE linter for Score's JSON schema"
linkTitle: "Schema IDE linter"
weight: 11
description: >
  IDE linter for Score's JSON schema
aliases:
- /docs/reference/ide-linter-autocomplete/
---

With the introduction of the JSON schema for Score, developers can benefit from linter functionalities in their Integrated Development Environments (IDEs). IDEs like Visual Studio Code, JetBrains IDEs, and others support JSON schema validation out of the box or with extensions like [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) for VS Code.

## Configure your IDE

Consult your IDE or IDE's extension for specific details on how to do this.

For instance, configuring Visual Studio Code (VSC) involves the following steps:

* Ensure you have an add-on such as [vscode-yaml](https://github.com/redhat-developer/vscode-yaml) installed. This is required for the validation of your Score YAML files, as Visual Studio Code (VSC) only supports `json.schemas` out of the box.
* To enable schema validation in your IDE, open your editor's Settings next.
* Navigate to "Extensions" and select "YAML".
* Under the "Yaml: Custom Tags" section, click on "Edit in settings.json."
* Add the following JSON snippet:

```json

 "yaml.schemas": {
        "https://raw.githubusercontent.com/score-spec/schema/main/score-v1b1.json": "score.yaml"
    }
```

For reference:

![VSC instructions](/images/vsc-score-schema-linting.png)

