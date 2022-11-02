---
title: "Set environment variables"
linkTitle: "Set environment variables"
weight: 5
description: >
    This section describes how to set your environment variables.
---

## Overview

Environment variables can only set within the [`container`]({{< ref "../reference/score-schema-reference.md" >}} "Container") section of your Score Specification file. These variables translate into environment variables as if you're deploying a {{< glossary_tooltip text="Workload" term_id="workload" >}} with a platform like Docker.

Values for those variables can be either hard coded (not recommended) or sourced from the resources properties through substitutions (recommended).

For example, `${resources.my-db.host}`. Score supports declaring environment variables in an [environment file](#environment-variables-a-env-file) or as a [shell value](#environment-variables-in-your-shell).

## Substitute environment variables

To substitute environment variables, declare an environment variable in your `score.yaml` file.

In the following example, the `CONNECTION_STRING` property declares the following environment variables.

- `username`
- `password`
- `host`
- `port`
- `name`

```yaml
apiVersion: score.dev/v1b1

metadata:
  name: hello-world

service:
 ports:
   www:
     port: 8000
     targetPort: 80

containers:
  backend:
    image: registry.humanitec.io/humanitec-demo/score-demo-backend
    variables:
      PORT: "8080"
      DEBUG: "false"
      CONNECTION_STRING: postgresql://${resources.db.username}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.name}

resources:
  db:
    type: postgres
    properties:
      host:
      port:
        default: 5432
      name:
      username:
        secret: true
      password:
        secret: true
```

{{% alert %}}

> Resources need to map to the resource structure.
> To declare match resource in the Score file, the variable name, `resources.db.username` must map to the structure in `resource` section.

For more information, see the [Resource section]({{< relref "/content/en/docs/reference/score-schema-reference.md#referencing-resources" >}}) in the Score reference.

{{% /alert %}}

Choose from one of the following options to substitute environment variables.

- [Environment variables in a .env file](#environment-variables-a-env-file)
- [Environment variables in your shell](#environment-variables-in-your-shell)

## Environment variables a .env file

Declare default environment variables in file.

1. In a `.env` file, add your environment variables. The following uses settings from Docker Compose.

```yaml
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=PassW0rd
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=backend
```

2. When running `score-compose run`, you'll want to pass the `--env-file` flag where `backend.env` is the environment variable file.

```bash
score-compose run \
  -f ./backend/score.yaml \
  -o backend.yaml \
  --env-file backend.env \
  --build ./backend
```

## Environment variables in your shell

Alternatively, export environment variables in your shell.

1. In your terminal, run the following commands and pass your environment specific variables.

```bash
export DATABASE_USERNAME=your_username
export DATABASE_PASSWORD=PassW0rd
export DATABASE_HOST=localhost
export DATABASE_PORT=5432
export DATABASE_NAME=backend
```

2. Then run your Docker compose command.

```bash
docker-compose up compose.yaml --env-file backend.env
```
