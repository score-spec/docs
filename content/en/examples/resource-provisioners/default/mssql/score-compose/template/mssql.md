---
title: "mssql"
draft: false
mermaid: true
type: examples
resourceType: "mssql"
provisionerType: "template"
flavor: "mssql"
excerpt: ''
description: 'Provisions a dedicated database on a shared MS SQL server instance.'
expectedOutputs: 
  - server
  - port
  - connection
  - database
  - username
  - password
hasMore: false

---

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/mssql/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
