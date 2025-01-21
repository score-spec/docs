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

`score-k8s` comes with out-of-the-box support for:

| Type           | Class     | Params                 | Output                                                             |
| -------------- | --------- | ---------------------- | ------------------------------------------------------------------ |
| `ampq`         | `default` | (none)                 | `host`, `port`, `username`, `password`, `vhost`                    |
| `dns`          | `default` | (none)                 | `host`                                                             |
| `mongodb`      | `default` | (none)                 | `host`, `port`, `username`, `password`, `name`, `connection`       |
| `mssql`        | `default` | (none)                 | `server`, `port`, `username`, `password`, `database`, `connection` |
| `mysql`        | `default` | (none)                 | `host`, `port`, `name` (aka `database`), `username`, `password`    |
| `postgres`     | `default` | (none)                 | `host`, `port`, `name` (aka `database`), `username`, `password`    |
| `redis`        | `default` | (none)                 | `host`, `port`, `username`, `password`                             |
| `route`        | `default` | `host`, `path`, `port` |                                                                    |
| `s3`           | `default` | (none)                 | `endpoint`, `region`, `bucket`, `access_key_id`, `secret_key`      |
| `service-port` | `default` | `workload`, `port`     | `hostname`, `port`                                                 |
| `volume`       | `default` | (none)                 | `source`                                                           |

These can be found in the default provisioners file. You are encouraged to write your own provisioners and add them to the `.score-k8s` directory (with the `.provisioners.yaml` extension) or contribute them upstream to the [default.provisioners.yaml](https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml) file.

Users are encouraged to write their own custom provisioners to support new resource types or to modify the implementations above. See [example here](https://score.dev/blog/writing-a-custom-score-compose-provisioner-for-apache-kafka/).
