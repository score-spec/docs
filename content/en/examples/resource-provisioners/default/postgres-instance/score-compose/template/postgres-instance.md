---
title: "postgres-instance"
draft: false
mermaid: true
type: examples
resourceType: "postgres-instance"
provisionerType: "template"
flavor: "postgres"
excerpt: ''
description: 'Provisions a dedicated PostgreSQL instance.'
expectedOutputs: 
  - host
  - port
  - username
  - password
hasMore: false

---

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/postgres-instance/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
