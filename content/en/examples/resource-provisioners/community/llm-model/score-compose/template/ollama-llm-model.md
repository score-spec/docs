---
title: "ollama-llm-model"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "llm-model"
provisionerType: "template"
flavor: "ollama"
excerpt: ''
description: 'Generates an Ollama service to pull a model from an existing local Ollama service.'
expectedOutputs: 
  - model
  - url
  - api-key
supportedParams: 
  - model
hasMore: false

---

{{% resource-provisioner-content description="Generates an Ollama service to pull a model from an existing local Ollama service." type="llm-model" supportedParams="model" expectedOutputs="model,url,api-key" %}}

{{% example-file filename="10-ollama-llm-model-service.provisioners.yaml" dir="resource-provisioners/community/llm-model/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
