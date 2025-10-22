---
title: "mongodb"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-compose"
resourceType: "mongodb"
provisionerType: "template"
flavor: "mongodb"
excerpt: 'The default mongodb provisioner adds a mongodb service to the project which returns a host, port, username, and password, and connection string.'
description: 'Provisions a dedicated MongoDB database.'
expectedOutputs: 
  - host
  - port
  - username
  - password
  - connection
hasMore: false

---

The default mongodb provisioner adds a mongodb service to the project which returns a host, port, username, and password, and connection string.

{{% resource-provisioner-content description="Provisions a dedicated MongoDB database." type="mongodb" expectedOutputs="host,port,username,password,connection" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/mongodb/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
