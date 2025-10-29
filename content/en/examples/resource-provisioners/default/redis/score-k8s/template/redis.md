---
title: "redis"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-k8s"
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

{{% resource-provisioner-content description="Provisions a dedicated Redis instance." type="redis" expectedOutputs="host,port,username,password" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/redis/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
