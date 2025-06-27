# community-provisioners

This is a library of additional provisioners that you can use with either `score-compose` or `score-k8s`.

## For `score-compose`

Example of usage with the `10-redis-dapr-state-store.provisioners.yaml` provisioner:
```bash
score-compose init --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dapr-state-store/score-compose/10-redis-dapr-state-store.provisioners.yaml
```

| File | Type | Class | Params | Outputs | Description
| ---- | ---- | ----- | ------ | ------- | -----------
| 10-redis-dapr-pubsub.provisioners.yaml      | `dapr-pubsub`               | (any)   | (none)            | `name`           | Generates a Dapr PubSub `Component` pointing to a Redis `Service`.
| 10-redis-dapr-state-store.provisioners.yaml | `dapr-state-store`          | (any)   | (none)            | `name`           | Generates a Dapr StateStore `Component` pointing to a Redis `Service`.
| 10-dapr-subscription.provisioners.yaml      | `dapr-subscription`         | (any)   | `pubsub`, `topic` | `name`, `topic`  | Generates a Dapr `Subscription` on a given Topic and `PubSub`.
| 10-env.provisioners.yaml                    | `environment`               | (any)   | (none)            | (none)           | Loads environment variables from a local `.env` file.
| 10-hpa.provisioners.yaml                    | `horizontal-pod-autoscaler` | (any)   | (none)            | (none)           | Generates an empty object because HPA is not supported in Docker Compose.
| 10-service.provisioners.yaml                | `service`                   | (any)   | (none)            | `name`           | Outputs the name of the Workload dependency if it exists in the list of Workloads.

## For `score-k8s`

Example of usage with the `10-redis-dapr-state-store.provisioners.yaml` provisioner:
```bash
score-k8s init --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dapr-state-store/score-k8s/10-redis-dapr-state-store.provisioners.yaml
```

| File | Type | Class | Params | Outputs | Description
| ---- | ---- | ----- | ------ | ------- | -----------
| 10-rabbitmq-dapr-pubsub.provisioners.yaml     | `dapr-pubsub`               | (any)   | (none)                                                                 | `name`                                  | Generates a Dapr PubSub `Component` pointing to a RabbitMQ `StatefulSet`.
| 10-redis-dapr-pubsub.provisioners.yaml        | `dapr-pubsub`               | (any)   | (none)                                                                 | `name`                                  | Generates a Dapr PubSub `Component` pointing to a Redis `StatefulSet`.
| 10-redis-dapr-state-store.provisioners.yaml   | `dapr-state-store`          | (any)   | (none)                                                                 | `name`                                  | Generates a Dapr StateStore `Component` pointing to a Redis `StatefulSet`.
| 10-dapr-subscription.provisioners.yaml        | `dapr-subscription`         | (any)   | `pubsub`, `topic`                                                      | `name`, `topic`                         | Generates a Dapr `Subscription` on a given Topic and `PubSub`.
| 10-env.provisioners.yaml                      | `environment`               | (any)   | (none)                                                                 | (none)                                  | Loads environment variables from a local `.env` file.
| 10-hpa.provisioners.yaml                      | `horizontal-pod-autoscaler` | (any)   | `maxReplicas`, `minReplicas`, `defaultTargetCPUUtilizationPercentage`  | (none)                                  | Generates an `HorizontalPodAutoscaler` manifest.
| 10-redis-helm-template.provisioners.yaml      | `redis`                     | (any)   | (none)                                                                 | `host`, `password`, `port`, `username`  | Generates the manifests of the `bitnami/redis` Helm chart.
| 10-redis-helm-upgrade.provisioners.yaml       | `redis`                     | (any)   | (none)                                                                 | `host`, `password`, `port`, `username`  | Deploys the `bitnami/redis` Helm chart in an existing cluster.
| 10-ingress-route.provisioners.yaml            | `route`                     | (any)   | `host`, `path`, `port`                                                 | (none)                                  | Provisions an Ingress route on a shared Nginx instance.
| 10-shared-gateway-httproute.provisioners.yaml | `route`                     | (any)   | `host`, `path`, `port`                                                 | (none)                                  | Generates an `HTTPRoute` attached to a shared `Gateway`.
| 10-service.provisioners.yaml                  | `service`                   | (any)   | (none)                                                                 | `name`                                  | Outputs the name of the Workload dependency if it exists in the list of Workloads.
