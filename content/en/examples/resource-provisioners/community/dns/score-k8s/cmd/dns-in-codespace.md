---
title: "dns-in-codespace"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "dns"
provisionerType: "cmd"
flavor: "dns-in-codespace"
excerpt: 'Prerequisites for `dns-in-codespace`:
- Have `gh` installed, this provisioner is using the GitHub CLI to get the name of the current GitHub Codespace.'
description: 'Get the forwarded port URL in current GitHub Codespace on port 80'
expectedOutputs: 
  - host
  - url
tool: dns
hasMore: false

---

Prerequisites for `dns-in-codespace`:

- Have `gh` installed, this provisioner is using the GitHub CLI to get the name of the current GitHub Codespace.

{{% resource-provisioner-content description="Get the forwarded port URL in current GitHub Codespace on port 80" type="dns" expectedOutputs="host,url" %}}

{{% example-file filename="10-dns-in-codespace.provisioners.yaml" dir="resource-provisioners/community/dns/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
