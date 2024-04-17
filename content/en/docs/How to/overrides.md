---
title: "Specify configuration overrides"
linkTitle: "Overrides"
weight: 2
description: >
    How to define overrides for your Score specification with score-compose
aliases:
- /docs/override/
- /docs/override/override-parameters/
---

An override is a way for you to customize or modify certain aspects of the `score.yaml` file. With score-compose can be achieved using either:

- [Overrides file](#overrides-file)
- [Overrides CLI flag](#overrides-property)

## Overrides file

If an `overrides.score.yaml` file is found, the score-compose CLI applies overrides on the output. This occurs whether a flag is provided or not.

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

```bash
score-compose generate score.yaml --overrides-file overrides.score.yaml
```

For more information please refer to the score-compose [examples library](https://github.com/score-spec/score-compose/tree/main/examples/07-overrides#overriding-the-score-file-with---overrides-file).

## Overrides CLI flag

You can override the declared values in your command line arguments with the `--override-property` flag. This is an alternative approach to using a `overrides.score.yaml` file.

### How to override a property

Use the `--override-property` flag and specify the path to the property and the new value.

For example, the following looks for the `containers.my-service.image` property and overrides the default image name with a value of `python3`.

```bash
score-compose run -f score.yaml --override-property containers.my-service.image=python3
```

### How to remove a property

Set the path of the property to an empty value to remove the property.

```bash
score-compose run -f score.yaml --override-property metadata.my-service=
```

For more information, please refer to the score-compose [examples library](https://github.com/score-spec/score-compose/tree/main/examples/07-overrides#overriding-individual-properties-in-the-score-file).