---
title: "postgres-instance"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-k8s"
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

{{% resource-provisioner-content description="Provisions a dedicated PostgreSQL instance." type="postgres-instance" expectedOutputs="host,port,username,password" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/postgres-instance/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
