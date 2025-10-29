---
title: "static-service"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "service"
provisionerType: "template"
flavor: "static"
excerpt: ''
description: 'Outputs the name of the Workload dependency if it exists in the list of Workloads.'
expectedOutputs: 
  - name
hasMore: false

---

{{% resource-provisioner-content description="Outputs the name of the Workload dependency if it exists in the list of Workloads." type="service" expectedOutputs="name" %}}

{{% example-file filename="10-service.provisioners.yaml" dir="resource-provisioners/community/service/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
