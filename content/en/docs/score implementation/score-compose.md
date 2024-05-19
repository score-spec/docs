---
title: "score-compose"
linkTitle: "score-compose"
description: "Get started with the score-compose reference implementation"
weight: 1
aliases:
- /docs/reference/score-cli/score-compose-run/
- /docs/reference/score-cli/score-compose/
---

# Overview

The score-compose CLI serves as a reference implementation for the Score specification, providing a standard for the creation of custom Score CLIs. Score-compose can be utilized both as a reference point for implementation and for practical use in local development with Docker Compose. Below you'll find an overview of:

* [Installation options](#installation)
* [CLI reference](#cli-reference)
* [Examples](#examples)

For additional details and opportunities to contribute to the project, visit the [score-compose](https://github.com/score-spec/score-compose) GitHub repository.

## Installation

You can install the score-compose CLI in a variety of ways:

- [Homebrew](#homebrew)
- [Go](#go)
- [Docker](#docker)
- [Manual download](#manual-download)

### Homebrew

Prerequisites: You must have [brew](https://brew.sh) installed.

```bash
brew install score-spec/tap/score-compose
```

### Go

Prerequisites: You must have [Go](https://go.dev/dl/) installed.

```bash
go install -v github.com/score-spec/score-compose/cmd/score-compose@latest
```

### Docker

Prerequisites: You must have [Docker](https://docs.docker.com/get-docker/) installed.

1. Download the repository.
   The following example uses the GitHub CLI to download the project.

```bash
gh repo clone score-spec/score-compose
```

2. Change directories into `score-compose`.

```bash
cd score-compose
```

3. Build the Docker image by running the following command in the same directory as the Dockerfile.

```bash
docker build -t score-compose:latest .
```

4. Run the Docker image by using the `docker run` command.

```bash
docker run -it score-compose:latest
```

If you want to run `score-compose` with the `--help` flag to view the available options, you would run the following command.

```bash
docker run -it score-compose:latest --help
```

This will start a new container based on the image you built, run `score-compose` with the `--help` flag, and then stop the container.

### Manual download

The following methods download the score-compose CLI from its [GitHub release page](https://github.com/score-spec/score-compose/releases):

{{< tabs name="Manual installation methods">}}
{{< tab name="curl on macOS" include="included/install-score-compose-curl-mac.md" />}}
{{< tab name="wget on macOS/Linux" include="included/install-wget-compose.md" />}}
{{< tab name="Github DLs on macOS/Linux" include="included/install-score-compose-bash.md" />}}
{{< tab name="Windows" include="included/install-windows-compose.md" />}}
{{< /tabs >}}

## CLI Reference

The score-compose CLI provides a set of commands and flags to enable the generation of Docker Compose files from Score specifications.

## Commands

## `init`

The init command creates a basic `score.yaml` file in the current directory and initializes a `.score-compose/` working directory if it doesn't already exist. The `.score-compose/` directory is used to store local state and should be excluded from version control systems such as Git by adding it to your `.gitignore` file.

```bash
score-compose init [flags]
```

#### Flags

The `init` command can be combined with the following flags:

#### `--file` | `-f`

Specifies a Score file to initialize. By default this is `./score.yaml`.

```bash
score-compose init --file custom_file_name.yaml
```

#### `--no-sample`

Disables the generation of the sample Score file if you already have a Score file in place.

```bash
score-compose init --no-sample
```

#### `--project` | `-p`

Sets the name of the Docker Compose project. By default, the project name is the same as the current directory name.

```bash
score-compose init --project custom_project_name.yaml
```

#### `--help` | `-h`

Displays help information for `init`, providing a short description of the command along with examples and compatible flags.

```bash
score-compose init --help
```

## `generate`

The generate command converts the Score file(s) in the current Score Compose project into a combined Docker Compose manifest. All resources and links between Workloads will be resolved and provisioned as required. Please be aware that score-compose [init](#init) must be run first. An error will be thrown if the project directory is not present.

```bash
score-compose generate [flags]
```

#### Flags

The `generate` command can be combined with the following flags:

#### `--build `

Specifies an optional build context to use for the given container. The format is either `--build=container=./dir` or `--build=container={'"context":"./dir"}`.

```bash
score-compose generate --build container=./dir
```

#### `--env-file `

Specifies the location to store a skeleton `.env` file for Docker Compose. This will override existing content if present.

```bash
score-compose generate --env-file /path/to/env-file
```

#### `--image`

Specifies an optional container image to use for any container with `image == '.'`.

```bash
score-compose generate --image your_container_image
```

#### `--output` | `-o`

Specifies the output file to write the composed Docker Compose file to. By default, the output file is named `compose.yaml`.

```bash
score-compose generate --output your_output_file.yaml
```

#### `--override-property`

Specifies an optional set of path=key overrides to set or remove.

```bash
score-compose generate --override-property path1=value1
```

#### `--overrides-file`

Specifies an optional file of Score overrides to merge in.

```bash
score-compose generate score.yaml --overrides-file=./overrides.score.yaml
```

#### `--help` | `-h`

Displays help information for `generate`, providing a short description of the command along with examples and compatible flags.

```bash
score-compose generate --help
```

## `completion`

The completion command generates an autocompletion script for score-compose in the specified shell.

```bash
score-compose completion [command]
```

The `completion` command can be combined with the following subcommands:

- **bash**: Generate the autocompletion script for bash
- **fish**: Generate the autocompletion script for fish
- **powershell**: Generate the autocompletion script for powershell
- **zsh**: Generate the autocompletion script for zsh

#### Flags

The `completion` command can be combined with the following flags:

#### `--help ` | `-h`

Displays details on how to use the generated script.

```bash
score-compose completion [command] --help
```

## `run (deprecated)`

The run command translates the Score file into a Docker Compose file. Please note that this command is deprecated as it does not support resource provisioning out of the box. Please use the [generate](#generate) command instead.

```bash
score-compose run --file ./score.yaml \
  --output ./compose.yaml \
  --env-file ./backend.env
```

#### Flags

The `run` command can be combined with the following flags:

#### `--build`

Replaces the image name with the specified string.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --build web
```

#### `--env-file`

Specifies the location to store sample `.env` file.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --env-file ./backend.env
```

#### `--file` | `f`

Specifies the path to the Score file. Uses `./score.yaml` as a default value if the flag isn't specified.

```bash
score-compose run -f ./another-score.yaml
```

#### `--output` | `-o`

The output location of the Compose file. Uses `./compose.yaml` as a default value if the flag isn't specified.

```bash
score-compose run -f ./score.yaml -o ./another-compose.yaml
```

#### `--property` | `-p`

Overrides selected property value.

#### `--help` | `-h`

Displays help output for the `run` command.

```bash
score-compose run -h
```

## `help`

The help command provides information on all commands.

```bash
  score-compose help [command] [flags]
```

#### Flags

The `help` command can be combined with the following flags:

#### `--help` | `-h`

Receive information on the help command.

```bash
score-compose help --help
```

## Global flags

#### `--help` | `-h`

Displays help information for score-compose, includig available commands and flags.

```bash
score-compose --help
```

#### `--quiet`

Mutes any logging output.

```bash
score-compose --quiet
```

#### `--verbose count` | `-v`

Increases log verbosity and detail by specifying this flag one or more times.

```bash
score-compose --verbose count
```

#### `--version`

Displays the version of score-compose.

```bash
score-compose --version
```

## Examples

Explore a variety of examples for score-compose, ranging from simple "hello world" setups to more complex configurations, including resource provisioning and multiple workloads. You can find these examples in our [examples library](https://github.com/score-spec/score-compose/tree/main/examples).

If you encounter any issues or have questions, feel free to reach out to us in the [Score community Slack](https://join.slack.com/t/scorecommunity/shared_invite/zt-2a0x563j7-i1vZOK2Yg2o4TwCM1irIuA).