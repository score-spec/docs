---
title: "postgres"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-k8s"
resourceType: "postgres"
provisionerType: "template"
flavor: "postgres"
excerpt: ''
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

{{% resource-provisioner-content description="Provisions a dedicated database on a shared PostgreSQL instance." type="postgres" expectedOutputs="host,port,name,database,username,password" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/postgres/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
