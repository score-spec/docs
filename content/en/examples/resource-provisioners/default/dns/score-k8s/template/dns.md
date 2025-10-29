---
title: "dns"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-k8s"
resourceType: "dns"
provisionerType: "template"
flavor: "dns"
excerpt: 'The default dns provisioner just outputs a random localhost domain because we don&#39;t know whether external-dns is available. You should replace this with your own dns name generation that matches your external-dns controller.'
description: 'Outputs a *.localhost domain as the hostname.'
expectedOutputs: 
  - host
hasMore: true

---

The default dns provisioner just outputs a random localhost domain because we don't know whether external-dns is available. You should replace this with your own dns name generation that matches your external-dns controller.

{{% resource-provisioner-content description="Outputs a *.localhost domain as the hostname." type="dns" expectedOutputs="host" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/dns/score-k8s" githubUrl="https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml" %}}
