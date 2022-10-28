---
title: "Dependencies"
linkTitle: "Dependencies"
weight: 4
---

The Score Specification can define one or more dependencies required by the Workload to run. This could include other Workloads, third party services, configuration sets, or external resources such as databases and volumes.

Workload dependencies are described in a declarative way.

The Score Specification doesn't define how to configure or provision any dependencies but may include additional metadata (name, type, or labels) that allows the Score implementation (CLI) to identify and link it to the platform that consumes the output file generated based on `score.yaml` to deploy the Workload at runtime.

For example, the Score Specification might declare a `postgres` database as a required dependency for the Workload.

- When using `docker-compose`, a `postgres` service should be defined in an external `compose.yaml` file and started with `compose up` command before the Workload is run.
- When using `Humanitec`, a `postgres` resource should be configured for the target environment so that the `Humanitec` controller can match and provision it before the Workload is deployed into the according Kubernetes cluster.
