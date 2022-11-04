---
title: "Set dynamic environment-specific configurations"
linkTitle: "Set environment variables"
weight: 5
description: >
    This section describes how to set your environment variables.
---

## Overview

You can pass dynamic environment-specific configurations to the container during a deployment. The Score Specification enables a special environment resource type to be used to support such use cases.

Environment variables can only set within the [`container`]({{< relref "../reference/score-schema-reference.md" >}} "Container") section of your Score Specification file. These variables translate into environment variables as if you're deploying a {{< glossary_tooltip text="Workload" term_id="workload" >}} with a platform like Docker.

Values for those variables can be either hard coded (not recommended) or sourced from the resources properties through substitutions (recommended).

For example, `${resources.my-db.host}`. Score supports declaring environment variables in an environment file or as a shell value.
