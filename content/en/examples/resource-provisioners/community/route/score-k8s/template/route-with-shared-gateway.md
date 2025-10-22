---
title: "route-with-shared-gateway"
draft: false
mermaid: true
type: examples
resourceType: "route"
provisionerType: "template"
flavor: "route"
excerpt: ''
description: 'Generates an HTTPRoute attached to a default Gateway in default Namespace.'
supportedParams: 
  - path
  - host
  - port
hasMore: false

---

{{% example-file filename="10-shared-gateway-httproute.provisioners.yaml" dir="resource-provisioners/community/route/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
