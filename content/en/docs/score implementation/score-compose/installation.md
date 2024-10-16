---
title: "score-compose installation"
linkTitle: "Installation"
description: "Installation of score-compose"
weight: 1
aliases:
- /docs/reference/score-cli/score-compose/install
---

You can install the `score-compose` CLI in a variety of ways:

- [Homebrew](#homebrew)
- [Go](#go)
- [Docker](#docker)
- [Manual download](#manual-download)

## Homebrew

Prerequisites: You must have [brew](https://brew.sh) installed.

```bash
brew install score-spec/tap/score-compose
```

## Go

Prerequisites: You must have [Go](https://go.dev/dl/) installed.

```bash
go install -v github.com/score-spec/score-compose/cmd/score-compose@latest
```

## Docker

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

## Manual download

The following methods download the `score-compose` CLI from its [GitHub release page](https://github.com/score-spec/score-compose/releases):

{{< tabs name="Manual installation methods">}}
{{< tab name="curl on macOS" include="../included/install-score-compose-curl-mac.md" />}}
{{< tab name="wget on macOS/Linux" include="../included/install-wget-compose.md" />}}
{{< tab name="GitHub DLs on macOS/Linux" include="../included/install-score-compose-bash.md" />}}
{{< tab name="Windows" include="../included/install-windows-compose.md" />}}
{{< /tabs >}}
