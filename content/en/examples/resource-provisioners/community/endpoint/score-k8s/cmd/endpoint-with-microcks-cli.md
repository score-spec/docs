---
title: "endpoint-with-microcks-cli"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "endpoint"
provisionerType: "cmd"
flavor: "endpoint-with-microcks-cli"
excerpt: 'Prerequisites:
- Have `yq` installed to load resource&#39;s params.
- Have `microcks` CLI installed to import the API service into Microcks.'
description: 'Outputs an endpoint URL for connecting to an other workload (a Microcks mock is generated if not found).'
expectedOutputs: 
  - url
supportedParams: 
  - port
  - openapi_file
tool: endpoint
hasMore: true

---

Prerequisites:

- Have `yq` installed to load resource's params.
- Have `microcks` CLI installed to import the API service into Microcks.

{{% resource-provisioner-content description="Outputs an endpoint URL for connecting to an other workload (a Microcks mock is generated if not found)." type="endpoint" supportedParams="port,openapi_file" expectedOutputs="url" %}}

{{% example-file filename="10-endpoint-with-microcks-cli.provisioners.yaml" dir="resource-provisioners/community/endpoint/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
