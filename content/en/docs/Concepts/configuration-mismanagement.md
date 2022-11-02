---
title: "Configuration mismanagement"
linkTitle: "Configuration mismanagement"
weight: 4
description: >
 This section covers some concepts that are important to understand for day to day Score usage and operation.
---

_Configuration mismanagement_, also known as configuration drift, is the difference between how your local environment and remote environments are defined.

In modern software development, applications are typically deployed as microservices, each part is packaged into its own container and promoted across different cloud environments. To run containerized Workloads, teams make use of container orchestration platforms. As a developer you might be using Docker Compose or Minikube for local development and deploy to remote environments that are based on systems such as Kubernetes, OpenShift, Nomad, or AWS ECS.

To successfully develop, test, deploy, and run a Workload, you should not only have to be familiar with the platform and related tooling your team makes use of, but also keep each Workload's specification in sync. If entities are configured differently across platforms, the risk of configuration mismanagement increases.

For example, a Workload with a dependency on a database might point to a Postgres image or mock server in lower environments. On its way to production; however, a database has to be provisioned and allocated by Terraform. Such _translation gaps_ between environments exist for all kinds of items - volumes, external services (for example Vault or RabbitMQ), ports, DNS records, or routes.

From a developer’s point of view, you successfully test and run a Workload locally, for example by means of docker-compose, and even pass the isolated tests embedded into your CI pipeline. The question of how things are now appropriately reflected in the next environment, which might be running on Kubernetes and is managed by means of helm charts - is answered differently in every team and depends on the complexity of the task at hand. A variable change is easier to keep in sync than declaring a dependency on a database across different platforms.

In practice, an Ops Engineer might jump in to review configuration changes. You might compare the Workload specification for each platform yourself. A colleague might be working on a policy definition for YAML files. Either way, if a property is overseen or has accidentally been wrongly specified, the team will end up with a failed deployment or a Workload that is running in a way that it’s not intended to.
