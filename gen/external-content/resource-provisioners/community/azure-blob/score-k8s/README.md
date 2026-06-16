## For `10-azurite-azure-blob.provisioners.yaml`

Runs [Azurite](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite), the Azure Storage emulator, as a `StatefulSet` with a 1Gi volume, and exposes its blob endpoint through a `ClusterIP` Service on port `10000`. It's meant for local development against the Azure Blob SDK without provisioning a real Storage account.

The workload gets these outputs:

- `connection_string` - ready to drop into `AZURE_STORAGE_CONNECTION_STRING` or pass to `BlobServiceClient`.
- `account_name`, `account_key` - Azurite's well-known dev account (`devstoreaccount1`).
- `blob_endpoint` - `http://<service>:10000/devstoreaccount1`.
- `container` - a container name for the workload to use. Override it with the `container` param.

A couple of things worth knowing:

- The account name and key are Azurite's [well-known credentials](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite#well-known-storage-account-and-key). They're the same for every Azurite instance and are published in the docs, so treat them as a local-dev convenience, not as secrets.
- Azurite starts empty. The `container` output is just a name - have your app create it on startup (`create_if_not_exists` / `createIfNotExists` exists in every Azure SDK), or run `az storage container create` against the endpoint once it's up.

Prerequisites:
- None beyond `score-k8s`. This is a template provisioner, so there's no `helm` or `yq` dependency.
- To actually run it, apply the generated manifests to any cluster. If you don't have one, `.scripts/setup-kind-cluster.sh` spins up a local Kind cluster.
