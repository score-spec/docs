---
title: "score-compose run"
linkTitle: "score-compose run"
description: "Translates the Score file into a Docker Compose file."
weight: 4
---

## Commands

The following section describes configuration details for the `score-compose run` command.

### `run`

Translates the Score file into a Docker Compose file.

### Example

The following is an example that translates a Score file into a Docker Compose file.

```bash
score-compose run --file ./score.yaml \
  --output ./compose.yaml \
  --env-file ./backend.env
```

## Flags

The following are configuration details for `score-compose run`.

### `--build`

Replaces the `image` name with the specified string.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --build web
```

### `--env-file`

Specifies the location to store sample `.env` file.

```bash
score-compose run -f ./score.yaml -o ./compose.yaml --env-file ./backend.env
```

### `--file`

Specifies the path to the Score file.
Uses the default value if the flag isn't specified.

Default: `./score.yaml`

Alias: `-f`

```bash
score-compose run -f ./another-score.yaml
```

### `--help`

Displays help output for the `run` command.

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

### `--property`

Overrides selected property value.

Alias: `-p`
