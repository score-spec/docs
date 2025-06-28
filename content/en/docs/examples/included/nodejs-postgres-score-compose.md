---
title: "NodeJS and PostgreSQL"
description: "How to deploy a containerized NodeJS application using a PostgreSQL database with `score-compose`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

## `init`

Initialize your current `score-compose` workspace, run the following command in your terminal:

```bash
score-compose init --no-sample
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available.

You can see the resource provisioners available by running this command:

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
| postgres      | (any) |                  | database, host, name,          | Provisions a dedicated          |
|               |       |                  | password, port, username       | database on a shared PostgreSQL |
|               |       |                  |                                | instance                        |
+---------------+-------+------------------+--------------------------------+---------------------------------+
| route         | (any) | host, path, port |                                | Provisions an Ingress route on  |
|               |       |                  |                                | a shared Nginx instance         |
+---------------+-------+------------------+--------------------------------+---------------------------------+
```

## `generate`

Convert the `score.yaml` file into a deployable `compose.yaml`, run the following command in your terminal:

```bash
score-compose generate score.yaml --image ghcr.io/score-spec/sample-score-app:latest
```

The `generate` command will add the input `score.yaml` workload with a particular container image to the `.score-compose/state.yaml` state file and generate the output `compose.yaml`.

If you want to build the container image when this `compose.yaml` will be deployed, you can run this `generate` command with the `--build` parameter instead:

```bash
score-compose generate score.yaml --build 'main={"context":".","tags":["sample-score-app:local"]}'
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
score-compose resources get-outputs dns.default#hello-world.dns --format '{{ .host }}'
```

```none
dnsbcsqnd.localhost
```

Same for the `postgres` resource:

```bash
score-compose resources get-outputs postgres.default#hello-world.db
```

```none
{
  "database": "db-cHqToKGM",
  "host": "pg-l1fFqm",
  "name": "db-cHqToKGM",
  "password": "REDACTED",
  "port": 5432,
  "username": "REDACTED"
}
```

## `docker compose`

Run `docker compose up` to execute the generated `compose.yaml` file:

```bash
docker compose up -d
```

```none
[+] Running 7/7
 ✔ Network nodejs_default                      Created 
 ✔ Volume "nodejs_pg-Tut8g7-data"              Created
 ✔ Container nodejs-pg-Tut8g7-1                Healthy 
 ✔ Container nodejs-routing-CzbPM2-1           Started 
 ✔ Container nodejs-pg-Tut8g7-init-1           Exited
 ✔ Container nodejs-wait-for-resources-1       Exited 
 ✔ Container nodejs-hello-world-hello-world-1  Started
```

## `docker ps`

See the running containers:

```bash
docker ps
```

```none
CONTAINER ID   IMAGE                                        COMMAND                  CREATED          STATUS                    PORTS                                     NAMES
8488aa2fe204   ghcr.io/score-spec/sample-score-app:latest   "node index.js"          17 minutes ago   Up 17 minutes             3000/tcp                                  nodejs-hello-world-hello-world-1
22c78e726612   mirror.gcr.io/nginx:1-alpine                 "/docker-entrypoint.…"   17 minutes ago   Up 17 minutes             0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   nodejs-routing-CzbPM2-1
01cc858a6162   mirror.gcr.io/postgres:17-alpine             "docker-entrypoint.s…"   17 minutes ago   Up 17 minutes (healthy)   5432/tcp                                  nodejs-pg-Tut8g7-1
```

## `curl localhost:8080`

Test the running container, run the following command:

```bash
curl localhost:8080 -H "Host: dnsbcsqnd.localhost"
```

```none
Hello, World!
This is an application talking to a PostgreSQL 17.5 database on host pg-Tut8g7, deployed with Score!
PostgreSQL 17.5 on x86_64-pc-linux-musl, compiled by gcc (Alpine 14.2.0) 14.2.0, 64-bit
```

Congrats! You’ve successfully deploy, with the `score-compose` implementation, a sample containerized NodeJS workload talking to PostgreSQL and exposed via a DNS. You provisioned them through Docker, without writing the Docker Compose file by yourself.
