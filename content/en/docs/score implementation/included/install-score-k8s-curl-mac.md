---
title: "score-k8s install on macOS"
description: "Installation for score-k8s on macOS."
headless: true
toc_hide: true
---

**1.** Download the latest release from the [GitHub release page](https://github.com/score-spec/score-k8s/releases):

```bash
wget https://github.com/score-spec/score-k8s/releases/download/<x.y.z>/score-k8s_<x.y.z>_<os_system>.tar.gz
```

**2.** Unpack the latest release

```bash
tar xvzf score-k8s.tgz
```

The following is the output of the previous command:

```bash
x LICENSE
x README.md
x score-k8s
```

**3.** Clean up the tar file

```bash
rm score-k8s.tgz README.md LICENSE
```

**4.** Move the binary to PATH

```bash
sudo mv ./score-k8s /usr/local/bin/score-k8s
sudo chown root: /usr/local/bin/score-k8s
```

You’ve successfully installed the score-k8s CLI!