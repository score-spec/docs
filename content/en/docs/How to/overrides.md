---
title: "Specify configuration overrides"
linkTitle: "Overrides"
weight: 5
Alias:
- /docs/override/
- /docs/override/override-parameters/
---

An override is a way for you to customize or modify certain aspects of the `score.yaml` file. This can be achieved using either:

- [Overrides file](#overrides-file)
- [Overrides CLI flag](#overrides-property)

Currently, these options are supported by the following Score implementation CLIs:

- `score-compose`
- `score-helm`

## Overrides file

If an `overrides.score.yaml` file is found, the Score implementation (CLI) applies overrides on the output. This occurs whether a flag is provided or not.

### Example: How to override a command

To override the defaults declared in your `score.yaml` file, create a `overrides.score.yaml` file and declare your overrides.

1. Create a `score.yaml` file.

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

2. Create an `overrides.score.yaml` file and declare an override.

```yaml
containers:
  my-service:
    command:
      - python
      - --help
```

3. Run the following command to override the default arguments by the `overrides.score.yaml` file.

```bash
score-compose run -f ./score.yaml \
  -o ./compose.yaml \
  --overrides ./overrides.score.yaml
```

The following is an example output of the previous command.

```yaml
services:
  run-python-app:
    entrypoint:
      - python
      - --help
    image: python3
```

**Result:** You've successfully overridden the default configuration file with a command described in your `overrides.score.yaml` file.

## Overrides CLI flag

With Score, you can override the declared values in your command line arguments with the `--property` flag. This is an alternative approach to using a `overrides.score.yaml` file. For details, please refer to the documentation of the implementation CLI you are using.

### Example: How to override a property

Use the `--property` flag and specify the path to the property and the new value.

For example, the following looks for the `containers.my-service.image` property and overrides the default image name with a value of `python3`.

```bash
score-compose run -f score.yaml --property containers.my-service.image=python3
```

### Example: How to remove a property

Set the path of the property to an empty value to remove the property.

```bash
score-compose run -f score.yaml --property metadata.my-service=
```

For more information, see the [Score CLI reference]({{< relref "docs/score-implementation" >}}).

### Example: How to substitute a property

Use the `--property` flag to specify a placeholder substitution in resource references section.
