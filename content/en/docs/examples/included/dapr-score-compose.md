---
title: "Dapr"
description: "How to deploy a containerized NodeJS application using a Dapr StateStore (Redis) with `score-compose`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

## `init`

Initialize your current `score-compose` workspace, run the following command in your terminal:

```bash
score-compose init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dapr-state-store/score-compose/10-redis-dapr-state-store.provisioners.yaml \
    --patch-templates https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-compose/dapr.tpl
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available. We are also importing one external file to seamlessly generate a Dapr StateStore `Component` pointing to a Redis database: [`dapr-state-store` provisioner](https://github.com/score-spec/community-provisioners/blob/main/dapr-state-store/score-compose/10-redis-dapr-state-store.provisioners.yaml).

You can see the resource provisioners available by running this command:

```bash
score-compose provisioners list
```

The Score file example illustrated uses three resource types: `dapr-state-store`, `dns` and `route`.

```none
+-------------------+-------+------------------+--------------------------------+---------------------------------+
|     TYPE          | CLASS |      PARAMS      |            OUTPUTS             |          DESCRIPTION            |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| dapr-state-store  | (any) |                  | name                           | Generates a Dapr StateStore     |
|                   |       |                  |                                | Component pointing to a Redis   |
|                   |       |                  |                                | Service.                        |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| dns               | (any) |                  | host                           | Outputs a *.localhost domain    |
|                   |       |                  |                                | as the hostname                 |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| route             | (any) | host, path, port |                                | Provisions an Ingress route on  |
|                   |       |                  |                                | a shared Nginx instance         |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
```

By using the [`--patch-templates`](/docs/score-implementation/score-compose/patch-templates/) (in this case: [`dapr.tpl`](https://github.com/score-spec/community-patchers/blob/main/score-compose/dapr.tpl)) we are seamlessly generating the Dapr `scheduler` and `placement` containers in addition to a Dapr `Sidecar` container for any Workload.

## `generate`

Convert the `score.yaml` file into a deployable `compose.yaml`, run the following command in your terminal:

```bash
score-compose generate score.yaml --image ghcr.io/dapr/samples/hello-k8s-node:latest
```

The `generate` command will add the input `score.yaml` workload with a particular container image to the `.score-compose/state.yaml` state file and generate the output `compose.yaml`.

If you want to build the container image when this `compose.yaml` will be deployed, you can run this `generate` command with the `--build` parameter instead:

```bash
score-compose generate score.yaml --build 'main={"context":".","tags":["hello-dapr-node:local"]}'
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
score-compose resources get-outputs dns.default#nodeapp.dns --format '{{ .host }}'
```

```none
dnsbcsqnd.localhost
```

Same for the `dapr-state-store` resource:

```bash
score-compose resources get-outputs dapr-state-store.default#nodeapp.state-store
```

```none
{
  "name": "redis-PANgkO"
}
```

## `docker compose`

Run `docker compose up` to execute the generated `compose.yaml` file:

```bash
docker compose up -d
```

```none
[+] Running 7/7
 ✔ Container dapr-redis-PANgkO-1             Started
 ✔ Container dapr-placement-1                Started
 ✔ Container dapr-scheduler-1                Started
 ✔ Container dapr-routing-aPCJB9-1           Started
 ✔ Container dapr-wait-for-resources-1       Exited
 ✔ Container dapr-nodeapp-nodeapp-1          Started
 ✔ Container dapr-nodeapp-nodeapp-sidecar-1  Started
```

## `docker ps`

See the running containers:

```bash
docker ps
```

```none
CONTAINER ID   IMAGE                                        COMMAND                  CREATED              STATUS              PORTS                                              NAMES
3c7dfd658b1a   mirror.gcr.io/redis:7-alpine                 "redis-server /usr/l…"   About a minute ago   Up About a minute   6379/tcp                                           dapr-redis-PANgkO-1
85c836ae19d2   ghcr.io/dapr/daprd:latest                    "./daprd --app-id=no…"   8 hours ago          Up 59 seconds                                                          dapr-nodeapp-nodeapp-sidecar-1
1f7affe5d910   ghcr.io/dapr/samples/hello-k8s-node:latest   "docker-entrypoint.s…"   8 hours ago          Up About a minute   3000/tcp                                           dapr-nodeapp-nodeapp-1
e7e1ae181a28   mirror.gcr.io/nginx:1-alpine                 "/docker-entrypoint.…"   8 hours ago          Up About a minute   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp            dapr-routing-aPCJB9-1
f2983452962a   ghcr.io/dapr/scheduler:latest                "./scheduler --port …"   8 hours ago          Up About a minute   0.0.0.0:50007->50007/tcp, :::50007->50007/tcp      dapr-scheduler-1
913af9a5c8fc   ghcr.io/dapr/placement:latest                "./placement --port …"   8 hours ago          Up About a minute   0.0.0.0:50006->50006/tcp, :::50006->50006/tcp      dapr-placement-1
```

## `curl localhost:8080`

Test the running container, run the following command:

```bash
curl localhost:8080 -H "Host: dnsbcsqnd.localhost"
```

This will get the expected error showing that the container is successfully running:

```none
Cannot GET /
```

You can check the logs of the running container:

```none
Node App listening on port 3000!
```

Congrats! You’ve successfully deploy, with the `score-compose` implementation, a sample containerized NodeJS workload talking to a Dapr StateStore (Redis) and exposed via a DNS. You provisioned them through Docker, without writing the Docker Compose file by yourself.
