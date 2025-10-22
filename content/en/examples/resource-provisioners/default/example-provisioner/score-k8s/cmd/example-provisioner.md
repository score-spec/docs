---
title: "example-provisioner"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-k8s"
resourceType: "example-provisioner-resource"
provisionerType: "cmd"
flavor: "example"
excerpt: 'The &#39;cmd&#39; scheme has a "host" + path component that indicates the path to the binary to execute. If the host starts with "." it is interpreted as a relative path, if it starts with "~" it resolves to the home directory.'
description: 'Example provisioner that runs a bash script.'
expectedOutputs: 
  - key
  - secret
tool: example
hasMore: true

---

The 'cmd' scheme has a "host" + path component that indicates the path to the binary to execute. If the host starts with "." it is interpreted as a relative path, if it starts with "~" it resolves to the home directory.

{{% resource-provisioner-content description="Example provisioner that runs a bash script." type="example-provisioner-resource" expectedOutputs="key,secret" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/example-provisioner/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
