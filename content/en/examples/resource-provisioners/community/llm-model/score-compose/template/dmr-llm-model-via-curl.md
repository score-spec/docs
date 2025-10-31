---
title: "dmr-llm-model-via-curl"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "llm-model"
provisionerType: "template"
flavor: "dmr"
excerpt: ''
description: 'Generates a curl service downloading the model with the Docker Model Runner (DMR).'
expectedOutputs: 
  - model
  - url
  - api-key
supportedParams: 
  - model
hasMore: false

---

{{% resource-provisioner-content description="Generates a curl service downloading the model with the Docker Model Runner (DMR)." type="llm-model" supportedParams="model" expectedOutputs="model,url,api-key" %}}

{{% example-file filename="10-dmr-llm-model-via-curl-service.provisioners.yaml" dir="resource-provisioners/community/llm-model/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
