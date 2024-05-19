---
title: "score-compose install on macOS"
description: "Installation for score-compose on macOS."
headless: true
toc_hide: true
---

**1.** Download the latest release from the [GitHub release page](https://github.com/score-spec/score-compose/releases):

```bash
wget https://github.com/score-spec/score-compose/releases/download/<x.y.z>/score-compose_<x.y.z>_<os_system>.tar.gz
```

**2.** Unpack the latest release

```bash
tar xvzf score-compose.tgz
```

The following is the output of the previous command:

```bash
x LICENSE
x README.md
x score-compose
```

**3.** Clean up the tar file

```bash
rm score-compose.tgz README.md LICENSE
```

**4.** Move the binary to PATH

```bash
sudo mv ./score-compose /usr/local/bin/score-compose
sudo chown root: /usr/local/bin/score-compose
```

You’ve successfully installed the score-compose CLI!