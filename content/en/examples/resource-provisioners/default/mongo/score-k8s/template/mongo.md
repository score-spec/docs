---
title: "mongo"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-k8s"
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

{{% resource-provisioner-content description="Provisions a dedicated MongoDB database." type="mongodb" expectedOutputs="host,port,username,password,connection" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/mongo/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
