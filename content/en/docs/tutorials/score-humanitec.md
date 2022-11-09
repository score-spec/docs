---
title: "Quick Start: Resources with score-humanitec"
subtitle: "score-humanitec"
date: 2017-01-05
weight: 5
draft: true
description: >
  A quick start for score-humanitec.
---

In this tutorial, you'll learn to create a simple service based on the `busybox` Docker image.

## Score file

To prepare your Workload for Humaitec, compose a Score file.

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

To prepare a new Humanitec deployment delta from the `score.yaml` file, use the Score implementation CLI by running the following command.

```console
score-humanitec run -f ./score.yaml --env test-env
```

The following is an example output of the previous command.

```json
{
  "metadata": {
    "env_id": "development",
    "name": "score generated"
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

Output JSON can be used as a payload for the [Create a new Delta](https://api-docs.humanitec.com/#tag/Delta/paths/~1orgs~1%7BorgId%7D~1apps~1%7BappId%7D~1deltas/post) Humanitec API call:
