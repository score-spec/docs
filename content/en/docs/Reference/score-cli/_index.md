---
title: "Target Platform command reference overview"
linkTitle: "CLI reference"
weight: 9
description: >
  Overview and description for the Platform CLI.
---

The _Platform CLI_ is a command-line tool used to interact with a Score Specification. Use the Platform CLI to transform the platform-agnostic specification into multiple configuration files for the platform of your choice.

- [How to install the Platform CLI]({{< ref "/content/en/docs/Get started/install.md" >}} "Install")
- [Environment variables for Score Specification]({{< ref "/content/en/docs/Get started/Environment Configuration/_index.md" >}} "Environment variables")

## The Platform CLI

Construct your Platform CLI command such that the command options precede its path and arguments when provided.

```bash
score-[platform] [command] [flag]
```

Currently, supported platforms includes:

- `score-compose` the implementation of a Docker Compose configuration.
- `score-helm` the implementation of a Helm Chart configuration.
- `score-humanitec` the implementation of a Humanitec configuration.

## Command reference

The Platform CLI has two distinct parts.

- **Comands**: The commands are tasks you want Score to do. Supply commands and subcommands to score on the command.
- **Flags**: Also called parameters, are options that modify the result of the command by providing additional configurations. Flags are specific to the command, and each command can have independent flags.

## Score commands

- [`run`](): Translates the Score file to the specified platform.
- [`completion`](): Generates the autocompletion script for the specified shell.

## Global modifiers

The following are a list of global modifiers.

### `--help`

Provides more information from the CLI.

Alias: `-h`

### `--version`

Provides version information for the CLI.

Alias: `-v`
