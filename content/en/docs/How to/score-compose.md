---
title: "Quick Start: Resources with score-compose"
subtitle: "score-compose"
date: 2017-01-05
weight: 5
draft: true
description: >
  A quick start for score-compose.
---

## Local Setup with Docker Compose

Sample `compose.yaml` configuration for the backend microservice that uses PostgreSQL database:

```yaml
services:

  backend:
    build: .
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      PORT: 8080
      CONNECTION_STRING: postgresql://root:PassW0rd@db:5432/pipelines

  db:
    image: postgres:11
    ports:
      - "5432:5432"
    volumes:
      - /var/lib/postgresql/data
    environment:
      POSTGRES_DB: pipelines
      POSTGRES_USER: root
      POSTGRES_PASSWORD: PassW0rd
```

## Score configuration

The following `Score.yaml` configuration can be used to define the service and its dependencies:

<aside>
💡 We replace the image and entry point command bellow, so the User doesn't need a real microservice source code to run examples in this tutorial.

</aside>

```yaml
name: backend

container:
  image: busybox
  command:
  - /bin/sh
  - -c
  - while true; do printenv; echo ...sleeping 10 sec...; sleep 10; done
  variables:
    PORT: 8080
    CONNECTION_STRING: postgresql://${resources.db.username}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.name}

resources:
  db:
    type: postgres
```

## Executing `score-compose`

The user can now produce a `backend.compose.yaml` override file for Docker Compose with `score-compose` CLI tool:

<aside>
💡 When setting things up the first time, the User can add `--env-file` parameter to instruct the tool to produce a sample `.env` file with all the environment variables available for overriding. This `.env` file is typically used to customise configuration in different environments. Refer to the official Docker Compose documentation for [more information](https://docs.docker.com/compose/environment-variables/#the-env-file).

</aside>

```bash
score-compose run -f /tmp/Score.yaml -o /tmp/backend.compose.yaml \
  --env-file /tmp/backend.env
```

The tool should produce `/tmp/backend.compose.yaml` file:

```bash
services:
  backend:
    image: busybox
    command:
    - /bin/sh
    - -c
    - while true; do printenv; echo ...sleeping 10 sec...; sleep 10; done
    environment:
      PORT: 8080
      CONNECTION_STRING: postgresql://$DB_USERNAME:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME
```

In addition, `/tmp/backend.env` should be written:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
```

## Final Docker Compose configuration

The user can now update `compose.yaml` file to accommodate for service overrides, produced from `Score.yaml`, and to use the environment variables listed in the `backend.env`:

<aside>
💡 It isn't strictly necessary to change `CONNECTION_STRING` in the final version of `compose.yaml`, as it would be overridden anyway. However, it is better to keep it in sync with `db` service specification, and to remove all sensitive information from the configuration file.

</aside>

```bash
services:

  backend:
    build: .
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      PORT: 8080
      CONNECTION_STRING: postgresql://$DB_USERNAME:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME

  db:
    image: postgres:11
    ports:
      - "5432:$DB_PORT"
    volumes:
      - /var/lib/postgresql/data
    environment:
      POSTGRES_DB: $DB_NAME
      POSTGRES_USER: $DB_USER
      POSTGRES_PASSWORD: $DB_PASSWORD
```

## Working with multiple environments

If the team uses Docker Compose to deploy services in multiple environments, they may now use different `.env` files to apply settings specific to each environment. They may also leverage profiles in their `compose.yaml` to alter overall application and infrastructure layout in each environment.

At scale, teams may also choose to use Helm (Kubernetes) or Humanitec to deploy into remote environments.

In all these cases using `Score.yaml` would ensure, that the service itself is configured in the same way across all environments.
