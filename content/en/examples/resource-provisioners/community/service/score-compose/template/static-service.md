---
title: "static-service"
draft: false
mermaid: true
type: examples
resourceType: "service"
provisionerType: "template"
flavor: "static"
excerpt: ''
description: 'Outputs the name of the Workload dependency if it exists in the list of Workloads.'
expectedOutputs: 
  - name
hasMore: false

---

{{% example-file filename="10-service.provisioners.yaml" dir="resource-provisioners/community/service/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
