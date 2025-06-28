---
title: "NodeJS and PostgreSQL"
description: "How to deploy a containerized NodeJS application using a PostgreSQL database with `score-k8s`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-k8s/installation) to install the latest version of `score-k8s`.

## `init`

Initialize your current `score-k8s` workspace, run the following command in your terminal:

```bash
score-k8s init --no-sample
```

The `init` command will create the `.score-k8s` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-k8s/resources-provisioners/" >}}) available.

You can see the resource provisioners available by running this command:

```bash
score-k8s provisioners list
```

The Score file example illustrated uses three resource types: `postgres`, `dns` and `route`.

```none
+---------------+-------+------------------+--------------------------------+---------------------------------+
|     TYPE      | CLASS |      PARAMS      |            OUTPUTS             |          DESCRIPTION            |
+---------------+-------+------------------+--------------------------------+---------------------------------+
| dns           | (any) |                  | host                           | Outputs a *.localhost domain    |
|               |       |                  |                                | as the hostname                 |
+---------------+-------+------------------+--------------------------------+---------------------------------+
| postgres      | (any) |                  | database, host, name,          | Provisions a dedicated          |
|               |       |                  | password, port, username       | database on a shared PostgreSQL |
|               |       |                  |                                | instance                        |
+---------------+-------+------------------+--------------------------------+---------------------------------+
| route         | (any) | host, path, port |                                | Provisions an Ingress route on  |
|               |       |                  |                                | a shared Nginx instance         |
+---------------+-------+------------------+--------------------------------+---------------------------------+
```

## `generate`

Convert the `score.yaml` file into a deployable `manifests.yaml`, run the following command in your terminal:

```bash
score-k8s generate score.yaml --image ghcr.io/score-spec/sample-score-app:latest
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
+---------------------------------+--------------------------------+
|               UID               |            OUTPUTS             |
+---------------------------------+--------------------------------+
| dns.default#hello-world.dns     | host                           |
+---------------------------------+--------------------------------+
| postgres.default#hello-world.db | database, host, name,          |
|                                 | password, port, username       |
+---------------------------------+--------------------------------+
| route.default#hello-world.route |                                |
+---------------------------------+--------------------------------+
```

At this stage, we can already see the value of the `dns` resource generated:

```bash
score-k8s resources get-outputs dns.default#hello-world.dns --format '{{ .host }}'
```

```none
dnsgm0shc.localhost
```

Same for the `postgres` resource:

```bash
score-k8s resources get-outputs postgres.default#hello-world.db
```

```none
{
  "database": "db-QnPWyXNB",
  "host": "pg-Tut8g7",
  "name": "db-QnPWyXNB",
  "password": "REDACTED",
  "port": 5432,
  "username": "REDACTED"
}
```

## `kubectl apply`

_Here you will need to have access to a Kubernetes cluster to execute the following commands. You can follow [these instructions](/docs/how-to/score-k8s/kind-cluster/) if you want to set up a Kind cluster._

Run `kubectl apply` to execute the generated `manifests.yaml` file:

```bash
kubectl apply -f manifests.yaml
```

```none
secret/pg-hello-world-87af7a15 created
statefulset.apps/pg-hello-world-87af7a15 created
service/pg-hello-world-87af7a15 created
httproute.gateway.networking.k8s.io/route-hello-world-4b82945e created
service/hello-world created
deployment.apps/hello-world created
```

## `kubectl get all`

See the running containers:

```bash
kubectl get all
```

```none
NAME                               READY   STATUS    RESTARTS      AGE
pod/hello-world-68cd6f7968-26fh8   1/1     Running   2 (31s ago)   37s
pod/pg-hello-world-87af7a15-0      1/1     Running   0             37s

NAME                              TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/hello-world               ClusterIP   10.96.250.192   <none>        8080/TCP   37s
service/pg-hello-world-87af7a15   ClusterIP   10.96.231.3     <none>        5432/TCP   37s

NAME                          READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/hello-world   1/1     1            1           37s

NAME                                     DESIRED   CURRENT   READY   AGE
replicaset.apps/hello-world-68cd6f7968   1         1         1       37s

NAME                                       READY   AGE
statefulset.apps/pg-hello-world-87af7a15   1/1     37s
```

## `curl localhost`

Test the running container, run the following command:

```bash
curl localhost -H "Host: dnsgm0shc.localhost"
```

```none
Hello, World!
This is an application talking to a PostgreSQL 17.5 database on host pg-Tut8g7, deployed with Score!
PostgreSQL 17.5 on x86_64-pc-linux-musl, compiled by gcc (Alpine 14.2.0) 14.2.0, 64-bit
```

Congrats! You’ve successfully deploy, with the `score-k8s` implementation, a sample containerized NodeJS workload talking to PostgreSQL and exposed via a DNS. You provisioned them through `kubectl`, without writing the Kubernetes manifests file by yourself.
