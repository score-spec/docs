---
title: "Score Compose"
draft: false
mermaid: true
type: examples
excerpt: 'The default volume provisioner provided by score-compose allows basic volume resources to be created in the resources system. The volume resource just creates an ephemeral Docker volume with a random string as the name, and source attribute that we can reference.'
hasMore: false
parent: "Volume"
flavor: "Default"

---

The default volume provisioner provided by score-compose allows basic volume resources to be created in the resources system. The volume resource just creates an ephemeral Docker volume with a random string as the name, and source attribute that we can reference.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/volume/score-compose" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
