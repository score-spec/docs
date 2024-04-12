---
title: "Setup GitHub Actions"
subtitle: "Setup GitHub Actions for Continuous Integration"
linkTitle: GitHub Actions
weight: 5
draft: false
description: >
    How to set up Score with GitHub Actions.
Alias:
- /docs/tutorials/github/
---

You can use any Score implementation CLI in your GitHub Action workflows, for example, when you make a code change, and you want the Humanitec Platform Orchestrator to deploy your code to a new environment.

The following is a guide to setting up the Score implementation CLI in your GitHub Action workflows.

For the Score GitHub Action, see [Setup Score](https://github.com/score-spec/setup-score)

## Usage

To use the Score GitHub Action, add the following step to your [workflow](https://docs.github.com/en/actions/using-workflows/about-workflows):

```yaml
steps:
  - uses: score-spec/setup-score@v2
    with:
      file: score-compose
      version: '0.6.0'
  - run: score-compose --version
```

This will download and cache the specified version of the `score-compose` CLI and add it to PATH.

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
      - uses: score-spec/setup-score@v2
        with:
          file: score-compose
          version: '0.6.0'
      - run: score-compose --version
```

This installs version `0.6.0` of `score-compose`, adds it to `$PATH`, and runs `score-compose --version` to verify it is set up correctly.

The action caches the Score binary, so it won't need to download it each run.
