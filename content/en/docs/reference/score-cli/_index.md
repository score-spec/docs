---
title: "Target Platform command reference overview"
linkTitle: "Score CLI"
weight: 9
description: >
  Overview and description for the Score implementation (CLI).
---

The _Score implementation (CLI)_ is a command-line tool used to interact with a Score Specification. Use a Score implementation (CLI) to transform your `score.yaml` file into multiple configuration files for the platform of your choice.

- [How to install the Score implementation (CLI)]({{< relref "/docs/Get started/install.md" >}} "Install")
- [Set environment-specific configuration to run Workloads in a target environment]({{< relref "/docs/environment%20variables/_index.md" >}} "Set environment-specific configuration to run Workloads in a target environment.")

## The Score implementation (CLI)

Construct your Score implementation (CLI) commands such that the command options precede its path and arguments when provided.

```bash
score-[platform] [command] [flag]
```

Available reference implementations include:

- [score-compose](https://github.com/score-spec/score-compose) to generate a Docker Compose file.
- [score-helm](https://github.com/score-spec/score-helm) to generate `values.yaml` file for your Helm chart.

## Command reference

The Score implementation (CLI) has two distinct parts.

- **Commands**: The commands are tasks you want Score to do. Supply Score with commands and subcommands to execute specific tasks.
- **Flags**: Flags, also called parameters, are options that modify the result of the _command_ by providing additional configurations. Flags are specific to the command, and each command can have independent flags.

## Global modifiers

The following is a list of global modifiers.

### `--help`

Provides additional information from the CLI.

Alias: `-h`

### `--version`

Provides version information for the CLI.

Alias: `-v`

<!--

## File defaults

The following are defaults for the Score implementation (CLI).

### `./score.yaml`

The source of the authored Score file location.

### `./override.score.yaml`

The override default file location.

-->
