---
title: "service-with-microcks"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "service"
provisionerType: "template"
flavor: "service"
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
hasMore: false

---

{{% resource-provisioner-content description="Outputs a service URL for connecting to an other workload (a Microcks mock is generated if not found)." type="service" supportedParams="port,artifacts,name,version" expectedOutputs="url,name" %}}

{{% example-file filename="10-service-with-microcks.provisioners.yaml" dir="resource-provisioners/community/service/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
