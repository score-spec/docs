---
title: "Run your first Hello World program with score-humanitec"
linkTitle: "score-humanitec"
weight: 4
description: >
  Run your first Score implementation with a Hello World application for `score-humanitec`.
---

## Overview

The primary goal of the Score file is to quickly and easily describe how to compose and run {{< glossary_tooltip text="Workloads" term_id="workload" >}}. The following covers what you need to know to compose a Score file and run an application.

{{% alert %}}

> If at any point you need help, run `score-humanitec --help` from your terminal window.

{{% /alert %}}

## Building blocks

At it's core, the Score file needs a `name` and a `container` to run.

In the following example, the Score tab shows the minimum configuration needed to run a Workload and the Docker Compose tab shows the output of the `score-humanitec run` command.

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

The output of `score-humanitec run -f ./score.yaml --env test-env`.

```yaml
services:
  hello-world:
    image: busybox
```

The following is a description of the previous command.

- `run` tells the CLI to translate the Score file to Humanitec deployment delta.
- `-f` is the path to the Score file.
- `--env` specifies the environment ID.

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

The output of `score-humanitec run -f ./score.yaml --env test-env`.

```yaml
{
  "metadata": {
    "env_id": "test-env",
    "name": "Auto-generated (SCORE)"
  },
  "modules": {
    "add": {
      "hello-world": {
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "hello": {
              "args": [
                "-c",
                "while true; do echo Hello World!; sleep 5; done"
              ],
              "command": [
                "/bin/sh"
              ],
              "id": "hello",
              "image": "busybox"
            }
          }
        }
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}


**Results** You've successfully created a Hello World application in Score and created a Humanitec draft.
