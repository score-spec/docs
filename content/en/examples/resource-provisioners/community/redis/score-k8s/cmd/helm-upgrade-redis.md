---
title: "helm-upgrade-redis"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "redis"
provisionerType: "cmd"
flavor: "helm-upgrade-redis"
excerpt: 'Prerequisites:
- Have `helm` installed locally, this provisioner renders the manifests from the [Bitnami&#39;s Redis Helm chart](https://bitnami.com/stack/redis/helm).
- Have `yq` installed locally.'
description: 'Deploys the bitnami/redis Helm chart in an existing cluster.'
expectedOutputs: 
  - host
  - port
  - username
  - password
tool: helm
hasMore: true

---

## For `10-redis-helm-template.provisioners.yaml`

Prerequisites:

- Have `helm` installed locally, this provisioner renders the manifests from the [Bitnami's Redis Helm chart](https://bitnami.com/stack/redis/helm).
- Have `yq` installed locally.

## For `10-redis-helm-upgrade.provisioners.yaml`

Prerequisites:

- Have `helm` installed locally, this provisioner installs the [Bitnami's Redis Helm chart](https://bitnami.com/stack/redis/helm).
- Have access to a cluster where the Helm chart will be installed.
  - If you don't have one, you can deploy a `Kind` cluster locally by running this script: `.scripts/setup-kind-cluster.sh`.

{{% resource-provisioner-content description="Deploys the bitnami/redis Helm chart in an existing cluster." type="redis" expectedOutputs="host,port,username,password" %}}

{{% example-file filename="10-redis-helm-upgrade.provisioners.yaml" dir="resource-provisioners/community/redis/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
