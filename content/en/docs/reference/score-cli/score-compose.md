---
title: "score-compose"
linkTitle: "score-compose"
description: "CLI Reference for score-compose"
weight: 4
aliases:
- /docs/reference/score-cli/score-compose-run/
---

The score-compose CLI provides a set of commands and flags to enable the generation of Docker Compose files from Score specifications.

- [Commands](#commands):
  - [init](#init): Initialise a new score-compose project 
  - [generate](#generate): Convert one or more Score files into a Docker Compose manifest
  - [completion](#completion): Generate an autocompletion script for a specified shell
  - [run (deprecated)](#run-deprecated): Translate a Score file to Docker Compose 
  - [help](#help): Get help on individual commands

* [Global flags](#global-flags):
   * [--help](#--help---h-2): Get help on score-compose
   * [--quiet](#--quiet): Mute logging output
   * [--verbose count](#--verbose-count---v): Increase log verbosity and detail
   * [--version](#--version): Get version of score-compose

## Commands

# `init`

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

##### `--no-sample`

Disables the generation of the sample Score file if you already have a Score file in place.

```bash
score-compose init --no-sample
```

##### `--project` | `-p`

Sets the name of the Docker Compose project. By default, the project name is the same as the current directory name.

```bash
score-compose init --project custom_project_name.yaml
```

##### `--help` | `-h`

Displays help information for `init`, providing a short description of the command along with examples and compatible flags.

```bash
score-compose init --help
```

# `generate`

The generate command converts the Score file(s) in the current Score Compose project into a combined Docker Compose manifest. All resources and links between Workloads will be resolved and provisioned as required. Please be aware that score-compose [init](#init) must be run first. An error will be thrown if the project directory is not present.

```bash
score-compose generate [flags]
```

#### Flags

The `generate` command can be combined with the following flags:

##### `--build `

Specifies an optional build context to use for the given container. The format is either `--build=container=./dir` or `--build=container={'"context":"./dir"}`.

```bash
score-compose generate --build container=./dir
```

##### `--env-file `

Specifies the location to store a skeleton `.env` file for Docker Compose. This will override existing content if present.

```bash
score-compose generate --env-file /path/to/env-file
```

##### `--image`

Specifies an optional container image to use for any container with `image == '.'`.

```bash
score-compose generate --image your_container_image
```

##### `--output` | `-o`

Specifies the output file to write the composed Docker Compose file to. By default, the output file is named `compose.yaml`.

```bash
score-compose generate --output your_output_file.yaml
```

##### `--override-property`

Specifies an optional set of path=key overrides to set or remove.

```bash
score-compose generate --override-property path1=value1
```

##### `--override-file`

Specifies an optional file of Score overrides to merge in.

```bash
score-compose generate score.yaml --override-file=./overrides.score.yaml
```

##### `--help` | `-h`

Displays help information for `generate`, providing a short description of the command along with examples and compatible flags.

```bash
score-compose generate --help
```

# `completion`

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

##### `--help ` | `-h`

Displays details on how to use the generated script.

```bash
score-compose completion [command] --help
```

# `run (deprecated)`

The run command translates the Score file into a Docker Compose file. Please note that this command is deprecated as it does not support resource provisioning out of the box. Please use the [generate](#generate) command instead.

```bash
score-compose run --file ./score.yaml \
  --output ./compose.yaml \
  --env-file ./backend.env
```

#### Flags

The `run` command can be combined with the following flags:

##### `--build` (deprecated)

Replaces the image name with the specified string.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --build web
```

##### `--env-file` (deprecated)

Specifies the location to store sample `.env` file.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --env-file ./backend.env
```

##### `--file` | `f` (deprecated)

Specifies the path to the Score file. Uses `./score.yaml` as a default value if the flag isn't specified.

```bash
score-compose run -f ./another-score.yaml
```

##### `--output` | `-o` (deprecated)

The output location of the Compose file. Uses `./compose.yaml` as a default value if the flag isn't specified.

```bash
score-compose run -f ./score.yaml -o ./another-compose.yaml
```

##### `--property` | `-p` (deprecated)

Overrides selected property value.

##### `--help` | `-h` (deprecated)

Displays help output for the `run` command.

```bash
score-compose run -h
```

# `help`

The help command provides information on all commands.

```bash
  score-compose help [command] [flags]
```

#### Flags

The `help` command can be combined with the following flags:

##### `--help` | `-h` 

Receive information on the help command.

```bash
score-compose help --help
```

## Global flags

##### `--help` | `-h` 

Displays help information for score-compose, includig available commands and flags.

```bash
score-compose --help
```

##### `--quiet`

Mutes any logging output.

```bash
score-compose --quiet
```

##### `--verbose count` | `-v`

Increases log verbosity and detail by specifying this flag one or more times.

```bash
score-compose --verbose count
```

##### `--version`

Displays the version of score-compose.

```bash
score-compose --version
```


