---
title: "postgres"
draft: false
mermaid: true
type: examples
resourceType: "postgres"
provisionerType: "template"
flavor: "postgres"
excerpt: 'The default postgres provisioner adds a postgres instance and then ensures that the required databases are created on startup.'
description: 'Provisions a dedicated database on a shared PostgreSQL instance.'
expectedOutputs: 
  - host
  - port
  - name
  - database
  - username
  - password
hasMore: false

---

The default postgres provisioner adds a postgres instance and then ensures that the required databases are created on startup.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/postgres/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
