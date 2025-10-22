---
title: "rabbitmq"
draft: false
mermaid: true
type: examples
resourceType: "amqp"
provisionerType: "template"
flavor: "rabbitmq"
excerpt: ''
description: 'Provisions a dedicated RabbitMQ vhost on a shared instance.'
expectedOutputs: 
  - host
  - port
  - vhost
  - username
  - password
hasMore: false

---

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/rabbitmq/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
