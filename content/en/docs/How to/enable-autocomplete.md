---
title: "Enable autocomplete for shell"
linkTitle: "Autocompletion"
weight: 10
description: >
  How to autocomplete for the Score implementation (CLI)
aliases: 
- /docs/reference/enable-autocomplete/
---

<!-- By default, Homebrew install the autocompletion script. -->

If you installed the Score implementation (CLI) by downloading the single binary, continue reading.

If you'd like to install the Score implementation (CLI) using Homebrew, see [Install Score CLI]({{< relref "/docs/get started/install#install-the-score-cli-with-brew" >}}).

## Overview

Score allows you to generate an autocompletion script for each Score implementation tool for a specified shell.

Score supports autocompletion of commands in a few shells.

## Use cases

- Press the tab key when a command or flag is partially typed and there is one option to complete.
- Press the tab key when there are multiple candidates and allow you to continue typing.

## Available shells

The following are available shells.

| Shell      | Description                                         |
| ---------- | --------------------------------------------------- |
| bash       | Generates the autocompletion script for bash.       |
| fish       | Generates the autocompletion script for fish.       |
| powershell | Generates the autocompletion script for powershell. |
| zsh        | Generates the autocompletion script for zsh.        |

### Enable shell autocompletion

Score provides autocompletion support for Bash, Zsh, Fish, and PowerShell which can save you a lot of typing.

Below are the procedures to set up autocompletion for Bash, Fish, and Zsh.

{{< tabs name="score_autocompletion" >}}
{{< tab name="Bash" include="included/optional-score-configs-bash-mac.md" />}}
{{< tab name="Fish" include="included/optional-score-configs-fish.md" />}}
{{< tab name="Zsh" include="included/optional-score-configs-zsh.md" />}}
{{< tab name="PowerShell" include="included/optional-score-configs-pwsh.md" />}}
{{< /tabs >}}

For help with enabling autocomplete script for the shell, use the `--help` flag on the specified shell, for example:

```bash
score-compose completion bash --help
```

For more information, see Cobra's documentation on [Generating shell completions](https://github.com/spf13/cobra/blob/main/site/content/completions/_index.md).

For information on use setting up your IDE's autocomplete for `score.yaml` files, see [IDE linter and autocomplete for Score's JSON schema]({{< relref "/docs/score specification/ide-linter-autocomplete" >}}).
