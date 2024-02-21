---
title: "Install the Score implementation (CLI)"
linkTitle: "Install"
weight: 3
---

You can install a Score implementation (CLI) in a variety of ways.

Choose one of the following methods and a Score implementation tool to continue.

- [Install the Score CLI with brew](#install-the-score-cli-with-brew)
- [Install the Score CLI using Go](#install-the-score-cli-using-go)
- [Install using Docker](#install-using-docker)
- [Install using a manual method](#install-using-a-manual-method)
  - [Install the binary with curl on macOS](#install-the-binary-with-curl-on-macos)
  - [Install the binary with wget on macOS and Linux](#install-the-binary-with-wget-on-macos-and-linux)
  - [Install the binary through the GitHub downloads page on macOS and Linux](#install-the-binary-through-the-github-downloads-page-on-macos-and-linux)
  - [Install the binary on Windows](#install-the-binary-on-windows)
- [Upgrade the Score implementation CLI](#upgrade-the-score-implementation-cli)

## Install the Score CLI with brew

Using brew, you can install the Score implementation (CLI).

Prerequisites: You must have [brew](https://brew.sh) installed.

{{< tabs name="brew" >}}
{{< tab name="score-compose" include="included/install-score-compose-brew.md" />}}
{{< tab name="score-helm" include="included/install-score-helm-brew.md" />}}
{{< /tabs >}}

## Install the Score CLI using Go

Using Go, you can fetch, compile, and install the Score implementation (CLI).

Prerequisites: You must have [Go](https://go.dev/dl/) installed.

{{< tabs name="go" >}}
{{< tab name="score-compose" include="included/fetch-score-compose-go.md" />}}
{{< tab name="score-helm" include="included/fetch-score-helm-go.md" />}}
{{< /tabs >}}

## Install using Docker

This method will start and run a new Docker container based on the image provided.

{{< tabs name="docker" >}}
{{< tab name="score-compose" include="included/docker-score-compose.md" />}}
{{< tab name="score-helm" include="included/docker-score-helm.md" />}}
{{< /tabs >}}

## Install using a manual method

The following methods download a Score Implementation (CLI) from the project's GitHub release page.

### Install the binary with curl on macOS

Choose the Score Implementation you want to install.

{{< tabs name="curl_download" >}}
{{< tab name="score-compose" include="included/install-score-compose-curl-mac.md" />}}
{{< tab name="score-helm" include="included/install-score-helm-curl-mac.md" />}}
{{< /tabs >}}

### Install the binary with wget on macOS and Linux

Choose the Score Implementation you want to install.

{{< tabs name="wget_download" >}}
{{< tab name="score-compose" include="included/install-wget-compose.md" />}}
{{< tab name="score-helm" include="included/install-wget-helm.md" />}}
{{< /tabs >}}

### Install the binary through the GitHub downloads page on macOS and Linux

Choose the Score Implementation you want to install.

{{< tabs name="github_download" >}}
{{< tab name="score-compose" include="included/install-score-compose-bash.md" />}}
{{< tab name="score-helm" include="included/install-score-helm-bash.md" />}}
{{< /tabs >}}

### Install the binary on Windows

Select a Score Implementation, decompress the `zip` file, and move the binary to your `PATH`.

- [score-compose](https://github.com/score-spec/score-compose/releases)
- [score-helm](https://github.com/score-spec/score-helm/releases)

## Upgrade the Score implementation CLI

To upgrade the Score implementation (CLI), download the latest binary version and follow the [installation instruction](#install-using-a-manual-method).

<!-- ### macOS

We recommend installing the {{< glossary_tooltip text="Score implementation (CLI)" term_id="score" >}} with [Homebrew](https://brew.sh/index.html).
With Homebrew, you can access an extensive selection of libraries and applications, with their dependencies managed for you.

### Prerequisites

Install Homebrew according to the [official Homebrew installation instructions](https://brew.sh/index.html).

### To install Score on macOS

1. Install Score by running `brew install score-compose` from your terminal.
2. Verify Score is installed by running `score-compose --version`.

### Linux

On the Linux operating systems, use the built-in package manager to install Score:

1. Open a terminal and run these commands to install the latest {{< glossary_tooltip text="Score implementation (CLI)" term_id="score" >}} from the officially maintained package archives:

   ```shell
   apt-add-repository ppa:score-compose
   apt-get update
   apt-get install score-compose
   ```

1. To verify that Score works on your computer, run:

   ```shell
   score-compose --version
   ```

### Windows

## After you install Score

-->
