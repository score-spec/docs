---
title: "service-with-microcks-cli"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "service"
provisionerType: "cmd"
flavor: "service-with-microcks-cli"
excerpt: ''
description: 'Outputs a service URL for connecting to an other workload (a Microcks mock is generated if not found).'
expectedOutputs: 
  - url
  - name
supportedParams: 
  - port
  - artifacts
  - name
  - version
tool: service
hasMore: false

---

{{% resource-provisioner-content description="Outputs a service URL for connecting to an other workload (a Microcks mock is generated if not found)." type="service" supportedParams="port,artifacts,name,version" expectedOutputs="url,name" %}}

{{% example-file filename="10-service-with-microcks-cli.provisioners.yaml" dir="resource-provisioners/community/service/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
