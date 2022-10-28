---
title: "Humanitec"
linkTitle: "Humanitec"
weight: 4
description: >
  This page is an overview of Score for Humanitec.
---

{{% alert %}}

> If at any point you need help, `score-humanitec --help` from your terminal window.

{{% /alert %}}

Use `score-humanitec` to run the target Score implementation tool and output the deployment delta details.

To deploy an updated service to the remote environment with `score-humanitec` run the following command.

```bash
score-humanitec run \
  -f ./backend/score.yaml \
  --org humanitec-demo --app score-demo --env development --token $HT_TOKEN \
  --image=registry.humanitec.io/humanitec-demo/score-demo-backend:0.3.0
```

The following is the output of the previous command.

```json
{
  "id": "0025d1b6b90864ac3995998562e353290e458122",
  "metadata": {
    "env_id": "development",
    "name": "PAWS-based deployment",
    "created_by": "0110db28-90aa-4c42-bf52-9c49718da796",
    "created_at": "2022-06-14T12:40:42.895793478Z",
    "last_modified_at": "2022-06-14T12:40:42.895793478Z"
  },
  "modules": {
    "add": {
      "backend": {
        "externals": {
          "database": {
            "type": "postgres"
          }
        },
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "backend": {
              "id": "backend",
              "image": "registry.humanitec.io/humanitec-demo/paws-demo-backend:0.3.0",
              "variables": {
                "CONNECTION_STRING": "postgresql://${externals.database.username}:${externals.database.password}@${externals.database.host}:${externals.database.port}/${externals.database.name}",
                "DEBUG": "false",
                "PORT": "8080"
              }
            }
          }
        }
      }
    }
  }
}
```

**Results**: you can now view and deploy this preview with the Humantiec Web UI or API.

## Deploy with Humanitec Web UI

The following steps will deploy the deployment delta to your Humanitec organization through the Web UI.

## Deploy with Humanitec API

The following steps will deploy the deployment delta to your Humanitec organization through the API.
