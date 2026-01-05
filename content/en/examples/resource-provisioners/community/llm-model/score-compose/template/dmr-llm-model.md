---
title: "dmr-llm-model"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "llm-model"
provisionerType: "template"
flavor: "dmr"
excerpt: ''
description: 'Generates the LLM model via the Docker Model Runner (DMR).'
expectedOutputs: 
  - model
  - url
  - api-key
supportedParams: 
  - model
  - context_size
hasMore: false

---

{{% resource-provisioner-content description="Generates the LLM model via the Docker Model Runner (DMR)." type="llm-model" supportedParams="model,context_size" expectedOutputs="model,url,api-key" %}}

{{% example-file filename="10-dmr-llm-model.provisioners.yaml" dir="resource-provisioners/community/llm-model/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
