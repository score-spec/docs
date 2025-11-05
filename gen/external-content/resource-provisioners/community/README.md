# community-provisioners

This is a library of additional provisioners that you can use with either `score-compose` or `score-k8s`.

## For `score-compose`

Example of usage with the `10-redis-dapr-state-store.provisioners.yaml` provisioner:
```bash
score-compose init --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dapr-state-store/score-compose/10-redis-dapr-state-store.provisioners.yaml
```

| File | Type | Class | Params | Outputs | Description
| ---- | ---- | ----- | ------ | ------- | -----------
| 10-redis-dapr-pubsub.provisioners.yaml                  | `dapr-pubsub`               | (any)   | (none)                                  | `name`                    | Generates a Dapr PubSub `Component` pointing to a Redis `Service`.
| 10-redis-dapr-state-store.provisioners.yaml             | `dapr-state-store`          | (any)   | (none)                                  | `name`                    | Generates a Dapr StateStore `Component` pointing to a Redis `Service`.
| 10-dapr-subscription.provisioners.yaml                  | `dapr-subscription`         | (any)   | `pubsub`, `topic`                       | `name`, `topic`           | Generates a Dapr `Subscription` on a given Topic and `PubSub`.
| 10-dns-in-codespace.provisioners.yaml                   | `dns`                       | (any)   | (none)                                  | `host`, `url`             | Gets the forwarded port URL in current GitHub Codespace on port `8080`.
| 10-dns-with-url.provisioners.yaml                       | `dns`                       | (any)   | (none)                                  | `host`, `url`             | Outputs a `*.localhost` domain as the hostname and associated URL in http on port `8080`.
| 10-endpoint-with-microcks.provisioners.yaml             | `endpoint`                  | (any)   | `port`, `openapi_file`, `openapi_title` | `url`                     | Outputs an endpoint URL for connecting to an other workload (a Microcks mock is generated if not found).
| 10-env.provisioners.yaml                                | `environment`               | (any)   | (none)                                  | (none)                    | Loads environment variables from a local `.env` file.
| 10-hpa.provisioners.yaml                                | `horizontal-pod-autoscaler` | (any)   | (none)                                  | (none)                    | Generates an empty object because HPA is not supported in Docker Compose.
| 10-dmr-llm-model-via-curl-cmd.provisioners.yaml         | `llm-model`                 | (any)   | `model`                                 | `model`, `url`, `api-key` | Runs `curl` to download the model with the Docker Model Runner (DMR).
| 10-dmr-llm-model-via-curl-service.provisioners.yaml     | `llm-model`                 | (any)   | `model`                                 | `model`, `url`, `api-key` | Generates a `curl` service downloading the model with the Docker Model Runner (DMR).
| 10-dmr-llm-model-via-service-provider.provisioners.yaml | `llm-model`                 | (any)   | `model`                                 | `model`, `url`, `api-key` | Generates the LLM model service via the Docker Model Runner (DMR) provider.
| 10-ollama-llm-model-service.provisioners.yaml           | `llm-model`                 | (any)   | `model`                                 | `model`, `url`, `api-key` | Generates an Ollama service to pull a model from an existing local Ollama service.
| 10-service.provisioners.yaml                            | `service`                   | (any)   | (none)                                  | `name`                    | Outputs the name of the Workload dependency if it exists in the list of Workloads.

## For `score-k8s`

Example of usage with the `10-redis-dapr-state-store.provisioners.yaml` provisioner:
```bash
score-k8s init --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/dapr-state-store/score-k8s/10-redis-dapr-state-store.provisioners.yaml
```

| File | Type | Class | Params | Outputs | Description
| ---- | ---- | ----- | ------ | ------- | -----------
| 10-rabbitmq-dapr-pubsub.provisioners.yaml                  | `dapr-pubsub`               | (any)   | (none)                                                                 | `name`                                  | Generates a Dapr PubSub `Component` pointing to a RabbitMQ `StatefulSet`.
| 10-redis-dapr-pubsub.provisioners.yaml                     | `dapr-pubsub`               | (any)   | (none)                                                                 | `name`                                  | Generates a Dapr PubSub `Component` pointing to a Redis `StatefulSet`.
| 10-redis-dapr-state-store.provisioners.yaml                | `dapr-state-store`          | (any)   | (none)                                                                 | `name`                                  | Generates a Dapr StateStore `Component` pointing to a Redis `StatefulSet`.
| 10-dapr-subscription.provisioners.yaml                     | `dapr-subscription`         | (any)   | `pubsub`, `topic`                                                      | `name`, `topic`                         | Generates a Dapr `Subscription` on a given Topic and `PubSub`.
| 10-dns-in-codespace.provisioners.yaml                      | `dns`                       | (any)   | (none)                                                                 | `host`, `url`                           | Get the forwarded port URL in current GitHub Codespace on port `80`.
| 10-dns-with-url.provisioners.yaml                          | `dns`                       | (any)   | (none)                                                                 | `host`, `url`                           | Outputs a `*.localhost` domain as the hostname and associated URL in http on port `80`.
| 10-endpoint-with-microcks-cli.provisioners.yaml            | `endpoint`                  | (any)   | `port`, `openapi_file`                                                 | `url`                                   | Outputs an endpoint URL for connecting to an other workload (a Microcks mock is generated if not found).
| 10-env.provisioners.yaml                                   | `environment`               | (any)   | (none)                                                                 | (none)                                  | Loads environment variables from a local `.env` file.
| 10-hpa.provisioners.yaml                                   | `horizontal-pod-autoscaler` | (any)   | `maxReplicas`, `minReplicas`, `defaultTargetCPUUtilizationPercentage`  | (none)                                  | Generates an `HorizontalPodAutoscaler` manifest.
| 10-redis-helm-template.provisioners.yaml                   | `redis`                     | (any)   | (none)                                                                 | `host`, `password`, `port`, `username`  | Generates the manifests of the `bitnami/redis` Helm chart.
| 10-redis-helm-upgrade.provisioners.yaml                    | `redis`                     | (any)   | (none)                                                                 | `host`, `password`, `port`, `username`  | Deploys the `bitnami/redis` Helm chart in an existing cluster.
| 10-ingress-route.provisioners.yaml                         | `route`                     | (any)   | `host`, `path`, `port`                                                 | (none)                                  | Provisions an Ingress route on a shared Nginx instance.
| 10-ingress-with-netpol-route.provisioners.yaml             | `route`                     | (any)   | `host`, `path`, `port`                                                 | (none)                                  | Provisions an Ingress route on a shared Nginx instance, and a NetworkPolicy between them.
| 10-shared-gateway-httproute.provisioners.yaml              | `route`                     | (any)   | `host`, `path`, `port`                                                 | (none)                                  | Generates an `HTTPRoute` attached to a shared `Gateway`.
| 10-shared-gateway-httproute-with-netpol.provisioners.yaml  | `route`                     | (any)   | `host`, `path`, `port`                                                 | (none)                                  | Generates an `HTTPRoute` attached to a shared `Gateway`, and a NetworkPolicy between them.
| 10-service.provisioners.yaml                               | `service`                   | (any)   | (none)                                                                 | `name`                                  | Outputs the name of the Workload dependency if it exists in the list of Workloads.
| 10-service-with-netpol.provisioners.yaml                   | `service`                   | (any)   | (none)                                                                 | `name`                                  | Outputs the name of the Workload dependency if it exists in the list of Workloads, and generate NetworkPolicies between them.
