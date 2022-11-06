---
title: "Set environment variables in score-helm"
linkTitle: "score-helm"
weight: 5
description: >
    This section describes how to pass dynamic environment-specific configuration to the Workload during deployment.
---

## Substitute environment variables

To substitute environment variables, declare an environment variable in your `score.yaml` file.

In the following example, the `FRIEND` property sources its value from the `NAME` property in the `resources` section.

- `NAME`

```yaml
apiVersion: score.dev/v1b1

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
> To declare match resource in the Score file, the variable name, `resources.env.NAME` must map to the structure in `resource` section.

For more information, see the [Resource section]({{< relref "/content/en/docs/reference/score-spec-reference.md#referencing-resources" >}}) in the Score reference.

{{% /alert %}}

## Environment variables

Declare default environment variables in file.

1. In a `env.yaml` file, add your environment variables.

```yaml
env:
  NAME: John
```

2. When running `score-helm run`, you'll want to pass the `--values` flag where `env.yaml` imported values file.

```bash
score-helm run -f ./score.yaml \
  --values ./env.yaml \
  -o ./values.yaml
```

The following is the output of the previous command.

```yml
containers:
  hello:
    args:
      - -c
      - while true; do echo Hello $${FRIEND}!; sleep 5; done
    command:
      - /bin/sh
    env:
      - name: FRIEND
        value: John
    image:
      name: busybox
```

### Generate a Helm Chart

Generate a Helm Chart and specify the name or absolute path to Helm starter scaffold.

```path
helm create -p ../examples/chart hello
```

The following is the results from the previous command.

```yml
NAME: hello
LAST DEPLOYED: Wed Nov 1 00:00:00 2022
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

The following is the generated Kubernetes deployment object.

```yaml
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
            - while true; do echo Hello $${FRIEND}!; sleep 5; done
          env:
            - name: FRIEND
              value: John
```
