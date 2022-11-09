---
title: "Environment specific configuration"
linkTitle: "Environment specific configuration"
weight: 4
description: Pass dynamic environment-specific configurations to the container during a deployment.
---

Environment-specific configuration allows the Score Specification file to be combined with variables to run Workloads in the target environment.

## Overview

You can pass dynamic environment-specific configurations to the container during a deployment. The Score Specification enables a special environment resource type to be used to support such use cases.

### Use case

Score supports environment-specific configurations. The following list describes a use case for Score's support of environment configuration.

1. The Score Spec declares that a Workload is available on a TCP port.
1. The configuration value is then sourced from the target's environment application settings.
1. The Score Spec declares that the Workload is deployed in multiple replicas so that the application can scale up. The exact number of replicas can differ given the environment.
1. The environment specific variables include a value for each of the environments.
1. The Score Spec declares a container image name and tag. The image pull secret to fetch the image from the registry has to made available by the platform.

For implementation details, see [Environment variables for Score Specification]({{< relref "/docs/environment%20variables/_index.md" >}} "Environment variables").
