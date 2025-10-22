---
title: "rabbitmq-dapr-pubsub"
draft: false
mermaid: true
type: examples
resourceType: "dapr-pubsub"
provisionerType: "template"
flavor: "rabbitmq"
excerpt: ''
description: 'Generates a Dapr PubSub Component pointing to a RabbitMQ StatefulSet.'
expectedOutputs: 
  - name
hasMore: false

---

{{% example-file filename="10-rabbitmq-dapr-pubsub.provisioners.yaml" dir="resource-provisioners/community/dapr-pubsub/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
