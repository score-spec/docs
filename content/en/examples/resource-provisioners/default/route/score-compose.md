---
title: "Score Compose"
draft: false
mermaid: true
type: examples
excerpt: 'The default route provisioner sets up an nginx service with an HTTP service that can route on our prefix paths. It assumes the hostnames and routes provided have no overlaps. Weird behavior may happen if there are overlaps.'
hasMore: false
parent: "Route"
flavor: "Default"

---

The default route provisioner sets up an nginx service with an HTTP service that can route on our prefix paths. It assumes the hostnames and routes provided have no overlaps. Weird behavior may happen if there are overlaps.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/route/score-compose" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
