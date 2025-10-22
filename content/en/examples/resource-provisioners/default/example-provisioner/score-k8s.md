---
title: "Score K8s"
draft: false
mermaid: true
type: examples
excerpt: 'The &#39;cmd&#39; scheme has a "host" + path component that indicates the path to the binary to execute. If the host starts with "." it is interpreted as a relative path, if it starts with "~" it resolves to the home directory.'
hasMore: true
parent: "Example Provisioner"
flavor: "Default"

---

The 'cmd' scheme has a "host" + path component that indicates the path to the binary to execute. If the host starts with "." it is interpreted as a relative path, if it starts with "~" it resolves to the home directory.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/example-provisioner/score-k8s" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
