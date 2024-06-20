---
title: "score-helm install with wget"
description: "Installation for score-helm with wget."
headless: true
toc_hide: true
---

**1.** Download the latest release from the [GitHub release page](https://github.com/score-spec/score-helm/releases):

```bash
wget https://github.com/score-spec/score-helm/releases/download/<x.y.z>/score-helm<x.y.z>_<os_system>.tar.gz
```

You should see something similar to the following output:

```bash
Saving to: score-helm<x.y.z>_<os_system>.tar.gz

score-helm_<x.y.z> 100%[===================>]   2.85M  5.28MB/s    in 0.5s
```

**2.** Install into your `local` directory

In your terminal, enter the following to create the `score-spec` directory.

```bash
cd /usr/local/bin/
# create the directory if needed
mkdir -pv score-spec
```

Extract the compressed Tar file (You may need to run this command with elevated permissions):

```bash
tar -xvzf ~/<your-path>/score-helm_<x.y.z>_<os_system>.tar.gz
```

You should see the following output:

```bash
x LICENSE
x README.md
x score-helm
```

**3:** Export PATH

Future terminal sessions may require you add this path to your `~/.zshrc` or `~/.bashrc` file, if it isn’t there already.

```bash
export PATH=$PATH:/usr/local/bin/
```

**4:** Verify installation

```bash
score-helm --version
```

The command returns the following output:

```bash
score-helm <x.y.z>
```

You've successfully installed the score-helm CLI!
