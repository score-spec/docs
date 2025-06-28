---
title: "Microservices"
description: "How to deploy eleven containerized applications (OnlineBoutique) with `score-k8s`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-k8s/installation) to install the latest version of `score-k8s`.

## `init`

Initialize your current `score-k8s` workspace, run the following command in your terminal:

```bash
score-k8s init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/service/score-compose/10-service.provisioners.yaml
```

The `init` command will create the `.score-k8s` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-k8s/resources-provisioners/" >}}) available. We are also importing one external file to support the `service` dependencies: [`service` provisioner](https://github.com/score-spec/community-provisioners/blob/main/service/score-k8s/10-service.provisioners.yaml).

You can see the resource provisioners available by running this command:

```bash
score-k8s provisioners list
```

The Score files illustrated use three resource types: `dns`, `route`, `redis` and `service`.

```none
+------------------+-------+------------------+--------------------------------+---------------------------------+
|     TYPE         | CLASS |      PARAMS      |            OUTPUTS             |          DESCRIPTION            |
+------------------+-------+------------------+--------------------------------+---------------------------------+
| dns              | (any) |                  | host                           | Outputs a *.localhost domain    |
|                  |       |                  |                                | as the hostname                 |
+------------------+-------+------------------+--------------------------------+---------------------------------+
| route            | (any) | host, path, port |                                | Provisions an Ingress route on  |
|                  |       |                  |                                | a shared Nginx instance         |
+------------------+-------+------------------+--------------------------------+---------------------------------+
| redis            | (any) |                  | host, password, port, username | Provisions a dedicated redis    |
|                  |       |                  |                                | instance                        |
+------------------+-------+------------------+--------------------------------+---------------------------------+
| service          | (any) |                  | name                           | Outputs the name of the         |
|                  |       |                  |                                | Workload dependency if          |
|                  |       |                  |                                | it exists in the list of        |
|                  |       |                  |                                | Workloads.                      |
+------------------+-------+------------------+--------------------------------+---------------------------------+
```

## `generate`

Convert the `score-*.yaml` files into a deployable `manifests.yaml`, run the following command in your terminal:

```bash
score-k8s generate score-cart.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/cartservice:v0.10.3
score-k8s generate score-currency.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/currencyservice:v0.10.3
score-k8s generate score-payment.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/paymentservice:v0.10.3
score-k8s generate score-email.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.10.3
score-k8s generate score-productcatalog.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/productcatalogservice:v0.10.3
score-k8s generate score-shipping.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/shippingservice:v0.10.3
score-k8s generate score-ad.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/adservice:v0.10.3
score-k8s generate score-recommendation.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/recommendationservice:v0.10.3
score-k8s generate score-checkout.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/checkoutservice:v0.10.3
score-k8s generate score-frontend.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/frontend:v0.10.3
score-k8s generate score-loadgenerator.yaml \
    --image us-central1-docker.pkg.dev/google-samples/microservices-demo/loadgenerator:v0.10.3
```

The `generate` command will add the input `score-*.yaml` workloads with a particular container image to the `.score-k8s/state.yaml` state file and generate the output `manifests.yaml`.

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

At this stage, we can already see the value of the `dns` resource generated for the `frontend` workload:

```bash
score-k8s resources get-outputs dns.default#frontend.dns --format '{{ .host }}'
```

```none
dnsjbzrxg.localhost
```

Same for the `redis` resource of the `cart` workload:

```bash
score-k8s resources get-outputs redis.default#cart.redis-cart
```

```none
{
  "host": "redis-cart-deeb231e",
  "password": "🔐💬redis-cart-deeb231e_password💬🔐",
  "port": 6379,
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
secret/redis-cart-deeb231e created
statefulset.apps/redis-cart-deeb231e created
service/redis-cart-deeb231e created
httproute.gateway.networking.k8s.io/route-frontend-baaed48f created
service/payment created
deployment.apps/payment created
deployment.apps/loadgenerator created
service/cart created
deployment.apps/cart created
service/currency created
deployment.apps/currency created
service/productcatalog created
deployment.apps/productcatalog created
service/shipping created
deployment.apps/shipping created
service/email created
deployment.apps/email created
service/frontend created
deployment.apps/frontend created
service/recommendation created
deployment.apps/recommendation created
service/ad created
deployment.apps/ad created
service/checkout created
deployment.apps/checkout created
```

## `kubectl get all`

See the running containers:

```bash
kubectl get all
```

```none
NAME                                  READY   STATUS    RESTARTS   AGE
pod/ad-dc7944975-bj8w4                1/1     Running   0          119s
pod/cart-798bd7698-264pg              1/1     Running   0          2m1s
pod/checkout-744f8dcfb-7g56m          1/1     Running   0          118s
pod/currency-784446ffff-zwwmk         1/1     Running   0          2m1s
pod/email-65fc89df67-c28s8            1/1     Running   0          2m
pod/frontend-6d767bc76c-lm48h         1/1     Running   0          2m
pod/loadgenerator-687f78699b-xv9lr    1/1     Running   0          2m1s
pod/payment-64f96b95dc-zg5bz          1/1     Running   0          2m1s
pod/productcatalog-7889b57645-kz7ng   1/1     Running   0          2m
pod/recommendation-5c9fb7b8cd-lwd4v   1/1     Running   0          119s
pod/redis-cart-deeb231e-0             1/1     Running   0          2m1s
pod/shipping-5cccdb6547-kwdwf         1/1     Running   0          2m

NAME                          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
service/ad                    ClusterIP   10.96.73.134    <none>        9555/TCP    119s
service/cart                  ClusterIP   10.96.157.103   <none>        7070/TCP    2m1s
service/checkout              ClusterIP   10.96.44.132    <none>        5050/TCP    119s
service/currency              ClusterIP   10.96.241.104   <none>        7000/TCP    2m1s
service/email                 ClusterIP   10.96.160.93    <none>        5000/TCP    2m
service/frontend              ClusterIP   10.96.241.155   <none>        8080/TCP    2m
service/kubernetes            ClusterIP   10.96.0.1       <none>        443/TCP     3d22h
service/payment               ClusterIP   10.96.226.73    <none>        50051/TCP   2m1s
service/productcatalog        ClusterIP   10.96.242.16    <none>        3550/TCP    2m1s
service/recommendation        ClusterIP   10.96.63.169    <none>        8080/TCP    2m
service/redis-cart-deeb231e   ClusterIP   10.96.128.79    <none>        6379/TCP    2m1s
service/shipping              ClusterIP   10.96.198.168   <none>        50051/TCP   2m1s

NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/ad               1/1     1            1           119s
deployment.apps/cart             1/1     1            1           2m1s
deployment.apps/checkout         1/1     1            1           119s
deployment.apps/currency         1/1     1            1           2m1s
deployment.apps/email            1/1     1            1           2m
deployment.apps/frontend         1/1     1            1           2m
deployment.apps/loadgenerator    1/1     1            1           2m1s
deployment.apps/payment          1/1     1            1           2m1s
deployment.apps/productcatalog   1/1     1            1           2m1s
deployment.apps/recommendation   1/1     1            1           2m
deployment.apps/shipping         1/1     1            1           2m

NAME                                        DESIRED   CURRENT   READY   AGE
replicaset.apps/ad-dc7944975                1         1         1       119s
replicaset.apps/cart-798bd7698              1         1         1       2m1s
replicaset.apps/checkout-744f8dcfb          1         1         1       119s
replicaset.apps/currency-784446ffff         1         1         1       2m1s
replicaset.apps/email-65fc89df67            1         1         1       2m
replicaset.apps/frontend-6d767bc76c         1         1         1       2m
replicaset.apps/loadgenerator-687f78699b    1         1         1       2m1s
replicaset.apps/payment-64f96b95dc          1         1         1       2m1s
replicaset.apps/productcatalog-7889b57645   1         1         1       2m1s
replicaset.apps/recommendation-5c9fb7b8cd   1         1         1       2m
replicaset.apps/shipping-5cccdb6547         1         1         1       2m

NAME                                   READY   AGE
statefulset.apps/redis-cart-deeb231e   1/1     2m1s
```

## `curl localhost`

Test the running container, run the following command:

```bash
curl localhost -H "Host: dnsjbzrxg.localhost"
```

Congrats! You’ve successfully deploy, with the `score-k8s` implementation, a sample NodeJS containerized workload talking to a Dapr StateStore (Redis) and exposed via a DNS. You provisioned them through `kubectl`, without writing the Kubernetes manifests file by yourself.
