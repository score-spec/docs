---
title: "Overview"
linkTitle: "Overview"
weight: 1
description: >
  This page is an overview of the Score Specification.
---

## What is Score?

_Score_ provides a developer-centric and platform-agnostic Workload specification to improve developer productivity and experience. Score eliminates Configuration mismanagement between local and remote environments.

The _Platform CLI tool_ is a conversion tool for developers and teams to generate an environment specific configurations. Use the Platform CLI tool to generate your target platform from the Score Specification, which can then be combined with environment specific parameters to run the Workload in the target environment.

### Workload specification

The Score specification file resolves configuration mismanagement between environments. Compose a `score.yaml` file that describes how to run your workload. As a platform-agnostic declaration file, `score.yaml` creates a single source of truth on Workload profiles of requirements and works to integrate with any platform or tooling.

<!-- Configuration mismanagement -->

### Eliminates configuration mismanagement

_Configuration mismanagement_ is the difference between how your local environment and remote environments are defined. For example, if you're running a testing in environment with Docker Compose and a production environment Kubernetes Cluster, keeping both environments in sync isn't clearly defined. With the Score Specification, you define your environment once, and the target _Platform CLI tool_ will manage the configuration mismanagement.

## Who uses Score?

Developers use Score to describe their resources and environment's consistently.

Then they use the {{< glossary_tooltip text="Platform CLI" term_id="platform-cli" >}} to generate their resources in an environment of choice. For example, you might use a PostGres database in a local, development, staging, and production stage. Each stage of the deployment process connects to a different PostGres database. When you compose your Score, you'll describe that resource once, then each environment will connect your PostGres database dynamically.

## Benefits

Because Score is developer-centric and platform-agnostic way to describe a Workload, the `score.yaml` file is the single source of truth for Workloads profile of requirements and works to utilize any platform or tooling. Because of this, you eliminate specification misconfiguration between environments which reduces:

- reduces time spent on debugging.
- reduces time spent on repetitive tasks.
- reduces cognitive load.

## How is Score different from other specs?

Docker-Compose and Helm Charts are great at running resources regardless of platform, but when you use Docker in testing and Helm in development, ensuring your code runs in both environment can present a layer of friction. Score abstracts the complexity by providing a language agnostic layer that can describe your resources without the platform provider.

## What Score isn't

Score exclusively takes care of translating the Workload requirements specified in `score.yaml` into a platform-specific format (such as `docker-compose.yaml`). The platform consuming the generated file (such as Docker Compose) is responsible for processing and resolving each property. This means:

- Score is **not a configuration management tool** for environments. It is not recommended to store configuration values or secrets in `score.yaml`. Instead, it is possible to declare items such as configuration maps or secrets and vaults as a Workload dependency in your Score specification.
- Score is **not a resource and environment management system**, such as Terraform or an Internal Developer Platform like Humanitec. It won’t spin up or purge physical resources or services defined in `score.yaml`.
- Score is **not a deployment tool**. It doesn't support you with deploying or promoting Workloads across environments.

## Where should I go next?

If you are a first-time user of Score, we recommended that you begin by reading the following sections:

- [Getting Started](/docs/get-started/): Learn how to install and run your first transform.

<!-- - [Examples](/docs/examples/): Check out some example code. -->

Beyond the Getting started section, you can learn more about Score and it's concepts in the following sections:

- [Concepts](/docs/concepts): Recommended reading for anyone consuming or operating Score.
- [Tasks](/docs/tasks/): Recommended reading for common tasks associated with the Score tooling.

<!--

For more information, see Core Tasks:

- Define routes as resources
- Set environmental variables
-->
