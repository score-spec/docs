---
title: "Helm"
linkTitle: "Helm"
weight: 4
description: >
  Learn to translate a Score Specification file into a Helm configuration with the target Score implementation tool.
---

{{% alert %}}

> If at any point you need help, `score-helm --help` from your terminal.
> {{% /alert %}}

The Score Specification file configures into Helm values, including containers, dependencies, and other Helm specific values.

These values are combined with a pre-built Helm directory that are shipped with the application by default.
The `score-helm run` command produces a valid `values.yaml` file that can be distributed or deployed.

<!-- Helm is a package manager for Kubernetes. >
