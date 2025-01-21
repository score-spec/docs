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

| Type            | Class     | Params                 | Output                                                                                                                                                          |
| --------------- | --------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amqp`          | `default` | (none)                 | `host`, `port`, `vhost`, `username`, `password`                                                                                                                 |
| `dns`           | `default` | (none)                 | `host`                                                                                                                                                          |
| `elasticsearch` | `default` | (none)                 | `host`, `port`, `username`, `password`                                                                                                                          |
| `environment`   | `default` | (none)                 | `${KEY}`                                                                                                                                                        |
| `kafka-topic`   | `default` | (none)                 | `host`, `port`, `name`, `num_partitions`                                                                                                                        |
| `mongodb`       | `default` | (none)                 | `host`, `port`, `username`, `password`, `connection`                                                                                                            |
| `mssql`         | `default` | (none)                 | `server`, `port`, `connection`, `database`, `username`, `password`                                                                                              |
| `mysql`         | `default` | (none)                 | `host`, `port`, `name` (aka `database`), `username`, `password`                                                                                                 |
| `postgres`      | `default` | (none)                 | `host`, `port`, `name` (aka `database`), `username`, `password`                                                                                                 |
| `redis`         | `default` | (none)                 | `host`, `port`, `username`, `password`                                                                                                                          |
| `route`         | `default` | `host`, `path`, `port` |                                                                                                                                                                 |
| `service-port`  | `default` | `workload`, `port`     | `hostname`, `port`                                                                                                                                              |
| `s3`            | `default` | (none)                 | `endpoint`, `access_key_id`, `secret_key`, `bucket`, with `region=""`, `aws_access_key_id=<access_key_id>`, and `aws_secret_key=<secret_key>` for compatibility |
| `volume`        | `default` | (none)                 | `source`                                                                                                                                                        |

These can be found in the default provisioners file. You are encouraged to write your own provisioners and add them to the `.score-compose` directory (with the `.provisioners.yaml` extension) or contribute them upstream to the [default.provisioners.yaml](https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml) file.

Users are encouraged to write their own custom provisioners to support new resource types or to modify the implementations above. See [example here](https://score.dev/blog/writing-a-custom-score-compose-provisioner-for-apache-kafka/).
