---
title: "zsh auto-completion"
description: "Some optional configuration for zsh auto-completion."
headless: true
---

The Score completion script for Zsh can be generated with the command `score-<platform> completion zsh`. Sourcing the completion script in your shell enables Score autocompletion.

To do so in all your shell sessions, add the following to your `~/.zshrc` file:

1. Open your `.zshrc` file. The following step uses `nano` to open.

```bash
nano ~/.zshrc
```

1. Source the completion script in your shell. Replace `<platform>` with the platform of your choice.

```bash
# adding score-<platform>
source <(score-<platform> completion zsh)
```

Replace `score-<platform>` with the name of the Platform CLI you want to use, for example:

```bash
source <(score-humanitec completion zsh)
```

If you have an alias for Score, Score autocompletion will automatically work with it.

After reloading your shell, Score autocompletion should be working.

{{% alert %}}

If you get an error like `2: command not found: compdef`, then add the following to the beginning of your `~/.zshrc` file to initialize the completion for the current session.

```zsh
autoload -Uz compinit
compinit
```

{{% /alert %}}
