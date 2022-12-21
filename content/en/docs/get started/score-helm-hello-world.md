---
title: "Hello World with score-helm"
linkTitle: "score-helm"
weight: 4
---

## Overview

The primary goal of the Score Specification is to quickly and easily describe how run a Workload. The following covers what you need to know to compose your first `score.yaml` file and run it with score-helm.

{{% alert %}}

> If at any point you need help, run `score-helm --help` from your terminal.

{{% /alert %}}

## Building blocks

At it's core, the Score file needs a `name` and a `container` to run.

In the following example, the Score tab shows the minimum configuration needed to run a Workload and the Docker Compose tab shows the output of the `score-helm run` command.

The `score.yaml` file contains a Workload named `hello-world` and specifies a container image as `busybox`.

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
{{% tab name="Helm file" %}}

The output of `score-helm run -f ./score.yaml -o ./values.yaml`.

```yaml
containers:
  container-id:
    image:
      name: busybox
```

The following is a description of the previous command.

- `run` tells the CLI to translate the Score file to a Helm `values.yaml` file.
- `-f` is the path to the Score file.
- `-o` specifies the path to the `values.yaml` file.

{{% /tab %}}
{{< /tabs >}}

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
{{% tab name="Helm file" %}}

The output of `score-helm run -f ./score.yaml -o ./values.yaml`.

```yaml
containers:
  hello:
    args:
      - -c
      - while true; do echo Hello World!; sleep 5; done
    command:
      - /bin/sh
    image:
      name: busybox
```

{{% /tab %}}
{{< /tabs >}}

## Deploy to Helm

The following steps are specific to deploying via Helm.

### Create a Helm chart

Now that the `values.yaml` file is ready, create a generic Helm chart.

```bash
helm create -p /examples/values.yaml hello
```

### Install Helm `values.yaml`

Run the following command to deploy the Helm `values.yaml` file.

```bash
helm install --values ./values.yaml hello ./hello
```

The following are the outputs of the previous command.

```bash
NAME: hello
LAST DEPLOYED: Thu Nov  01 00:00:00 2022
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

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

**Results** You've successfully defined a Hello World Workload in `score.yaml` and created a `deployment.yaml` file for Kubernetes via the score-helm Implementation.