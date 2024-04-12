---
title: "Define environment variables"
linkTitle: "Env variables"
weight: 5
description: >
    This section describes how to define environment variables.
aliases:
- /docs/environment-variables/environment-variables-compose/
- /docs/environment-variables/environment-variables-helm/
---

## Overview

You can pass environment-specific configuration to the container during a deployment. The Score Specification enables a special `environment` resource type to be used to support such use cases.

Environment configurations are set within the [`resource`]({{< relref "/docs/score-specification/score-spec-reference" >}} "Container") section of your Score Specification file. These act as environment variables when you're deploying a Workload.

Values for those variables can be either hard-coded (not recommended) or sourced from the resources properties through substitutions (recommended) such as `${resources.my-db.host}`.

The Score Specification supports declaring environment variables in a configurations files or as a shell value.

For more information, see

- [Environment variables in score-compose](https://github.com/score-spec/score-compose/tree/main/examples/02-environment)
- [Environment variables in score-helm](https://github.com/score-spec/score-helm/tree/main/examples/02-environment)