---
title: "Get started with Score"
linkTitle: "Get started"
weight: 2
aliases:
- /docs/get-started/install/
- /docs/get-started/score-compose-hello-world/
- /docs/get-started/score-helm-hello-world/
- /docs/get-started/score-humanitec-hello-world/
---

## Overview

If you're new to Score, we recommend starting with the [`score-compose`](/docs/score-implementation/score-compose) reference implementation. It provides a helpful blueprint for using Score and allows you to become familiar with the [Score specification](/docs/score-specification/score-spec-reference) before exploring further implementation options. `score-compose` is also great for local development and for building meaningful test steps into CI/CD pipelines.

## 1. `score-compose`

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

## 2. `score.yaml`

Open your IDE and paste in the following `score.yaml` file, which describes a simple web server that queries a PostgreSQL database on each request and is exposed via a DNS. The demo code can be found [here](https://github.com/score-spec/sample-score-app/blob/main/score.yaml).

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: hello-world
  annotations:
    tags: "nodejs,http,website,javascript,postgres"
containers:
  hello-world:
    image: .
    variables:
      PORT: "3000"
      MESSAGE: "Hello, World!"
      DB_DATABASE: ${resources.db.name}
      DB_USER: ${resources.db.username}
      DB_PASSWORD: ${resources.db.password}
      DB_HOST: ${resources.db.host}
      DB_PORT: ${resources.db.port}
resources:
  db:
    type: postgres
  dns:
    type: dns
  route:
    type: route
    params:
      host: ${resources.dns.host}
      path: /
      port: 8080
service:
  ports:
    www:
      port: 8080
      targetPort: 3000
```

## 3. `score-compose init`

Initialize your current `score-compose` workspace, run the following command in your terminal:

```bash
score-compose init --no-sample
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available.

## 4. `score-compose generate`

Convert the `score.yaml` file into a deployable `compose.yaml`, run the following command in your terminal:

```bash
score-compose generate score.yaml --image scorespec/sample-score-app:latest
```

The `generate` command will add the input `score.yaml` workload with a particular container image to the `.score-compose/state.yaml` state file and generate the output `compose.yaml`.

See the generated `compose.yaml` by running this command:

```bash
cat compose.yaml
```

## 5. `docker compose up`

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

## 6. `docker ps`

See the running containers:

```bash
docker ps
```

```none
CONTAINER ID   IMAGE                                        COMMAND                  CREATED          STATUS                    PORTS                                     NAMES
8488aa2fe204   scorespec/sample-score-app:latest            "node index.js"          17 minutes ago   Up 17 minutes             3000/tcp                                  nodejs-hello-world-hello-world-1
22c78e726612   mirror.gcr.io/nginx:1-alpine                 "/docker-entrypoint.…"   17 minutes ago   Up 17 minutes             0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   nodejs-routing-CzbPM2-1
01cc858a6162   mirror.gcr.io/postgres:17-alpine             "docker-entrypoint.s…"   17 minutes ago   Up 17 minutes (healthy)   5432/tcp                                  nodejs-pg-Tut8g7-1
```

## 7. `curl localhost:8080`

Test the running container, run the following command:

```bash
curl localhost:8080
```

```none
Hello, World!
This is an application talking to a PostgreSQL 17.5 database on host pg-Tut8g7, deployed with Score!
PostgreSQL 17.5 on x86_64-pc-linux-musl, compiled by gcc (Alpine 14.2.0) 14.2.0, 64-bit
```

Congrats! You’ve successfully deploy your first Score file with the `score-compose` implementation with a sample workload talking to PostgreSQL and exposed via a DNS. You provisioned them through Docker, without writing the Docker Compose file by yourself.

## Next steps

- [**Explore more examples**](/examples/): Check out more examples to dive into further use cases and experiment with different configurations.
- [**Join the Score community**]({{< relref "/docs/community" >}}): Connect with fellow Score developers on our CNCF Slack channel or start find your way to contribute to Score.
