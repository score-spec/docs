---
title: "Score for Humanitec"
linkTitle: "Score for Humanitec"
weight: 4
description: >
  Overview section on how to compose a Score file for a Humanitec application.
---

## Overview

The primary goal of the Score file is to quickly and easily describe how to compose and run {{< glossary_tooltip text="Workloads" term_id="workload" >}}. The following covers what you need to know to compose a Score file and run it in Humanitec application.

## Building blocks

At it's core, the Score file needs a `name` and a `container` to run.

### Containers

In the following example, the Score tab shows the minimum configuration needed to run a Workload and the Humanitec tab shows the output of the `score-humanitec run --env development` command.

The `score.yaml` file contains a Workload named `app-workload` and specifies a container image for Humanitec as `registry.humanitec.io/public/sample-service`.

{{< tabs >}}
{{% tab name="Score" %}}

The minimum configuration needed to run a Workload.

```yml
apiVersion: score.sh/v1b1
metadata:
  name: hello-world

container:
  container-id:
    image: busybox
```

{{% /tab %}}
{{% tab name="Humanitec" %}}

The output of the `score-humanitec run --env development` command.

```json
{
    "id": "1234567890",
    "metadata": {
        "env_id": "development",
        "name": "Auto-generated (SCORE)",
        "url": "https://api.humanitec.io/orgs/my-org/my-app/score-test/envs/development/draft/1234567890",
        "created_by": "s-1234567890",
        "created_at": "2022-10-20T00:00:00.000000000Z",
        "last_modified_at": "2022-10-20T00:00:00.000000000Z"
    },
  "modules": {
    "add": {
      "hello-world": {
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "container-id": {
              "id": "container-id",
              "image": "busybox"
            }
          }
        }
      }
    }
  }
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

<!--
{{% tab name="Helm" %}}

The output of `score-helm run`.

```yml
```

{{% /tab %}}
-->

{{< /tabs >}}

In the next step, you'll want to think about is to specify resources for your container.

In the following example, we'll create a simple service based on `busybox`.

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
