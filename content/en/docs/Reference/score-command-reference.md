---
title: "Score command reference"
linkTitle: "CLI reference"
weight: 9
description: >
  Low level reference docs for your project.
---

Each command is represented as a command or subcommand, and there are a number of command and subcommand options available: HTTP options, output options, and command-specific options.

Construct your Score CLI command such that the command options precede its path and arguments if any:

```bash
score-[platform] [command] [flag]
```

## Platform options

Currently, the following platforms are available.

```bash
score-humanitec
```

```bash
score-compose
```
