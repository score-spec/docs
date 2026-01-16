---
title: "dmr-llm-model-for-openai-clients"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "llm-model"
provisionerType: "template"
flavor: "dmr"
excerpt: ''
description: 'Generates the LLM model via the Docker Model Runner (DMR). Outputs the url for OpenAI SDK/clients.'
expectedOutputs: 
  - model
  - url
  - api-key
supportedParams: 
  - model
  - context_size
hasMore: false

---

{{% resource-provisioner-content description="Generates the LLM model via the Docker Model Runner (DMR). Outputs the url for OpenAI SDK/clients." type="llm-model" supportedParams="model,context_size" expectedOutputs="model,url,api-key" %}}

{{% example-file filename="10-dmr-llm-model-for-openai-clients.provisioners.yaml" dir="resource-provisioners/community/llm-model/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
