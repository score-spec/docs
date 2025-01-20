---
title: "Define environment variables"
linkTitle: "Env variables"
weight: 5
description: >
    How to define environment variables in your Score specification
aliases:
- /docs/environment-variables/environment-variables-compose/
- /docs/environment-variables/environment-variables-helm/
---

## Overview

You can pass environment-specific configuration to the container during a deployment. The Score Specification enables a special `environment` resource type to be used to support such use cases.

Environment configurations are set within the [`resource`]({{< relref "/docs/score specification/score-spec-reference" >}} "Container") section of your Score Specification file. These act as environment variables when you're deploying a Workload.

Values for those variables can be either hard-coded (not recommended) or sourced from the resources properties through substitutions (recommended) such as `${resources.my-db.host}`.

The Score Specification supports declaring environment variables in a configurations files or as a shell value.

For more information, see [environment variables in `score-compose`](https://github.com/score-spec/score-compose/tree/main/examples/02-environment).
