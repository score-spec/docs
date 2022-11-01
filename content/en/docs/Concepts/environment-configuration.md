---
title: "Environment specific configuration"
linkTitle: "Environment specific configuration"
weight: 4
description:
---

Environment specific configuration allows the Score Specification file to be combined with variables to run Workloads in the target environment.

### Key use

Score uses environment specific configurations to support a wide range of use cases, including the following:

- The Score Specification declares that a Workload is available on a TCP port.
- The configuration value is sourced from the target environment's application settings.
- The Score Specification declares that the Workload is deployed in multiple replicas so that the application can scale up.
- The exact number of replicas can differ given the environment.
- The environment specific variables include each value for the specific environment.
- The Score Specification declares a container image name and tag. The image pull secret to fetch the image from the registry has to made available by the platform.

For more information see, [Environment variables for Score Specification]({{< relref"/content/en/docs/Get started/environment variables.md" >}} "Environment variables").
