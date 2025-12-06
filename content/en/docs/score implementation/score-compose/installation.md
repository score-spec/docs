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

You can also use the predefined [Dev Containers setup](/docs/how-to/dev-containers/) if you prefer.

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

`score-compose` has two official container images that you can use:
- [`scorespec/score-compose`](https://hub.docker.com/r/scorespec/score-compose)
- [`ghcr.io/score-spec/score-compose`](https://github.com/score-spec/score-compose/pkgs/container/score-compose)

```bash
docker run --rm -it docker.io/scorespec/score-compose:latest

docker run --rm -it ghcr.io/score-spec/score-compose:latest
```

If you want to run `score-compose` with the `--help` flag to view the available options, you would run the following command.

```bash
docker run --rm -it scorespec/score-compose:latest --help

docker run --rm -it ghcr.io/score-spec/score-compose:latest --help
```

If you want to run `score-compose` with the `init` subcommand to initialize your local working directory, you would run the following command.

```bash
docker run --rm -it -v .:/score-compose scorespec/score-compose:latest init

docker run --rm -it -v .:/score-compose ghcr.io/score-spec/score-compose:latest init
```

If you want to run `score-compose` as an unprivileged container, you would run the following command.

```bash
docker run --rm -it -v .:/score-compose --read-only --cap-drop=ALL --user=65532 scorespec/score-compose:latest init

docker run --rm -it -v .:/score-compose --read-only --cap-drop=ALL --user=65532 ghcr.io/score-spec/score-compose:latest init
```

## Manual download

The following methods download the `score-compose` CLI from its [GitHub release page](https://github.com/score-spec/score-compose/releases):

{{< tabs name="Manual installation methods">}}
{{< tab name="curl on macOS" include="../included/install-score-compose-curl-mac.md" />}}
{{< tab name="wget on macOS/Linux" include="../included/install-wget-compose.md" />}}
{{< tab name="GitHub DLs on macOS/Linux" include="../included/install-score-compose-bash.md" />}}
{{< tab name="Windows" include="../included/install-windows-compose.md" />}}
{{< /tabs >}}
