---
title: "score-helm install on macOS"
description: "Installation for score-helm on macOS."
headless: true
toc_hide: true
---

**1.** Download the latest release from the [GitHub release page](https://github.com/score-spec/score-helm/releases):

```bash
wget https://github.com/score-spec/score-helm/releases/download/<x.y.z>/score-helm<x.y.z>_<os_system>.tar.gz
```

**2.** Unpack the latest release

```bash
tar xvzf score-helm.tgz
```

The following is the output of the previous command:

```bash
x LICENSE
x README.md
x score-helm
```

**3.** Clean up the tar file

```bash
rm score-helm.tgz README.md LICENSE
```

**4.** Move the binary to PATH

```bash
sudo mv ./score-helm /usr/local/bin/score-helm
sudo chown root: /usr/local/bin/score-helm
```

You’ve successfully installed the score-helm CLI!
