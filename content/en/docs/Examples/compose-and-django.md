---
title: "Compose and Django"
linkTitle: "Compose and Django"
weight: 4
draft: true
Description: >
    Shows how to use Docker Compose to set up and run a simple Django/PostgreSQL app.
---

<!-- sample -->

This quick-start guide demonstrates how to use Docker Compose to set up and run a simple Django.

### Prerequisites

Before starting, install Compose.

## Getting started

This guide relates to the Samples Repo from Docker.



## Score file

```yml
apiVersion: score.dev/v1b1
metadata:
  name: web

containers:
  web:
    image: app
    files:
    target: dev-envs
  volume:
    source: [/var/run/docker.sock:/var/run/docker.sock]

service:
  ports:
    www:
      port: 8000
      # `targetPort` defaults to the port value.
      # `protocol` defaults to `TCP`.

```

## Compose file

```bash
score-compose run -f score.yaml --build web -o compose.yaml
```

```yml
services:
  web:
    build:
      context: app
    ports:
      - target: 8000
        published: "8000"
```