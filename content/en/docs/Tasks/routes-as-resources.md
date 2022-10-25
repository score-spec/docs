---
title: "Define routes as resources"
linkTitle: "Define routes as resource"
weight: 4
---

<!-- Suggestions and ideas around managing routes via resources definitions in Humanitec and describing routes as resources dependencies in Score. -->

## Overview

{{% alert %}}

The `humanitec.score.yaml` extension is used by [`score-humantic` Platform CLI](https://github.com/score-spec/score-humanitec). This is an optional configuration specific for Humanitec's routes as a resource and services accounts.

{{% /alert %}}

<!-- Routes Management in Applications -->

Applications that consist of multiple microservices typically need a {{< glossary_tooltip text="routing controller" term_id="routing-controller" >}} routing controller that redirects incoming requests to a proper {{< glossary_tooltip text="Workload" term_id="workload" >}} at run time.

For example, a common scenario is to deploy an API Gateway, Ingress controller, or Service mesh as part of your application.
Maintaining and updating {{< glossary_tooltip text="routing tables" term_id="routing-table" >}} after new service deployments is a point of friction as the application scales.

## Routing details

With Score, you can include advertised routes details as part of the Workload definition, allowing you to rebuild and update route tables during the deployment process.

Routes convert into resource definitions, so proper routes can be provisioned at the time of deployment based on the target environment and other parameters.

{{% alert %}}

The Score Specification file has a concept of a {{< glossary_tooltip text="Workload specification" term_id="workload-spec" >}} that defines the requirements to run a Workload, but isn't used to manage Target Configuration or to provision any of the dependencies.

For more information, see [Score Specification]({{< ref "../concepts/score-spec.md" >}} "Score Specification").

{{% /alert %}}

Because of this, define routes as a dependency, or as a resource, that can be referenced in other parts of the Score Specification file.

Routes are just like any other resources. For example, a `route` would have the name `id` and a set of attributes like: `proto`, `port`, `prefix`, and `type`.
The values of the attributes are available to the Workload at the time of deployment, after the provision of resources takes place.

## Routes example

A microservice Workload needs to generate a self-reference in an e-mail that is automatically sends to a user.
To build such reference, the service needs to know a full domain, subdomain name, and prefix. Then the service would append a dynamically-generated part of the URL that has a unique request IDs to identify the user.

Network configurations may differ depending on the environment setup.

In the following example, `DOMAIN_NAME` and `URL_PREFIX` are configured through the environment variables for the microservice and `dns` and `route` are two resources that act as dependencies essential for the service's functionality.

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

## Humanitec Workload implementation

When translated by `score-humanitec`, two Workload resources reference would be created in the deployment delta, one for `dns` and one for `route`. These would be resolved to actual values based on the configuration specified by the DevOps for the target environment.
