---
title: "Dependencies"
linkTitle: "Dependencies"
weight: 4
description: >
    The Score Specification can define one or more dependencies required by the Workload to run.
---

The Score Specification can define one or more dependencies required by the Workload to run.
This could include other Workloads, third party services, configurations, or resources such as databases and volumes.

Workload dependencies are described in a declarative way.

The Score Specification doesn't define how to configure or provision any dependencies but may include additional metadata (name, type, or labels) that allows the Score implementation (CLI) to identify and link it to the platform that consumes the output file generated based on `score.yaml` to deploy the Workload at runtime.

For example, a Workload with a dependency on a database might point to a Postgres image or mock server in lower environments. On its way to production however, a database has to be provisioned and allocated by Terraform.
