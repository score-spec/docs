---
title: "Humanitec"
linkTitle: "Humanitec"
weight: 4
description: >
  This page is an overview of Score for Humanitec.
---

Use `score-docker` to run the target Platform CLI tool.

The target Platform CLI tool takes in the Score Specification file and translates it into a Docker Compose configuration.

This section will get you started with transforming a Score Specification file into a Docker Compose file and share important information on the target Platform CLI tool.

To get started with `score-docker` create a directory and enter the following information into a file called `score.yaml`.

```yaml Hello world
name: hello-world
containers:
  hello:
    image: busybox
```

From your terminal, run the following command.

```bash
score-compose run
```

By default, `--file` defaults to `./score.yaml` and `--output` defaults to `./compose.yaml`.

The following is the expected output from the previous command.

```bash
Reading './score.yaml'...
Parsing score spec...
Building docker-compose configuration...
Creating './compose.yaml'...
Writing docker-compose configuration...
```

The following is the output of the run command.

```yaml
services:
  hello-world: {}
```

**Results**: You've successfully transformed a Score Specification file into a Docker Compose configuration.
