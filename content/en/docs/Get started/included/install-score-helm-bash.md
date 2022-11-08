---
title: "score-helm install on macOS"
description: "Installation for score-helm on macOS."
headless: true
toc_hide: true
---

### Step 1. Download

1. Open <https://github.com/score-spec/score-helm/releases> in your browser.

2. Find the current release by scrolling down and looking for the green tag that reads _Latest_.

3. Download the latest compressed Tar file for your operating system.
   1. The name will be something like `score-helm_x.y_osx-amd64.tar.gz`, where `x.y` is the release number, `osx` is the operating system.

4. By default, the tarball will be saved to your `~/Downloads` directory. If you choose to use a different location, you'll need to change that in the following steps.

#### Step 2: Install into your `local` directory

In your terminal, enter the following to create the `score-spec` directory.

```bash
cd /usr/local/
# create the directory if needed
mkdir -pv score-spec
```

Extract the compressed Tar file.

```bash
tar -xvzf ~/Downloads/score-helm_0.1.0_darwin_arm64.tar.gz
```

{{% alert %}}

You may need to run the previous command with elevated permissions.

{{% /alert %}}

**Results** You should see the following output.

```bash
x LICENSE
x README.md
x score-helm
```

### Step 3: Export PATH

To export `PATH`, run the following command.

```bash
export PATH=$PATH:/usr/local/score-spec
```

### Step 4: Verify installation

To verify installation, run the following command.

```bash
score-helm --version
```

The command returns the following output.

```bash
score-helm x.y.z
```

**Results** You've successfully installed the Score implementation (CLI).
