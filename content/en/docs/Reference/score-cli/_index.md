---
title: "Score command reference overview"
linkTitle: "CLI overview"
weight: 9
description: >
  Overview and description for the Score CLI.
---

The Score CLI is a command-line tool that you can use to interact with a Score Specification.
The Score CLI can transform the platform-agnostic specification into multiple configuration files for the platform of your choice.

- [How to install the Score CLI]({{< ref "/content/en/docs/Get started/install.md" >}} "Install")
- [Environment variables for Score Specification]({{< ref "/content/en/docs/Get started/Environment Configuration/_index.md" >}} "Environment variables")

## Command reference

Each command is represented as a command or subcommand, in the Score CLI.

Construct your Score CLI command such that the command options precede its path and arguments when provided.

```bash
score-[platform] [command] [flag]
```

## Score platforms

Currently, supported platforms includes:

`score-humanitec` the implementation of a Humanitec configuration.

`score-compose` the implementation of a Docker Compose configuration.

## Score commands

- [`run`]()
- [`completion`]()

## Global modifiers

The following are a list of global modifiers.

### `--help`

Provides more information from the CLI.

Alias: `-h`

### `--version`

Provides version information for the CLI.

Alias: `-v`
