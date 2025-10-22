---
title: "service-port"
draft: false
mermaid: true
type: examples
resourceType: "service-port"
provisionerType: "template"
flavor: "service"
excerpt: 'The default provisioner for service resources, this expects a workload and port name and will return the hostname and port required to contact it. This will validate that the workload and port exist, but won&#39;t enforce a dependency relationship yet.'
description: 'Outputs a hostname and port for connecting to another workload.'
expectedOutputs: 
  - hostname
  - port
supportedParams: 
  - workload
  - port
hasMore: true

---

The default provisioner for service resources, this expects a workload and port name and will return the hostname and port required to contact it. This will validate that the workload and port exist, but won't enforce a dependency relationship yet.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/service-port/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
