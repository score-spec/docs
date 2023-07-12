---
title: "Annotations"
linkTitle: "Annotations"
weight: 5
description: >
  This section covers annotations, which are used to provide additional metadata for resources.
---

One of the key features of Score is the ability to attach additional metadata to your resources using Annotations.

## How to use annotations

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

## Why use Annotations?

There are several reasons why you might want to use Annotations in your Score files:

- **Informational hints**: Annotations are used to provide additional information to anyone or anything interacting with your resources, defined in your Score file. This could be helpful instructions for developers, or hints to tools and systems about how to handle a certain resource.
- **Shared resources**: Annotations are used to provide additional information to anyone or anything interacting with your resources, defined in your Score file. This could be helpful instructions for developers, or hints to tools and systems about how to handle a certain resource.
- **System-specific info**: Some systems and tools that interact with your Score resources might require certain metadata to be present to operate correctly, such as shared resources. Annotations provide a flexible way to supply this metadata.

### Annotations example

The following is an example of using an annotation to provide additional metadata for a database service.

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
    properties:
      host:
        type: string
        default: localhost
        required: true
      port:
        default: 5432
```

### Shared resource example

The following is an example of using an annotation to provide additional metadata for a shared resource.

```yml
resources:
  shared-db:
    metadata:
      annotations:
        score.humanitec.io/resId: shared.postgres-db
    type: postgres
    properties:
      host: localhost
      port: 5432
```

In this example, a shared PostgreSQL database is defined with the name `shared-db`.
The annotation `score.humanitec.io/resId` is used to provide a unique identifier for this shared resource (`shared.postgres-db`).
This identifier is used by the Humanitec system to map and manage this shared resource across multiple services or applications.

{{% alert %}}
The type and properties of the resource would depend on the type of resource you are trying to define.
{{% /alert %}}

Now, any service or application that needs to use this shared resource can simply reference the identifier `shared.postgres-db`.

## Annotations vs. extension files

Annotations are used to provide additional metadata as a hint for the individual Score file instead of using the extensions file.

It is recommended to use annotations instead of [extension files]({{< relref "../extensions/_index.md" >}}), as annotations help ensure consistency across your environments and deployments, since your Workload information is stored in one file.
