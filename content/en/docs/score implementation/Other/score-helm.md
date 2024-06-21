---
title: "score-helm"
linkTitle: "score-helm"
description: "Get started with the score-helm CLI"
weight: 4
aliases:
- /docs/reference/score-cli/score-helm-run/
- /docs/reference/score-cli/score-helm/
---

{{< alert context="info" >}} Deprecation Notice: We have deprecated the score-helm CLI implementation. To get started with Score, we recommend using one of our reference implementations [score-compose]({{< relref "/docs/score implementation/score-compose" >}}) or [score-k8s]({{< relref "/docs/score implementation/score-k8s" >}}). If you're interested in developing a score-helm reference implementation, we'd love to support you! Please [reach out](https://github.com/score-spec/spec?tab=readme-ov-file#-get-in-touch) to us for assistance and collaboration. {{< /alert >}}

# Overview

The score-helm CLI allows developers to translate their Score specification into Helm values files. Below you'll find an overview of:

- [Installation options](#installation)
- [CLI reference](#cli-reference)
- [Examples](#examples)

For additional details and opportunities to contribute to the project, visit the [score-helm](https://github.com/score-spec/score-helm) GitHub repository.

## Installation

You can install the score-helm CLI in a variety of ways:

- [Homebrew](#homebrew)
- [Go](#go)
- [Docker](#docker)
- [Manual download](#manual-download)

### Homebrew

Prerequisites: You must have [brew](https://brew.sh) installed.

```bash
brew install score-spec/tap/score-helm
```

### Go

Prerequisites: You must have [Go](https://go.dev/dl/) installed.

```bash
go install -v github.com/score-spec/score-helm/cmd/score-helm@latest
```

### Docker

Prerequisites: You must have [Docker](https://docs.docker.com/get-docker/) installed.

1. Download the repository.
   The following example uses the GitHub CLI to download the project.

```bash
gh repo clone score-spec/score-helm
```

2. Change directories into `score-helm`.

```bash
cd score-helm
```

3. Build the Docker image by running the following command in the same directory as the Dockerfile.

```bash
docker build -t score-helm:latest .
```

4. Run the Docker image by using the `docker run` command.

```bash
docker run -it score-helm:latest
```

If you want to run `score-helm` with the `--help` flag to view the available options, you would run the following command.

```bash
docker run -it score-helm:latest --help
```

This will start a new container based on the image you built, run `score-helm` with the `--help` flag, and then stop the container.

### Manual download

The following methods download the score-helm CLI from its [GitHub release page](https://github.com/score-spec/score-helm/releases):

{{< tabs name="Manual installation methods">}}
{{< tab name="curl on macOS" include="included/install-score-helm-curl-mac.md" />}}
{{< tab name="wget on macOS/Linux" include="included/install-wget-helm.md" />}}
{{< tab name="Github DLs on macOS/Linux" include="included/install-score-helm-bash.md" />}}
{{< tab name="Windows" include="included/install-windows.md" />}}
{{< /tabs >}}

## CLI Reference

The score-helm CLI provides a set of commands and flags to enable the generation of Helm values files from Score specifications.

## Commands

## `run`

Translates the Score file into a Helm `values.yaml` file.

```bash
score-helm run --file ./score.yaml \
  --output ./values.yaml
```

#### Flags

The `run` command can be combined with the following flags:

#### `--file` | `-f`

Specifies a Score file to initialize. By default this is `./score.yaml.`

```bash
score-helm run -f ./another-score.yaml
```

#### `--help` | `-h`

Help for the `run` command.

```bash
score-helm run -h
```

#### `--output` | `-o`

The output location of the helm file. Uses the default value `./helm.yaml` if the flag isn't specified.

```bash
score-helm run -f ./score.yaml -o ./another-helm.yaml
```

#### `--overrides`

Specifies the path to the override file. Uses the default value `./overrides.score.yaml` if the flag isn't specified.

```bash
score-helm run -f ./score.yaml \
  -o ./values.yaml \
  --overrides ./overrides.score.yaml
```

#### `--property`

Overrides selected property value.

#### `--values`

Specifies the path that declares reference dependencies, or resource property, values that are environment-specific.

```bash
score-helm run -f ./score.yaml --values ./env.yaml -o ./values.yaml
```

#### `--verbose`

Enables a stream to which error messages are sent.

```bash
score-helm run -f ./score.yaml -o ./values.yaml --verbose
```

## Examples

Explore examples for score-helm in the [examples library](https://github.com/score-spec/score-helm/tree/main/examples) on GitHub.

If you encounter any issues or have questions, feel free to reach out to us in the [Score community Slack](https://join.slack.com/t/scorecommunity/shared_invite/zt-2a0x563j7-i1vZOK2Yg2o4TwCM1irIuA).
