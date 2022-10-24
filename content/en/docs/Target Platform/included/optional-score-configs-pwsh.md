---
title: "PowerShell auto-completion"
description: "Some optional configuration for powershell auto-completion."
headless: true
---

The Score completion script for PowerShell can be generated with the command `score-<platform> completion powershell`.

1. To do so in all your shell sessions, add the following line to your `$PROFILE` file.

```powershell
score-<platform> completion powershell | Out-String | Invoke-Expression
```

Replace `score-<platform>` with the name of the Platform CLI you want to use, for example:

```bash
score-humanitec completion powershell | Out-String | Invoke-Expression
```

This command will regenerate the auto-completion script on every PowerShell start up. You can also add the generated script directly to your `$PROFILE` file.

1. To add the generated script to your `$PROFILE` file, run the following line in your Powershell prompt.

```powershell
score-<platform> completion powershell >> $PROFILE
```

After reloading your shell, Score autocompletion should be working.
