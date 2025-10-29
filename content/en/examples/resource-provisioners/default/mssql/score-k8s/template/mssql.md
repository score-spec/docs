---
title: "mssql"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-k8s"
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

{{% resource-provisioner-content description="Provisions a dedicated database on a shared MS SQL server instance." type="mssql" expectedOutputs="server,port,connection,database,username,password" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/mssql/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
