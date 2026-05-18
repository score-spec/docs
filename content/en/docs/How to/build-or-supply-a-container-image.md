---
title: "Build or supply a container image"
linkTitle: "Build or supply images"
weight: 6
description: >
    How to build a container image from local source or supply a pre-built
    image with `score-compose` and `score-k8s`.
---

Every container in a Score workload needs a container image. To keep the
`score.yaml` file portable across environments, Score lets you leave the image
unresolved in the specification and choose how to resolve it when you run
`generate`. You have two options:

- **Supply a pre-built image** that is already published to a registry.
- **Build an image from local source** as part of the `generate` step.

This guide covers both options and explains when to use each.

## The image placeholder

Set the container `image` field to `.` to mark it as resolved at generation
time:

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: hello-world
containers:
  hello-world:
    image: .
```

The `.` placeholder keeps registry names and tags out of the specification. The
implementation resolves the placeholder when you run `generate`. A `generate`
command that leaves the placeholder unresolved fails with an error.

A container that already points to a published image, such as
`image: nginx:1-alpine`, needs no further action. The implementation uses that
image without change.

## Supply a pre-built image

Use the `--image` flag when the image is already built and pushed to a
registry. Continuous integration pipelines are the most common case: an earlier
job builds and pushes the image, then the `generate` step references it by tag.

The `--image` flag replaces the `.` placeholder for every container that uses
it.

{{< tabs name="supply-image">}}
{{< tab name="score-compose" include="./included/build-supply-image-score-compose.md" />}}
{{< tab name="score-k8s" include="./included/build-supply-image-score-k8s.md" />}}
{{< /tabs >}}

## Build an image from local source

`score-compose` can build the container image from local source as part of the
generated Docker Compose file. Use the `--build` flag to point a container at a
build context. This option suits local development, where rebuilding the image
on each change is faster than pushing to a registry.

The `--build` flag accepts two formats:

- A short form that takes a directory: `--build=CONTAINER=./dir`.
- A JSON form that takes a build context and other options, such as image tags:
  `--build=CONTAINER={"context":"./dir","tags":["my-image:local"]}`.

The following example initializes a workspace, then builds the `hello-world`
container from the current directory and tags the resulting image:

```bash
CONTAINER_NAME=hello-world
CONTAINER_IMAGE=${CONTAINER_NAME}:local

score-compose init --no-sample
score-compose generate score.yaml \
  --build "${CONTAINER_NAME}={\"context\":\".\",\"tags\":[\"${CONTAINER_IMAGE}\"]}"
```

The generated `compose.yaml` contains a `build` block for the container instead
of a fixed `image` reference:

```yaml
services:
  hello-world-hello-world:
    build:
      context: .
```

Run `docker compose up` with the `--build` flag so Docker builds the image
before it starts the containers:

```bash
docker compose up --build -d
```

`score-k8s` does not build images. Kubernetes runs pre-built images pulled from
a registry, so supply an image with `--image` when you target `score-k8s`.

## When to build and when to supply

| Scenario                                  | Recommended approach                    |
| ----------------------------------------- | --------------------------------------- |
| Local development with `score-compose`    | Build from source with `--build`        |
| Quick iteration on application code       | Build from source with `--build`        |
| CI/CD pipeline                            | Supply a pre-built image with `--image` |
| Deployment with `score-k8s`               | Supply a pre-built image with `--image` |
| The image is already published and stable | Reference it directly in `score.yaml`   |

## Related pages

- [`score-compose` CLI reference](/docs/score-implementation/score-compose/cli/)
- [`score-k8s` CLI reference](/docs/score-implementation/score-k8s/cli/)
- [CI/CD pipelines with Score](/docs/how-to/score-cicd-pipelines/)
- [Specify configuration overrides](/docs/how-to/overrides/)
