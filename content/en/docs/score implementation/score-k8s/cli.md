---
title: "score-k8s CLI reference"
linkTitle: "CLI reference"
description: "CLI reference for score-k8s"
weight: 2
aliases:
  - /docs/reference/score-cli/score-k8s/cli
---

The `score-k8s` CLI provides a set of commands and flags to enable the generation of Kubernetes manifests from Score specifications.

## Global flags

### `--help` | `-h`

Displays help information for `score-k8s`, including available commands and flags.

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

### `--version`

Displays the version of `score-k8s`.

```bash
score-k8s --version
```

## Commands

## `init`

The `init` command will prepare the current directory for working with `score-k8s` and write the initial empty state and default provisioners file into the `'.score-k8s'` subdirectory. The `'.score-k8s'` directory contains state that will be used to generate any Kubernetes resource manifests including potentially sensitive data and raw secrets, so this should not be checked into generic source control.

```bash
score-k8s init [flags]
```

#### Flags

The `init` command can be combined with the following flags:

### `--file` | `-f`

Specifies a Score file to initialize. By default this is `./score.yaml`.

```bash
score-k8s init --file custom_file_name.yaml
```

### `--no-default-provisioner`

Skip default provisoners file creation

```bash
score-k8s init --provisioners https://raw.githubusercontent.com/user/repo/main/example.yaml --no-default-provisioners
```

### `--no-sample`

Disables the generation of the sample Score file if you already have a Score file in place.

```bash
score-k8s init --no-sample
```

### `--patch-templates`

Loads patch templates from a remote url. May be specified multiple times. Supports the following formats:

- `http://host/file`
- `https://host/file`
- `git-ssh://git@host/repo.git/file`
- `git-https://host/repo.git/file`
- `oci://[registry/][namespace/]repository[:tag|@digest][#file]`

```bash
score-k8s init --patch-templates https://raw.githubusercontent.com/user/repo/main/example.yaml
```

Learn more about this `--patch-templates` feature [here](/docs/score-implementation/score-k8s/patch-templates/).

### `--provisioners`

Loads additional provisoners from a remote url. May be specified multiple times. Supports the following formats:

- `http://host/file`
- `https://host/file`
- `git-ssh://git@host/repo.git/file`
- `git-https://host/repo.git/file`
- `oci://[registry/][namespace/]repository[:tag|@digest][#file]`

```bash
score-k8s init --provisioners https://raw.githubusercontent.com/user/repo/main/example.yaml
```

Learn more about this `--provisioners` feature [here](/docs/score-implementation/score-k8s/resources-provisioners/).

## `generate`

The `generate` command will convert Score files in the current Score state into a combined set of Kubernetes manifests. All resources and links between Workloads will be resolved and provisioned as required. `score-k8s init` must be run first. An error will be thrown if the project directory is not present.

```bash
score-k8s generate [flags]
```

#### Flags

The `generate` command can be combined with the following flags:

### `--generate-namespace`

Specifies optionally if a `Namespace` resource should be generated in the manifests. Requires `--namespace` to be set.

```bash
score-k8s generate --namespace test-ns --generate-namespace
```

### `--image` | `-i`

Specifies an optional container image to use for any container with `image == '.'`.

```bash
score-k8s generate --image your_container_image
```

### `--namespace` | `-n`

Specifies an optional `Namespace` to set on the resources in the manifests.

```bash
score-k8s generate --namespace test-ns
```

### `--output` | `-o`

Specifies the output file to write the manifests to. By default, the output file is named `manifests.yaml`.

```bash
score-k8s generate --output your_output_file.yaml
```

### `--override-property`

Specifies an optional set of `path=key` overrides to set or remove.

```bash
score-k8s generate --override-property path1=value1
```

### `--overrides-file`

Specifies an optional file of Score overrides to merge in.

```bash
score-k8s generate score.yaml --overrides-file=./overrides.score.yaml
```

## `provisioners`

The `provisioners` command provides subcommand related to provisioners in `score-k8s`

```bash
score-k8s provisioners [command]
```

### `list`

List available `provisioners`

```bash
score-k8s provisioners list [flags]
```

## `resources`

The `resources` command provides subcommands related to provisioned resources in `score-k8s`.

```bash
score-k8s resources [command]
```

### `get-outputs`

Returns the outputs of provisioned resources. This command retrieves values that can be used by workloads or other processes.

```bash
score-k8s resources get-outputs
```

### `list`

Lists the unique identifiers (UIDs) of all provisioned resources.

```bash
score-k8s resources list
```
