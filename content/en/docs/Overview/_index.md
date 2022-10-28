---
title: "Overview"
linkTitle: "Overview"
weight: 1
description: >
  Learn about Score, the Score implementation (CLI), and how to eliminate configuration mismanagement.
---

## What is Score?

_Score_ provides a developer-centric and platform-agnostic Workload specification to improve developer productivity and experience. Score eliminates configuration mismanagement between local and remote environments.

The _Score implementation (CLI)_ is a conversion tool for developers and teams used to generate an environment specific configurations. Use the Score implementation tool to generate your target platform configurations from the Score Specification, which can then be combined with environment specific parameters to run the Workload in the target environment.

### Workload specification

The Score Specification resolves configuration mismanagement between environments. Compose a `score.yaml` file that describes how to run your workload. As a platform-agnostic declaration file, score.yaml creates a single source of truth for Workload profiles and requirements which is used to integrate with any platform or tooling.

## Who uses Score?

Developers use Score to describe their resources and environments consistently.

Then they use the {{< glossary_tooltip text="Score implementation tool" term_id="platform-cli" >}} to generate their resources in an environment of choice.

For example, you might use a Postgres database in a local, development, staging, and production stage. Each stage of the deployment process connects to a different Postgres database. When composing your Score file, describe the Postgres database once and each environment will connect the appropriate Postgres database dynamically.

<!-- Configuration mismanagement -->

## Benefits

Score can be used with any platform or tool that runs containerized Workloads.
Because of this, Score offers many benefits, including:

- [Reduces time spent debugging](#reduces-time-spent-debugging)
- [Eliminates configuration mismanagement](#eliminates-configuration-mismanagement)
- [Reduces cognitive load](#reduces-cognitive-load)

### Reduces time spent debugging

The Score Specification file provides a single source of truth on a Workload's profile of requirements. Meaning that there is a clear separation of concerns between developers with their applications, operations with their platform of responsibilities.

Score serves as the main point of reference when wanting to understand what an application requires to run in any environment.

With Score, the specification ensures standardization across all environments.

### Eliminates configuration mismanagement

_Configuration mismanagement_ is the difference between how your local environment and remote environments are defined. For example, if you're running a testing in environment with Docker Compose and a production environment Kubernetes Cluster, keeping both environments in sync is no easy task.

With the Score, define your environment once, and the target _Score implementation tool_ manages the configuration.

### Reduces cognitive load

The Score Specification provides sensible configuration that cover most common use cases. Because of this, developers can keep their focus when it comes to specifying their application configuration. If needed, these defaults can be overridden.

## How is Score different from other specs?

Docker-Compose and Helm Charts are great at running resources regardless of platform, but when you use Docker in testing and Helm in development, ensuring your code runs in both environment can present a layer of friction. Score abstracts the complexity by providing a language agnostic layer that can describe your resources without the platform provider.

## What Score isn't

Score exclusively takes care of translating the Workload requirements specified in `score.yaml` into a platform-specific format (such as `docker-compose.yaml`). The platform consuming the generated file (such as Docker Compose) is responsible for processing and resolving each property. This means:

- Score is **not a configuration management tool** for environments. It isn't recommended to store configuration values or secrets in `score.yaml`. Instead, it is possible to declare items such as configuration maps or secrets and vaults as a Workload dependency in your Score Specification.
- Score is **not a resource and environment management system**, such as Terraform or an Internal Developer Platform like Humanitec. It won’t spin up or purge physical resources or services defined in `score.yaml`.
- Score is **not a deployment tool**. It doesn't support you with deploying or promoting Workloads across environments.

## Where should I go next?

If you are a first-time user of Score, we recommended that you begin by reading the following sections:

- [Getting Started](/docs/get-started/): Learn how to install and run your first transform.

<!-- - [Examples](/docs/examples/): Check out some example code. -->

Beyond the Getting started section, you can learn more about Score and it's concepts in the following sections:

- [Concepts](/docs/concepts): Recommended reading for anyone consuming or operating Score.
- [Tasks](/docs/extensions): Learn about extension mechanisms.

<!--

For more information, see Core Tasks:

- Define routes as resources
- Set environment variables
-->
