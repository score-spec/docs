---
title: "Environment specific configuration"
linkTitle: "Environment specific configuration"
weight: 4
description: Pass environment-specific configurations to the Workload during a deployment.
---

Environment-specific configuration is configuration that is expected to vary between environments. For example, a production Workload that uses managed service like Twillio might use a production API key to access the service. In the dev environment, a development API key might be used to avoid incurring cost with test traffic. We would not be surprised to see different API keys in different environments.

## Overview

The Score Specification is defined in an environment-agnostic way, meaning it can be combined with environment-specific values to run Workloads in the target environment. For example: Your Score spec might specify a parameterised database connection string such as `postgres://${postgres.userna me}:postgres.password}@${postgres.host}:${postgres.port}/${postgres.name}` which is resolved in each environment the Workload is deployed to by injecting the according credentials.

### Use case

Score supports dynamic configuration management. For example:

1. The Score Spec declares that a Workload is available on a TCP port.
1. The configuration value is then sourced from the target's environment application settings.
1. The Score Spec declares that the Workload is deployed in multiple replicas so that the application can scale up.
   1. The exact number of replicas can differ given the environment.
1. The environment specific variables include a value for each of the environments.
1. The Score Spec declares a container image, `name` and `tag`.
   1. The image pulls a `secret` to fetch the image from that registry, which is made available by the platform.

For implementation details, see [Environment variables for Score Specification]({{< relref "/docs/environment%20variables/_index.md" >}} "Environment variables").
