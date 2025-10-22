---
title: "route"
draft: false
mermaid: true
type: examples
resourceType: "route"
provisionerType: "template"
flavor: "route"
excerpt: 'Routes could be implemented as either traditional ingress resources or using the newer gateway API. In this default provisioner we use the gateway API with some sensible defaults. But you may wish to replace this.'
description: 'Provisions an HTTPRoute on a shared Nginx instance.'
supportedParams: 
  - host
  - port
  - path
hasMore: false

---

Routes could be implemented as either traditional ingress resources or using the newer gateway API. In this default provisioner we use the gateway API with some sensible defaults. But you may wish to replace this.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/route/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
