---
title: "mysql"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-compose"
resourceType: "mysql"
provisionerType: "template"
flavor: "mysql"
excerpt: 'The default mysql provisioner adds a mysql instance and then ensures that the required databases are created on startup.'
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

The default mysql provisioner adds a mysql instance and then ensures that the required databases are created on startup.

{{% resource-provisioner-content description="Provisions a dedicated MySQL database on a shared instance." type="mysql" expectedOutputs="host,port,name,database,username,password" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/mysql/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
