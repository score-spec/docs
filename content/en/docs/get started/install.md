---
title: "Install the Score implementation (CLI)"
linkTitle: "Install"
weight: 3
description: >
  This section covers how to install the Score implementation (CLI).
---

## Fetch from GitHub

Prerequisites: [Go](https://go.dev/dl/)

The following method will fetch, compile, and install the Score implementation from GitHub.

{{< tabs name="fetch_github" >}}
{{< tab name="score-compose" include="included/fetch-score-compose-gh.md" />}}
{{< tab name="score-helm" include="included/fetch-score-helm-gh.md" />}}
{{< tab name="score-humanitec" include="included/fetch-score-humanitec-gh.md" />}}
{{< /tabs >}}

## Install through the manual method

The following methods download the Score implementation (CLI) tool from the project's GitHub release page.

## macOS

Choose Score implementation tool you want to install.

{{< tabs name="score_installation" >}}
{{< tab name="score-compose" include="included/install-score-compose-bash.md" />}}
{{< tab name="score-helm" include="included/install-score-helm-bash.md" />}}
{{< tab name="score-humanitec" include="included/install-score-humanitec-bash.md" />}}
{{< /tabs >}}

## wget (macOS and Linux)

{{< tabs name="score_installation_wget" >}}
{{< tab name="score-compose" include="included/install-wget-compose.md" />}}
{{< tab name="score-helm" include="included/install-wget-helm.md" />}}
{{< tab name="score-humanitec" include="included/install-wget-humanitec.md" />}}
{{< /tabs >}}

## Windows

Select a Score implementation (CLI), uncompress the `zip` file, and move the binary to your `PATH`.

- [score-compose](https://github.com/score-spec/score-compose/releases)
- [score-helm](https://github.com/score-spec/score-helm/releases)
- [score-humanitec](https://github.com/score-spec/score-humanitec/releases)

## Upgrade the Score implementation CLI

To upgrade the Score implementation (CLI), download the latest binary version and follow the [installation instruction](#manual-method).

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
