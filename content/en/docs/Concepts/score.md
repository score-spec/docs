---
title: "Score"
linkTitle: "Score"
weight: 4
---

Score solves Workload configuration mismanagement between environments. It is made up of two components: The `score.yaml` specification file and a Platform specific CLI tool.

- The Score Specification is a developer-centric application definition that describes how to run a workload. As a platform-agnostic declaration file, score.yaml presents the single source of truth on a Workloads profile of requirements and works to utilize any platform or tooling.
- The Platform specific CLI tool is used to run against the Score Specification file. It is tied to a platform such as docker compose (`score-compose`), helm (`score-helm`) or Humanitec (`score-humanitec`) and will take care of converting the Score Specification into the required platform-specific configuration file such as docker-compose.yaml, chart.yaml or a Humanitec deployment set - which can then be combined with environment specific parameters to run the Workload in the target environment.

With Score, the same Workload can be run on completely different technology stacks without the developer needing to be an expert in any of them. For example, the same Score Specification can be used to generate a docker-compose file for local development, Kubernetes manifests for deployment to a shared development environment and to a serverless platform such as Google Cloud Run for integration tests.
