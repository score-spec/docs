---
title: "Frontend & Backend"
description: "How to deploy a containerized Frontend application talking to a containerized Backend application exposed via a DNS with `score-compose`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

## `init`

Initialize your current `score-compose` workspace, run the following command in your terminal:

```bash
score-compose init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/service/score-compose/10-service.provisioners.yaml \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dns/score-compose/10-dns-with-url.provisioners.yaml
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available. We are also importing two external files to support the `dns` dependencies: [`dns` provisioner](https://github.com/score-spec/community-provisioners/blob/main/dns/score-compose/10-dns-with-url.provisioners.yaml) and `service` dependencies: [`service` provisioner](https://github.com/score-spec/community-provisioners/blob/main/service/score-compose/10-service.provisioners.yaml).

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
| service           | (any) |                  | name                           | Outputs the name of the         |
|                   |       |                  |                                | Workload dependency if it       |
|                   |       |                  |                                | exists in the list of Workloads |
+-------------------+-------+------------------+--------------------------------+---------------------------------+
```

## `generate`

Convert the `score-frontend.yaml` and `score-backend.yaml` files into a deployable `compose.yaml`, run the following command in your terminal:

```bash
score-compose generate score-backend.yaml \
    --image ghcr.io/mathieu-benoit/backstage-backend:latest

score-compose generate score-frontend.yaml \
    --image ghcr.io/mathieu-benoit/backstage-frontend:latest
```

The `generate` command will add the input `score-frontend.yaml` and `score-backend.yaml` workloads with a particular container image to the `.score-compose/state.yaml` state file and generate the output `compose.yaml`.

If you want to build the container image when this `compose.yaml` will be deployed, you can run this `generate` command with the `--build` parameter instead:

```bash
score-compose generate score-backend.yaml --build 'main={"context":".","tags":["backend:local"]}'
```

See the generated `compose.yaml` by running this command:

```bash
cat compose.yaml
```

If you make any modifications to the `score-frontend.yaml` or `score-backend.yaml` files, run `score-compose generate score.yaml` to regenerate the output `compose.yaml`.

## `resources`

Get the information of the resources dependencies of the workload, run the following command:

```bash
score-compose resources list
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
score-compose resources get-outputs dns.default#dns
```

```none
{
  "host": "dnsjdtv57.localhost",
  "url": "http://dnsjdtv57.localhost:8080"
}
```

Same for the `postgres-instance` resource:

```bash
score-compose resources get-outputs postgres-instance.default#backend.pg
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
[+] Running 5/5
 ✔ Container deploy-backstage-with-score-routing-5QD6z8-1      Running
 ✔ Container deploy-backstage-with-score-pg-glZvLw-1           Healthy
 ✔ Container deploy-backstage-with-score-wait-for-resources-1  Exited
 ✔ Container deploy-backstage-with-score-backend-backend-1     Running
 ✔ Container deploy-backstage-with-score-frontend-frontend-1   Running
```

## `docker ps`

See the running containers:

```bash
docker ps
```

```none
CONTAINER ID   IMAGE                                              COMMAND                  CREATED          STATUS                   PORTS                                                 NAMES
1712a2002838   ghcr.io/mathieu-benoit/backstage-frontend:latest   "/docker-entrypoint.…"   3 minutes ago    Up 2 minutes             80/tcp                                                deploy-backstage-with-score-frontend-frontend-1
6bf734ab9179   ghcr.io/mathieu-benoit/backstage-backend:latest    "node packages/backe…"   3 minutes ago    Up 2 minutes                                                                   -backend-backend-1
9a126ed0456c   mirror.gcr.io/nginx:1-alpine                       "/docker-entrypoint.…"   3 minutes ago    Up 2 minutes             0.0.0.0:8080->80/tcp, [::]:8080->80/tcp               deploy-backstage-with-score-routing-5QD6z8-1
5ec1732b6695   mirror.gcr.io/postgres:17-alpine                   "docker-entrypoint.s…"   3 minutes ago    Up 3 minutes (healthy)   5432/tcp                                              -pg-glZvLw-1
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

Congrats! You’ve successfully deploy, with the `score-compose` implementation, a containerized Frontend application talking to a containerized Backend application exposed via a DNS. You provisioned them through Docker, without writing the Docker Compose file by yourself.
