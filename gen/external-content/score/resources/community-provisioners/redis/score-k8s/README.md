## For `10-redis-helm-template.provisioners.yaml`

Prerequisites:
- Have `helm` installed locally, this provisioner renders the manifests from the [Bitnami's Redis Helm chart](https://bitnami.com/stack/redis/helm).
- Have `yq` installed locally.

## For `10-redis-helm-upgrade.provisioners.yaml`

Prerequisites:
- Have `helm` installed locally, this provisioner installs the [Bitnami's Redis Helm chart](https://bitnami.com/stack/redis/helm).
- Have access to a cluster where the Helm chart will be installed.
    - If you don't have one, you can deploy a `Kind` cluster locally by running this script: `.scripts/setup-kind-cluster.sh`.