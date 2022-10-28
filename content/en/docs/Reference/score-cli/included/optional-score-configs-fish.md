---
title: "fish auto-completion"
description: "Optional configuration to enable fish shell auto-completion."
headless: true
---

The Score completion script for Fish can be generated with the command `score-<platform> completion fish`.

Sourcing the completion script in your shell enables Score autocompletion.

To do so in all your shell sessions, add the following line to your `~/.config/fish/config.fish` file:

```shell
score-<platform> completion fish | source
```

Replace `score-<platform>` with the name of the Score implementation (CLI) you want to use, for example:

```bash
score-humanitec completion fish | source
```

After reloading your shell, Score autocompletion should be working.
