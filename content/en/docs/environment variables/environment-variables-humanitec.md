---
title: "Pass dynamic environment-specific configurations in score-humanitec"
linkTitle: "score-humanitec"
weight: 5
description: >
    This section describes how to pass dynamic environment-specific configuration to the Workload during deployment.
---

Humanitec provides a dynamic application configuration mechanism through the [Shared Application Values](https://docs.humanitec.com/using-humanitec/work-with-apps/define-app-values-and-secrets).

## Overview

The Score Specification uses a special `environment` property type that is specified in the `containers` section.

```yaml
apiVersion: score.sh/v1b1

metadata:
  name: hello-world

containers:
  hello:
    image: busybox
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo Hello $${FRIEND}!; sleep 5; done"]
    variables:
      FRIEND: ${resources.env.NAME}

resources:
  env:
    type: environment
    properties:
      NAME:
        type: string
        default: World
```


{{% alert %}}

> Resources need to map to the resource structure.
> To declare environment variables in a Score file, the variable name, `resources.env.NAME` must map to the structure in `resource` section.

For more information, see the [Resource section]({{< relref "/content/en/docs/reference/score-spec-reference.md#referencing-resources" >}}) in the Score Specification reference.

{{% /alert %}}

Use the `run` command to generate a Humanitec deployment delta file from Score.

```bash
score-humanitec run -f ./score.yaml \
  --env test-env
```

The following is the output of the previous command.

```json
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
                "while true; do echo Hello $${FRIEND}!; sleep 5; done"
              ],
              "command": [
                "/bin/sh"
              ],
              "id": "hello",
              "image": "busybox",
              "variables": {
                "FRIEND": "${values.NAME}"
              }
            }
          }
        }
      }
    }
  }
}
```

The output JSON can be used as a payload to [Create a new Delta](https://api-docs.humanitec.com/#tag/Delta/paths/~1orgs~1%7BorgId%7D~1apps~1%7BappId%7D~1deltas/post) with a Humanitec API call.

When deploying this service with Humanitec, make sure the shared application value called `NAME` is created and set for the target environment.
