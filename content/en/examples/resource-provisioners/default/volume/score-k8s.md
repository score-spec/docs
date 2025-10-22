---
title: "Score K8s"
draft: false
mermaid: true
type: examples
excerpt: 'As an example we have a &#39;volume&#39; type which returns an emptyDir volume. In production or for real applications you may want to replace this with a provisioner for a tmpfs, host path, or persistent volume and claims.'
hasMore: true
parent: "Volume"
flavor: "Default"

---

As an example we have a 'volume' type which returns an emptyDir volume. In production or for real applications you may want to replace this with a provisioner for a tmpfs, host path, or persistent volume and claims.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/volume/score-k8s" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
