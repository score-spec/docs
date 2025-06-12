---
title: "Backstage"
description: "How to deploy a containerized Backstage application using a PostgreSQL database with `score-compose`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

## `init`

Initialize your current `score-compose` workspace, run the following command in your terminal:

```bash
score-compose init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dns/score-compose/10-dns-with-url.provisioners.yaml
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available. We are also importing one external file to support the `dns` dependencies: [`dns` provisioner](https://github.com/score-spec/community-provisioners/blob/main/service/score-compose/10-dns-with-url.provisioners.yaml).

You can see the resource provisioners available by running this command:

```bash
score-compose provisioners list
```

The Score file example illustrated uses three resource types: `postgres-instance`, `dns` and `route`.

```none
+-------------------+-------+------------------+--------------------------------+---------------------------------+
|     TYPE          | CLASS |      PARAMS      |            OUTPUTS             |          DESCRIPTION            |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| dns               | (any) |                  | host, url                      | Outputs a *.localhost domain as |
|                   |       |                  |                                | the hostname and associated URL |
|                   |       |                  |                                | in http on port 8080            |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| postgres-instance | (any) |                  | host, password, port, username | Provisions a dedicated          |
|                   |       |                  |                                | PostgreSQL instance             |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
| route             | (any) | host, path, port |                                | Provisions an Ingress route on  |
|                   |       |                  |                                | a shared Nginx instance         |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
```

## `generate`

Convert the `score.yaml` file into a runnable `compose.yaml`, run the following command in your terminal:

```bash
score-compose generate score.yaml --image ghcr.io/mathieu-benoit/backstage:latest
```

The `generate` command will add the input `score.yaml` workload with a particular container image to the `.score-compose/state.yaml` state file and generate the output `compose.yaml`.

If you want to build the container image when this `compose.yaml` will be deployed, you can run this `generate` command with the `--build` parameter instead:

```bash
score-compose generate score.yaml --build 'main={"context":".","tags":["backstage:local"]}'
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
+----------------------------------------+--------------------------------+
|                  UID                   |            OUTPUTS             |
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
score-compose resources get-outputs dns.default#backstage.dns
```

```none
{
  "host": "dnsjdtv57.localhost",
  "url": "http://dnsjdtv57.localhost:8080"
}
```

Same for the `postgres-instance` resource:

```bash
score-compose resources get-outputs postgres-instance.default#backstage.pg
```

```none
{
  "host": "pg-OuoTNo",
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
[+] Running 4/4
 ✔ Container deploy-backstage-with-score-pg-OuoTNo-1            Healthy 
 ✔ Container deploy-backstage-with-score-wait-for-resources-1   Exited 
 ✔ Container deploy-backstage-with-score-routing-6uaxax-1       Started 
 ✔ Container deploy-backstage-with-score-backstage-backstage-1  Started
```

## `docker ps`

See the running containers:

```bash
docker ps
```

```none
CONTAINER ID   IMAGE                                     COMMAND                  CREATED       STATUS                                  PORTS                                              NAMES
9b2ff62333ff   ghcr.io/mathieu-benoit/backstage:latest   "node packages/backe…"   5 hours ago   Up 5 hours                                                                                 deploy-backstage-with-score-backstage-backstage-1
4b1203acbf41   mirror.gcr.io/postgres:17-alpine          "docker-entrypoint.s…"   5 hours ago   Up 5 hours (healthy)                    5432/tcp                                           deploy-backstage-with-score-pg-mwgmNx-1
716b626ad841   mirror.gcr.io/nginx:1-alpine              "/docker-entrypoint.…"   5 hours ago   Up 5 hours                              0.0.0.0:8080->80/tcp, [::]:8080->80/tcp            deploy-backstage-with-score-routing-idouo7-1
```

## `curl localhost:8080`

Test the running container, run the following command:

```bash
curl localhost:8080 -H "Host: dnsjdtv57.localhost"
```

```none
...
<title>Scaffolded Backstage App</title>
...
```

Congrats! You’ve successfully deploy, with the `score-compose` implementation, a sample containerized Backstage workload talking to PostgreSQL and exposed via a DNS. You provisioned them through Docker, without writing the Docker Compose file by yourself.
