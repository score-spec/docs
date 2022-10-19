---
title: "Enable autocomplete for shell"
linkTitle: "Enable autocomplete"
weight: 4
---


By default, Homebrew install the autocompletion script.

If you installed the Platform CLI by downloading the single binary, continue reading.

## Overview

Score allows you to generate an autocompletion script for each Platform CLI tool for a specified shell.


## Enable autocomplete

To enable autocomplete, run one of the following:

```bash
score-compose completion [shell]
score-humanitec completion [shell]

# example
score-compose completion zsh
score-humanitec completion bash
```

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
{{< /tabs >}}

For more information, see Cobra's documentation on [Generating shell completions](https://github.com/spf13/cobra/blob/main/shell_completions.md).
