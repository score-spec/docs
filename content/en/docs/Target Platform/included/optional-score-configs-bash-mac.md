---
title: "bash auto-completion on macOS"
description: "Some optional configuration for bash auto-completion on macOS."
headless: true
---

<!-- https://cobra.dev/#generating-bash-completions -->

The Score completion script for Bash can be generated with `score-<platform> completion bash`. Sourcing this script in your shell enables Score completion.

### Prerequisites

The Score completion script depends on [**bash-completion**](https://github.com/scop/bash-completion) package.

Use Homebrew to install:

```bash
brew install bash-completion
```

### Install Bash

Install Bash through Homebrew.

```bash
brew install bash
```

Reload your shell and verify that the desired version is being used:

```bash
echo $BASH_VERSION $SHELL
```

Homebrew usually installs it at `/usr/local/bin/bash`.

### Enable Score autocompletion

You now have to ensure that the Score completion script gets sourced in all your shell sessions. There are multiple ways to achieve this:

- Source the completion script in your `~/.bash_profile` file:

  ```bash
  echo 'source <(score-<platform> completion bash)' >>~/.bash_profile
  ```

- Add the completion script to the `/usr/local/etc/bash_completion.d` directory:

  ```bash
  score-<platform> completion bash >/usr/local/etc/bash_completion.d/score
  ```

- If you have an alias for Score, you can extend shell completion to work with that alias:

  ```bash
  echo 'alias k=Score' >>~/.bash_profile
  echo 'complete -o default -F __start_score-<platform> k' >>~/.bash_profile
  ```

  Replace `score-<platform>` with the name of the Platform CLI you want to use.
