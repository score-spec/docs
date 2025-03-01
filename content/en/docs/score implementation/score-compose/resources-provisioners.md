---
title: "score-compose resources provisioners"
linkTitle: "Resources provisioners"
description: "resources provisioners of score-compose"
weight: 3
aliases:
- /docs/reference/score-cli/score-compose/provisioners
- /docs/reference/score-cli/score-compose/resources-provisioners
- /docs/reference/score-cli/score-compose/resources
---

`score-compose` comes with out-of-the-box support for:

| Type            | Class | Params                 | Output                                                                                                                                                          |
| --------------- | ----- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amqp`          | (any) | (none)                 | `host`, `port`, `vhost`, `username`, `password`                                                                                                                 |
| `dns`           | (any) | (none)                 | `host`                                                                                                                                                          |
| `elasticsearch` | (any) | (none)                 | `host`, `port`, `username`, `password`                                                                                                                          |
| `environment`   | (any) | (none)                 | `${KEY}`                                                                                                                                                        |
| `kafka-topic`   | (any) | (none)                 | `host`, `port`, `name`, `num_partitions`                                                                                                                        |
| `mongodb`       | (any) | (none)                 | `host`, `port`, `username`, `password`, `connection`                                                                                                            |
| `mssql`         | (any) | (none)                 | `server`, `port`, `connection`, `database`, `username`, `password`                                                                                              |
| `mysql`         | (any) | (none)                 | `host`, `port`, `name` (aka `database`), `username`, `password`                                                                                                 |
| `postgres`      | (any) | (none)                 | `host`, `port`, `name` (aka `database`), `username`, `password`                                                                                                 |
| `redis`         | (any) | (none)                 | `host`, `port`, `username`, `password`                                                                                                                          |
| `route`         | (any) | `host`, `path`, `port` |                                                                                                                                                                 |
| `service-port`  | (any) | `workload`, `port`     | `hostname`, `port`                                                                                                                                              |
| `s3`            | (any) | (none)                 | `endpoint`, `access_key_id`, `secret_key`, `bucket`, with `region=""`, `aws_access_key_id=<access_key_id>`, and `aws_secret_key=<secret_key>` for compatibility |
| `volume`        | (any) | (none)                 | `source`                                                                                                                                                        |
| mssql           | (any) | (none)                 | `server`, `port`, `connection`, `database`, `username`, `password`                                                                                              |

These can be found in the default provisioners file. You are encouraged to write your own provisioners and add them to the `.score-compose` directory (with the `.provisioners.yaml` extension) or contribute them upstream to the [default.provisioners.yaml](https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml) file.

Users are encouraged to write their own custom provisioners to support new resource types or to modify the implementations above. See [example here](https://score.dev/blog/writing-a-custom-score-compose-provisioner-for-apache-kafka/).
