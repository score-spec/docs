---
title: "dmr-llm-model-via-service-provider"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "llm-model"
provisionerType: "template"
flavor: "dmr"
excerpt: ''
description: 'Generates the LLM model service via the Docker Model Runner (DMR) provider.'
expectedOutputs: 
  - model
  - url
  - api-key
supportedParams: 
  - model
hasMore: false

---

{{% resource-provisioner-content description="Generates the LLM model service via the Docker Model Runner (DMR) provider." type="llm-model" supportedParams="model" expectedOutputs="model,url,api-key" %}}

{{% example-file filename="10-dmr-llm-model-via-service-provider.provisioners.yaml" dir="resource-provisioners/community/llm-model/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
