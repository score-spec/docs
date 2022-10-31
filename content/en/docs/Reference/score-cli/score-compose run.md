---
title: "score-compose run"
linkTitle: "compose run"
description: "Translates the Score file into a Docker Compose file."
weight: 4
---

## Commands

The following section describes configuration details for the `score-compose run` command.

### `run`

Translates the Score file into a Docker Compose file.

## Flags

The following are configuration details for `score-compose run`.

### `--build`

Replaces the `image` name with Compose' `build` instructions.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --build build
```

### `--env-file`

Location to store sample `.env` file.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --env-file ./backend.env
```

### `--file`

The location of the Score file.
Uses the default value if the flag isn't specified.

Default: `./score.yaml`

Alias: `-f`

```bash
score-compose run -f ./another-score.yaml
```

### `--help`

Help for the `run` command.

Alias: `-h`

```bash
score-compose run -h
```

### `--output`

The output location of the Compose file.
Uses the default value if the flag isn't specified.

Default: `./compose.yaml`

Alias: `-o`

```bash
score-compose run -f ./score.yaml -o ./another-compose.yaml
```
