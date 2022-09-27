---
title: "Score"
linkTitle: "Score"
weight: 4
---

Score solves workload specification drift between environments. It is made up of two components: The score.yaml specification file and a Score implementation.

- The Score specification is a developer-centric application definition that describes how to run a workload. As a platform-agnostic declaration file, score.yaml presents the single source of truth on a workloads profile of requirements and works to utilize any platform or tooling.
- The Score implementation is a CLI tool which the Score specification file is run against. It is tied to a platform such as docker compose (`score-compose`), helm (score-helm) or Humanitec (`score-humanitec`) and will take care of converting the Score specification into the required platform-specific configuration file such as docker-compose.yaml, chart.yaml or a Humanitec deployment set - which can then be combined with environment specific parameters to run the workload in the target environment.
  With Score, the same workload can be run on completely different technology stacks without the developer needing to be an expert in any of them. For example, the same Score specification can be used to generate a docker-compose file for local development, Kubernetes manifests for deployment to a shared development environment and to a serverless platform such as Google Cloud Run for integration tests.
