---
title: "volume"
draft: false
mermaid: true
type: examples
resourceType: "volume"
provisionerType: "template"
flavor: "volume"
excerpt: 'As an example we have a &#39;volume&#39; type which returns an emptyDir volume. In production or for real applications you may want to replace this with a provisioner for a tmpfs, host path, or persistent volume and claims.'
description: 'Creates a persistent volume that can be mounted on a workload.'
expectedOutputs: 
  - source
hasMore: true

---

As an example we have a 'volume' type which returns an emptyDir volume. In production or for real applications you may want to replace this with a provisioner for a tmpfs, host path, or persistent volume and claims.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/volume/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
