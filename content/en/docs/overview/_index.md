---
title: "Overview"
linkTitle: "Overview"
weight: 1
Victor_Hugo: "true"
Focus_Keyword: "Learn about the Score Specification"
url: /docs
aliases:
- /docs/overview
- /docs/concepts
- /docs/concepts/container
- /docs/concepts/environment-configuration
- /docs/concepts/score
- /docs/concepts/workload
- /docs/extensions
- /docs/extensions/implement-ports-volumes
- /docs/glossary
---

## What is Score?

Score is an open-source, platform-agnostic, container-based workload specification. With Score, you can define your workload once using the Score Specification and then use a Score Implementation CLI to translate it to multiple platforms such as Helm, Docker Compose, or Google Cloud Run.

Score aims to reduce developer toil and cognitive load by enabling the definition of a single file that works across multiple platforms.

### Example

The `score.yaml` file in the example below describes a workload with a busybox container dependent on a PostgreSQL database and advertising two public ports, 80 and 8080:

```
apiVersion: score.dev/v1b1

metadata:
  name: example-service

containers:
  container-id:
    image: busybox
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo Hello friend!; sleep 5; done"]
    variables:
        CONNECTION_STRING: postgresql://${resources.db.username}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.name}

resources:
  db:
    type: postgres

service:
  ports:
    www:
      port: 80
      targetPort: 8080
    admin:
      port: 8080
      protocol: UDP
```

### Key Characteristics

The Score specification is characterised by being:

* **platform-agnostic**: The Score Specification is not tied to a specific platform, allowing integration with various container orchestration platforms and tooling such as Docker Compose, Helm, or Google Cloud Run.

* **environment-agnostic**: The `score.yaml` file captures the configuration that stays the same across all environments. This allows combining it with environment-specific parameters in the target environment. For instance, the parameterized database connection string in the example above is intended to be resolved in each target environment by injecting the corresponding values.

* **tightly scoped**: Score describes workload level properties. It does not intend to be a fully featured YAML replacement for any platform. Instead, Score draws a line between developer-owned workload configuration and platform-owned infrastructure configuration.

* **declarative**: Developers declare what their workload requires to run as part of `score.yaml`. The platform in the target environment is responsible for resolving individual runtime requirements.

## How does Score work?

The Score Specification can be run against a Score Implementation (CLI) such as [score-compose](/docs/score-implementation/score-compose) or [score-helm](/docs/score-implementation/other/score-helm) to generate a platform configuration file such as `docker-compose.yaml` or a helm `values.yaml` file. 

The generated configuration file can then be combined with environment-specific parameters to run the workload in the target environment.

![how-score-works](/images/how-score-works.png)

For more hands-on examples, visit the [examples library](https://github.com/score-spec/score-compose/tree/main/examples) available for score-compose.

## Benefits

### Reduces cognitive load
Score reduces cognitive load by providing a single, easy to understand specification file that allows to run the same workload on entirely different technology stacks without the developer needing to be an expert in any one of them. Developers no longer have to fight a bunch of tech and tools when promoting their workloads from local to production, and can instead focus on writing and deploying code.

### Eliminates configuration mismanagement
Development teams risk configuration inconsistencies when promoting workloads between environments that run on different technology stacks. For example, if you're running a testing environment with Docker Compose and a production environment on Kubernetes, keeping your Wwrkloads' configuration in sync can be challenging as each platform comes with its own set of APIs, semantics, syntax and configuration constructs. With Score, developers describe their workloads once with `score.yaml` and any required platform-specific configuration can be automatically generated via a Score Implementation CLI (e.g. score-compose or score-helm). This significantly reduces the risk of configuration mismatch between environments.

### Enables separation of concerns
Score enables a clear separation of concerns between developer-owned Workload related configuration and platform-owned infrastructure related configuration: Developers describe what their Wwrkload requires to run as part of `score.yaml` and if the requirements are honored by the platform, the workload runs as intended.

## What Score is not

Score exclusively takes care of translating the workload requirements specified in `score.yaml` into a platform-specific format. This means:

- Score is **not a configuration management tool** for environments. It isn't recommended to store configuration values or secrets in `score.yaml`. Instead, it is possible to declare items such as configuration maps or secrets and vaults as a workload dependency in your Score file. These can then be resolved through the target runtime.

- Score is **not a resource and environment management system**, such as Terraform, or an Internal Developer Platform built around a Platform Orchestrator like Humanitec. It won’t spin up or purge physical resources or services defined in `score.yaml`.

- Score is **not a deployment tool**. It does not perform deployments or the promoting of workloads across environments. Rather, it will be an input to these processes.

Score will seamlessly integrate with the tech and tools you already have in place for configuration, resource, environment and deployment management. It does not intend to replace any part of your tech stack, but instead allows developers to feed in required workload configuration parameters through the Score Implementation CLI in an automated and accessible way.
