---
title: "score-helm run"
linkTitle: "helm run"
description: "Translates the Score file into a Helm Chart."
weight: 4
---

## Commands

The following section describes configuration details for the `score-helm run` command.

### `run`

Translates the Score file into a Helm Chart.

### Example

The following is an example that translates a Score file into a Helm Chart.

```bash
score-helm run --file ./score.yaml \
  --output ./values.yaml \
  --env-file ./backend.env
```

## Flags

The following are configuration details for `score-helm run`.

### `--file`

The location of the Score file.
Uses the default value if the flag isn't specified.

Default: `./score.yaml`

Alias: `-f`

```bash
score-helm run -f ./another-score.yaml
```

### `--help`

Help for the `run` command.

Alias: `-h`

```bash
score-helm run -h
```

### `--output`

The output location of the helm file.
Uses the default value if the flag isn't specified.

Default: `./helm.yaml`

Alias: `-o`

```bash
score-helm run -f ./score.yaml -o ./another-helm.yaml
```

### `--overrides`

Specifies the path to the override file.

Default: `./overrides.score.yaml`

```bash
score-helm run -f ./score.yaml \
  -o ./values.yaml \
  --overrides ./overrides.score.yaml
```

### `--values`

Specifies the Helm values path.

```bash
score-helm run -f ./score.yaml --values ./env.yaml -o ./values.yaml
```

### `--verbose`

Enables a stream to which error messages are sent.

```bash
score-helm run -f ./score.yaml -o ./values.yaml --verbose
```
