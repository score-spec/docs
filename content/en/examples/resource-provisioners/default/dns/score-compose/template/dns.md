---
title: "dns"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-compose"
resourceType: "dns"
provisionerType: "template"
flavor: "dns"
excerpt: 'The default dns provisioner just outputs localhost as the hostname every time. This is because without actual control of a dns resolver we can&#39;t do any accurate routing on any other name. This can be replaced by a new provisioner in the future.'
description: 'Outputs a *.localhost domain as the hostname.'
expectedOutputs: 
  - host
hasMore: true

---

The default dns provisioner just outputs localhost as the hostname every time. This is because without actual control of a dns resolver we can't do any accurate routing on any other name. This can be replaced by a new provisioner in the future.

{{% resource-provisioner-content description="Outputs a *.localhost domain as the hostname." type="dns" expectedOutputs="host" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/dns/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
