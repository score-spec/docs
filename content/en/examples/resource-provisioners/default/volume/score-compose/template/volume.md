---
title: "volume"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-compose"
resourceType: "volume"
provisionerType: "template"
flavor: "volume"
excerpt: 'The default volume provisioner provided by score-compose allows basic volume resources to be created in the resources system. The volume resource just creates an ephemeral Docker volume with a random string as the name, and source attribute that we can reference.'
description: 'Creates a persistent volume that can be mounted on a workload.'
expectedOutputs: 
  - source
  - type
hasMore: false

---

The default volume provisioner provided by score-compose allows basic volume resources to be created in the resources system. The volume resource just creates an ephemeral Docker volume with a random string as the name, and source attribute that we can reference.

{{% resource-provisioner-content description="Creates a persistent volume that can be mounted on a workload." type="volume" expectedOutputs="source,type" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/volume/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
