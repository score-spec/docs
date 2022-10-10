---
title: "zsh auto-completion"
description: "Some optional configuration for zsh auto-completion."
headless: true
---

The Score completion script for Zsh can be generated with the command `score completion zsh`. Sourcing the completion script in your shell enables Score autocompletion.

To do so in all your shell sessions, add the following to your `~/.zshrc` file:

```zsh
source <(Score completion zsh)
```

If you have an alias for Score, Score autocompletion will automatically work with it.

After reloading your shell, Score autocompletion should be working.

If you get an error like `2: command not found: compdef`, then add the following to the beginning of your `~/.zshrc` file:

```zsh
autoload -Uz compinit
compinit
```
