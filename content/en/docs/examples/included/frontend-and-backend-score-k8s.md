---
title: "Frontend & Backend"
description: "How to deploy a containerized Frontend application talking to a containerized Backend application exposed via a DNS with `score-k8s`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-k8s/installation) to install the latest version of `score-k8s`.

## `init`

Initialize your current `score-k8s` workspace, run the following command in your terminal:

```bash
score-k8s init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/service/score-k8s/10-service.provisioners.yaml \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dns/score-k8s/10-dns-with-url.provisioners.yaml
```

The `init` command will create the `.score-k8s` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-k8s/resources-provisioners/" >}}) available. We are also importing two external files to support the `dns` dependencies: [`dns` provisioner](https://github.com/score-spec/community-provisioners/blob/main/dns/score-k8s/10-dns-with-url.provisioners.yaml) and `service` dependencies: [`service` provisioner](https://github.com/score-spec/community-provisioners/blob/main/service/score-k8s/10-service.provisioners.yaml).

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
| service           | (any) |                  | name                           | Outputs the name of the         |
|                   |       |                  |                                | Workload dependency if it       |
|                   |       |                  |                                | exists in the list of Workloads |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
```

## `generate`

Convert the `score-frontend.yaml` and `score-backend.yaml` files into a deployable `manifests.yaml`, run the following command in your terminal:

```bash
score-k8s generate score-backend.yaml \
    --image ghcr.io/mathieu-benoit/backstage-backend:latest

score-k8s generate score-frontend.yaml \
    --image ghcr.io/mathieu-benoit/backstage-frontend:latest
```

The `generate` command will add the input `score-frontend.yaml` and `score-backend.yaml` workloads with a particular container image to the `.score-k8s/state.yaml` state file and generate the output `manifests.yaml`.

See the generated `manifests.yaml` by running this command:

```bash
cat manifests.yaml
```

If you make any modifications to the `score-frontend.yaml` or `score-backend.yaml` files, run `score-k8s generate score.yaml` to regenerate the output `manifests.yaml`.

## `resources`

Get the information of the resources dependencies of the workload, run the following command:

```bash
score-k8s resources list
```

```none
+--------------------------------------+--------------------------------+
|                 UID                  |            OUTPUTS             |
+--------------------------------------+--------------------------------+
| dns.default#dns                      | host, url                      |
+--------------------------------------+--------------------------------+
| postgres-instance.default#backend.pg | host, password, port, username |
+--------------------------------------+--------------------------------+
| service.default#frontend.backend     | name                           |
+--------------------------------------+--------------------------------+
| route.default#backend.route          |                                |
+--------------------------------------+--------------------------------+
| route.default#frontend.route         |                                |
+--------------------------------------+--------------------------------+
```

At this stage, we can already see the value of the `dns` resource generated:

```bash
score-k8s resources get-outputs dns.default#dns
```

```none
{
  "host": "dnsnocrke.localhost",
  "url": "http://dnsnocrke.localhost:80"
}
```

Same for the `postgres-instance` resource:

```bash
score-k8s resources get-outputs postgres-instance.default#backend.pg
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
secret/pg-backend-61f0e7c1 created
statefulset.apps/pg-backend-61f0e7c1 created
service/pg-backend-61f0e7c1 created
httproute.gateway.networking.k8s.io/route-backend-711726ce created
httproute.gateway.networking.k8s.io/route-frontend-61f9e1b8 created
service/backend created
deployment.apps/backend created
service/frontend created
deployment.apps/frontend created
```

## `kubectl get all`

See the running containers:

```bash
kubectl get all,httproute
```

```none
NAME                           READY   STATUS    RESTARTS   AGE
pod/backend-57fc5664d-4hg7l    1/1     Running   0          22s
pod/frontend-db644cf86-n9cjd   1/1     Running   0          22s
pod/pg-backend-61f0e7c1-0      1/1     Running   0          60m

NAME                          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
service/backend               ClusterIP   10.96.183.51   <none>        7007/TCP   60m
service/frontend              ClusterIP   10.96.90.135   <none>        3000/TCP   60m
service/pg-backend-61f0e7c1   ClusterIP   10.96.45.108   <none>        5432/TCP   60m

NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/backend    1/1     1            1           60m
deployment.apps/frontend   1/1     1            1           60m

NAME                                  DESIRED   CURRENT   READY   AGE
replicaset.apps/backend-57fc5664d     1         1         1       22s
replicaset.apps/backend-64fc859b9d    0         0         0       60m
replicaset.apps/frontend-68ccb68884   0         0         0       60m
replicaset.apps/frontend-db644cf86    1         1         1       22s

NAME                                   READY   AGE
statefulset.apps/pg-backend-61f0e7c1   1/1     60m

NAME                                                          HOSTNAMES                 AGE
httproute.gateway.networking.k8s.io/route-backend-711726ce    ["dnsxmfazk.localhost"]   60m
httproute.gateway.networking.k8s.io/route-frontend-61f9e1b8   ["dnsxmfazk.localhost"]   60m
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

Congrats! You’ve successfully deploy, with the `score-k8s` implementation, a containerized Frontend application talking to a containerized Backend application exposed via a DNS. You provisioned them through `kubectl`, without writing the Kubernetes manifests file by yourself.
