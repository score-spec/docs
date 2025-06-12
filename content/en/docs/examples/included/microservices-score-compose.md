---
title: "Microservices"
description: "How to deploy eleven containerized applications (OnlineBoutique) with `score-compose`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

## `init`

Initialize your current `score-compose` workspace, run the following command in your terminal:

```bash
score-compose init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/service/score-compose/10-service.provisioners.yaml
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available. We are also importing one external file to support the `service` dependencies: [`service` provisioner](https://github.com/score-spec/community-provisioners/blob/main/service/score-compose/10-service.provisioners.yaml).

You can see the resource provisioners available by running this command:

```bash
score-compose provisioners list
```

The Score files illustrated use four resource types: `dns`, `redis`, `route` and `service`.

```none
+-------------------+-------+------------------+--------------------------------+--------------------------------+
|     TYPE          | CLASS |      PARAMS      |            OUTPUTS             |          DESCRIPTION           |
+-------------------+-------+------------------+--------------------------------+--------------------------------+
| dns               | (any) |                  | host                           | Outputs a *.localhost domain   |
|                   |       |                  |                                | as the hostname                |
+-------------------+-------+------------------+--------------------------------+--------------------------------+
| redis             | (any) |                  | host, password, port, username | Provisions a dedicated Redis   |
|                   |       |                  |                                | instance.                      |
+-------------------+-------+------------------+--------------------------------+--------------------------------+
| route             | (any) | host, path, port |                                | Provisions an Ingress route on |
|                   |       |                  |                                | a shared Nginx instance        |
+-------------------+-------+------------------+--------------------------------+--------------------------------+
| service           | (any) |                  | name                           | Outputs the name of the        |
|                   |       |                  |                                | Workload dependency if         |
|                   |       |                  |                                | it exists in the list of       |
|                   |       |                  |                                | Workloads.                     |
+-------------------+-------+------------------+--------------------------------+--------------------------------+
```

## `generate`

Convert the `score-*.yaml` files into a runnable `compose.yaml`, run the following commands in your terminal:

```bash
score-compose generate score-cart.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/cartservice:v0.10.3
score-compose generate score-currency.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/currencyservice:v0.10.3
score-compose generate score-payment.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/paymentservice:v0.10.3
score-compose generate score-email.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.10.3
score-compose generate score-productcatalog.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/productcatalogservice:v0.10.3
score-compose generate score-shipping.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/shippingservice:v0.10.3
score-compose generate score-ad.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/adservice:v0.10.3
score-compose generate score-recommendation.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/recommendationservice:v0.10.3
score-compose generate score-checkout.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/checkoutservice:v0.10.3
score-compose generate score-frontend.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/frontend:v0.10.3
score-compose generate score-loadgenerator.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/loadgenerator:v0.10.3
```

The `generate` commands will add the input `score-*.yaml` workloads with a particular container image to the `.score-compose/state.yaml` state file and generate the output `compose.yaml`.

If you want to build the container image when this `compose.yaml` will be deployed, you can run these `generate` commands with the `--build` parameter instead:

```bash
score-compose generate score-frontend.yaml --build 'main={"context":".","tags":["frontend:local"]}'
```

See the generated `compose.yaml` by running this command:

```bash
cat compose.yaml
```

If you make any modifications to the `score-*.yaml` files, run `score-compose generate score-*.yaml` to regenerate the output `compose.yaml`.

## `resources`

Get the information of the resources dependencies of the workloads, run the following command:

```bash
score-compose resources list
```

```none
+-----------------------------------------------+--------------------------------+
|                      UID                      |            OUTPUTS             |
+-----------------------------------------------+--------------------------------+
| dns.default#frontend.dns                      | host                           |
+-----------------------------------------------+--------------------------------+
| redis.default#cart.redis-cart                 | host, password, port, username |
+-----------------------------------------------+--------------------------------+
| service.default#checkout.cart                 | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#checkout.currency             | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#checkout.email                | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#checkout.payment              | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#checkout.productcatalog       | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#checkout.shipping             | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#frontend.ad                   | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#frontend.cart                 | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#frontend.checkout             | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#frontend.currency             | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#frontend.payment              | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#frontend.productcatalog       | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#frontend.recommendation       | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#frontend.shipping             | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#loadgenerator.frontend        | name                           |
+-----------------------------------------------+--------------------------------+
| service.default#recommendation.productcatalog | name                           |
+-----------------------------------------------+--------------------------------+
| route.default#frontend.route                  |                                |
+-----------------------------------------------+--------------------------------+
```

At this stage, we can already see the value of the `dns` resource generated of the `frontend` workload:

```bash
score-compose resources get-outputs dns.default#frontend.dns --format '{{ .host }}'
```

```none
dnsyh32qu.localhost
```

Same for the `redis` resource of the `cart` workload:

```bash
score-compose resources get-outputs redis.default#cart.redis-cart
```

```none
{
  "host": "redis-NYOMHD",
  "password": "REDACTED",
  "port": 6379,
  "username": "REDACTED"
}
```

## `docker compose`

Run `docker compose up` to execute the generated `compose.yaml` file:

```bash
docker compose up -d
```

```none
[+] Running 16/16
 ✔ Network ob_default                            Created
 ✔ Volume "redis-NYOMHD-data"                    Created
 ✔ Container ob-redis-NYOMHD-1                   Started
 ✔ Container ob-routing-K7ZrCr-1                 Started
 ✔ Container ob-wait-for-resources-1             Exited
 ✔ Container ob-checkout-checkout-1              Started
 ✔ Container ob-email-email-1                    Started
 ✔ Container ob-currency-currency-1              Started
 ✔ Container ob-frontend-frontend-1              Started
 ✔ Container ob-recommendation-recommendation-1  Started
 ✔ Container ob-productcatalog-productcatalog-1  Started
 ✔ Container ob-shipping-shipping-1              Started
 ✔ Container ob-cart-cart-1                      Started
 ✔ Container ob-ad-ad-1                          Started
 ✔ Container ob-payment-payment-1                Started
 ✔ Container ob-loadgenerator-loadgenerator-1    Started
```

## `docker ps`

See the running containers:

```bash
docker ps
```

```none
CONTAINER ID   IMAGE                                                                                        COMMAND                  CREATED              STATUS              PORTS                                              NAMES
2420e4a5b044   us-central1-docker.pkg.dev/google-samples/microservices-demo/frontend:v0.10.3                "/src/server"            9 minutes ago        9 minutes ago       8080/tcp                                           ob-frontend-frontend-1
0c8705f6571a   us-central1-docker.pkg.dev/google-samples/microservices-demo/adservice:v0.10.3               "/app/build/install/…"   9 minutes ago        Up 9 minutes        9555/tcp                                           ob-ad-ad-1
0d72556cc169   us-central1-docker.pkg.dev/google-samples/microservices-demo/loadgenerator:v0.10.3           "/bin/sh -c 'locust …"   9 minutes ago        Up 9 minutes                                                           ob-loadgenerator-loadgenerator-1
8c72e85b4c66   us-central1-docker.pkg.dev/google-samples/microservices-demo/checkoutservice:v0.10.3         "/src/checkoutservice"   9 minutes ago        Up 9 minutes        5050/tcp                                           ob-checkout-checkout-1
2dd9df6fa024   us-central1-docker.pkg.dev/google-samples/microservices-demo/productcatalogservice:v0.10.3   "/src/server"            9 minutes ago        Up 9 minutes        3550/tcp                                           ob-productcatalog-productcatalog-1
a6d0ebc3aab2   us-central1-docker.pkg.dev/google-samples/microservices-demo/paymentservice:v0.10.3          "node index.js"          9 minutes ago        Up 9 minutes        50051/tcp                                          ob-payment-payment-1
e2511187e454   us-central1-docker.pkg.dev/google-samples/microservices-demo/recommendationservice:v0.10.3   "python recommendati…"   9 minutes ago        Up 9 minutes        8080/tcp                                           ob-recommendation-recommendation-1
a4156abacd40   us-central1-docker.pkg.dev/google-samples/microservices-demo/cartservice:v0.10.3             "/app/cartservice"       9 minutes ago        Up 9 minutes        7070/tcp                                           ob-cart-cart-1
2379e57ac8ca   us-central1-docker.pkg.dev/google-samples/microservices-demo/currencyservice:v0.10.3         "node server.js"         9 minutes ago        Up 9 minutes        7000/tcp                                           ob-currency-currency-1
81efe5bcde69   us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.10.3            "python email_server…"   9 minutes ago        Up 9 minutes        8080/tcp                                           ob-email-email-1
d83a61963aa6   us-central1-docker.pkg.dev/google-samples/microservices-demo/shippingservice:v0.10.3         "/src/shippingservice"   9 minutes ago        Up 9 minutes        50051/tcp                                          ob-shipping-shipping-1
ed5f79d80259   mirror.gcr.io/redis:7-alpine                                                                 "redis-server /usr/l…"   9 minutes ago        Up 9 minutes        6379/tcp                                           ob-redis-NYOMHD-1
6ee7b587922f   mirror.gcr.io/nginx:1-alpine                                                                 "/docker-entrypoint.…"   9 minutes ago        Up 9 minutes        0.0.0.0:8080->80/tcp, [::]:8080->80/tcp            ob-routing-K7ZrCr-1
```

## `curl localhost:8080`

Test the running `frontend` container, run the following command:

```bash
curl localhost:8080 -H "Host: dnsyh32qu.localhost"
```

Congrats! You’ve successfully deploy, with the `score-compose` implementation, the eleven containerized workload exposed via a DNS and talking to a `redis` database. You provisioned them through Docker, without writing the Docker Compose file by yourself.
