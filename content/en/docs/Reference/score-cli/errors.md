---
title: "CLI error reference"
linkTitle: "CLI errors"
weight: 9
draft: true
description: >
  Overview and description for common errors in the Platform CLI.
---

## Workload does not have any containers

If you receive the following error, you may not have specified a container in your `score.yaml` file.

```bash
building docker-compose configuration: workload does not have any containers to convert into a compose service
```

To resolve this error, declare a container.

```yml
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

``bash
To resolve this error, declare a container.

```yml
# snippet does not work.
# do not copy
containers:
  image: busybox
```

To resolve this error, use the following.

```yml
containers:
  container-id:
    image: busybox
```

## Duplicated key

If you receive an error similar to the following, you may have a duplicated key in your `score.yaml` file.

```bash
Error: yaml: unmarshal errors:
  line 28: mapping key "required" already defined at line 27
```

To resolve, remove the duplicated key.
