---
title: "Backstage"
description: "How to deploy a containerized Backstage application using a PostgreSQL database with `score-k8s`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-k8s/installation) to install the latest version of `score-k8s`.

## `init`

Initialize your current `score-k8s` workspace, run the following command in your terminal:

```bash
score-k8s init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dns/score-k8s/10-dns-with-url.provisioners.yaml
```

The `init` command will create the `.score-k8s` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-k8s/resources-provisioners/" >}}) available. We are also importing one external file to support the `dns` dependencies: [`dns` provisioner](https://github.com/score-spec/community-provisioners/blob/main/service/score-k8s/10-dns-with-url.provisioners.yaml).

You can see the resource provisioners available by running this command:

```bash
score-k8s provisioners list
```

The Score file example illustrated uses three resource types: `postgres-instance`, `dns` and `route`.

```none
+-------------------+-------+------------------+--------------------------------+---------------------------------+
|     TYPE          | CLASS |      PARAMS      |            OUTPUTS             |          DESCRIPTION            |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| dns               | (any) |                  | host, url                      | Outputs a *.localhost domain as |
|                   |       |                  |                                | the hostname and associated URL |
|                   |       |                  |                                | in http on port 80              |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| postgres-instance | (any) |                  | host, password, port, username | Provisions a dedicated          |
|                   |       |                  |                                | PostgreSQL instance             |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| route             | (any) | host, path, port |                                | Provisions an Ingress route on  |
|                   |       |                  |                                | a shared Nginx instance         |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
```

## `generate`

Convert the `score.yaml` file into a runnable `manifests.yaml`, run the following command in your terminal:

```bash
score-k8s generate score.yaml --image ghcr.io/mathieu-benoit/backstage:latest
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
+----------------------------------------+--------------------------------+
|              UID                       |            OUTPUTS             |
+----------------------------------------+--------------------------------+
| dns.default#backstage.dns              | host, url                      |
+----------------------------------------+--------------------------------+
| postgres-instance.default#backstage.pg | host, password, port, username |
+----------------------------------------+--------------------------------+
| route.default#backstage.route          |                                |
+----------------------------------------+--------------------------------+
```

At this stage, we can already see the value of the `dns` resource generated:

```bash
score-k8s resources get-outputs dns.default#backstage.dns
```

```none
{
  "host": "dnsnocrke.localhost",
  "url": "http://dnsnocrke.localhost:80"
}
```

Same for the `postgres-instance` resource:

```bash
score-k8s resources get-outputs postgres-instance.default#backstage.pg
```

```none
{
  "host": "pg-backstage-d7058793",
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
secret/pg-backstage-d7058793 created
statefulset.apps/pg-backstage-d7058793 created
service/pg-backstage-d7058793 created
httproute.gateway.networking.k8s.io/route-backstage-76d19d47 created
service/backstage created
deployment.apps/backstage created
```

## `kubectl get all`

See the running containers:

```bash
kubectl get all,httproute
```

```none
NAME                             READY   STATUS    RESTARTS   AGE
pod/backstage-7667f68bf9-vnlw9   1/1     Running   0          37s
pod/pg-backstage-d7058793-0      1/1     Running   0          37s

NAME                            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/backstage               ClusterIP   10.96.146.148   <none>        7007/TCP   37s
service/pg-backstage-d7058793   ClusterIP   10.96.21.104    <none>        5432/TCP   37s

NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/backstage   1/1     1            1           37s

NAME                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/backstage-7667f68bf9   1         1         1       37s

NAME                                     READY   AGE
statefulset.apps/pg-backstage-d7058793   1/1     37s

NAME                                                           HOSTNAMES                 AGE
httproute.gateway.networking.k8s.io/route-backstage-76d19d47   ["dnsnocrke.localhost"]   37s
```

## `curl localhost`

Test the running container, run the following command:

```bash
curl localhost -H "Host: dnsnocrke.localhost"
```

```none
...
<title>Scaffolded Backstage App</title>
...
```

Congrats! You’ve successfully deploy, with the `score-k8s` implementation, a sample containerized Backstage workload talking to PostgreSQL and exposed via a DNS. You provisioned them through `kubectl`, without writing the Kubernetes manifests file by yourself.
