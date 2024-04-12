---
title: "Score schema reference"
linkTitle: "Schema reference"
weight: 10
description: >
    Validate your Score file with the Score schema
aliases:
- /docs/reference/score-schema-reference/
---

The Score schema is a JSON schema that defines the structure of a Score file. It's used to validate the Score file before an implementation CLI (such as `score-compose` or `score-helm`) is executed.
The Score implementation CLI validates the Score file against the schema before generating the platform-specific configuration, by default.

For information on how to configure your IDE to validate your Score file against the Score schema, see [IDE linter and autocomplete for Score's JSON schema]({{< relref "ide-linter-autocomplete" >}}).

<!-- https://github.com/score-spec/schema -->

{{< includeJSON "schemas/score-v1b1.json" >}}
