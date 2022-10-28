---
title: "Override extension"
linkTitle: "Override extension"
weight: 4
---

Score supports for file overrides as a method of sharing common configurations.

Score looks for the default `score.yaml` file and overrides declared defaults with the `overrides.score.yaml` file.

## Overview

If an `overrides.score.yaml` file is found, the {{< glossary_tooltip text="Score implementation (CLI)" term_id="platform-cli" >}} checks the default file automatically and applies overrides on the output.

Any property of Score segment can be overridden.

For example, the `score.yaml` file contains a configuration, however, the `overrides.score.yaml` file contains configuration overrides for new and existing services.

If a configuration option is defined in both the default `score.yaml` file and the `overrides.score.yaml` file, the default values are replaced with the overrides.

## Overrides example

To override the defaults declared in your `score.yaml` file create a `overrides.score.yaml` file and declare your overrides.

1. Create a `score.yaml` file.

```yml
services:
  my-service:
    command:
      - python app.py
```

2. Create an `overrides.score.yaml` file and declare an override.

```yml
containers:
  container-id:
    args: ["python prod-app.py"]
```

3. Run `score-compose run -f score.yaml` and the default arguments will be overridden by the `overrides.score.yaml` file.

The following is an example output.

```bash
services:
  backend:
    command:
      - python3 prod-app.py
```

**Results** You've successfully overridden the default configuration file with a command described in your `overrides.score.yaml` file.
