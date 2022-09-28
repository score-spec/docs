---
title: "Enable autocomplete for shell"
linkTitle: "Enable autocomplete"
weight: 4
---

Score allows you to generate an autocompletion script for each platform tool for a specified shell.

To enable autocomplete, run one of the following:

```bash
paws-compose completion [shell]
paws-humanitec completion [shell]

# example
paws-compose completion zsh
paws-humanitec completion bash
```

The following are available shells.

| Shell      | Description                                        |
| ---------- | -------------------------------------------------- |
| bash       | Generate the autocompletion script for bash.       |
| fish       | Generate the autocompletion script for fish.       |
| powershell | Generate the autocompletion script for powershell. |
| zsh        | Generate the autocompletion script for zsh.        |
