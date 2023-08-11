---
title: "Setup GitHub Actions"
subtitle: "Setup GitHub Actions for Continuous Integration"
weight: 5
draft: false
description: >
    A tutorial on how to set up Score with GitHub Actions.
---

You can use `score-humanitec` in your GitHub Action workflows, for example, when you make a code change, and you want the Humanitec Platform Orchestrator to deploy your code to a new environment.

The following is a guide to setting up the Score implementation CLI in your GitHub Action workflows.

For the Score GitHub Action, see [Setup Score](https://github.com/score-spec/setup-score)

## Usage

To use the Score GitHub Action, add the following step to your workflow:

```yaml
steps:
  - uses: actions/setup-score@v2
    with:
      file: score-humanitec
      version: '0.1.0'
```

This will download and cache the specified version of the `score-humanitec` CLI and add it to PATH.

The action accepts the following inputs:

- `file` - The Score CLI tool to install. For example, `score-humanitec`, `score-compose`, or `score-helm`.
- `version` - The version of the CLI to install.

## Example

Here is a complete example workflow:

```yaml
name: Score Example

on: push

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Set up Score
      uses: actions/setup-score@v2
      with:
        file: score-humanitec
        version: '0.1.0'

    - name: Check version
      run: score-humanitec --version
```

This installs version `0.1.0` of `score-humanitec`, adds it to `$PATH`, and runs `score-humanitec --version` to verify it is set up correctly.

The action caches the Score binary, so it won't need to download it each run.
