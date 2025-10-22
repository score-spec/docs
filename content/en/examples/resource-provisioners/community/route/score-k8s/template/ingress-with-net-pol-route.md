---
title: "ingress-with-net-pol-route"
draft: false
mermaid: true
type: examples
resourceType: "route"
provisionerType: "template"
flavor: "ingress"
excerpt: ''
description: 'Provisions an Ingress route on a shared nginx instance, and a NetworkPolicy between them.'
supportedParams: 
  - path
  - host
  - port
hasMore: false

---

{{% example-file filename="10-ingress-with-netpol-route.provisioners.yaml" dir="resource-provisioners/community/route/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
