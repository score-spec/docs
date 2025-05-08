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
| `route`        | (any) | `host`, `path`, `port` |                                                                                                      | Provisions an HTTPRoute on a shared Nginx instance.                                     |
| `s3`           | (any) | (none)                 | `access_key_id`, `aws_access_key_id`, `aws_secret_key`, `bucket`, `endpoint`, `region`, `secret_key` | Provisions a dedicated S3 bucket with AWS-style credentials on a shared MinIO instance. |
| `service-port` | (any) | `port`, `workload`     | `hostname`, `port`                                                                                   | Outputs a hostname and port for connecting to another workload.                         |
| `volume`       | (any) | (none)                 | `source`                                                                                             | Creates a persistent volume that can be mounted on a workload.                          |

The source code of these provisioners implementations can be found in the [`score-k8s`'s default provisioners file](https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml).

Users are encouraged to write their own custom provisioners to support new resource types or to modify the default implementations above. Learn how to do that with this example [here](https://score.dev/blog/writing-a-custom-score-compose-provisioner-for-apache-kafka/).

A list of provisioners shared by the community can also be found [here](https://github.com/score-spec/community-provisioners). Users are encouraged to use them and contribute to this growing list of provisioners.
