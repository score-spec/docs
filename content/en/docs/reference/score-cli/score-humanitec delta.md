---
title: "score-humanitec delta"
linkTitle: "score-humanitec delta"
description: "Translates the Score file into a deployment delta for Humanitec."
weight: 4
---

The `score-humanitec delta` command prepares your Workload for deployment with Humanitec.

## Commands

The following section describes configuration details for the `score-humanitec delta` command.

### `delta`

Translates the Score file into a deployment delta for Humanitec.

### Example

The following is an example that translates a Score file into a deployment delta for Humanitec.

```bash
score-humanitec delta -f ./score.yaml \
  --org organization_name \
  --app application_name \
  --env environment_type \
  --token humanitec_api_token
```

## Flags

The following are configuration details for `score-humanitec delta`.

{{% alert %}}

> `--app`, `--env`, `--org`, and `--token` are required flags for the `score-humanitec delta` command.

{{% /alert %}}

### `--api-url`

Specifies a Humanitec API endpoint.

### `--app`

Specifies the application ID.

Required: true

### `--delta`

The ID of an existing delta in Humanitec, you want to merge the generated delta to.

### `--deploy`

Trigger a new delta deployment at the end.

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

Help for the `delta` command.

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

### `--ui-url`

Specifies a Humanitec API endpoint.

Default: `https://api.humanitec.io`

### `--verbose`

Enables a stream to which error messages are sent.

Alias: `v`
