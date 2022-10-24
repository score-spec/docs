---
title: "Set environmental variables"
linkTitle: "Environmental parameters"
weight: 5
description: >
    This section describes how to set your environmental variables.
---

## Overview

Environmental variables can only set within the [`container`]({{< ref "../reference/score-schema-reference.md" >}} "Container") section of your Score specification file. These variables translate into environmental variables as if you're deploying a {{< glossary_tooltip text="Workload" term_id="workload" >}} with a platform like Docker.

Values for those variables can be either hard coded (not recommended) or sourced from the resources properties through substitutions (recommended). For example, `${resources.my-db.host}`.

Score supports declaring environment variables in an environment file or as a shell value.

## Substitute environment variables

To substitute environment variables, declare an environment variable in your `score.yaml` file.

In the following example, the `CONNECTION_STRING` property declares the following environment variables.

- `username`
- `password`
- `host`
- `port`
- `name`

```yml
containers:
  backend:
    image: registry.humanitec.io/humanitec-demo/score-demo-backend
    variables:
      PORT: "8080"
      DEBUG: "false"
      CONNECTION_STRING: postgresql://${resources.database.username}:${resources.database.password}@${resources.database.host}:${resources.database.port}/${resources.database.name}
```

Choose from one of the following options.

## Environment variables in file

Declare default environment variables in file.

1. In a `.env` file, add your environment variables. The following uses settings from Docker Compose.

```yaml
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=PassW0rd
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=backend
```

1. When running `score-compose run`, you'll want to pass the `--env-file` flag where `backend.env` is the environment variable file.

```bash
score-compose run \
  -f ./backend/score.yaml -o backend.yaml --env-file backend.env \
  --build ./backend
```

## Environment variables in your shell

Alternatively, export environment variables in your shell.

1. In your terminal, run the following commands and pass your environment specific variables.

```bash
export DATABASE_USERNAME=sup
export DATABASE_PASSWORD=dude
export DATABASE_HOST=localhost
export DATABASE_PORT=5432
export DATABASE_NAME=backend
```

1. Then run your Docker compose command.

```bash
docker-compose up compose.yml
```
