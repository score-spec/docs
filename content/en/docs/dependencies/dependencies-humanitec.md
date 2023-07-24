---
title: "Set dependent Workloads with score-humanitec"
linkTitle: "score-humanitec"
weight: 6
draft: true
description: >
  Describes how to set Workloads that are dependent on additional resources.
---

<!-- https://github.com/score-spec/score-humanitec/issues/10 -->

## Overview

Humanitec ensures Workload dependencies are available during deployment.

Dependencies could be other Workloads, Services, Resources like databases or DNS records, or environments.

The following `score.yaml` file describes the following Workload.

- `backend` that describes another Workload
- Postgres SQL database instance
- Shared DNS record

```yaml
apiVersion: score.sh/v1b1

metadata:
  name: service-a

containers:
  service-a:
    image: busybox
    command: ["/bin/sh"]
    args:
      [
        "-c",
        "while true; do echo service-a: Hello $${FRIEND}! Connecting to $${CONNECTION_STRING}...; sleep 10; done",
      ]
    variables:
      FRIEND: ${resources.backend.name}
      CONNECTION_STRING: postgresql://${resources.db.user}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.name}

resources:
  db:
    type: postgres
  dns:
    type: dns
  backend:
    type: workload
```

This example also uses an extensions file, called `humanitec.yaml`, that contains additional hints for `score-humanitec` CLI tool. This information would help the CLI tool to resolve the resources properly.

```yaml
apiVersion: humanitec.org/v1b1

resources:
  db:
    scope: external
  dns:
    scope: shared
```

To prepare a new Humanitec deployment delta from this `score.yaml` file, use `score-humanitec` CLI tool:

```bash
score-humanitec run -f ./score.yaml --extensions ./humanitec.yaml --env test-env
```

Output JSON can be used as a payload for the [Create a new Delta](https://api-docs.humanitec.com/#tag/Delta/paths/~1orgs~1%7BorgId%7D~1apps~1%7BappId%7D~1deltas/post) Humanitec API call:

```json
{
  "metadata": {
    "env_id": "test-env",
    "name": "Auto-generated (SCORE)"
  },
  "modules": {
    "add": {
      "service-a": {
        "externals": {
          "db": {
            "type": "postgres"
          }
        },
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "service-a": {
              "args": [
                "-c",
                "while true; do echo service-a: Hello $${FRIEND}! Connecting to $${CONNECTION_STRING}...; sleep 10; done"
              ],
              "command": [
                "/bin/sh"
              ],
              "id": "service-a",
              "image": "busybox",
              "variables": {
                "CONNECTION_STRING": "postgresql://${externals.db.user}:${externals.db.password}@${externals.db.host}:${externals.db.port}/${externals.db.name}",
                "FRIEND": "${modules.backend.name}"
              }
            }
          }
        }
      }
    }
  },
  "shared": [
    {
      "path": "/dns",
      "op": "add",
      "value": {
        "type": "dns"
      }
    }
  ]
}
```

When deploying this service with `Humanitec`, make sure that all the dependencies are properly defined and configured for the target environment.
