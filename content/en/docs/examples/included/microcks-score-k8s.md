---
title: "Microcks"
description: "How to deploy a containerized frontend application using Microcks to mock a backend service with `score-k8s`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-k8s/installation) to install the latest version of `score-k8s`.

## `init`

Initialize your current `score-k8s` workspace, run the following command in your terminal:

```bash
score-k8s init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/service/score-k8s/10-service-with-microcks-cli.provisioners.yaml
```

The `init` command will create the `.score-k8s` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-k8s/resources-provisioners/" >}}) available. We are also importing the [`service-with-microcks-cli` provisioner](https://github.com/score-spec/community-provisioners/blob/main/service/score-k8s/10-service-with-microcks-cli.provisioners.yaml), which is responsible for importing the OpenAPI spec into the Microcks control plane already running in your Kubernetes cluster.

You can see the resource provisioners available by running this command:

```bash
score-k8s provisioners list
```

The Score file example illustrated uses one resource type: `service`.

```none
+---------+-------+-------------------------------------------+--------+-----------------------------------+
|  TYPE   | CLASS |                  PARAMS                   |OUTPUTS |          DESCRIPTION              |
+---------+-------+-------------------------------------------+--------+-----------------------------------+
| service | (any) | port, artifacts, name, version            | name,  | Imports an OpenAPI spec into a    |
|         |       |                                           | url    | running Microcks instance and     |
|         |       |                                           |        | returns the mock endpoint URL.    |
+---------+-------+-------------------------------------------+--------+-----------------------------------+
```

## `generate`

_You will need to have access to a Kubernetes cluster to execute the following commands. You can follow [these instructions](/docs/how-to/score-k8s/kind-cluster/) if you want to set up a Kind cluster. Your Kubernetes cluster should also have [Microcks installed](https://microcks.io/documentation/guides/installation/kind-helm/) in it._

_This is where the `service` provisioner will be invoked. Under the hood, it uses the [`microcks` CLI](https://microcks.io/documentation/guides/installation/cli/) to import the OpenAPI spec into Microcks (see the [`service-with-microcks-cli` provisioner](https://github.com/score-spec/community-provisioners/blob/main/service/score-k8s/10-service-with-microcks-cli.provisioners.yaml#L29)). You will need the `microcks` CLI installed locally on your machine (outside of the cluster)._

Convert the `score.yaml` file into a deployable `manifests.yaml`, run the following command in your terminal:

```bash
score-k8s generate score.yaml
```

The `generate` command will add the input `score.yaml` workload to the `.score-k8s/state.yaml` state file and generate the output `manifests.yaml`.

See the generated `manifests.yaml` by running this command:

```bash
cat manifests.yaml
```

If you make any modifications to the `score.yaml` file, run `score-k8s generate score.yaml` to regenerate the output `manifests.yaml`.

## `resources`

Get the information of the resources dependencies of the workload, run the following command:

```bash
score-k8s resources list
```

```none
+-----------------------------------+------------+
|               UID                 |  OUTPUTS   |
+-----------------------------------+------------+
| service.default#frontend.backend  | name, url  |
+-----------------------------------+------------+
```

At this stage, we can already see the value of the `service` resource (the Microcks-provided mock URL in cluster):

```bash
score-k8s resources get-outputs 'service.default#frontend.backend' --format '{{ .url }}'
```

```none
http://microcks.microcks.svc.cluster.local:8080/rest/Order+Service+API/0.1.0
```

## `kubectl apply`

Run `kubectl apply` to execute the generated `manifests.yaml` file:

```bash
kubectl apply -f manifests.yaml
```

```none
deployment.apps/frontend created
service/frontend created
```

## `kubectl get all`

See the running pods:

```bash
kubectl get all
```

```none
NAME                            READY   STATUS    RESTARTS   AGE
pod/frontend-7d9f8b6c4d-xk2pv   1/1     Running   0          30s

NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
service/frontend     ClusterIP   10.96.142.101   <none>        80/TCP    30s

NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/frontend   1/1     1            1           30s
```

## `kubectl logs`

Verify that the frontend app is successfully calling the Microcks-mocked backend running inside the cluster:

```bash
kubectl logs deploy/frontend
```

```none
Hello http://microcks.microcks.svc.cluster.local:8080/rest/Order+Service+API/0.1.0/orders!
Hello http://microcks.microcks.svc.cluster.local:8080/rest/Order+Service+API/0.1.0/orders!
```

The frontend successfully resolves `${resources.backend.url}` to the Microcks control plane running in the cluster, using the same `score.yaml` file that was used locally with `score-compose` — no changes required.

Congrats! You've successfully deployed, with the `score-k8s` implementation, a containerized frontend workload whose external backend dependency is seamlessly mocked by Microcks running in Kubernetes. You provisioned the Kubernetes manifests through `kubectl`, without writing them by yourself.
