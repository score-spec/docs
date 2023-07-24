---
title: "CLI error reference"
linkTitle: "CLI errors"
weight: 9
draft: false
description: >
  Overview and description of common errors in the Score reference implementation CLI's (score-compose, score-helm)
---

When debugging errors, use the `--help` flag or turn on diagnostic message with the `--verbose` flag on the CLI.

## Workload does not have any containers

If you receive the following error, you may not have specified a container in your `score.yaml` file.

```bash
building docker compose configuration: workload does not have any containers to convert into a compose service
```

To resolve this error, declare a container.

```yaml
containers:
  container-id:
    image: busybox
```

## Container incorrectly specified

If you receive the following error, you may not have specified a string name for the container rather than a map of strings.

```bash
validating workload spec: 1 error(s) decoding:

* 'containers[image]' expected a map, got 'string'
```

For example, you may have your containers declared like the following.

```yaml
# snippet does not work.
# do not copy
containers:
  image: busybox
```

To resolve this error, declare a container.

```yaml
containers:
  container-id:
    image: busybox
```

`container-id` is an example name and can be updated with anything you want.

## Duplicated key

If you receive an error similar to the following, you may have a duplicated key in your `score.yaml` file.

```bash
Error: yaml: unmarshal errors:
  line 28: mapping key "required" already defined at line 27
```

To resolve, remove the duplicated key.

## Resource variable names not resolving

If your `score.yaml` file contains variables that don't resolve, you may have indented incorrectly.

```yml {linenos=false,hl_lines=["13-14"]}
# snippet does not work
# do not copy
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
```

In the previous code snippet, the `variables` parameter is adjusted too far left. It should be aligned with the `image`, `command`, and `args` parameters.

```yml {linenos=false,hl_lines=["11-12"]}
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
```

Alternatively, you could have the map of the variables set incorrectly.

```yml {linenos=false,hl_lines=["13-14"]}
# snippet does not work
# do not copy
apiVersion: score.dev/v1b1

metadata:
  name: hello-world

containers:
  hello:
    image: busybox
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo Hello $${FRIEND}!; sleep 5; done"]
    variables:
      FRIEND: ${resources.friend.NAME}

resources:
  env:
    type: environment
```

The `FRIEND` parameter is set to `resources.friend.NAME`, but that is not a valid path in the `resources` section.
