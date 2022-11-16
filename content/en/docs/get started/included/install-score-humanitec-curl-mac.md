---
title: "score-humanitec install on macOS"
description: "Installation for score-helm on macOS."
headless: true
toc_hide: true
---

### Step 1. Download the latest release

```bash
curl -L0 "https://github.com/score-spec/score-humanitec/releases/download/0.1.0/score-humanitec_0.1.0_darwin_arm64.tar.gz" -o score-humanitec.tgz
```

### Step 2. Unpack the latest release

```bash
tar xvzf score-humanitec.tgz
```

The following the expected output.

```bash
x LICENSE
x README.md
x score-humanitec
```

### Step 3. Clean up the tar file

```bash
rm score-humanitec.tgz README.md LICENSE
```

# Step 4. Move the binary to PATH

Move the score-humanitec binary to a file location on your system `PATH`.

```bash
sudo mv ./score-humanitec /usr/local/bin/score-humanitec
sudo chown root: /usr/local/bin/score-humanitec
```

Results: Test to ensure you've installed the tool.

```bash
score-humanitec --help
```

<!-- https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/#install-kubectl-binary-with-curl-on-macos -->
