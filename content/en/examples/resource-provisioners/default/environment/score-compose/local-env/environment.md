---
title: "environment"
draft: false
mermaid: true
type: examples
source: "default"
implementation: "score-compose"
resourceType: "environment"
provisionerType: "local-env"
flavor: "environment"
excerpt: 'The default environment provisioner resolves environment resource references by looking up OS environment variables at generate time. The accessed variables are tracked and can be written to a skeleton .env file.'
description: 'Pulls values out of the local environment as outputs to an environment resource'
hasMore: false

---

The default environment provisioner resolves environment resource references by looking up OS environment variables at generate time. The accessed variables are tracked and can be written to a skeleton .env file.

{{% resource-provisioner-content description="Pulls values out of the local environment as outputs to an environment resource" type="environment" %}}

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/environment/score-compose" githubUrl="https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml" %}}
