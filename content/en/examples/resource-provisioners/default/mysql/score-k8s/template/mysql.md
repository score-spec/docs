---
title: "mysql"
draft: false
mermaid: true
type: examples
resourceType: "mysql"
provisionerType: "template"
flavor: "mysql"
excerpt: ''
description: 'Provisions a dedicated MySQL database on a shared instance.'
expectedOutputs: 
  - host
  - port
  - name
  - database
  - username
  - password
hasMore: false

---

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/mysql/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
