---
title: "Hello world"
linkTitle: "Hello world"
weight: 4
description: >
  A Hello World application for Score.
---

## Overview

The primary goal of the Score file is to quickly and easily describe how to compose and run {{< glossary_tooltip text="Workloads" term_id="workload" >}}. The following covers what you need to know to compose a Score file and run an application.

{{% alert %}}

> If at any point you need help, run `score-compose --help` from your terminal window.

{{% /alert %}}

## Building blocks

At it's core, the Score file needs a `name` and a `container` to run.

In the following example, the Score tab shows the minimum configuration needed to run a Workload and the Docker Compose tab shows the output of the `score-compose run` command.

The `score.yaml` file contains a Workload named `hello-world` and specifies a container image for Docker as `busybox`.

{{< tabs >}}
{{% tab name="Score" %}}

The following is the minimum configuration needed to run a Workload.

```yml
apiVersion: score.sh/v1b1
metadata:
  name: hello-world

containers:
  container-id:
    image: busybox
```

{{% /tab %}}
{{% tab name="Docker Compose" %}}

The output of `score-compose run -f score.yaml -o compose.yml`.

```yml
services:
  hello-world:
    image: busybox
```

{{% /tab %}}
{{< /tabs >}}

In the next step, you'll want to think about how to specify resources for your container.

## Containers

In the following example, we'll create a simple service based on `busybox` using the `containers` definition.

{{< tabs >}}
{{% tab name="Score" %}}

```yml
apiVersion: score.sh/v1b1

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

The output of `score-compose run -f score.yaml -o compose.yml`.

```yml
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

Now, you can run `docker-compose run` for the single service definition.

The following is the output of the previous command.

```bash
[+] Running 1/0
 ⠿ Container score-compose-hello-world-1  Rec...                                         0.1s
Attaching to score-compose-hello-world-1
score-compose-hello-world-1  | Hello World!
```

**Results** You've successfully created a hello world application in Score and provisioned it through Docker.
