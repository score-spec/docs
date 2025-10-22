---
title: "route-with-shared-gateway"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
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

{{% resource-provisioner-content description="Generates an HTTPRoute attached to a default Gateway in default Namespace." type="route" supportedParams="path,host,port" %}}

{{% example-file filename="10-shared-gateway-httproute.provisioners.yaml" dir="resource-provisioners/community/route/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
