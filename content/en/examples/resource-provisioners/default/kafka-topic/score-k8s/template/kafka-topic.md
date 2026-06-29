---
title: "kafka-topic"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-k8s"
resourceType: "kafka-topic"
provisionerType: "template"
flavor: "kafka"
excerpt: ''
description: 'Provisions a dedicated Kafka topic on an in-cluster Kafka broker.'
expectedOutputs: 
  - host
  - port
  - name
  - num_partitions
hasMore: false

---

{{% resource-provisioner-content description="Provisions a dedicated Kafka topic on an in-cluster Kafka broker." type="kafka-topic" expectedOutputs="host,port,name,num_partitions" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/kafka-topic/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
