---
title: "Reference"
linkTitle: "Reference"
weight: 9
description: >
  Low level reference docs for your project.
---

## Resources definition

Score allows users to define the resources their service relies on. It does not declare who, when, and how it should provision the resource in the target environment. The only purpose for the resource definition is to validate resources references in the same Score file.

The resource could be anything. Score doesn't differentiate resources by types. It is up to Score implementation (CLI tool) to resolve the resource by name, type, or any other meta information available.

## Schema

```yaml
resources:
  [resource-name]:
    type: [resource-type]
    properties:                   # optional
      [property-name]:
        type: [property-type]     # optional
        default: [value]          # optional
        required: [true|false]    # false by default
        secret: [true|false]      # false by default
```

- `resource-name`: (required) specifies the resource name.
  **Type**: string.
  **Constraints**: alphanumeric string.
  - `resource-type`: specifies the resource in the target environment.
    **Type**: string.
    **Constraints**: alphanumeric string.
  - `properties` is a free collection of properties definitions that should be available on the resource. Only defined properties can be referenced in other places in Score file.
    - `property-name`: is an alphanumeric string (no spaces, only `_` and `-` are allowed in names) that can be used to reference the resource property in other places in Score file.
      - `default`: specifies a value that can be defined for the property.
      - `type`: specifies a property type.
      - `required`: specifies a property as required.
      - `secret`: specifies a property value as a secret.

## Reserved Resource Types

In general, `resource-type` has no meaning for Score, but it can affect how targeted Score CLI tool resolves the resource. Following are the conventions on the “reserved” resource types:

| resource-type                  | Score-compose                                                                                                                   | Score-humanitec                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| environment                    | Translates to the environment variables references.                                                                             |                                                                                                                                 |
| For example: ${PROPERTY-NAME}. | Translates to the application values references. For example: ${values.property-name}.                                          |                                                                                                                                 |
| volume                         | Translates into a reference to the external volume. This reference is usually used in a container’s volume mount specification. | Translates into a reference to the external volume. This reference is usually used in a container’s volume mount specification. |
| workload                       | N/A                                                                                                                             | Translates to the module properties references. For example: ${modules.workload-name.property-name}.                            |

## Referencing Resources

Declared resources and their properties can be referenced in other places in Score file with the following template:

`${resource.[resource-name].[property-name]}`

<aside>
🚫 If the referenced resource or its property has not been defined, the Score implementation (CLI tool) should report a syntax error.

</aside>

It is up to the Score implementation (CLI tool) how and when the resource reference is resolved, and when the referenced values substitution occurs.

For example, `score-compose` would convert resource properties into environment variables references in resulting `compose.yaml` configuration file, and produce a reference `.env` file that the user can then populate ([read more](https://docs.docker.com/compose/environment-variables/#the-env-file)).

Simple Score file with a single resource:

```yaml
name: backend

container:
  image: busybox
  command:
  - /bin/sh
  - -c
  - while true; do printenv; echo ...sleeping 10 sec...; sleep 10; done
  variables:
    CONNECTION_STRING: postgresql://${resources.db.username}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.name}

resources:
  db:
    type: postgres
    properties:
      host:
      port:
        default: 5432
      name:
      username:
        secret: true
      password:
        secret: true
```
