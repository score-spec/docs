---
title: "endpoint-with-microcks"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "endpoint"
provisionerType: "template"
flavor: "endpoint"
excerpt: ''
description: 'Outputs an endpoint URL for connecting to an other workload (a Microcks mock is generated if not found).'
expectedOutputs: 
  - url
supportedParams: 
  - port
  - openapi_file
  - openapi_title
hasMore: false

---

{{% resource-provisioner-content description="Outputs an endpoint URL for connecting to an other workload (a Microcks mock is generated if not found)." type="endpoint" supportedParams="port,openapi_file,openapi_title" expectedOutputs="url" %}}

{{% example-file filename="10-endpoint-with-microcks.provisioners.yaml" dir="resource-provisioners/community/endpoint/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
