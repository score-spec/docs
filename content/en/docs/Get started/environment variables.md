---
title: "Set environment variables"
linkTitle: "Environment variables"
weight: 5
draft: true
description: >
    This section describes how to set environment variables for Score.
---

When `docker-compose` runs a service, it is possible to pass some information from the host to the container through environment variables.

This _hello world_ example provides and [Overview](#overview) section and two options to resolve your variable name:

- [Environment variables in file](#environment-variables-in-file)
- [Environment variables in your shell](#environment-variables-in-your-shell)

## Overview

The Score Specification uses a special `environment` property type that is specified in the `containers` section.

```yaml {linenos=false,hl_lines=["16"]}
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

Use the `run` command to generate a Docker Compose file from Score.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml
```

The `compose.yaml` file contains a single service definition and utilizes a host environment variable called `NAME`.

The following `compose.yaml` file is the output of previous.

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

## Environment variables in file

It is recommended to declare your environment variables in a `.env` file.

Score has an optional `--env-file` flag which makes it easy to manage your environment variables needed for running Workloads.

Use the `--env-file` flag from the `score-compose` platform tool to produce a template variables declared in your `score.yaml` file.

```bash
score-compose run -f score.yaml -o compose.yaml --env-file hello.env
```

The `--env-file` flag will create a file that can be used in combination with the Docker platform.

The following is the output of the previous command in the `hello.env` file.

```yaml
NAME=Hello
```

Run the `docker-compose` command with the `--env-file` flag, specify the path to your `.env` file.

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

**Results** you've successfully passed an environment variable through an `.env` file.

## Environment variables in your shell

To use environment variables in your shell, assign a value to your variable using your shell's built-in `export` command.

The following example sets the environment variable to `Hello`.

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

## Learn more

For more information, see the following links.

- The [score-compose environment README.md](https://github.com/score-spec/score-compose/edit/main/examples/02-environment/README.md) file.
- The [`.env`](https://docs.docker.com/compose/environment-variables/#using-the---env-file--option) option in the Docker Compose documentation.
- The [Score Specification reference]({{< ref "../reference/score-schema-reference" >}} "Score Specification")
