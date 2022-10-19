---
title: "Score for Humanitec"
linkTitle: "Score for Humanitec"
weight: 4
description: >
  Overview section on how to compose a Score file for a Humanitec application.
---

## Overview

The primary goal of the Score file is to quickly and easily describe how to compose and run {{< glossary_tooltip text="Workloads" term_id="workload" >}}. The following covers what you need to know to compose a Score file and run it in Humanitec application.


## Building blocks

At it's core, the Score file needs a `name` and a `container` to run.

### Containers

In the following example, the Score tab shows the minimum configuration needed to run a Workload and the Humanitec tab shows the output of the `score-humanitec run --env development` command.

The `score.yaml` file contains a Workload named `app-workload` and specifies a container image for Humanitec as `registry.humanitec.io/public/sample-service`.

{{< tabs >}}
{{% tab name="Score" %}}

The minimum configuration needed to run a Workload.

```yml
name: app-workload

container:
  container-id:
    image: registry.humanitec.io/public/sample-service
```

{{% /tab %}}
{{% tab name="Humanitec" %}}

The output of the `score-humanitec run --env development` command.

```json
{
  "metadata": {
    "env_id": "development",
    "name": "Auto-generated (SCORE)"
  },
  "modules": {
    "add": {
      "": {
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {}
        }
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

In the next step, you'll want to think about is to specify resources for your container.

In the following example, we specify two types of resources. A PostGres Database and storage.

{{< tabs >}}
{{% tab name="Score" %}}

```yml
name: app-workload

container:
  image: registry.humanitec.io/public/sample-service

resources:
  dba:
    type: postgres
  volume:
    type: volume
```

{{% /tab %}}
{{% tab name="Humanitec" %}}

The output of the `score-humanitec run --env development` command.

```json
{
  "metadata": {
    "env_id": "development",
    "name": "Auto-generated (SCORE)"
  },
  "modules": {
    "add": {
      "": {
        "externals": {
          "dba": {
            "type": "postgres"
          },
          "volume": {
            "type": "volume"
          }
        },
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {}
        }
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

This variable points a reference to the database resource, username, password, host, port, and name.

The values to these variables are stored in a `.env` file. For example, you might have a directory to store these variables like `/tmp/temp-service.env`.
