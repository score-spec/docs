---
title: "Resource Annotations"
linkTitle: "Resource Annotations"
weight: 5
description: >
  This section covers resource annotations, which are used to provide additional metadata for resources.
---

Some score implementations require more information about a specific resource in order to provision it. Resource Annotations provide a standard way of providing implementation specific information about a resource.

## How to use Resource Annotations

Use annotations to provide additional metadata for resources. Annotations are defined as a map with keys and values that provide additional information to a resource description.

To provide an annotation for a resource, specify the following:

```yml
resources:
  your-resource:
    metadata:
      annotations:
        your-annotation-key: your-annotation-value
```

The resource `your-resource` has a single annotation with the key `your-annotation-key` and the value `your-annotation-value`.

## Why use Resource Annotations?

There are several reasons why you might want to use Resource Annotations in your Score files:

- **Informational hints**: Annotations are used to provide additional information to anyone or anything interacting with your resources, defined in your Score file. This could be helpful instructions for developers, or hints to tools and systems about how to handle a certain resource.
- **Shared resources**: Some resources may be also be used by or "shared" with other workloads defined in different score files or other deployment systems. The annotations could be used to track common IDs that may be used by other systems to know that this is the same instance of a resource.
- **System-specific info**: Some systems and tools that interact with your Score resources might require certain metadata to be present to operate correctly, such as shared resources. Annotations provide a flexible way to supply this metadata.

### Annotations example

The following is an example of using a Resource Annotation to provide additional metadata for a database resource.

```yml
apiVersion: score.dev/v1b1
metadata:
  name: hello-annotations

service:
  ports:
    www:
      port: 80
      targetPort: 8080

containers:
  hello:
    image: busybox
    command:
    - "/bin/echo"
    args:
    - "Hello Annotations"

resources:
  db:
    metadata:
      annotations:
        "my.org/version": "0.1"
    type: postgres
```

### Shared resource example

The following is an example of using a Resource Annotation supported by `score-humanitec` to indicate that the instance of a database resource is shared via a separate common `resId`.

```yml
resources:
  shared-db:
    metadata:
      annotations:
        score.humanitec.io/resId: shared.postgres-db
    type: postgres
```

In this example, a PostgreSQL database resource is defined with the name `shared-db`.
The annotation `score.humanitec.io/resId` is used to provide a indicate to Humanitec that this resources should be used with specific ID (`shared.postgres-db`).

Any other workload deployed into the same Humanitec application can also access the same database by adding the same annotation in their score file.

## Resource Annotations vs. extension files

Resource Annotations are used to provide additional metadata as a hint for the individual Score file instead of using the extensions file.

It is recommended to use Resource Annotations instead of [extension files]({{< relref "../extensions/_index.md" >}}), as annotations help ensure consistency across your environments and deployments, since your Workload information is stored in one file.
