---
title: "score-helm install on macOS"
description: "Installation for score-helm on macOS."
headless: true
toc_hide: true
---

### Step 1. Download the latest release

```bash
curl -L0 "https://github.com/score-spec/score-helm/releases/download/0.2.0/score-helm_0.9.0_darwin_arm64.tar.gz" -o score-helm.tgz
```

### Step 2. Unpack the latest release

```bash
tar xvzf score-helm.tgz
```

The following is the output of the previous command.

```bash
x LICENSE
x README.md
x score-helm
```

## Step 3. Clean up the tar file

Clean up any unwanted files.

```bash
rm score-helm.tgz README.md LICENSE
```

### Step 4. Move the binary to PATH

Move the score-helm binary to a file location on your system `PATH`.

```bash
sudo mv ./score-helm /usr/local/bin/score-helm
sudo chown root: /usr/local/bin/score-helm
```

**Results** You've successfully installed the Score implementation (CLI).
