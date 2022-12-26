---
title: "score-humanitec run"
linkTitle: "score-humanitec run"
description: "Translates the Score file into a deployment delta for Humanitec."
weight: 4
---

## Commands

The following section describes configuration details for the `score-humanitec run` command.

### `run`

Translates the Score file into a deployment delta for Humanitec.

### Example

The following is an example that translates a Score file into a deployment delta for Humanitec.

```bash
score-humanitec run --file ./score.yaml \
  --env development
```

## Flags

The following are configuration details for `score-humanitec run`.

### `--app`

Specifies the application ID.

### `--deploy`

Initiates a new delta deployment.

### `--env`

Specifies an Environment ID.

### `--file`

The location of the Score file.
Uses the default value if the flag isn't specified.

Default: `./score.yaml`

Alias: `-f`

### `--help`

Help for the `run` command.

Alias: `-h`

### `--image`

Specifies an override for the `/container/image` property from the source Score file.

### `--org`

Specifies the Organization ID.

### `--token`

Specifies a Humanitec API authentication token.

### `--url`

Specifies a Humanitec API endpoint. Use the default value if none is provided.

Default: `https://api.humanitec.io`
