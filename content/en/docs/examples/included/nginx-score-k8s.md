---
title: "Nginx"
description: "How to deploy an unprivileged containerized Nginx application with `score-k8s`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-k8s/installation) to install the latest version of `score-k8s`.

## `init`

Initialize your current `score-k8s` workspace, run the following command in your terminal:

```bash
score-k8s init --no-sample \
    --patch-templates https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-k8s/unprivileged.tpl
```

The `init` command will create the `.score-k8s` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-k8s/resources-provisioners/" >}}) available.

You can see the resource provisioners available by running this command:

```bash
score-k8s provisioners list
```

The Score file example illustrated uses three resource types: `dns`, `route` and `volume`.

```none
+---------------+-------+------------------+--------------------------------+---------------------------------+
|     TYPE      | CLASS |      PARAMS      |            OUTPUTS             |          DESCRIPTION            |
+---------------+-------+------------------+--------------------------------+---------------------------------+
| dns           | (any) |                  | host                           | Outputs a *.localhost domain    |
|               |       |                  |                                | as the hostname                 |
+---------------+-------+------------------+--------------------------------+---------------------------------+
| route         | (any) | host, path, port |                                | Provisions an Ingress route on  |
|               |       |                  |                                | a shared Nginx instance         |
+---------------+-------+------------------+--------------------------------+---------------------------------+
| volume        | (any) |                  | source                         | Creates a persistent volume     |
|               |       |                  |                                | that can be mounted on a        |
|               |       |                  |                                | workload                        |
+---------------+-------+------------------+--------------------------------+---------------------------------+
```

By using the [`--patch-templates`](/docs/score-implementation/score-compose/patch-templates/) (in this case: [`unprivileged.tpl`](https://github.com/score-spec/community-patchers/blob/main/score-compose/unprivileged.tpl)) we are also making sure that the generated workload will run as unprivileged.

## `generate`

Convert the `score.yaml` file into a runnable `manifests.yaml`, run the following command in your terminal:

```bash
score-k8s generate score.yaml --image nginxinc/nginx-unprivileged:alpine-slim
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
+---------------------------+---------+
|            UID            | OUTPUTS |
+---------------------------+---------+
| dns.default#nginx.dns     | host    |
+---------------------------+---------+
| volume.default#nginx.tmp  | source  |
+---------------------------+---------+
| route.default#nginx.route |         |
+---------------------------+---------+
```

At this stage, we can already see the value of the `dns` resource generated:

```bash
score-k8s resources get-outputs dns.default#nginx.dns --format '{{ .host }}'
```

```none
dnsev272w.localhost
```

## `kubectl apply`

_Here you will need to have access to a Kubernetes cluster to execute the following commands. You can follow [these instructions](/docs/how-to/score-k8s/kind-cluster/) if you want to set up a Kind cluster._

Run `kubectl apply` to execute the generated `manifests.yaml` file:

```bash
kubectl apply -f manifests.yaml
```

```none
httproute.gateway.networking.k8s.io/route-nginx-0148edc5 created
service/nginx created
deployment.apps/nginx created
```

## `kubectl get all`

See the running containers:

```bash
kubectl get all
```

```none
NAME                         READY   STATUS    RESTARTS   AGE
pod/nginx-6947586bd6-82lvj   1/1     Running   0          16s

NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
service/nginx        ClusterIP   10.96.38.94   <none>        8080/TCP   17s

NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx   1/1     1            1           17s

NAME                               DESIRED   CURRENT   READY   AGE
replicaset.apps/nginx-6947586bd6   1         1         1       17s
```

## `curl localhost`

Test the running container, run the following command:

```bash
curl localhost -H "Host: dnsev272w.localhost"
```

```none
Welcome to nginx!
```

Congrats! You’ve successfully deploy, with the `score-k8s` implementation, a simple containerized Nginx workload exposed via a DNS. You provisioned them through `kubectl`, without writing the Kubernetes manifests file by yourself.
