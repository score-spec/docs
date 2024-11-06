---
title: "score-k8s installation"
linkTitle: "Installation"
description: "Installation of score-k8s"
weight: 1
aliases:
- /docs/reference/score-cli/score-k8s/install
---

You can install the `score-k8s` CLI in a variety of ways:

- [Homebrew](#homebrew)
- [Go](#go)
- [Docker](#docker)
- [Manual download](#manual-download)

### Homebrew

Prerequisites: You must have [brew](https://brew.sh) installed.

```bash
brew install score-spec/tap/score-k8s
```

### Go

Prerequisites: You must have [Go](https://go.dev/dl/) installed.

```bash
$ go install -v github.com/score-spec/score-k8s@latest
```

### Docker

Prerequisites: You must have [Docker](https://docs.docker.com/get-docker/) installed.

```bash
docker run --rm -it ghcr.io/score-spec/score-k8s:latest
```

If you want to run `score-k8s` with the `--help` flag to view the available options, you would run the following command.

```bash
docker run --rm -it ghcr.io/score-spec/score-k8s:latest --help
```

If you want to run `score-k8s` with the `init` subcommand to initialize your local working directory, you would run the following command.

```bash
docker run --rm -it -v .:/score-k8s ghcr.io/score-spec/score-k8s:latest init
```

### Manual download

The following methods download the `score-k8s` CLI from its [GitHub release page](https://github.com/score-spec/score-k8s/releases):

{{< tabs name="Manual installation methods">}}
{{< tab name="curl on macOS" include="../included/install-score-k8s-curl-mac.md" />}}
{{< tab name="wget on macOS/Linux" include="../included/install-wget-k8s.md" />}}
{{< tab name="GitHub DLs on macOS/Linux" include="../included/install-score-k8s-bash.md" />}}
{{< tab name="Windows" include="../included/install-windows-k8s.md" />}}
{{< /tabs >}}
