---
title: "Score Compose"
draft: false
mermaid: true
type: examples
excerpt: 'The default dns provisioner just outputs localhost as the hostname every time. This is because without actual control of a dns resolver we can&#39;t do any accurate routing on any other name. This can be replaced by a new provisioner in the future.'
hasMore: true
parent: "Dns"
flavor: "Default"

---

The default dns provisioner just outputs localhost as the hostname every time. This is because without actual control of a dns resolver we can't do any accurate routing on any other name. This can be replaced by a new provisioner in the future.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/dns/score-compose" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
