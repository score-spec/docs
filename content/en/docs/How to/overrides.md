---
title: "Specify configuration overrides"
linkTitle: "Overrides"
weight: 5
description: >
    How to define overrides for your Score specification with `score-compose` and `score-k8s`
aliases:
- /docs/override/
- /docs/override/override-parameters/
---

An override is a way for you to customize or modify certain aspects of the `score.yaml` file. With score-compose can be achieved using either:

- [Overrides file](#overrides-file)
- [Overrides CLI flag](#overrides-property)

## Overrides file

If an `overrides.score.yaml` file is found, the `score-compose` and `score-k8s` CLIs apply overrides on the output. This occurs whether a flag is provided or not.

### How to override a command

To override the defaults declared in your `score.yaml` file, create a `overrides.score.yaml` file and declare your overrides.

**1.** Create a `score.yaml` file.

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: run-python-app

containers:
  my-service:
    image: python3
    command:
      - python
      - --version
```

**2.** Create an `overrides.score.yaml` file and declare an override.

```yaml
containers:
  my-service:
    command:
      - python
      - --help
```

**3.** Run the following command to override the default arguments with the contents of the `overrides.score.yaml` file.

{{< tabs name="overrides-file">}}
{{< tab name="score-compose" include="./included/overrides-file-score-compose.md" />}}
{{< tab name="score-k8s" include="./included/overrides-file-score-k8s.md" />}}
{{< /tabs >}}

## Overrides CLI flag

You can override the declared values in your command line arguments with the `--override-property` flag. This is an alternative approach to using a `overrides.score.yaml` file.

### How to override a property

Use the `--override-property` flag and specify the path to the property and the new value.

For example, the following looks for the `containers.my-service.image` property and overrides the default image name with a value of `python3`.

{{< tabs name="overrides-property">}}
{{< tab name="score-compose" include="./included/overrides-property-score-compose.md" />}}
{{< tab name="score-k8s" include="./included/overrides-property-score-k8s.md" />}}
{{< /tabs >}}

### How to remove a property

Set the path of the property to an empty value to remove the property.

{{< tabs name="overrides-property-empty">}}
{{< tab name="score-compose" include="./included/overrides-property-empty-score-compose.md" />}}
{{< tab name="score-k8s" include="./included/overrides-property-empty-score-k8s.md" />}}
{{< /tabs >}}
