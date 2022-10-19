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

Next, we will want to use a run a draft of our Humanite Delta.
Next, use the `score-humanitec draft` command to run a draft of our Humanitec Delta.

To do that, we will need to provide an organization name, application name, environment, and a personal token.

```bash
score-humanitec draft --org organization-name --app application-name  --env env-name --token token-information
```

Replace `organization-name` with the name of your Organization.
Replace `application-name` with the name of your application.
Replace `env-name` with the name of your environment.
Replace `token-information` with your token.

{{< tabs >}}
{{% tab name="Score" %}}

```yaml
name: app-workload

container:
  image: registry.humanitec.io/public/sample-service
  command:
    - /bin/sh
  variables:
    CONNECTION_STRING: postgresql://${resources.db.username}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.name}

resources:
  sql:
    type: postgres
  storage:
    type: volume
    target: /usr/share/humanitec
```

{{% /tab %}}
{{% tab name="Humanitec" %}}

The output of `score-humanitec` command.

```json
{
  "id": "1234567890",
  "metadata": {
    "env_id": "env-name",
    "name": "Auto-generated (SCORE)",
    "url": "https://registry.humanitec.io/public/sample-service/envs/test/draft/1234567890",
    "created_by": "s-1234567890",
    "created_at": " ",
    "last_modified_at": " "
  },
  "modules": {
    "add": {
      "": {
        "externals": {
          "sql": {
            "type": "postgres"
          },
          "storage": {
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
