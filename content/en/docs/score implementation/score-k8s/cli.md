---
title: "score-k8s CLI reference"
linkTitle: "CLI reference"
description: "CLI reference for score-k8s"
weight: 2
aliases:
- /docs/reference/score-cli/score-k8s/cli
---

The `score-k8s` CLI provides a set of commands and flags to enable the generation of Kubernetes manifests from Score specifications.

## Commands

## `init`

The `init` command will prepare the current directory for working with `score-k8s` and write the initial empty state and default provisioners file into the `'.score-k8s'` subdirectory. The `'.score-k8s'` directory contains state that will be used to generate any Kubernetes resource manifests including potentially sensitive data and raw secrets, so this should not be checked into generic source control.

```bash
score-k8s init [flags]
```

#### Flags

The `init` command can be combined with the following flags:

#### `--file` | `-f`

Specifies a Score file to initialize. By default this is `./score.yaml`.

```bash
score-k8s init --file custom_file_name.yaml
```

#### `--no-sample`

Disables the generation of the sample Score file if you already have a Score file in place.

```bash
score-k8s init --no-sample
```

#### `--provisioners`

Loads additional provisoners from a remote url. May be specified multiple times. Supports the following formats:
  - `http://host/file`
  - `https://host/file`
  - `git-ssh://git@host/repo.git/file`
  - `git-https://host/repo.git/file`
  - `oci://[registry/][namespace/]repository[:tag|@digest][#file]`

```bash
score-k8s init --provisioners https://raw.githubusercontent.com/user/repo/main/example.yaml
```

#### `--help` | `-h`

Displays help information for `init`, providing a short description of the command along with examples and compatible flags.

```bash
score-k8s init --help
```

## `generate`

The `generate` command will convert Score files in the current Score state into a combined set of Kubernetes manifests. All resources and links between Workloads will be resolved and provisioned as required. `score-k8s init` must be run first. An error will be thrown if the project directory is not present.

```bash
score-k8s generate [flags]
```

#### Flags

The `generate` command can be combined with the following flags:

#### `--image`

Specifies an optional container image to use for any container with `image == '.'`.

```bash
score-k8s generate --image your_container_image
```

#### `--output` | `-o`

Specifies the output file to write the manifest to. By default, the output file is named `manifest.yaml`.

```bash
score-k8s generate --output your_output_file.yaml
```

#### `--override-property`

Specifies an optional set of path=key overrides to set or remove.

```bash
score-k8s generate --override-property path1=value1
```

#### `--overrides-file`

Specifies an optional file of Score overrides to merge in.

```bash
score-k8s generate score.yaml --overrides-file=./overrides.score.yaml
```

#### `--patch-manifests`

Specifies an optional set of `<kind|*>/<name|*>/path=key` operations for the output manifests.

```bash
score-k8s generate --patch-manifests 'Deployment/my-workload/spec.replicas=3'
```

#### `--help` | `-h`

Displays help information for `generate`, providing a short description of the command along with examples and compatible flags.

```bash
score-k8s generate --help
```

## `completion`

Generate the autocompletion script for `score-k8s` for the specified shell. See each sub-command's help for details on how to use the generated script.

#### Sub-Commands

The `completion` commands supports the following sub-commands.

#### `bash`

Generate completions for bash

```bash
score-k8s completion bash
```

#### `zsh`

Generate completions for zsh

```bash
score-k8s completion zsh
```

#### `fish`

Generate completions for fish

```bash
score-k8s completion fish
```

#### `powershell`

Generate completions for powershell

```bash
score-k8s completion powershell
```

#### Flags

The `completion` command can be combined with the following flags

#### `--help` | `-h`

Displays help information for `completion`, providing a short description of the command along with sub-commands and compatible flags.

```bash
score-k8s completion --help
```

## `help`

The `help` command provides information on all commands.

```bash
score-k8s help [command] [flags]
```

## Global flags

#### `--help` | `-h`

Displays help information for `score-k8s`, includig available commands and flags.

```bash
score-k8s --help
```

#### `--quiet`

Mutes any logging output.

```bash
score-k8s --quiet
```

#### `--verbose count` | `-v`

Increases log verbosity and detail by specifying this flag one or more times.

```bash
score-k8s --verbose count
```

#### `--version`

Displays the version of `score-k8s`.

```bash
score-k8s --version
```
