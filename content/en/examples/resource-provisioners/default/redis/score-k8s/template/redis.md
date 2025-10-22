---
title: "redis"
draft: false
mermaid: true
type: examples
resourceType: "redis"
provisionerType: "template"
flavor: "redis"
excerpt: ''
description: 'Provisions a dedicated Redis instance.'
expectedOutputs: 
  - host
  - port
  - username
  - password
hasMore: false

---

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/redis/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
