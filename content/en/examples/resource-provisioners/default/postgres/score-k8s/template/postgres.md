---
title: "postgres"
draft: false
mermaid: true
type: examples
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

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/postgres/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
