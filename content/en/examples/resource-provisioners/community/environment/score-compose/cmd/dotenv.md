---
title: "dotenv"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-compose"
resourceType: "environment"
provisionerType: "cmd"
flavor: "dotenv"
excerpt: 'Prerequisites:
- Have `python` installed, this provisioner is using Python to load the `.env` file.'
description: 'Loads environment variables from a local .env file.'
tool: dotenv
hasMore: false

---

Prerequisites:

- Have `python` installed, this provisioner is using Python to load the `.env` file.

{{% resource-provisioner-content description="Loads environment variables from a local .env file." type="environment" %}}

{{% example-file filename="10-env.provisioners.yaml" dir="resource-provisioners/community/environment/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
