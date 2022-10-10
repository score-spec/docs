---
title: "bash auto-completion on macOS"
description: "Some optional configuration for bash auto-completion on macOS."
headless: true
---

### Introduction

The Score completion script for Bash can be generated with `score completion bash`. Sourcing this script in your shell enables Score completion.

### Prerequisites

The Score completion script depends on [**bash-completion**](https://github.com/scop/bash-completion) package.

Use Homebrew to install:

```bash
brew install bash-completion
```

### Upgrade Bash

The instructions here assume you use Bash 4.1+.
You can check your Bash's version by running:

```bash
echo $BASH_VERSION
```

If it is too old, you can install and upgrade it using Homebrew:

```bash
brew install bash
```

Reload your shell and verify that the desired version is being used:

```bash
echo $BASH_VERSION $SHELL
```

Homebrew usually installs it at `/usr/local/bin/bash`.

### Install bash-completion

{{< alert >}}
As mentioned, these instructions assume you use Bash 4.1+, which means you will install bash-completion v2 (in contrast to Bash 3.2 and bash-completion v1, in which case Score completion won't work).
{{< /alert >}}

You can test if you have bash-completion v2 already installed with `type _init_completion`. If not, you can install it with Homebrew:

```bash
brew install bash-completion@2
```

As stated in the output of this command, add the following to your `~/.bash_profile` file:

```bash
export BASH_COMPLETION_COMPAT_DIR="/usr/local/etc/bash_completion.d"
[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"
```

Reload your shell and verify that bash-completion v2 is correctly installed with `type _init_completion`.

### Enable Score autocompletion

You now have to ensure that the Score completion script gets sourced in all your shell sessions. There are multiple ways to achieve this:

- Source the completion script in your `~/.bash_profile` file:

    ```bash
    echo 'source <(score completion bash)' >>~/.bash_profile
    ```

- Add the completion script to the `/usr/local/etc/bash_completion.d` directory:

    ```bash
    Score completion bash >/usr/local/etc/bash_completion.d/Score
    ```

- If you have an alias for Score, you can extend shell completion to work with that alias:

    ```bash
    echo 'alias k=Score' >>~/.bash_profile
    echo 'complete -o default -F __start_Score k' >>~/.bash_profile
    ```

- If you installed Score with Homebrew (as explained [here](/docs/tasks/tools/install-Score-macos/#install-with-homebrew-on-macos)), then the Score completion script should already be in `/usr/local/etc/bash_completion.d/score`. In that case, you don't need to do anything.

   {{< note >}}
   The Homebrew installation of bash-completion v2 sources all the files in the `BASH_COMPLETION_COMPAT_DIR` directory, that's why the latter two methods work.
   {{< /note >}}

In any case, after reloading your shell, Score completion should be working.
