---
title: "mongo"
draft: false
mermaid: true
type: examples
resourceType: "mongodb"
provisionerType: "template"
flavor: "mongo"
excerpt: ''
description: 'Provisions a dedicated MongoDB database.'
expectedOutputs: 
  - host
  - port
  - username
  - password
  - connection
hasMore: false

---

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/mongo/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
