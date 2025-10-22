---
title: "ingress-route"
draft: false
mermaid: true
type: examples
resourceType: "route"
provisionerType: "template"
flavor: "ingress"
excerpt: ''
description: 'Provisions an Ingress route on a shared nginx instance.'
supportedParams: 
  - path
  - host
  - port
hasMore: false

---

{{% example-file filename="10-ingress-route.provisioners.yaml" dir="resource-provisioners/community/route/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
