---
title: "redis"
draft: false
mermaid: true
type: examples
resourceType: "redis"
provisionerType: "template"
flavor: "redis"
excerpt: 'The default redis provisioner adds a redis service to the project which returns a host, port, username, and password.'
description: 'Provisions a dedicated Redis instance.'
expectedOutputs: 
  - host
  - port
  - username
  - password
hasMore: false

---

The default redis provisioner adds a redis service to the project which returns a host, port, username, and password.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/redis/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
