---
title: "Compose"
linkTitle: "Compose"
weight: 4
description: >
  Learn to translate a Score Specification file into a Docker Compose configuration with the target Score implementation tool.
---

{{% alert %}}

> If at any point you need help, `score-compose --help` from your terminal.
> {{% /alert %}}

In this walkthrough you will:

- 1
- 2
- 3

Getting started:
Start files
End files

### Prerequisites: Set up

1. Install the `score-compose` target Score implementation tool.

## Step 1. Author your score file

1. Declare your resources.
   1. In this example, we will use a Postgres database.

```yaml
resources:
db:
  type: postgres
```

1. Add properties.

```yaml
properties:
      host:
        default: localhost
      port:
        default: 5432
      name:
      username:
        secret: true
      password:
        secret: true
```

1. Declare your dependencies
2. Add environment variables.

## Step 2. Run the target Score implementation tool

Choose from one of the following options:

1. `score-compose`
2. `score-helm`
3. `score-humanitec`

## Step 3. ?

## Step 4. Push to CI

By default, `--file` defaults to `./score.yaml` and `--output` defaults to `./compose.yaml`.

The following is the expected output from the previous command.

```bash
Reading './score.yaml'...
Parsing score spec...
Building docker compose configuration...
Creating './compose.yaml'...
Writing docker compose configuration...
```

The following is the output of the run command.

```yaml
services:
  hello-world: {}
```

**Results**: You've successfully transformed a Score Specification file into a Docker Compose configuration.
