---
title: "Nginx"
description: "How to deploy an unprivileged containerized Nginx application with `score-compose`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

## `init`

Initialize your current `score-compose` workspace, run the following command in your terminal:

```bash
score-compose init --no-sample \
    --patch-templates https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-compose/unprivileged.tpl
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available.

You can see the resource provisioners available by running this command:

```bash
score-compose provisioners list
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
| volume        | (any) |                  | source, type                   | Creates a persistent volume     |
|               |       |                  |                                | that can be mounted on a        |
|               |       |                  |                                | workload.                       |
+---------------+-------+------------------+--------------------------------+---------------------------------+
```

By using the [`--patch-templates`](/docs/score-implementation/score-compose/patch-templates/) (in this case: [`unprivileged.tpl`](https://github.com/score-spec/community-patchers/blob/main/score-compose/unprivileged.tpl)) we are also making sure that the generated workload will run as unprivileged.

## `generate`

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

## `resources`

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

## `docker compose`

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

## `docker ps`

See the running containers:

```bash
docker ps
```

```none
CONTAINER ID   IMAGE                                     COMMAND                  CREATED          STATUS          PORTS                                              NAMES
87ecb7c045c7   nginxinc/nginx-unprivileged:alpine-slim   "/docker-entrypoint.…"   39 seconds ago   Up 37 seconds   8080/tcp                                           nginx-nginx-webapp-1
9b40335c6644   mirror.gcr.io/nginx:1-alpine              "/docker-entrypoint.…"   39 seconds ago   Up 39 seconds   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp            nginx-routing-PFCYHt-1
```

## `curl localhost:8080`

Test the running container, run the following command:

```bash
curl localhost:8080 -H "Host: dnspb7p6y.localhost"
```

```none
Welcome to nginx!
```

Congrats! You’ve successfully deploy, with the `score-compose` implementation, a simple containerized Nginx workload exposed via a DNS. You provisioned them through Docker, without writing the Docker Compose file by yourself.
