---
title: "redis"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "dapr-state-store"
provisionerType: "template"
flavor: "redis"
excerpt: ''
description: 'Generates a Dapr StateStore Component pointing to a Redis StatefulSet.'
expectedOutputs: 
  - name
hasMore: false

---

{{% resource-provisioner-content description="Generates a Dapr StateStore Component pointing to a Redis StatefulSet." type="dapr-state-store" expectedOutputs="name" %}}

{{% example-file filename="10-redis-dapr-state-store.provisioners.yaml" dir="resource-provisioners/community/dapr-state-store/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
