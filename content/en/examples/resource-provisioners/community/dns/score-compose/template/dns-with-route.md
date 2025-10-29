---
title: "dns-with-route"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "dns"
provisionerType: "template"
flavor: "dns"
excerpt: 'Prerequisites for `dns-in-codespace`:
- Have `gh` installed, this provisioner is using the GitHub CLI to get the name of the current GitHub Codespace.'
description: 'Outputs a *.localhost domain as the hostname and associated URL in http on port 8080'
expectedOutputs: 
  - host
  - url
hasMore: false

---

Prerequisites for `dns-in-codespace`:

- Have `gh` installed, this provisioner is using the GitHub CLI to get the name of the current GitHub Codespace.

{{% resource-provisioner-content description="Outputs a *.localhost domain as the hostname and associated URL in http on port 8080" type="dns" expectedOutputs="host,url" %}}

{{% example-file filename="10-dns-with-url.provisioners.yaml" dir="resource-provisioners/community/dns/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
