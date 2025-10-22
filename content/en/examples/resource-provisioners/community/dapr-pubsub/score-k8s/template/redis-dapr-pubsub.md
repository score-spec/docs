---
title: "redis-dapr-pubsub"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "dapr-pubsub"
provisionerType: "template"
flavor: "redis"
excerpt: ''
description: 'Generates a Dapr PubSub Component pointing to a Redis StatefulSet.'
expectedOutputs: 
  - name
hasMore: false

---

{{% resource-provisioner-content description="Generates a Dapr PubSub Component pointing to a Redis StatefulSet." type="dapr-pubsub" expectedOutputs="name" %}}

{{% example-file filename="10-redis-dapr-pubsub.provisioners.yaml" dir="resource-provisioners/community/dapr-pubsub/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
