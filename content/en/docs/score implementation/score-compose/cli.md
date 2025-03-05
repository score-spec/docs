---
title: "score-compose CLI reference"
linkTitle: "CLI reference"
description: "CLI reference for score-compose"
weight: 2
aliases:
- /docs/reference/score-cli/score-compose/cli
---

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
score-compose init --project score-compose2
```

#### `--provisioners` | `-p`

Loads additional provisoners from a remote url. May be specified multiple times. Supports the following formats:

- `http://host/file`
- `https://host/file`
- `git-ssh://git@host/repo.git/file`
- `git-https://host/repo.git/file`
- `oci://[registry/][namespace/]repository[:tag|@digest][#file]`

```bash
score-compose init --provisioners https://raw.githubusercontent.com/user/repo/main/example.yaml
```

#### `--help` | `-h`

Displays help information for `init`, providing a short description of the command along with examples and compatible flags.

```bash
score-compose init --help
```

## `generate`

The `generate` command converts the Score file(s) in the current Score Compose project into a combined Docker Compose manifest. All resources and links between Workloads will be resolved and provisioned as required. Please be aware that [`score-compose init`](#init) must be run first. An error will be thrown if the project directory is not present.

```bash
score-compose generate [flags]
```

#### Flags

The `generate` command can be combined with the following flags:

#### `--build`

Specifies an optional build context to use for the given container. The format is either `--build=container=./dir` or `--build=container={'"context":"./dir"}`.

```bash
score-compose generate --build container=./dir
```

#### `--env-file`

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

#### `--publish`

Specifies an optional set of HOST_PORT:<ref>:CONTAINER_PORT to publish on the host system. <ref> could be either for the workload (example: 8080:my-workload:80) or for a resource (example: 5432:postgres#my-workload.db.host:5432).

```bash
score-compose generate score.yaml --publish 8080:my-workload:80
```

#### `--help` | `-h`

Displays help information for `generate`, providing a short description of the command along with examples and compatible flags.

```bash
score-compose generate --help
```

## `completion`

The `completion` command generates an autocompletion script for `score-compose` in the specified shell.

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

#### `--help` | `-h`

Displays details on how to use the generated script.

```bash
score-compose completion [command] --help
```

## `run (deprecated)`

The `run` command translates the Score file into a Docker Compose file. Please note that this command is deprecated as it does not support resource provisioning out of the box. Please use the [generate](#generate) command instead.

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

#### `--file` | `-f`

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

## `resources`

The `resources` command provides subcommands related to provisioned resources in `score-compose`.

```bash
score-compose resources [command]
```

### Subcommands

#### `get-outputs`

Returns the outputs of provisioned resources. This command retrieves values that can be used by workloads or other processes.

```bash
score-compose resources get-outputs
```

#### `list`

Lists the unique identifiers (UIDs) of all provisioned resources.

```bash
score-compose resources list
```

##### Flags

###### `--format` | `-f`

Display listed resources in the format provided. Uses `table` as default value. Allowed values: `table`, `json`

```bash
score-compose resources list --format json
```

### Flags

#### `--help` | `-h`

Displays help information for the `resources` command, including its available subcommands.

```bash
score-compose resources --help
```

### Global Flags

These flags apply to all `score-compose resources` commands:

#### `--quiet`

Mutes any logging output.

```bash
score-compose resources --quiet
```

#### `--verbose count` | `-v`

Increases log verbosity and detail by specifying this flag one or more times.

```bash
score-compose resources --verbose
```

## `provisioners`

The `provisioners` command provides subcommand related to provisioners in `score-compose`

```bash
score-compose provisioners [command]
```

### Subcommands

#### `list`

List available `provisioners`

```bash
score-compose provisioners list [flags]
```

##### Flags

###### `--format` | `-f`

Display listed provisioners in the format provided. Uses `table` as default value. Allowed values: `table`, `json`

```bash
score-compose provisioners list --format json
```

### Flags

#### `--help` | `-h`

Displays help information for the `provisioners` command, including its available subcommands.

```bash
score-compose provisioners --help
```

## `help`

The help command provides information on all commands.

```bash
score-compose help [command] [flags]
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
