---
title: "score-compose install on macOS"
description: "Installation for score-helm on macOS."
headless: true
toc_hide: true
---

### Step 1. Download the latest release

```bash
curl -L0 "https://github.com/score-spec/score-compose/releases/download/0.2.0/score-compose_0.12.2_darwin_arm64.tar.gz" -o score-compose.tgz
```

### Step 2. Unpack the latest release

```bash
tar xvzf score-compose.tgz
```

The following is the output of the previous command.

```bash
x LICENSE
x README.md
x score-compose
```

## Step 3. Clean up the tar file

Clean up any unwanted files.

```bash
rm score-compose.tgz README.md LICENSE
```

### Step 4. Move the binary to PATH

Move the score-compose binary to a file location on your system `PATH`.

```bash
sudo mv ./score-compose /usr/local/bin/score-compose
sudo chown root: /usr/local/bin/score-compose
```

**Results** You've successfully installed the Score implementation (CLI).
