---
title: "rabbitmq"
draft: false
mermaid: true
type: examples
resourceType: "amqp"
provisionerType: "template"
flavor: "rabbitmq"
excerpt: 'The default AMQP provisioner provides a simple rabbitmq instance with default configuration and plugins.'
description: 'Provisions a dedicated RabbitMQ vhost on a shared instance.'
expectedOutputs: 
  - host
  - port
  - vhost
  - username
  - password
hasMore: false

---

The default AMQP provisioner provides a simple rabbitmq instance with default configuration and plugins.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/rabbitmq/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
