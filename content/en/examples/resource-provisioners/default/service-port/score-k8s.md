---
title: "Score K8s"
draft: false
mermaid: true
type: examples
excerpt: 'The default provisioner for service resources, this expects a workload and port name and will return the hostname and port required to contact it. This will validate that the workload and port exist, but won&#39;t enforce a dependency relationship yet.'
hasMore: true
parent: "Service Port"
flavor: "Default"

---

The default provisioner for service resources, this expects a workload and port name and will return the hostname and port required to contact it. This will validate that the workload and port exist, but won't enforce a dependency relationship yet.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/service-port/score-k8s" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
