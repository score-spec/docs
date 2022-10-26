---
title: "score-humanitec draft"
description: "Configuration details for score-humanitec draft."
headless: true
---

The `draft` command creates a deployment draft for Humanitec from the Score file.

The following are configuration details for `score-humanitec draft`.

{{% alert %}}

> `--app`, `--env`, `org`, and `--token` are required flags for the `score-humanitec draft` command.

{{% /alert %}}

### `--app`

Specifies the application ID.

Required: true

### `--deploy`

Trigger a new draft deployment at the end

### `--env`

Specifies an Environment ID.

Required: true

### `--extensions`

Path to the extension file.

Default: `./humanitec.score.yaml`

### `--file`

Source Score file.

Default: `./score.yaml`

Alias: `-f`

### `--help`

Help for the `draft` command.

Alias: `-h`

### `--org`

Specifies the Organization ID.

Required: true

### `--overrides`

Specifies the path to the override file.

Default: `./overrides.score.yaml`

### `--token`

Specifies a Humanitec API authentication token.

Required: true

### `--url`

Specifies a Humanitec API endpoint.

Default: `https://api.humanitec.io`

Required: true

### `--verbose`

Enables a stream to which error messages are sent.
