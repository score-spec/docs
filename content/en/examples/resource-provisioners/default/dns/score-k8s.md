---
title: "Score K8s"
draft: false
mermaid: true
type: examples
excerpt: 'The default dns provisioner just outputs a random localhost domain because we don&#39;t know whether external-dns is available. You should replace this with your own dns name generation that matches your external-dns controller.'
hasMore: true
parent: "Dns"
flavor: "Default"

---

The default dns provisioner just outputs a random localhost domain because we don't know whether external-dns is available. You should replace this with your own dns name generation that matches your external-dns controller.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/dns/score-k8s" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
