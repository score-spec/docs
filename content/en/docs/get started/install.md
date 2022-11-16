---
title: "Install the Score implementation (CLI)"
linkTitle: "Install"
weight: 3
description: >
  This section covers how to install the Score implementation (CLI).
---

You can install the Score implementation (CLI) in a variety of ways.

Choose one of the following methods to continue.

- [Install using Go](#install-using-go)
- [Install using a manual method](#install-using-a-manual-method)
  - [Install the binary with curl on macOS](#install-the-binary-with-curl-on-macos)
  - [Install the binary with wget on macOS and Linux](#install-the-binary-with-wget-on-macos-and-linux)
  - [Install the binary through the GitHub downloads page on macOS and Linux](#install-the-binary-through-the-github-downloads-page-on-macos-and-linux)
  - [Install the binary on Windows](#install-the-binary-on-windows)
- [Upgrade the Score implementation CLI](#upgrade-the-score-implementation-cli)

## Install using Go

Using Go, you can fetch, compile, and install the Score implementation (CLI).

Prerequisites: You must have [Go](https://go.dev/dl/) installed.

{{< tabs name="fetch_github" >}}
{{< tab name="score-compose" include="included/fetch-score-compose-gh.md" />}}
{{< tab name="score-helm" include="included/fetch-score-helm-gh.md" />}}
{{< tab name="score-humanitec" include="included/fetch-score-humanitec-gh.md" />}}
{{< /tabs >}}

## Install using a manual method

The following methods download the Score implementation (CLI) tool from the project's GitHub release page.

### Install the binary with curl on macOS

Choose Score implementation tool you want to install.

{{< tabs name="curl_download" >}}
{{< tab name="score-compose" include="included/install-score-compose-curl-mac.md" />}}
{{< tab name="score-helm" include="included/install-score-helm-curl-mac.md" />}}
{{< tab name="score-humanitec" include="included/install-score-humanitec-curl-mac.md" />}}
{{< /tabs >}}

### Install the binary with wget on macOS and Linux

Choose Score implementation tool you want to install.

{{< tabs name="wget_download" >}}
{{< tab name="score-compose" include="included/install-wget-compose.md" />}}
{{< tab name="score-helm" include="included/install-wget-helm.md" />}}
{{< tab name="score-humanitec" include="included/install-wget-humanitec.md" />}}
{{< /tabs >}}

### Install the binary through the GitHub downloads page on macOS and Linux

Choose Score implementation tool you want to install.

{{< tabs name="github_download" >}}
{{< tab name="score-compose" include="included/install-score-compose-bash.md" />}}
{{< tab name="score-helm" include="included/install-score-helm-bash.md" />}}
{{< tab name="score-humanitec" include="included/install-score-humanitec-bash.md" />}}
{{< /tabs >}}

### Install the binary with on Windows

Select a Score implementation (CLI), uncompress the `zip` file, and move the binary to your `PATH`.

- [score-compose](https://github.com/score-spec/score-compose/releases)
- [score-helm](https://github.com/score-spec/score-helm/releases)
- [score-humanitec](https://github.com/score-spec/score-humanitec/releases)

## Upgrade the Score implementation CLI

To upgrade the Score implementation (CLI), download the latest binary version and follow the [installation instruction](#install-using-a-manual-method).

<!-- ### macOS

We recommend installing the {{< glossary_tooltip text="Score implementation (CLI)" term_id="platform-cli" >}} with [Homebrew](https://brew.sh/index.html).
With Homebrew, you can access an extensive selection of libraries and applications, with their dependencies managed for you.

### Prerequisites

Install Homebrew according to the [official Homebrew installation instructions](https://brew.sh/index.html).

### To install Score on macOS

1. Install Score by running `brew install score-compose` from your terminal.
2. Verify Score is installed by running `score-compose --version`.

### Linux

On the Linux operating systems, use the built-in package manager to install Score:

1. Open a terminal and run these commands to install the latest {{< glossary_tooltip text="Score implementation (CLI)" term_id="platform-cli" >}} from the officially maintained package archives:

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
