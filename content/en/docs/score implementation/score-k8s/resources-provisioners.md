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

| Type           | Class | Params                 | Output                                                             |
| -------------- | ----- | ---------------------- | ------------------------------------------------------------------ |
| `ampq`         | (any) | (none)                 | `host`, `port`, `username`, `password`, `vhost`                    |
| `dns`          | (any) | (none)                 | `host`                                                             |
| `mongodb`      | (any) | (none)                 | `host`, `port`, `username`, `password`, `connection`       |
| `mssql`        | (any) | (none)                 | `server`, `port`, `username`, `password`, `database`, `connection` |
| `mysql`        | (any) | (none)                 | `host`, `port`, `name` (aka `database`), `username`, `password`    |
| `postgres`     | (any) | (none)                 | `host`, `port`, `name` (aka `database`), `username`, `password`    |
| `redis`        | (any) | (none)                 | `host`, `port`, `username`, `password`                             |
| `route`        | (any) | `host`, `path`, `port` |                                                                    |
| `s3`           | (any) | (none)                 | `endpoint`, `region`, `bucket`, `access_key_id`, `secret_key`      |
| `service-port` | (any) | `workload`, `port`     | `hostname`, `port`                                                 |
| `volume`       | (any) | (none)                 | `source`                                                           |

These can be found in the default provisioners file. You are encouraged to write your own provisioners and add them to the `.score-k8s` directory (with the `.provisioners.yaml` extension) or contribute them upstream to the [default.provisioners.yaml](https://github.com/score-spec/score-k8s/blob/main/internal/provisioners/default/zz-default.provisioners.yaml) file.

Users are encouraged to write their own custom provisioners to support new resource types or to modify the implementations above. See [example here](https://score.dev/blog/writing-a-custom-score-compose-provisioner-for-apache-kafka/).
