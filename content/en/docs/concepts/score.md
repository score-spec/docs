---
title: "Score"
linkTitle: "Score"
weight: 4
description: >
    Score is made up of two components, the Score Specification file and the Score implementation CLI tool.
---

Score is made up of two components, the Score Specification file and the Score implementation CLI tool.

## Score Specification

The Score Specification solves for Workload configuration mismanagement between environments.

The Score Specification is a developer-centric application definition that describes how to run a Workload. As a platform-agnostic declaration file, `score.yaml` file presents the single source of truth on a Workloads profile of requirements and works to utilize any platform or tooling.

With the Score Specification, the same Workload can be run on completely different technology stacks without the developer needing to be an expert in any of them. For example, the same Score Specification can be used to generate a Docker-Compose file for local development, Kubernetes manifests for deployment to a shared development environment and to a serverless platform such as Google Cloud Run for integration tests.

## Score implementation CLI

The Score implementation CLI tool is used to run against the Score Specification file. It is tied to a platform such as Docker Compose (`score-compose`), helm (`score-helm`), or Humanitec (`score-humanitec`) and will take care of converting the Score Specification into the required platform-specific configuration file such as `docker-compose.yaml`, `values.yaml`, or a Humanitec deployment delta, which can then be combined with environment specific parameters to run the Workload in the target environment.
