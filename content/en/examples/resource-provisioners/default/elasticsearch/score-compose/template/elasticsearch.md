---
title: "elasticsearch"
draft: false
mermaid: true
type: examples
resourceType: "elasticsearch"
provisionerType: "template"
flavor: "elasticsearch"
excerpt: 'The default elasticsearch provisioner adds a elasticsearch instance.'
description: 'Provisions a dedicated Elastic Search instance.'
expectedOutputs: 
  - host
  - port
  - username
  - password
hasMore: false

---

The default elasticsearch provisioner adds a elasticsearch instance.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/elasticsearch/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
