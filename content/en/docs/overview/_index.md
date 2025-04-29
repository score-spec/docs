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
- /docs/overview/score-for-devs
---

## What is Score?

Score is an open-source and a [Cloud Native Computing Foundation (CNCF) Sandbox project](https://www.cncf.io/projects/score/), platform-agnostic, container-based workload specification. With Score, you can define your workload once using the Score Specification and then use a Score Implementation to translate it to multiple platforms such as Docker Compose, Kubernetes, Fly.io or Google Cloud Run.

Score aims to reduce developer toil and cognitive load by enabling the definition of a single file that works across multiple platforms in a vendor-neutral way, eliminating the need for tooling-specific syntax from platforms such as Docker or Kubernetes for example.

Defining a workload’s configuration becomes as simple as stating, _"I want a database of type X and an event queue of type Y to accompany my workload"_.

## Key Characteristics

The Score specification is characterised by being:

- **platform-agnostic**: The Score Specification is not tied to a specific platform, allowing integration with various container orchestration platforms and tooling such as Docker Compose, Kubernetes, Helm, or Google Cloud Run.

- **environment-agnostic**: The `score.yaml` file captures the configuration that stays the same across all environments. This allows combining it with environment-specific parameters in the target environment. For instance, the parameterized database connection string in the example above is intended to be resolved in each target environment by injecting the corresponding values.

- **tightly scoped**: Score describes workload level properties. It does not intend to be a fully featured YAML replacement for any platform. Instead, Score draws a line between developer-owned workload configuration and platform-owned infrastructure configuration.

- **declarative**: Developers declare what their workload requires to run as part of `score.yaml`. The platform in the target environment is responsible for resolving individual runtime requirements.

## How does Score work?

When working with Score, there are three main components to consider:

- **The Score file**: A file based on the Score specification that is used to describe your workload’s configuration declaratively. The spec is platform-agnostic, enabling you to use common language and not having to worry about platform-specific syntax from container orchestration tooling like Kubernetes.

- **A Score Implementation**: An implementation, typically a CLI, of the Score specification for target platforms such as Kubernetes, Helm or Google Cloud Run. It is typically developed and maintained by the platform team and can be utilised via a simple set of commands such as `score-<platform>` to generate the required config file.

- **The platform configuration files**: The generated configuration file can be executed natively by the target platform. If needed it can be combined with environment-specific parameters to run the workload in the target environment.

In the graphic below, the process with these three main components is illustrated with our reference implementations: [`score-compose`]({{< relref "/docs/score-implementation/score-compose" >}}) (for Docker Compose files) and [`score-k8s`]({{< relref "/docs/score-implementation/score-k8s" >}}) (for Kubernetes manifests).

![how-score-works](/images/how-score-works.png)

The Score file sits next to your workload’s source code in version control. Both the Score implementation and the generated configuration file can be executed manually in your terminal or automated as part of your team's CI/CD workflow.

## Example

Below you'll find an example of a simple Score application with a web server that queries a PostgreSQL database on each request. The demo code can be found [here](https://github.com/score-spec/sample-app-gif/blob/main/score.yaml).

```yaml
# The version string helps identify the Score file syntax
apiVersion: score.dev/v1b1
metadata:
  name: sample
  
# A set of containers deployed together for this Workload.
containers:
  main:
    # The "default" image for our service. When deploying, we may override this with a particular tag.
    image: ghcr.io/score-spec/sample-app-gif:sha-2533037
    variables:
      # Pass the resource outputs to our container as environment variables. The Score implementation takes care of securing any secret access as needed.
      PG_CONNECTION_STRING: "postgresql://${resources.db.username}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.database}?sslmode=disable"
     
# The service ports indicate which ports of the Workload are exposed for other services to call.
service:
  ports:
    web:
      port: 8080
      
# Each resource dependency has a name and definition that helps the Score implementation link or provision the required resource.
resources:
  db:
    # This database is specific to this Workload and not shared.
    type: postgres
  dns:
    # Ensure a dns name is available for request routing.
    type: dns
  route:
    # We want to ensure that requests on the Workload hostname go to our service port.
    type: route
    params:
      host: ${resources.dns.host}
      path: /
      port: 8080
```

You can now use this Score file for deploying your workload to a specific platform such as Docker Compose or Kubernetes. Run it through a Score implementation CLI to generate the configuration manifests, and apply them using the standard platform tooling.

Check out the recording below where we walk through examples using [`score-compose`]({{< relref "/docs/score-implementation/score-compose" >}}) and [`score-k8s`]({{< relref "/docs/score-implementation/score-k8s" >}}) to generate manifests for Docker Compose and Kubernetes, both derived from the same Score spec.

<script src="https://fast.wistia.com/embed/medias/m3mxb2w8vp.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:47% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:80%;left:0;position:absolute;top:0;width:80%;"><div class="wistia_embed wistia_async_m3mxb2w8vp seo=true videoFoam=true" style="height:80%;position:relative;width:80%"><div class="wistia_swatch" style="height:80%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:80%;"><img src="https://fast.wistia.com/embed/medias/m3mxb2w8vp/swatch" style="filter:blur(5px);height:80%;object-fit:contain;width:80%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>

## Next steps

- [**Get started with Score**]({{< relref "docs/get-started" >}}): Follow this step-by-step guide by deploying your first Score file with the default `score-compose` Score implementation.
- [**Join the Score community**]({{< relref "/docs/community" >}}): Connect with fellow Score developers on our CNCF Slack channel or start find your way to contribute to Score.
