---
title: "Run your first Hello World program with score-humanitec"
linkTitle: "score-humanitec"
weight: 4
draft: true
description: >
  Run your first Score implementation with a Hello World application for `score-humanitec`.
---

## Overview

The primary goal of the Score file is to quickly and easily describe how to compose and run {{< glossary_tooltip text="Workloads" term_id="workload" >}}. The following covers what you need to know to compose a Score file and run an application.

{{% alert %}}

> If at any point you need help, run `score-helm --help` from your terminal window.

{{% /alert %}}

## Building blocks

At it's core, the Score file needs a `name` and a `container` to run.

In the following example, the Score tab shows the minimum configuration needed to run a Workload and the Docker Compose tab shows the output of the `score-helm run` command.

The `score.yaml` file contains a Workload named `hello-world` and specifies a container image for Docker as `busybox`.

{{< tabs >}}
{{% tab name="Score" %}}

The following is the minimum configuration needed to run a Workload.

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: hello-world

containers:
  container-id:
    image: busybox
```

{{% /tab %}}
{{% tab name="Docker Compose" %}}

The output of `score-helm run -f ./score.yaml -o ./values.yaml`.

```yaml
  hello:
    args:
      - -c
      - while true; do echo Hello World!; sleep 5; done
    command:
      - /bin/sh
    image:
      name: busybox
```

The following is a description of the previous command.

- `run` tells the CLI to translate the Score file to a Helm Chart.
- `-f` is the path to the Score file.
- `-o` specifies the path to the `values.yaml` file.

{{% /tab %}}
{{< /tabs >}}

In the next step, you'll want to think about how to specify resources for your container.

## Containers

In the following example, we'll create a simple service based on `busybox` using the `containers` definition.

{{< tabs >}}
{{% tab name="Score" %}}

```yaml
apiVersion: score.dev/v1b1

metadata:
  name: hello-world

containers:
  hello:
    image: busybox
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo Hello World!; sleep 5; done"]
```

{{% /tab %}}
{{% tab name="Docker Compose" %}}

The output of `score-helm run -f ./score.yaml -o ./values.yaml`.

```yaml
services:
  hello-world:
    command:
      - -c
      - while true; do echo Hello World!; sleep 5; done
    entrypoint:
      - /bin/sh
    image: busybox
```

{{% /tab %}}
{{< /tabs >}}

Now, you can run `helm install --values ./values.yaml hello ./hello` for the single service definition.

The following is the output of the previous command.

```bash
# Source: hello/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello
  labels:
    helm.sh/chart: hello-0.1.0
    app.kubernetes.io/name:
    app.kubernetes.io/instance: hello
    app.kubernetes.io/version: "0.1.0"
    app.kubernetes.io/managed-by: Helm
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name:
      app.kubernetes.io/instance: hello
  template:
    metadata:
      labels:
        app.kubernetes.io/name:
        app.kubernetes.io/instance: hello
    spec:
      containers:
        - name: hello
          image: "busybox"
          command:
            - /bin/sh
          args:
            - -c
            - while true; do echo Hello World!; sleep 5; done
```

**Results** You've successfully created a Hello World application in Score and created a `deployment.yaml` file for Kubernetes.
