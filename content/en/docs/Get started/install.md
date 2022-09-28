---
title: "Install the Platform CLI"
linkTitle: "Install"
weight: 3
description: >
  This section covers how to install the Platform CLI.
---

### macOS

We recommend installing the {{< glossary_tooltip text="Platform CLI" term_id="platform-cli" >}} with [Homebrew](https://brew.sh/index.html).
With Homebrew, you can access an extensive selection of libraries and applications, with their dependencies managed for you.

### Prerequisites

Install Homebrew according to the [official Homebrew installation instructions](https://brew.sh/index.html).

### To install Score on macOS:

1. Install Score by running `brew install score` from your terminal.
2. Verify Score is installed by running `score --version`.

### Linux

On the Linux operating systems, use the built-in package manager to install Score:

1. Open a terminal and run these commands to install the latest {{< glossary_tooltip text="Platform CLI" term_id="platform-cli" >}} from the officially maintained package archives:

   ```shell
   sudo apt-add-repository ppa:score
   sudo apt-get update
   sudo apt-get install score
   ```

1. To verify that Score works on your computer, run:

   ```shell
   score --version
   ```

### Windows

## After you install Score
