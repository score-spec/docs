---
title: "Hello World with score-humanitec"
linkTitle: "score-humanitec"
weight: 4
---

## Overview

The primary goal of the Score Specification is to quickly and easily describe how run a Workload. The following covers what you need to know to compose your first `score.yaml` file and run it with score-humanitec.

{{% alert %}}

> If at any point you need help, run `score-humanitec --help` from your terminal.

{{% /alert %}}

## Building blocks

At it's core, the Score file needs a `name` and a `container` to run.

In the following example, the Score tab shows the minimum configuration needed to run a Workload and the Docker Compose tab shows the output of the `score-humanitec run` command.

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
{{% tab name="Humanitec Delta" %}}

The output of `score-humanitec run -f ./score.yaml --env test-env`.

```yaml
services:
  hello-world:
    image: busybox
```

The following is a description of the previous command.

- `run` tells the CLI to translate the Score file to Humanitec deployment.
- `-f` is the path to the Score file.
- `--env` specifies the environment ID.

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
{{% tab name="Humanitec Delta" %}}

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

**Results** You've successfully defined a Hello World Workload in `score.yaml` and created a Humanitec Delta through the score-humanitec Implementation.