---
title: "Set environmental variables"
linkTitle: "Environmental parameters"
weight: 4
description: >
    This section describes how to set your environmental variables.
---

Environmental variables can only set within the [`container`]({{< ref "../reference/score-schema-reference.md" >}} "Container") section of your Score specification file. These variables translate into environmental variables as if you're deploying a {{< glossary_tooltip text="Workload" term_id="workload" >}} with Kubernetes or Docker.

Values for those variables can be either hard coded (not recommended) or sourced from the resources properties through substitutions (recommended). For example, `${resources.my-db.host}`.
