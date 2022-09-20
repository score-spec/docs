---
title: "Use environment specific configuration"
linkTitle: "Environment specific configuration"
weight: 5
description: >
  This section demonstrates how to set environment specific configuration.
---

Environment specific configuration allows the generated configuration file to combine with environment specific parameters. Use environment specific parameters to run workloads in the target environment.

## Key use

Score uses environment specific configurations to support a wide range of use cases, including the following:

- The Score specification declares that a workload is available on a TCP port. The configuration value is sourced from the target environment's application settings.
- The Score specification declares that the workload is deployed in multiple replicas so that the application can scale up. The exact number of replicas differ given the environment. The environment specific parameters include each value for the specific environment.
- #TODO The Score specification declares a container image name and tag. The image pull secret to fetch the image from the registry has to made available by the platform.

## Get started

Throughout the following sections. You will learn how to run a transform in the following formats:
