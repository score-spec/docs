---
title: "redis-dapr-state-store"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "dapr-state-store"
provisionerType: "template"
flavor: "redis"
excerpt: ''
description: 'Generates a Dapr StateStore Component pointing to a Redis Service.'
expectedOutputs: 
  - name
hasMore: false

---

{{% resource-provisioner-content description="Generates a Dapr StateStore Component pointing to a Redis Service." type="dapr-state-store" expectedOutputs="name" %}}

{{% example-file filename="10-redis-dapr-state-store.provisioners.yaml" dir="resource-provisioners/community/dapr-state-store/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
