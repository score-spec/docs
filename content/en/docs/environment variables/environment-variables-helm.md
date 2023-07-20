---
title: "Environment variables in score-helm"
linkTitle: "score-helm"
weight: 5
description: >
    This section describes how to define environment variables for score-helm.
---

## Substitute environment configurations

To use environment configurations, declare your variable names in your `score.yaml` file.

In the following example, the `FRIEND` variable sources its value from the `NAME` property in the `resources` section.

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
> To declare environment variables in a Score file, the variable name, `resources.env.NAME` must map to the structure in `resource` section.

For more information, see the [Resource section]({{< relref "/content/en/docs/reference/score-spec-reference.md#referencing-resources" >}}) in the Score Specification reference.

{{% /alert %}}

## Generate a Helm values file

Declare your environment configurations.

1. Create a `env.yaml` file and add your environment variables.

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

### Initialize the Workload Helm Chart Repository

Run the following command to initialize the Workload Helm chart repository.

```bash
helm repo add score-helm-charts https://score-spec.github.io/score-helm-charts
```

Once this is installed, you will be able to use the default `score-helm-charts/workload` Helm chart (you can adapt it for your own use case, find the source code [here](https://github.com/score-spec/score-helm-charts)).

### Install Helm `values.yaml`

Run the following command to deploy the `score-helm-charts/workload` Helm chart with the Helm `values.yaml` file generated previously.

```bash
helm install hello score-helm-charts/workload --values ./values.yaml
```

The following are the outputs of the previous command.

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
---
# Source: workload/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello
  labels:
    helm.sh/chart: workload-0.3.0
    app.kubernetes.io/name: hello
    app.kubernetes.io/instance: hello
    app.kubernetes.io/version: "0.3.0"
    app.kubernetes.io/managed-by: Helm
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: hello
      app.kubernetes.io/instance: hello
  template:
    metadata:
      labels:
        app.kubernetes.io/name: hello
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
