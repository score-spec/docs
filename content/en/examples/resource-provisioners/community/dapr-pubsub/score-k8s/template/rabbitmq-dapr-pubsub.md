---
title: "rabbitmq-dapr-pubsub"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "dapr-pubsub"
provisionerType: "template"
flavor: "rabbitmq"
excerpt: ''
description: 'Generates a Dapr PubSub Component pointing to a RabbitMQ StatefulSet.'
expectedOutputs: 
  - name
hasMore: false

---

{{% resource-provisioner-content description="Generates a Dapr PubSub Component pointing to a RabbitMQ StatefulSet." type="dapr-pubsub" expectedOutputs="name" %}}

{{% example-file filename="10-rabbitmq-dapr-pubsub.provisioners.yaml" dir="resource-provisioners/community/dapr-pubsub/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
