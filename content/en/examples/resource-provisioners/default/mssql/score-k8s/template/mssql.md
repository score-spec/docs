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

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/mssql/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
