---
title: "Add an override configuration"
linkTitle: "Add override configuration"
weight: 5
description: >
  Use overrides as a method of sharing common configurations across environments.
---

Some Score implementations support file overrides as a method of sharing common configurations.
By default, Score looks for the `score.yaml` file and overrides the declared defaults with in that file, if `overrides.score.yaml` exits.

## Overview

If an `overrides.score.yaml` file is found, the {{< glossary_tooltip text="Score implementation (CLI)" term_id="platform-cli" >}} checks the default file automatically and applies overrides on the output.

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

services:
  my-service:
    command:
      - python app.py
```

<!-- https://docs.docker.com/compose/extends/#adding-and-overriding-configuration -->

2. Create an `overrides.score.yaml` file and declare an override.

```yaml
containers:
  container-id:
    args: ["python prod-app.py"]
```

3. Run the following command and the default arguments will be overridden by the `overrides.score.yaml` in the output.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --overrides ./overrides.score.yaml
```

The following is an example output of the previous command.

```yaml {linenos=false,hl_lines=["4"]}
services:
  backend:
    command:
      - python prod-app.py
```

**Results** You've successfully overridden the default configuration file with a command described in your `overrides.score.yaml` file.
