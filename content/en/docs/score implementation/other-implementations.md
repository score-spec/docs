---
title: "Other Score implementations"
linkTitle: "Other implementations"
description: "A list of other Score implementations maintained by the community"
weight: 3
---

## Other Score implementations maintained by the community

Score is just a specification without its implementations!

In addition to the default [`score-compose`]({{< relref "/docs/score-implementation/score-compose" >}}) and [`score-k8s`]({{< relref "/docs/score-implementation/score-k8s" >}}), here is the list of other Score implementations created and maintained by the community:

- [score-spec/score-radius](https://github.com/score-spec/score-radius) - A Score implementation generating [Radius](https://www.cncf.io/projects/radius/) file.
- [cappyzawa/score-orchestrator](https://github.com/cappyzawa/score-orchestrator) - A Kubernetes Operator reconciling a Score Workload CR.
- [score-spec/score-aca](https://github.com/score-spec/score-aca) - A Score implementation generating [Azure Container Apps (ACA)](https://learn.microsoft.com/azure/container-apps/overview) file.
- [astromechza/score-flyio](https://github.com/astromechza/score-flyio) - A Score implementation deploying to [Fly.io](https://fly.io/) and supporting resource provisioners.
- [Humanitec](https://humanitec.com/products/score) - The Humanitec Platform Orchestrator supports Score-defined workloads and resources.

Do you know of another implementation and want it listed here? [Open a PR](https://github.com/score-spec/docs/edit/main/content/en/docs/score%20implementation/other-implementations.md) to add it above.

Learn more about how to create your own new Score implementation [`here`]({{< relref "/docs/how-to/create-a-score-implementation" >}}).
