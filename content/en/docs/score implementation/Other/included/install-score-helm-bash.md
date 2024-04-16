---
title: "score-helm install on macOS"
description: "Installation for score-helm on macOS."
headless: true
toc_hide: true
---

**1.** Download the latest compressed Tar file for your operating system from the [GitHub release page](https://github.com/score-spec/score-helm/releases). By default, the tarball will be saved to your `~/Downloads` directory. If you choose to use a different location, you'll need to change that in the following steps.

```bash
score-helm.y.z_osx-amd64.tar.gz
```

**2.** Install into your `local` directory

In your terminal, enter the following to create the `score-spec` directory.

```bash
cd /usr/local/bin/
# create the directory if needed
mkdir -pv score-spec
```

Extract the compressed Tar file (You may need to run the previous command with elevated permissions).

```bash
tar -xvzf ~/Downloads/score-helm<x.y.z>_darwin_arm64.tar.gz -C /usr/local/bin/
```

You should see the following output:

```bash
x LICENSE
x README.md
x score-helm
```

**3.** Export PATH

Future terminal sessions may require you add this path to your `~/.zshrc` or `~/.bashrc` file, if it isn’t there already.

```bash
export PATH=$PATH:/usr/local/bin/
```

**4.** Verify installation

```bash
score-helm --version
```

The command returns the following output:

```bash
score-helm x.y.z
```

You’ve successfully installed the score-helm CLI!