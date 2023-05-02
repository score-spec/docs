---
title: "Merge Deployment Deltas with score-humanitec"
linkTitle: "Merge Deployment Deltas"
weight: 6
draft: true
description: >
  Describes how to set merge Deployment Deltas.
---

As a developer, you may need to deploy multiple Workloads for your application simultaneously. Deploying multiple Workloads can be a complex process, as it requires you to manage the dependencies between the different Workloads. To simplify this process, you can use the --delta flag to deploy multiple Workloads as a single release.

In this tutorial, we will show you how to merge two workload deployments together using the --delta flag. We will use the Score implementation as an example to demonstrate the process, and you can follow along with the steps to merge your workload deployments seamlessly.

Before we dive into the tutorial, it's important to understand what a deployment delta is. A deployment delta is a representation of the changes made to your application deployment. It's a small, lightweight file that captures the changes between two deployments. By using deployment deltas, you can apply incremental changes to your application deployments, which makes it easier to manage and track changes.

Now, let's get started with merging two workload deployments together using the --delta flag.

## Example

First, create a sample Score implementation, for example, `score-one.yaml`. This Score implementation contains one Workload with one container that runs an Ubuntu image.

```yml
apiVersion: score.dev/v1b1
metadata:
  name: app-one

containers:
  container-id:
    image: ubuntu
```

Next, generate and upload the deployment delta to Humanitec using the following command:


```bash
score-humanitec delta -f ./score-one.yaml \
  --org organization_name \
  --app application_name \
  --env environment_type \
  --token humanitec_api_token
  --file ./one.yaml
```

After that, add a new file, `score-two.yaml`, which contains a second Workload with a container running a Debian image.

```yml
apiVersion: score.dev/v1b1
metadata:
  name: app-two

containers:
  container-id:
    image: debian
```

To update the existing delta, run the following command:

```bash
score-humanitec delta -f ./score-one.yaml \
  --org organization_name \
  --app application_name \
  --env environment_type \
  --token humanitec_api_token
  --file ./two.yaml
  --delta <you-delta-string>
```

Finally, merge the original one.yaml and the two.yaml using the following command:

```bash
score-humanitec delta -f ./score-one.yaml \
  --org organization_name \
  --app application_name \
  --env environment_type \
  --token humanitec_api_token
  --file ./one.yaml
  --delta <you-delta-string>
```

The output of the command will be a deployment delta file that contains the changes made to your application deployment. This deployment delta file can be used to apply the changes to your application deployment.



```json
{
  "id": "<you-delta-string>",
  "metadata": {
    "env_id": "development",
    "name": "Auto-generated (SCORE)",
    "url": "my-url",
    "created_by": "s-id",
    "created_at": "2023-01-01T...",
    "last_modified_at": "2023-01-01T...Z"
  },
  "modules": {
    "add": {
      "app-one": {
        "externals": null,
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "container-id": {
              "id": "container-id",
              "image": "ubuntu"
            }
          }
        }
      },
      "app-two": {
        "externals": null,
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "container-id": {
              "id": "container-id",
              "image": "debian"
            }
          }
        }
      }
    }
  }
}
```

Merging two workload deployments together using the `--delta` flag can simplify the deployment process by allowing you to deploy multiple Workloads as a single release. You can merge your Workload deployments seamlessly and manage your application deployments more effectively.