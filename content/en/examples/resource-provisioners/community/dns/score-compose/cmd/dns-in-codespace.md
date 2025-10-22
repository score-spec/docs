---
title: "dns-in-codespace"
draft: false
mermaid: true
type: examples
resourceType: "dns"
provisionerType: "cmd"
flavor: "dns"
excerpt: 'Prerequisites for `dns-in-codespace`:
- Have `gh` installed, this provisioner is using the GitHub CLI to get the name of the current GitHub Codespace.'
description: 'Get the forwarded port URL in current GitHub Codespace on port 8080'
expectedOutputs: 
  - host
  - url
tool: dns
hasMore: false

---

Prerequisites for `dns-in-codespace`:

- Have `gh` installed, this provisioner is using the GitHub CLI to get the name of the current GitHub Codespace.

{{% example-file filename="10-dns-in-codespace.provisioners.yaml" dir="resource-provisioners/community/dns/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
