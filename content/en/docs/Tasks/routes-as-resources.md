---
title: "Define routes as resources"
linkTitle: "Define routes as resource"
weight: 4
---

Suggestions and ideas around managing routes via resources definitions in Humanitec and describing routes as resources dependencies in Score.

# Routes Management in Applications

Applications that consist of multiple microservices would typically need a routing controller that would redirect incoming requests to a proper workload at run time.

Common scenario is to deploy an “API-Gateway” or “Ingress” controller as a part of the application.

**In this case a “routes table” should be maintained and updated after new services deployments. Which is a pain point as the software grows.**

Some teams choose to switch to automated service registry and discovery.

# Humanitec

Humanitec proposes to include advertised routes details into a workload definition. This allows to rebuild and update routes tables during the deployment.

A minor issue with the current implementation in Humanitec is that routes are statically defined as a part of a workload, and can’t be changed in the target environment.

**The proposal is to convert routes in Humanitec into resources definitions, so proper routes can be generated (provisioned) during the deployment based on the target environments and other dynamic parameters.**

# Score

Score has a concept of a workload specification that defines the requirements to run the workload, but in no way is used to manage target configuration or to provision any of the dependencies.

**Following this logic, the idea is to define routes as a dependency (resource) that can be referenced in other parts of the Score specification.**

Like any other resources, `route` would have a _name_ (_id_) and a set of attributes (_proto_, _port_, _prefix_, _type_). The values of these attributes would be available to the workload at a deployment time after the resource reference resolution takes place.

# Use Case 1

A microservice (workload) needs to generate a self-reference in an e-mail that is automatically sent to the user. To build such reference service needs to know a full domain/subdomain name, prefix, and would then append a dynamically-generated part of the URL that has a unique request IDs to identify the user.

Because in different environments the network configuration may differ, `DOMAIN_NAME` and `URL_PREFIX` are configurable via the environment variables for the microservice.

**Score**

In `Score` file, the service would have two resources (dependencies) described, as those are essential for its functionality: `dns` and `route`. Something similar to this:

```yaml
version: ...
metadata:
  name: ...

containers:
  my-service:
     image: ...
     env:
       DOMAIN_NAME: ${resources.dns.domain}
       URL_PREFIX: ${resources.api-route.prefix}

resources:
  dns:
    type: dns
    properties:
      domain:
      ...
  api-route:
    type: route
    properties:
      prefix:
      ...
```

**Humanitec**

When translated by `Score -humanitec` two workload resources reference would be created in the deployment delta, one for `dns` and one for `route`. These would be resolved to actual values based on the configuration specified by the DevOps for the target environment.

**Score is not a Configuration Management Tool**

We do not want to specify any `dns` or `route` attributes values in Score file as those may change based on the target environment. Specifically, routes table management is clearly a configuration management task. And Score is not a Configuration Management Tool.
