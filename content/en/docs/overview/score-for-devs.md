---
title: "Score for developers"
linkTitle: "Score for developers"
description: Learn about Score as a developer
weight: 1
Focus_Keyword: "Learn about Score as a developer"

---

## Experience Score as a Developer

Score is a workload specification designed to simplify development for cloud-native developers. The spec enables you to describe your workload’s configuration in a vendor-neutral way, eliminating the need for tooling-specific syntax from platforms such as Docker or Kubernetes for example. By leveraging familiar concepts and semantics, defining a workload’s configuration becomes as simple as stating, "I want a database of type X and an event queue of type Y to accompany my workload".

Below you'll find an example of a simple Score application with a web server that queries a Postgres database on each request. The demo code can be found [here](https://github.com/score-spec/sample-app-gif).


``` yaml
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

You can now use this Score file for deploying your workload to a specific platform such as Docker Compose or Kubernetes. Run it through a Score implementation CLI to generate the configuration manifests, and apply them using the standard platform tooling. In the graphic below, this process is illustrated with our reference implementations: [score-compose](https://github.com/score-spec/score-compose) (for Docker Compose files) and [score-kubernetes](https://github.com/score-spec/score-k8s) (for Kubernetes manifests).

![how-score-works](/images/how-score-works.png)

If you’re curious about how this looks in practice, check out the recording below where we walk through examples using [score-compose](https://github.com/score-spec/score-compose) and [score-kubernetes](https://github.com/score-spec/score-k8s) to generate manifests for Docker Compose and Kubernetes, both derived from the same Score spec.

<script src="https://fast.wistia.com/embed/medias/m3mxb2w8vp.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:47% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:80%;left:0;position:absolute;top:0;width:80%;"><div class="wistia_embed wistia_async_m3mxb2w8vp seo=true videoFoam=true" style="height:80%;position:relative;width:80%"><div class="wistia_swatch" style="height:80%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:80%;"><img src="https://fast.wistia.com/embed/medias/m3mxb2w8vp/swatch" style="filter:blur(5px);height:80%;object-fit:contain;width:80%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>

In practice, your team might provide custom Score CLIs tailored to platforms like Helm, Google Cloud Run, or Azure Container Apps, based on your team’s tech stack. Increase your reach by making this a community project!

### Score Breakdown

When working with Score, there are three main components to consider:

- **The Score file**: A file based on the Score specification that is used to describe your workload’s configuration declaratively. The spec is platform-agnostic, enabling you to use common language and not having to worry about platform-specific syntax from container orchestration tooling like Kubernetes.

- **A Score Implementation**: An implementation, typically a CLI, of the Score specification for target platforms such as Kubernetes, Helm or Google Cloud Run. It is typically developed and maintained by the platform team and can be utilised via a simple set of commands such as score-<platform> to generate the required config file.

- **The platform configuration files**: The generated configuration file can be executed natively by the target platform. If needed it can be combined with environment-specific parameters to run the workload in the target environment.

The Score file sits next to your workload’s source code in version control. Both the Score implementation and the generated configuration file can be executed manually in your terminal or automated as part of your team's CI workflow.

### Score Benefits

Score is designed by developers for developers. We’ll spare you the usual marketing buzzwords, but here’s what motivated us to develop Score:

- **Consistent Configuration:** Score helps you manage differences between your local and cloud environments. For example, if you use Docker Compose for local development but Helm Charts for Kubernetes-based deployment to production, synchronizing configurations across these platforms can be challenging. Score simplifies this process by generating configuration in an automated and standardized manner.

- **Lightweight Abstraction:** Score offers a simple abstraction layer that respects your expertise level. You can stay at the top level of the Score file or dive deep into manipulating generated deployment manifests if you’re a seasoned pro.

- **Easy Workflow Integration**: Adding Score to your workflow is easy. It integrates with your existing toolchain, acting as a bridge, rather than an additional layer or replacement. Simply add the Score spec file to your workload, and use the standalone CLI to generate the required configuration file for your target platform. With minimal lock-in, reverting to your previous workflow is no problem.

### Join the Score community

Score is open source! Connect with fellow Score developers on our [Slack](https://join.slack.com/t/scorecommunity/shared_invite/zt-2a0x563j7-i1vZOK2Yg2o4TwCM1irIuA) or browse through our [GitHub repository](https://github.com/score-spec/spec) to see what’s new, or start your own implementation project.

Got something to say about Score? [We're all ears](https://github.com/score-spec/spec?tab=readme-ov-file#-get-involved)! We’d love to discuss your ideas on where the project should go next or how we can improve.