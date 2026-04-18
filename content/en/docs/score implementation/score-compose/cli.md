---
title: "score-compose CLI reference"
linkTitle: "CLI reference"
description: "CLI reference for score-compose"
weight: 2
aliases:
- /docs/reference/score-cli/score-compose/cli
---

The `score-compose` CLI provides a set of commands and flags to enable the generation of Docker Compose files from Score specifications.

## Global flags

### `--help` | `-h`

Displays help information, including available commands and flags.

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

### `--version`

Displays the version of `score-compose`.

```bash
score-compose --version
```

## Commands

## `init`

The init command creates a basic `score.yaml` file in the current directory and initializes a `.score-compose/` working directory if it doesn't already exist. The `.score-compose/` directory is used to store local state and should be excluded from version control systems such as Git by adding it to your `.gitignore` file.

```bash
score-compose init [flags]
```

#### Flags

The `init` command can be combined with the following flags:

### `--file` | `-f`

Specifies a Score file to initialize. By default this is `./score.yaml`.

```bash
score-compose init --file custom_file_name.yaml
```

### `--no-default-provisioners`

Skips default provisoners file creation

```bash
score-compose init --provisioners https://raw.githubusercontent.com/user/repo/main/example.yaml --no-default-provisioners
```

### `--no-sample`

Disables the generation of the sample Score file if you already have a Score file in place.

```bash
score-compose init --no-sample
```

### `--patch-templates`

Loads patch templates files. May be specified multiple times. Supports the following formats: 
  - `-` _(read from standard input)_
  - `./local/path/file-or-folder`
  - `http://host/file`
  - `https://host/file`
  - `git-ssh://git@host/repo.git/file`
  - `git-https://host/repo.git/file`
  - `oci://[registry/][namespace/]repository[:tag|@digest][#file]`

```bash
score-compose init --patch-templates https://raw.githubusercontent.com/user/repo/main/example.yaml
```

Learn more about this `--patch-templates` feature [here](/docs/score-implementation/score-compose/patch-templates/).

### `--project` | `-p`

Sets the name of the Docker Compose project. By default, the project name is the same as the current directory name.

```bash
score-compose init --project score-compose2
```

### `--provisioners`

Loads provisioners files. May be specified multiple times. Supports the following formats: 
  - `-` _(read from standard input)_
  - `./local/path/file-or-folder`
  - `http://host/file`
  - `https://host/file`
  - `git-ssh://git@host/repo.git/file`
  - `git-https://host/repo.git/file`
  - `oci://[registry/][namespace/]repository[:tag|@digest][#file]`

```bash
score-compose init --provisioners https://raw.githubusercontent.com/user/repo/main/example.yaml
```

Learn more about this `--provisioners` feature [here](/docs/score-implementation/score-compose/resources-provisioners/).

## `generate`

The `generate` command converts the Score file(s) in the current Score Compose project into a combined Docker Compose manifest. All resources and links between Workloads will be resolved and provisioned as required. Please be aware that [`score-compose init`](#init) must be run first. An error will be thrown if the project directory is not present.

```bash
score-compose generate [flags]
```

#### Flags

The `generate` command can be combined with the following flags:

### `--build`

Specifies an optional build context to use for the given container. The format is either `--build=container=./dir` or `--build=container={'"context":"./dir"}`.

```bash
score-compose generate --build container=./dir
```

### `--env-file`

Specifies the location to store a skeleton `.env` file for Docker Compose. This will override existing content if present.

```bash
score-compose generate --env-file /path/to/env-file
```

### `--image` | `-i`

Specifies an optional container image to use for any container with `image == '.'`.

```bash
score-compose generate --image your_container_image
```

### `--output` | `-o`

Specifies the output file to write the composed Docker Compose file to. By default, the output file is named `compose.yaml`.

```bash
score-compose generate --output your_output_file.yaml
```

### `--override-property`

Specifies an optional set of `path=key` overrides to set or remove.

```bash
score-compose generate --override-property path1=value1
```

### `--overrides-file`

Specifies an optional file of Score overrides to merge in.

```bash
score-compose generate score.yaml --overrides-file=./overrides.score.yaml
```

### `--publish` | `-p`

Specifies an optional set of `HOST_PORT:<ref>:CONTAINER_PORT` to publish on the host system. `<ref>` could be either for the workload (example: `8080:my-workload:80`) or for a resource (example: `5432:postgres#my-workload.db.host:5432`).

```bash
score-compose generate score.yaml --publish 8080:my-workload:80
```

## `provisioners`

The `provisioners` command provides subcommand related to provisioners in `score-compose`

```bash
score-compose provisioners [command]
```

### `list`

List available `provisioners`

```bash
score-compose provisioners list [flags]
```

## `resources`

The `resources` command provides subcommands related to provisioned resources in `score-compose`.

```bash
score-compose resources [command]
```

### `get-outputs`

Returns the outputs of provisioned resources. This command retrieves values that can be used by workloads or other processes.

```bash
score-compose resources get-outputs
```

### `list`

Lists the unique identifiers (UIDs) of all provisioned resources.

```bash
score-compose resources list
```

## `version`

Show the version for `score-compose` and new version to update if available.

```bash
score-compose version
```

#### Flags

### `--no-logo`

Do not show the Score logo.

```bash
score-compose version --no-logo
```

### `--no-updates-check`

Do not check for a new version.

```bash
score-compose version --no-updates-check
```

## `check-version`

Assert that the version of `score-compose` matches the required constraint.

```bash
score-compose check-version
```
