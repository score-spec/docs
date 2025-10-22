---
title: "dapr-subscription"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "dapr-subscription"
provisionerType: "template"
flavor: "dapr"
excerpt: ''
description: 'Generates a Dapr Subscription on a given Topic and PubSub.'
expectedOutputs: 
  - name
  - topic
supportedParams: 
  - topic
  - pubsub
hasMore: false

---

{{% resource-provisioner-content description="Generates a Dapr Subscription on a given Topic and PubSub." type="dapr-subscription" supportedParams="topic,pubsub" expectedOutputs="name,topic" %}}

{{% example-file filename="10-dapr-subscription.provisioners.yaml" dir="resource-provisioners/community/dapr-subscription/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
