---
title: "Nginx"
linkTitle: "Nginx"
description: "How to deploy a Nginx containerized application with score-compose and score-k8s"
weight: 2
---

## Overview

In this example we will walk you through how you can deploy a Nginx containerized application, and this with both `score-compose` and `score-k8s`.

## 1. `score.yaml`

Open your IDE and paste in the following `score.yaml` file, which describes a simple web server that queries a PostgreSQL database on each request and is exposed via a DNS. The demo code can be found [here](https://github.com/score-spec/sample-score-app).

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: nginx
containers:
  webapp:
    image: .
service:
  ports:
    tcp:
      port: 80
      targetPort: 80
resources:
  dns:
    type: dns
  route:
    type: route
    params:
      host: ${resources.dns.host}
      path: /
      port: 80
```

You can use this Score file with the [`nginx`](https://hub.docker.com/_/nginx) container image. But a more secure approach is to use the [`nginxinc/nginx-unprivileged`](https://hub.docker.com/r/nginxinc/nginx-unprivileged) instead. For this we need to anticipate that our Nginx container will run as unprivileged, exposed on port `8080`, and will need to write some files in the `/tmp` folder as a `volume`:

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: nginx
containers:
  webapp:
    image: .
    volumes:
    - source: ${resources.tmp}
      target: /tmp
      readOnly: false
service:
  ports:
    tcp:
      port: 8080
      targetPort: 8080
resources:
  tmp:
    type: volume
  dns:
    type: dns
  route:
    type: route
    params:
      host: ${resources.dns.host}
      path: /
      port: 8080
```

We will use this last Score file for the rest of this page.

From here, you can deploy this exact same Score file:
- Either with [`score-compose`](#2-score-compose)
- Or with [`score-k8s`](#3-score-k8s).

## 2. `score-compose`

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

### `init`

Initialize your current `score-compose` workspace, run the following command in your terminal:

```bash
score-compose init --no-sample \
    --patch-templates https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-compose/unprivileged.tpl
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available. You can learn more about the resource provisioners available by running this command:

```bash
score-compose provisioners list
```

The Score file example illustrated uses three resource types: `postgres`, `dns` and `route`.

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
| volume        | (any) |                  | source, type                   | Creates a persistent volume     |
|               |       |                  |                                | that can be mounted on a        |
|               |       |                  |                                | workload.                       |
+---------------+-------+------------------+--------------------------------+---------------------------------+
```

### `generate`

Convert the `score.yaml` file into a runnable `compose.yaml`, run the following command in your terminal:

```bash
score-compose generate score.yaml --image nginxinc/nginx-unprivileged:alpine-slim
```

The `generate` command will add the input `score.yaml` workload with a particular container image to the `.score-compose/state.yaml` state file and generate the output `compose.yaml`.

If you want to build the container image when this `compose.yaml` will be deployed, you can run this `generate` command with the `--build` parameter instead:

```bash
score-compose generate score.yaml --build 'main={"context":".","tags":["your-web-app:local"]}'
```

See the generated `compose.yaml` by running this command:

```bash
cat compose.yaml
```

If you make any modifications to the `score.yaml` file, run `score-compose generate score.yaml` to regenerate the output `compose.yaml`.

### `resources`

Get the information of the resources dependencies of the workload, run the following command:

```bash
score-compose resources list
```

```none
+---------------------------+--------------+
|            UID            |   OUTPUTS    |
+---------------------------+--------------+
| dns.default#nginx.dns     | host         |
+---------------------------+--------------+
| volume.default#nginx.tmp  | source, type |
+---------------------------+--------------+
| route.default#nginx.route |              |
+---------------------------+--------------+
```

At this stage, we can already see the value of the `dns` resource generated:

```bash
score-compose resources get-outputs dns.default#nginx.dns --format '{{ .host }}'
```

```none
dnspb7p6y.localhost
```

### `docker compose`

Run `docker compose up` to execute the generated `compose.yaml` file:

```bash
docker compose up -d
```

```none
[+] Running 5/5
 ✔ Network nginx_default                 Created 
 ✔ Volume "nginx-tmp-cuv0AI"             Created 
 ✔ Container nginx-routing-PFCYHt-1      Started 
 ✔ Container nginx-wait-for-resources-1  Exited 
 ✔ Container nginx-nginx-webapp-1        Started
```

### `docker ps`

See the running containers:

```bash
docker ps
```

```none
CONTAINER ID   IMAGE                                     COMMAND                  CREATED          STATUS          PORTS                                              NAMES
87ecb7c045c7   nginxinc/nginx-unprivileged:alpine-slim   "/docker-entrypoint.…"   39 seconds ago   Up 37 seconds   8080/tcp                                           nginx-nginx-webapp-1
9b40335c6644   mirror.gcr.io/nginx:1-alpine              "/docker-entrypoint.…"   39 seconds ago   Up 39 seconds   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp            nginx-routing-PFCYHt-1
```

### `curl localhost:8080`

Test the running container, run the following command:

```bash
curl localhost:8080 -H "Host: dnspb7p6y.localhost"
```

```none
Welcome to nginx!
```

Congrats! You’ve successfully deploy, with the `score-compose` implementation, a simple Nginx containerized workload exposed via a DNS. You provisioned them through Docker, without writing the Docker Compose file by yourself.

## 3. `score-k8s`

To begin, follow the [installation instructions](/docs/score-implementation/score-k8s/installation) to install the latest version of `score-k8s`.

### `init`

Initialize your current `score-k8s` workspace, run the following command in your terminal:

```bash
score-k8s init --no-sample \
    --patch-templates https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-k8s/unprivileged.tpl
```

The `init` command will create the `.score-k8s` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-k8s/resources-provisioners/" >}}) available. You can learn more about the resource provisioners available by running this command:

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
| route         | (any) | host, path, port |                                | Provisions an Ingress route on  |
|               |       |                  |                                | a shared Nginx instance         |
+---------------+-------+------------------+--------------------------------+---------------------------------+
| volume        | (any) |                  | source                         | Creates a persistent volume     |
|               |       |                  |                                | that can be mounted on a        |
|               |       |                  |                                | workload                        |
+---------------+-------+------------------+--------------------------------+---------------------------------+
```

### `generate`

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

### `resources`

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

### `kubectl apply`

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

### `kubectl get all`

See the running containers:

```bash
kubectl get all
```

```none
NAME                         READY   STATUS    RESTARTS   AGE
pod/nginx-6947586bd6-82lvj   1/1     Running   0          16s

NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
service/kubernetes   ClusterIP   10.96.0.1     <none>        443/TCP    52m
service/nginx        ClusterIP   10.96.38.94   <none>        8080/TCP   17s

NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx   1/1     1            1           17s

NAME                               DESIRED   CURRENT   READY   AGE
replicaset.apps/nginx-6947586bd6   1         1         1       17s
```

### `curl localhost`

Test the running container, run the following command:

```bash
curl localhost -H "Host: dnsev272w.localhost"
```

```none
Welcome to nginx!
```

Congrats! You’ve successfully deploy, with the `score-k8s` implementation, a simple Nginx containerized workload exposed via a DNS. You provisioned them through `kubectl`, without writing the Kubernetes manifests file by yourself.

## Next steps

- [**Explore more examples**](/docs/examples/): Check out more examples to dive into further use cases and experiment with different configurations.
- [**Join the Score community**]({{< relref "/docs/community" >}}): Connect with fellow Score developers on our CNCF Slack channel or start find your way to contribute to Score.
