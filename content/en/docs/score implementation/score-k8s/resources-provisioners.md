---
title: "score-k8s resources provisioners"
linkTitle: "Resources provisioners"
description: "resources provisioners of score-k8s"
weight: 3
aliases:
- /docs/reference/score-cli/score-k8s/provisioners
- /docs/reference/score-cli/score-k8s/resources-provisioners
- /docs/reference/score-cli/score-k8s/resources
---

`score-k8s` comes with out-of-the-box support of the following provisioners, that you can list with this command `score-k8s provisioners list`:

| Type           | Class | Params                 | Output                                                                                               | Description                                                                             |
| -------------- | ----- | ---------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `ampq`         | (any) | (none)                 | `host`, `password`, `port`, `username`, `vhost`                                                      | Provisions a dedicated RabbitMQ vhost on a shared instance.                             |
| `dns`          | (any) | (none)                 | `host`                                                                                               | Outputs a *.localhost domain as the hostname.                                           |
| `mongodb`      | (any) | (none)                 | `connection`, `host`, `password`, `port`, `username`                                                 | Provisions a dedicated MongoDB database.                                                |
| `mssql`        | (any) | (none)                 | `connection`, `database`, `password`, `port`, `server`, `username`                                   | Provisions a dedicated database on a shared MS SQL server instance.                     |
| `mysql`        | (any) | (none)                 | `database`, `host`, `name`, `password`, `port`, `username`                                           | Provisions a dedicated MySQL database on a shared instance.                             |
| `postgres`     | (any) | (none)                 | `database`, `host`, `name`, `password`, `port`, `username`                                           | Provisions a dedicated database on a shared PostgreSQL instance.                        |
| `redis`        | (any) | (none)                 | `host`, `password`, `port`, `username`                                                               | Provisions a dedicated Redis instance.                                                  |
| `route`        | (any) | `host`, `path`, `port` | (none)                                                                                               | Provisions an HTTPRoute on a shared Nginx instance.                                     |
| `s3`           | (any) | (none)                 | `access_key_id`, `aws_access_key_id`, `aws_secret_key`, `bucket`, `endpoint`, `region`, `secret_key` | Provisions a dedicated S3 bucket with AWS-style credentials on a shared MinIO instance. |
| `service-port` | (any) | `port`, `workload`     | `hostname`, `port`                                                                                   | Outputs a hostname and port for connecting to another workload.                         |
| `volume`       | (any) | (none)                 | `source`                                                                                             | Creates a persistent volume that can be mounted on a workload.                          |

The source code of these provisioners implementations can be found in the [`score-k8s`'s default provisioners file](https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml).

Users are encouraged to write their own custom provisioners to support new resource types or to modify the default implementations above. Learn how to do that with this example [here](https://score.dev/blog/writing-a-custom-score-compose-provisioner-for-apache-kafka/).

A list of provisioners authored and shared by the community can also be found [here](https://github.com/score-spec/community-provisioners). Users are encouraged to use them and contribute to this growing list of community provisioners:

| Type                        | Class | Params                                                                | Outputs                                | Description
| --------------------------- | ----- | --------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------- |
| `dapr-pubsub`               | (any) | (none)                                                                | `name`                                 | Generates a Dapr PubSub `Component` pointing to a RabbitMQ `StatefulSet`.               |
| `dapr-pubsub`               | (any) | (none)                                                                | `name`                                 | Generates a Dapr PubSub `Component` pointing to a Redis `StatefulSet`.                  |
| `dapr-state-store`          | (any) | (none)                                                                | `name`                                 | Generates a Dapr StateStore `Component` pointing to a Redis `StatefulSet`.              |
| `dapr-subscription`         | (any) | `pubsub`, `topic`                                                     | `name`, `topic`                        | Generates a Dapr `Subscription` on a given Topic and `PubSub`.                          |
| `dns`                       | (any) | (none)                                                                | `host`, `url`                          | Get the forwarded port URL in current GitHub Codespace on port `80`.                    |
| `dns`                       | (any) | (none)                                                                | `host`, `url`                          | Outputs a `*.localhost` domain as the hostname and associated URL in http on port `80`. |
| `environment`               | (any) | (none)                                                                | (none)                                 | Loads environment variables from a local `.env` file.                                   |
| `horizontal-pod-autoscaler` | (any) | `maxReplicas`, `minReplicas`, `defaultTargetCPUUtilizationPercentage` | (none)                                 | Generates an `HorizontalPodAutoscaler` manifest.                                        |     
| `redis`                     | (any) | (none)                                                                | `host`, `password`, `port`, `username` | Generates the manifests of the `bitnami/redis` Helm chart.                              |
| `redis`                     | (any) | (none)                                                                | `host`, `password`, `port`, `username` | Deploys the `bitnami/redis` Helm chart in an existing cluster.                          |
| `route`                     | (any) | `host`, `path`, `port`                                                | (none)                                 | Provisions an Ingress route on a shared Nginx instance.                                 |
| `route`                     | (any) | `host`, `path`, `port`                                                | (none)                                 | Generates an `HTTPRoute` attached to a shared `Gateway`.                                |
| `service`                   | (any) | (none)                                                                | `name`                                 | Outputs the name of the Workload dependency if it exists in the list of Workloads.      |
