---
title: "Add an override configuration"
linkTitle: "Add override configuration"
weight: 5
description: >
  Use overrides as a method of sharing common configurations across environments.
---

An override is a way for you to customize or modify certain aspects the `score.yaml` file. Overrides can be used to make changes to directly to the Workload Definition without having to set up numerous files and Environment Profiles containing the same static values.

By default, the Score implementation tool looks for a `score.yaml` file and overrides the declared defaults with in that file, if `overrides.score.yaml` exits.

The following Score implementation CLIs support passing an override file as an argument.

- `score-compose`
- `score-helm`
- `score-humanitec`

## Overview

If an `overrides.score.yaml` file is found, the {{< glossary_tooltip text="Score implementation (CLI)" term_id="score" >}} applies overrides on the output. This occurs whether a flag is provided or not.

Any property of Score segment can be overridden.

For example, the `score.yaml` file contains a configuration, however, the `overrides.score.yaml` file contains configuration overrides for new and existing services.

If a configuration option is defined in both the default `score.yaml` file and the `overrides.score.yaml` file, the default values are replaced with the overrides.

## Override a command

To override the defaults declared in your `score.yaml` file create a `overrides.score.yaml` file and declare your overrides.

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

<!-- https://docs.docker.com/compose/extends/#adding-and-overriding-configuration -->

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

```yaml {linenos=false,hl_lines=["4-5"]}
services:
  run-python-app:
    entrypoint:
      - python
      - --help
    image: python3
```

**Results** You've successfully overridden the default configuration file with a command described in your `overrides.score.yaml` file.
