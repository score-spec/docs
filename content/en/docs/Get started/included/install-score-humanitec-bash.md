---
title: "score-humanitec install on macOS"
description: "Installation for score-humanitec on macOS."
headless: true
toc_hide: true
---

### Step 1. Download

1. Open <https://github.com/score-spec/score-humanitec/releases> in your browser.

2. Find the current release by scrolling down and looking for the green tag that reads _Latest_.

3. Download the latest compressed Tar file for your operating system.
   1. The name will be something like `score-humanitec_x.y_osx-amd64.tar.gz`, where `x.y` is the release number, `osx` is the operating system.

4. By default, the tarball will be saved to your `~/Downloads` directory. If you choose to use a different location, you'll need to change that in the following steps.

**Results** You should see something similar to the following output.

```bash
Saving to: `score-humanitec_x.y_osx-amd64.tar.gz`

score-humanitec_x.y.0 100%[===================>]   2.85M  5.28MB/s    in 0.5s
```

#### Step 2: Install into your `local` directory

In your terminal, enter the following to create the `score-spec` directory.

```bash
cd /usr/local/
# create the directory if needed
sudo mkdir -pv score-spec
```

Extract the compressed Tar file.

```bash
sudo tar -xvzf ~/Downloads/score-humanitec_0.1.0_darwin_arm64.tar.gz
```

**Results** You should see the following output.

```bash
x LICENSE
x README.md
x score-humanitec
```

### Step 3: Export PATH

To export `PATH`, run the following, `export PATH=$PATH:/usr/local/score-spec`.

### Step 4: Verify installation

To verify installation, run the following `score-humanitec --version`.

The command returns the following output.

```bash
score-humanitec x.y.z
```

**Results** You've successfully installed the Platform CLI.
