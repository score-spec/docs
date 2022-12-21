---
title: "Hello World with score-compose"
linkTitle: "score-compose"
weight: 4
---

## Overview

The primary goal of the Score Specification is to quickly and easily describe how run a Workload. The following covers what you need to know to compose your first `score.yaml` file and run it with score-compose.

{{% alert %}}

> If at any point you need help, run `score-compose --help` from your terminal.

{{% /alert %}}

## Building blocks

At it's core, the Score file needs a `name` and a `container` to run.

In the following example, the Score tab shows the minimum configuration needed to run a Workload and the Docker Compose tab shows the output of the `score-compose run` command.

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
{{% tab name="Docker Compose" %}}

The output of `score-compose run -f ./score.yaml -o ./compose.yaml`.

```yaml
services:
  hello-world:
    image: busybox
```

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
{{% tab name="Docker Compose" %}}

The output of `score-compose run -f ./score.yaml -o ./compose.yaml`.

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

The following is a description of the previous command.

- `run` tells the CLI to translate the Score file to a Docker Compose file.
- `-f` is the path to the Score file.
- `-o` specifies the path to the output file.

{{% /tab %}}
{{< /tabs >}}

Now, you can run `docker compose up` to run the Workload as usual.

The following is the output of the previous command.

```bash
[+] Running 1/0
⠿ Container score-compose-hello-world-1  Rec... 0.1s
Attaching to score-compose-hello-world-1
score-compose-hello-world-1  | Hello World!
```

**Results** You've successfully run your first Score Implementation with a Hello World Workload and provisioned it through Docker.
