---
title: "Set environmental variables"
linkTitle: "Environmental variables"
weight: 5
description: >
    This section describes how to set your environmental variables.
---

When `docker-compose` spins-up the service, it is possible to pass some information from the host to the container through environment variables.

This _hello world_ example provides two options to resolve your variable name, [Environment variables in your shell](#environment-variables-in-your-shell) and [Environment variables in file](#environment-variables-in-file).

## Overview

Compose specification uses a special `environment` resource type that is specified in the `containers` section.

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

```bash
score-compose run -f score.yaml -o compose.yaml
```

The `compose.yml` file contains a single service definition and utilizes a host environment variable called `NAME`.

The following `compose.yml` file is the output of `score-compose run -f score.yaml -o compose.yml`.

```yaml
services:
  hello-world:
    command:
      - -c
      - 'while true; do echo Hello $${FRIEND}!; sleep 5; done'
    entrypoint:
      - /bin/sh
    environment:
      FRIEND: ${NAME-World}
    image: busybox
```

## Environment variables in your shell

When you run the `docker-compose` command, specific your variable. In the following example, we set the environment variable to `World`.

```bash
export NAME=Hello
docker-compose -f ./compose.yaml up
```

The following is the output of the previous command.

```bash
[+] Running 1/0
 ⠿ Container score-compose-hello-world-1  Rec...                                         0.1s
Attaching to score-compose-hello-world-1
score-compose-hello-world-1  | Hello Hello!
```

## Environment variables in file

Using an `.env` is one way to manage all your environment variables needed for running Workloads.

Use the `--env-file` flag from the `score-compose` platform tool to produce a template variables declared in your `score.yaml` file.

```bash
score-compose run -f score.yaml -o compose.yaml --env-file hello.env
```

The `--env-file` flag will create a file that can be used in combination with the Docker platform.

The following is the output of the previous command in the `hello.env` file.

```yaml
NAME=WORLD
```

When you run the `docker-compose` command with the `--env-file` flag, specify the path to your `.env` file.

```bash
docker-compose -f compose.yaml --env-file hello.env up
```

The following is the output of the previous command.

```bash
[+] Running 1/0
 ⠿ Container score-compose-hello-world-1  Created   0.0s
Attaching to score-compose-hello-world-1
score-compose-hello-world-1  | Hello Hello!
```

## More information

For more information, see the following links.

- The [score-compose environment README.md](https://github.com/score-spec/score-compose/edit/main/examples/02-environment/README.md) file.
- The [`.env`](https://docs.docker.com/compose/environment-variables/#using-the---env-file--option) option in the Docker Compose documentation.
- The [Score Specification reference]({{< ref "../reference/score-schema-reference" >}} "Score Schema")
