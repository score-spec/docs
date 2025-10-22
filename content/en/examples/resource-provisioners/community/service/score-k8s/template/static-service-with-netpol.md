---
title: "static-service-with-netpol"
draft: false
mermaid: true
type: examples
resourceType: "service"
provisionerType: "template"
flavor: "static"
excerpt: ''
description: 'Outputs the name of the Workload dependency if it exists in the list of Workloads, and generate NetworkPolicies between them.'
expectedOutputs: 
  - name
hasMore: false

---

{{% example-file filename="10-service-with-netpol.provisioners.yaml" dir="resource-provisioners/community/service/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
