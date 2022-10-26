---
title: "Quick Start: Resources with score-humanitec"
subtitle: "score-humanitec"
date: 2017-01-05
weight: 5
draft: true
description: >
  A quick start for score-humanitec.
---

A minimumn configuration for a Score Specification that will run on Humanitec is as follows.

```yaml
name: app-workload

containers:
 image: registry.humanitec.io/public/sample-service
```

# Environment setup with Humanitec

Resources referenced in `Score.yaml` should be pre-configured in Humanitec by DevOps (for each resource type). They are picked by the system at a deployment time in accordance with the Matching Criteria (also configured by DevOps).

<aside>
🚧 **TBD:** When creating a new Workload deployment draft `score-humanitec` doesn't add the external (shared) resource to the Workload automatically. Thus a manual intervention is needed to complete the deployment draft for brand-new workloads.

</aside>

## Score Configuration

The following `Score.yaml` configuration can be used to define the service and its dependencies:

<aside>
🚧 **TBD:** Humanitec enforces some limitations on the resource IDs. Specifically it should be at least 3 characters long. Thus the resource ID used in the example bellow (for example `db`) isn't a valid resource ID. However, Humanitec API gladly accepts it and creates a new draft successfully.

</aside>

```yaml
name: backend

container:
  image: busybox
  command:
  - /bin/sh
  - -c
  - while true; do printenv; echo ...sleeping 10 sec...; sleep 10; done
  variables:
    PORT: 8080
    CONNECTION_STRING: postgresql://${resources.db.username}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.name}

resources:
  db:
    type: postgres
    properties:
      host:
        default: localhost
      port:
        default: 5432
      name:
      username:
        secret: true
      password:
        secret: true
```

## Executing `score-humanitec`

Run the `score-humanitec` CLI tool to create a new Humanitec deployment:

<aside>
💡 To authenticate with Humanitec API a static token should be created as described in [this section](https://api-docs.humanitec.com/#section/Introduction/Authentication).

</aside>

```bash
score-humanitec run -f /tmp/Score.yaml \
  --org my-org --app my-app --env development \
  --url https://dev-api.humanitec.io --token h96...stc
```

This command should create a new deployment in the `development` environment for the `my-app` application, and output the resulting deployment delta details:

```json
{
  "id": "5b27ad0f2e6debd7cffb5d7b6acd6c6a9a3af36e",
  "metadata": {
    "env_id": "development",
    "name": "Score -based deployment",
    "created_by": "cb7a2cc2-77ae-46f0-948a-05fdbf1a1eed",
    "created_at": "2022-06-09T08:24:00.262216415Z",
    "last_modified_at": "2022-06-09T08:24:00.262216415Z"
  },
  "modules": {
    "add": {
      "backend": {
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "backend": {
              "command": [
                "/bin/sh",
                "-c",
                "while true; do printenv; echo ...sleeping 10 sec...; sleep 10; done"
              ],
              "id": "backend",
              "image": "busybox",
              "variables": {
                "PORT": "8080",
                "CONNECTION_STRING": "postgresql://${externals.db.username}:${externals.db.password}@${externals.db.host}:${externals.db.port}/${externals.db.name}"
              }
            }
          }
        }
      }
    }
  }
}
```

## Deploy the draft with Humanitec

To deploy the draft from Humanitec UI follow the link:

```bash
https://dev-app.humanitec.io/orgs/{org_id}/apps/{app_id}/envs/{env_id}/draft/{deploy_id}/workloads
```

To deploy the draft with Humanitec API issue a `POST` request to `https://dev-api.humanitec.io/orgs/{org_id}/apps/{app_id}/envs/{env_id}/deploys` as described in [this section](https://api-docs.humanitec.com/#section/Introduction/Authentication/orgs/{orgId}/apps/{appId}/envs/{envId}/deploys):

```bash
curl -v -X POST -H 'Authorization: Bearer qwe...rty' \
  --data '{ "delta_id": "5b2...36e", "comment": "Score draft" }' \
  https://dev-api.humanitec.io/orgs/my-org/apps/my-app/envs/development/deploys
```

## Working with multiple environments

With Humanitec and Score it is very simple to deploy the same Workload into multiple environments. `score-humanitec` CLI tool can create deployments for each target environment, while the rest of the configuration could be set-up once by DevOps.
