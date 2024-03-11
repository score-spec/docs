---
title: "Overview"
linkTitle: "Overview"
weight: 1
Victor_Hugo: "true"
Focus_Keyword: "Learn about the Score Specification"
description: >
  Learn about Score, the Score implementation (CLI), and how to eliminate configuration mismanagement.
aliases:
- ../concepts
- ../concepts/container
- ../concepts/dependencies
- ../concepts/environment-configuration
- ../concepts/score
- ../concepts/workload
- ../glossary
---

## What is Score?

Score is made up of two components, the Score Specification and a Score Implementation CLI.

The _Score Specification_ is a developer-centric definition that describes how to run a Workload. As a platform-agnostic declaration file, `score.yaml` presents the single source of truth on a Workloads runtime requirements and works to utilize any container orchestration platform or tooling.

The _Score implementation (CLI)_ is a conversion tool (such as score-compose or score-helm) for developers and teams used to generate platform-specific configuration (such as `docker-compose.yaml` or Helm `values.yaml`) from the Score Specification.

## Who uses Score?

Developers use the Score Specification to describe their Workload, including its resource and service dependencies.

Then they run a {{< glossary_tooltip text="Score Implementation (CLI)" term_id="score" >}} to generate required resources in an environment of choice.

For example, the same Score Specification can be used to generate a docker compose file for local development, Kubernetes manifests for deployment to a shared development environment and to a serverless platform such as Google Cloud Run for integration tests.

## Benefits

Score can be used with any platform or tool that runs containerized Workloads.
Because of this, Score offers many benefits, including:

- [Reduces cognitive load](#reduces-cognitive-load)
- [Eliminates configuration mismanagement](#eliminates-configuration-mismanagement)
- [Separation of concerns between dev and ops](#separation-of-concerns-between-dev-and-ops)

### Reduces cognitive load

Score reduces cognitive load by providing a single, easy to understand specification file that allows to run the same Workload on entirely different technology stacks without the developer needing to be an expert in any one of them. Developers no longer have to fight a bunch of tech and tools when promoting their Workloads from local to production, and can instead focus on writing and deploying code.

### Eliminates configuration mismanagement

Development teams risk _Configuration mismanagement_ when promoting Workloads between environments that run on different technology stacks. For example, if you're running a testing environment with Docker Compose and a production environment on Kubernetes, keeping your Workloads' configuration in sync can be challenging as each platform comes with its own set of APIs, semantics, syntax and configuration constructs. With Score, developers describe their workloads once with `score.yaml` and any required platform-specific configuration can be automatically generated via a Score Implementation CLI (e.g. score-compose or score-helm). This significantly reduces the risk of configuration mismatch between environments.

### Separation of concerns between dev and ops

Score enables a clear separation of concerns between developer-owned Workload related configuration and operations-owned platform and infrastructure related configuration: Developers describe what their Workload requires to run as part of `score.yaml` and if the requirements are honored by the platform, the Workload runs as intended.

## What Score is not

Score exclusively takes care of translating the Workload requirements specified in `score.yaml` into a platform-specific format. This means:

- Score is **not a configuration management tool** for environments. It isn't recommended to store configuration values or secrets in `score.yaml`. Instead, it is possible to declare items such as configuration maps or secrets and vaults as a Workload dependency in your Score file. These can then be resolved through the target runtime.
- Score is **not a resource and environment management system**, such as Terraform, or an Internal Developer Platform built around a Platform Orchestrator like Humanitec. It won’t spin up or purge physical resources or services defined in `score.yaml`.
- Score is **not a deployment tool**. It doesn't support you with deploying or promoting Workloads across environments.

Score will seamlessly integrate with the tech and tools you already have in place for configuration, resource, environment and deployment management. It does not intend to replace any part of your tech stack, but instead allows developers to feed in required Workload configuration parameters through the Score Implementation CLI in an automated and accessible way.
