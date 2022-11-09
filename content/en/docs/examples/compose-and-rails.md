---
title: "Compose and Rails"
linkTitle: "Compose and Rails"
weight: 4
draft: true
Description: >
    Shows how to use Docker Compose to set up and run a Rails/PostgreSQL app.
---

<!-- https://docs.docker.com/samples/django/ -->

This quickstart guide shows you how to use Docker Compose to set up and run a Rails/PostgreSQL app. Before starting, install Compose.

<!-- https://docs.docker.com/samples/rails/ -->

```yml
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: password
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
```
