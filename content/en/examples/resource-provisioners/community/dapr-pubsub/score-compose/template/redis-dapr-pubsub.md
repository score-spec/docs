---
title: "redis-dapr-pubsub"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "dapr-pubsub"
provisionerType: "template"
flavor: "redis"
excerpt: ''
description: 'Generates a Dapr PubSub Component pointing to a Redis Service.'
expectedOutputs: 
  - name
hasMore: false

---

{{% resource-provisioner-content description="Generates a Dapr PubSub Component pointing to a Redis Service." type="dapr-pubsub" expectedOutputs="name" %}}

{{% example-file filename="10-redis-dapr-pubsub.provisioners.yaml" dir="resource-provisioners/community/dapr-pubsub/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
