---
title: "Dapr"
description: "How to deploy a containerized NodeJS application using a Dapr StateStore (Redis) with `score-k8s`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-k8s/installation) to install the latest version of `score-k8s`.

## `init`

Initialize your current `score-k8s` workspace, run the following command in your terminal:

```bash
score-k8s init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dapr-state-store/score-k8s/10-redis-dapr-state-store.provisioners.yaml
```

The `init` command will create the `.score-k8s` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-k8s/resources-provisioners/" >}}) available. We are also importing one external file to generate a Dapr StateStore `Component` pointing to a Redis database: [`dapr-state-store` provisioner](https://github.com/score-spec/community-provisioners/blob/main/dapr-state-store/score-k8s/10-redis-dapr-state-store.provisioners.yaml).

You can see the resource provisioners available by running this command:

```bash
score-k8s provisioners list
```

The Score file example illustrated uses three resource types: `dapr-state-store`, `dns` and `route`.

```none
+------------------+-------+------------------+--------------------------------+---------------------------------+
|     TYPE         | CLASS |      PARAMS      |            OUTPUTS             |          DESCRIPTION            |
+------------------+-------+------------------+--------------------------------+---------------------------------+
| dapr-state-store | (any) |                  | name                           | Generates a Dapr StateStore     |
|                  |       |                  |                                | Component pointing to a Redis   |
|                  |       |                  |                                | StatefulSet.                    |
+------------------+-------+------------------+--------------------------------+---------------------------------+
| dns              | (any) |                  | host                           | Outputs a *.localhost domain    |
|                  |       |                  |                                | as the hostname                 |
+------------------+-------+------------------+--------------------------------+---------------------------------+
| route            | (any) | host, path, port |                                | Provisions an Ingress route on  |
|                  |       |                  |                                | a shared Nginx instance         |
+------------------+-------+------------------+--------------------------------+---------------------------------+
```

## `generate`

Convert the `score.yaml` file into a deployable `manifests.yaml`, run the following command in your terminal:

```bash
score-k8s generate score.yaml --image ghcr.io/dapr/samples/hello-k8s-node:latest
```

The `generate` command will add the input `score.yaml` workload with a particular container image to the `.score-k8s/state.yaml` state file and generate the output `manifests.yaml`.

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
+----------------------------------------------+---------+
|                     UID                      | OUTPUTS |
+----------------------------------------------+---------+
| dapr-state-store.default#nodeapp.state-store | name    |
+----------------------------------------------+---------+
| dns.default#nodeapp.dns                      | host    |
+----------------------------------------------+---------+
| route.default#nodeapp.route                  |         |
+----------------------------------------------+---------+
```

At this stage, we can already see the value of the `dns` resource generated:

```bash
score-k8s resources get-outputs dns.default#nodeapp.dns --format '{{ .host }}'
```

```none
dnsutripw.localhost
```

Same for the `dapr-state-store` resource:

```bash
score-k8s resources get-outputs dapr-state-store.default#nodeapp.state-store
```

```none
{
  "name": "redis-nodeapp-58f89990"
}
```

## `kubectl apply`

_Here you will need to have access to a Kubernetes cluster to execute the following commands. You can follow [these instructions](/docs/how-to/score-k8s/kind-cluster/) if you want to set up a Kind cluster. Your Kubernetes cluster should also have [Dapr installed](https://docs.dapr.io/operations/hosting/kubernetes/kubernetes-overview/) in it._

Run `kubectl apply` to execute the generated `manifests.yaml` file:

```bash
kubectl apply -f manifests.yaml
```

```none
secret/redis-nodeapp-58f89990 created
statefulset.apps/redis-nodeapp-58f89990 created
service/redis-nodeapp-58f89990 created
component.dapr.io/redis-nodeapp-58f89990 created
httproute.gateway.networking.k8s.io/route-nodeapp-3f3a9362 created
service/nodeapp created
deployment.apps/nodeapp created
```

## `kubectl get all`

See the running containers:

```bash
kubectl get all
```

```none
NAME                           READY   STATUS    RESTARTS   AGE
pod/nodeapp-859d5458f6-75wjj   1/1     Running   0          3m43s
pod/redis-nodeapp-58f89990-0   1/1     Running   0          3m43s

NAME                             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                               AGE
service/nodeapp                  ClusterIP   10.96.138.145   <none>        3000/TCP                              3m43s
service/nodeapp-dapr             ClusterIP   None            <none>        80/TCP,50001/TCP,50002/TCP,9090/TCP   51s
service/redis-nodeapp-58f89990   ClusterIP   10.96.71.72     <none>        6379/TCP                              3m43s

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nodeapp   1/1     1            1           3m43s

NAME                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/nodeapp-859d5458f6   1         1         1       3m43s

NAME                                      READY   AGE
statefulset.apps/redis-nodeapp-58f89990   1/1     3m43s
```

## `curl localhost`

Test the running container, run the following command:

```bash
curl localhost -H "Host: dnsutripw.localhost"
```

This will get the expected error showing that the container is successfully running:

```none
Cannot GET /
```

You can check the logs of the running container:

```none
Node App listening on port 3000!
```

Congrats! You’ve successfully deploy, with the `score-k8s` implementation, a sample containerized NodeJS workload talking to a Dapr StateStore (Redis) and exposed via a DNS. You provisioned them through `kubectl`, without writing the Kubernetes manifests file by yourself.
