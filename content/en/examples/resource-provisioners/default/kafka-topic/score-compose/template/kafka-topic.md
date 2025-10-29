---
title: "kafka-topic"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-compose"
resourceType: "kafka-topic"
provisionerType: "template"
flavor: "kafka"
excerpt: ''
description: 'Provisions a dedicated Kafka topic on a shared Kafka broker.'
expectedOutputs: 
  - host
  - port
  - name
  - num_partitions
hasMore: false

---

{{% resource-provisioner-content description="Provisions a dedicated Kafka topic on a shared Kafka broker." type="kafka-topic" expectedOutputs="host,port,name,num_partitions" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/kafka-topic/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
