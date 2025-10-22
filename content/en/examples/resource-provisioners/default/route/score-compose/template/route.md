---
title: "route"
draft: false
mermaid: true
type: examples
resourceType: "route"
provisionerType: "template"
flavor: "route"
excerpt: 'The default route provisioner sets up an nginx service with an HTTP service that can route on our prefix paths. It assumes the hostnames and routes provided have no overlaps. Weird behavior may happen if there are overlaps.'
description: 'Provisions a ingress route on a shared Nginx instance.'
supportedParams: 
  - host
  - port
  - path
hasMore: false

---

The default route provisioner sets up an nginx service with an HTTP service that can route on our prefix paths. It assumes the hostnames and routes provided have no overlaps. Weird behavior may happen if there are overlaps.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/route/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
