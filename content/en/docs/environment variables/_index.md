---
title: "Pass dynamic environment-specific configurations"
linkTitle: "Pass environment configurations"
weight: 5
description: >
    This section describes how to pass environment configurations.
---

## Overview

You can pass dynamic environment-specific configurations to the container during a deployment. The Score Specification enables a special environment resource type to be used to support such use cases.

Environment configurations are set within the [`container`]({{< relref "../reference/score-spec-reference.md" >}} "Container") section of your Score Specification file. These configurations act as environment variables when you're deploying a {{< glossary_tooltip text="Workload" term_id="workload" >}}.

Values for those variables can be either hard coded (not recommended) or sourced from the resources properties through substitutions (recommended).

For example, `${resources.my-db.host}`. The Score Specification supports declaring environment variables in a configurations files or as a shell value.

For more information, see [Environment specific configuration]({{< relref "../concepts/environment-configuration" >}})
