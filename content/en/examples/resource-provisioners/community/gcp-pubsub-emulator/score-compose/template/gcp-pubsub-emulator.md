---
title: "gcp-pubsub-emulator"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "gcp-pubsub-emulator"
provisionerType: "template"
flavor: "gcp"
excerpt: ''
description: 'Generates a Google Cloud Pub/Sub Emulator service for local development.'
expectedOutputs: 
  - host
  - port
  - project_id
  - emulator_host
supportedParams: 
  - project_id
hasMore: false

---

{{% resource-provisioner-content description="Generates a Google Cloud Pub/Sub Emulator service for local development." type="gcp-pubsub-emulator" supportedParams="project_id" expectedOutputs="host,port,project_id,emulator_host" %}}

{{% example-file filename="10-gcp-pubsub-emulator.provisioners.yaml" dir="resource-provisioners/community/gcp-pubsub-emulator/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
