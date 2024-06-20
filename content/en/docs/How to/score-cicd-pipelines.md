---
title: "CI/CD pipelines with Score"
subtitle: "How to combine multiple Score implementations into a CI pipeline for testing and deployment"
linkTitle: CI/CD pipelines with Score
weight: 2
draft: false
description: >
    How to combine multiple Score implementations into a CI pipeline for testing and deployment
---

A big benefit of the Score workload specification is that it allows the same workload (or workloads) to be deployed in different contexts on different container runtimes. Often this is used to support local development, but it is equally valuable within the Continuous Integration (CI) pipeline and production deployment too. This guide illustrates how to combine the two reference Score implementations into a Github Actions CI/CD pipeline that uses [`score-compose`]({{< relref "/docs/score implementation/score-compose.md" >}}) for testing within the CI Pipeline, followed by [`score-k8s`]({{< relref "/docs/score implementation/score-k8s.md" >}}) for production deployment.

The instructions below are shown for Github Actions but can be used as inspiration for a similar process in any other CI tool.

## The Score file

Any valid Score file could be used for this guide as long as it uses resource types supported by `score-compose` and `score-k8s` CLIs or which are provided by custom provisioner files. In the example below, there is a simple container with a `dns` and `route` resource.

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: hello-world

containers:
  web:
    image: .

service:
  ports:
    web:
      port: 8080
      targetPort: 80

resources:
  example-dns:
    type: dns
  example-route:
    type: route
    params:
      port: 8080
      host: ${resources.example-dns.dns.host}
      path: /
```

Notice that the image is "." since the tag is not yet known until the build executes. The image is provided by a Docker file:

```Dockerfile
FROM nginx:latest
RUN echo "Score Example" > /usr/share/nginx/html/index.html
```

## Setting up a Github Actions Pipeline

In the source repository, the `.github/workflows/ci.yaml` file will contain the workflow definition.

### Triggers

The file starts with the definition of how the workflow is triggered. In this case, it will run on any pull requests and merges into the main branch. The pull requests must only use `score-compose` while the production release will use `score-k8s`.

```yaml
name: CI
on:
  pull_request:
    branches: [ "*" ]
  push:
    branches: [ "main" ]
```

### Building the image

The first job in the workflow will build and tag the image locally with a semantic version. This is not Score-specific and can be changed completely for the target project.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: paulhatch/semantic-version@v5.0.3
        id: semver
      - uses: docker/build-push-action@v5
        with:
          load: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.semver.outputs.version }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### Testing with `score-compose`

The next set of steps will focus on testing with `score-compose`. This provides value because it:

1. Tests that the `score.yaml` file is valid.
2. Tests that the resource provisioning and outputs work as expected.
3. Launches the container with all dependencies and runs a basic test to check that the web server works as expected. In reality, this can be replaced with an arbitrarily complex test suite for code coverage.

This helps to maximize the chance that the "release" step to production will succeed and result in a working application.

```yaml
      - uses: score-spec/setup-score@v2
        with:
          file: score-compose
          version: 0.15.6
          token: ${{ secrets.GITHUB_TOKEN }}
      - run: score-compose init
      - run: score-compose generate score.yaml --image=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.semver.outputs.version }}
      - run: docker compose up -d
      # Integration tests here
      - run: curl http://$(score-compose resources get-outputs 'dns.default#hello-world.example-dns' --format '{{.host}}'):8080 -v | tee | grep 'Score Example'
    outputs:
      version: ${{ steps.semver.outputs.version }}
```

### Publish the image and deploy the Kubernetes manifests

The second job in the workflow is the `release` job. This job pushes the image up to a remote container registry, converts the Score manifest into Kubernetes manifests, and then deploys those manifests to a target cluster.

First, the registry login, and image build, followed by the push.

```yaml
jobs:
  ...
  release:
    runs-on: ubuntu-latest
    needs: build-and-test
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/setup-buildx-action@v3
      - uses: docker/build-push-action@v6
        with:
          platforms: linux/amd64
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ needs.build-and-test.outputs.version }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

And finally, the steps to convert to Kubernetes manifests and deploy them. Notice that the `generate` call is setting the image to the tag that was just uploaded in the previous steps. The `azure/` actions are maintained by Azure, but are not Azure-specific and can deploy to any generic Kubernetes cluster as needed. Notice that this requires a `KUBECONFIG` secret variable set in the Github Actions workflow to authenticate with the target cluster.

```yaml
      - uses: score-spec/setup-score@v2
        with:
          file: score-k8s
          version: 0.1.5
          token: ${{ secrets.GITHUB_TOKEN }}
      - uses: azure/k8s-set-context@v2
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBECONFIG }}
      - run: score-k8s init
      - run: score-k8s generate score.yaml --image=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ needs.build-and-test.outputs.version }}
      - uses: azure/k8s-deploy@v1
        with:
          namespace: default
          manifests: ./manifests
```

This workflow can now test, push, and deploy a Score application. However, there is a problem that remains: the `.score-k8s/state.yaml` file.

### Maintaining `score-k8s` state

CI Workflows typically start with a clean slate every time they execute. No state is stored on disk between runs. However, `score-k8s` _does_ store unique data, random seeds, and non-hermetic attributes in a `.score-k8s/state.yaml` file. For best results, this file should be restored before running `score-k8s` generate.

In this example, the file is stored as a secret in the target Kubernetes cluster. First, it is downloaded before running init or generate:

```yaml
      - run: kubectl get secret -n default score-k8s-state-yaml -o json | jq '.data.content' > .score-k8s/state.yaml
```

And then it can be uploaded again after the deployment:

```yaml
      - run: kubectl create secret generic -n default score-k8s-state-yaml --from-file=content=.score-k8s/state.yaml
```

It's a good idea to restrict the concurrency of this job so that concurrent jobs do not overwrite files incorrectly:


```yaml
jobs:
  release:
    concurrency:
    group: ${{ github.workflow }}-${{ github.ref }}
```
