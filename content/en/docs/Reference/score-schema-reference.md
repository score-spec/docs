---
title: "Score schema reference"
linkTitle: "Score schema"
weight: 9
description: >
  Reference documentation for the Score Specification.
---

## Score schema

The Score Specification is a yaml file that contains the following top-level schema definitions.
Use these definitions to describe a single {{< glossary_tooltip text="Workload" term_id="workload" >}}.

- [`containers`](#container-definition): defines how the Workload's tasks are executed.
- [`resources`](#resources-definition): defines dependencies needed by the Workload.
- [`service`](#service-definition): defines how an application can expose its resources when executed. Allows one or more `ports` to be exposed.

## Resources definition

The Resource section of the Score Specification allows users to describe the relationship between workloads and their dependent resources in an environment-agnostic way.

The resource could be anything. Score doesn't differentiate resources by types.

It is up to {{< glossary_tooltip text="Platform CLI" term_id="platform-cli" >}} to resolve the resource by name, type, or any other meta information available.

### Resource properties

```yaml
resources:
  [resource-name]:
    type: [resource-type]
    properties:                   # optional
      [property-name]:
        type: [property-type]     # optional
        default: [value]          # optional
        required: [true | false]    # false by default
        secret: [true | false]      # false by default
```

**`resources`**: defines dependencies needed by the Workload.

**`resource-name`**: a required property that specifies the resource name.

- **Type**: string.
- **Constraints**: alphanumeric string.

`resource-type`: specifies the resource in the target environment.

- **Type**: string.
- **Constraints**: alphanumeric string.

**`properties`**: specifies properties definition that are available to the resource. Set properties that can be referenced in other places in the Score specification file. For more information, see [Referencing Resources](#referencing-resources).

**`property-name`**: used to reference the resource property in other places in Score file.

- **Type**: string.
- **Constraints**: alphanumeric string.

  - `default`: specifies a value that can be defined for the property.
  - `type`: specifies a property type.
  - `required`: specifies a property as required.
  - `secret`: specifies a property value as a secret.

### Reserved resource types

In general, `resource-type` has no meaning for Score, but it can affect how targeted Platform CLI tool resolves the resource. Following are the conventions are _reserved_ resource types:

| Resource type | `score-compose`                                                                                                                 | `score-humanitec`                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `environment` | Translates to the environment variables references. For example: `${PROPERTY-NAME}`.                                            | Translates to the application values references. For example: `${values.property-name}`.                                        |
| `volume`      | Translates into a reference to the external volume. This reference is usually used in a container’s volume mount specification. | Translates into a reference to the external volume. This reference is usually used in a container’s volume mount specification. |
| `workload`    | N/A                                                                                                                             | Translates to the module properties references. For example: `${modules.workload-name.property-name}`.                          |

### Referencing Resources

Declared resources and their properties can be referenced in other places in Score file with the following template.

```yaml
${resource.[resource-name].[property-name]}
```

{{% alert %}}

If the referenced resource or its property has not been defined, the {{< glossary_tooltip text="Platform CLI" term_id="platform-cli" >}} should report a syntax error.

{{% /alert %}}

### Resource example

It is up to the Platform CLI on how and when the resource reference is resolved, and when the referenced values' substitution occurs.

For example, `score-compose` would convert resource properties into environment variables references in resulting `compose.yaml` configuration file, and produce a reference `.env` file that the user can then populate. For more information, see [the.env file](https://docs.docker.com/compose/environment-variables/#the-env-file).

The following Score file contains a single resource.

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

## Service definition

A `service` contains one or more networks ports that can be exposed to external applications.

The `port` specification can include `public port` and should include `container port`.

```yml
service:
  ports:
    port-name: string                  # (required)
      port: integer                    # (required)
      protocol: string                 # (optional)
      hostIP: integer                  # (optional)
      hostPort: integer                # (optional)
```

`port-name`: describes the name of the port.

`port`: contains the port to expose to an external application.

`protocol`: describes the transportation layer protocol.

- Defaults: `TCP`
- Valid values: `SCTP` | `TCP` | `UDP`

`hostIP`: describes the host IP to bind to.

`hostPort`: describes the port to expose on the host. If the `hostPort` isn't specified, then it defaults to the required `port` property in the container.

### Service example

The following example advertises two public ports `80`, which points to the container's port `8080`, and `8080`, which also points to the container's port.

```yml
name: hello-world

service:
  ports:
    www:
      port: 8080
      hostPort: 80
    admin:
      port: 8080

# . . .
```

## Container definition

The {{< glossary_tooltip text="Workload" term_id="workload" >}} container’s specification describes how the Workload's tasks are executed.

```yml
containers:
  container-id:
    image: [image-name]
    command:                                # (Optional)
    args:                                   # (Optional)
    variables:                              # (Optional)
      [variable-name]: [object]

    files:                                  # (Optional) Specifies extra files to mount
    - target: [path/to/file-name.yaml]
      mode:                                 #    - Access mode
      content:                              #    - Inline content (supports templates)

    volumes:                                # (Optional)
    - source:
      path:                                 # (Optional)
      target:
      read_only: [true | false]             # (Optional)

    resources:                              # (Optional)
      limits:                               # (Optional)
        memory:
        cpu:
      requests:                             # (Optional)
        memory:
        cpu:

    livenessProbe:                          # (Optional)
      httpGet:
        path:
        port:
    readinessProbe:                         # (Optional)
      httpGet:
        path:
        port:
        httpHeaders:                        # (Optional
        - name:
          value:
```

`container-id`: container’s specification describes how the Workload's tasks are executed.

`image`: Docker image name and tag

`command`: overrides image entry point.

`args`: overrides entry point arguments.

`variables`: specifies environment variables.

`files`: specifies extra files to mount.

- `target`: specifies file path and name.
- `mode`: specifies access mode.
- `content`: specifies inline content and supports templates.

`volumes`: specifies volumes to mount.

- `source`: specifies external volume reference.
- `path` specifies a sub path in the volume.
- `target`: specifies a target mount on the container.
- `read_only`: if true, mounts as read only.

<!-- Optional CPU and memory resources needed -->

`limits`: maximum allowed memory.

- `memory`: a string value representing the maximum allowed memory.
- `cpu`: a string value representing the maximum allowed CPUs.

`requests`: minimum required memory.

- `memory`: a string value representing the minimum required memory.
- `cpu`: a string value representing the minimum required CPUs.

`livenessProbe`: indicates if the container is running.

- `httpGet`: performs an HTTP `Get` on a specified path and port.
  - `path`: specifies a path for the HTTP `Get` method.
  - `port`: specifies a port for the HTTP `Get` method.

`readinessProbe`: indicates if the container is ready to respond to requests.

- `httpGet`: performs an HTTP `Get` on a specified path and port.
  - `path`: specifies a path for the HTTP `Get` method.
  - `port`: specifies a port for the HTTP `Get` method.

  - `httpHeaders`: headers to set in the request. Allows repeated headers.
    - `name`: custom header to set in the request.
    - `value`: specifies a value.

### Container example

```yml
containers:
  container-id:
    image: busybox                            # Docker image name and tag

    command:                                  # (Optional) Overrides image entry point
    - "/bin/echo"
    args:                                     # (Optional) Overrides entry point arguments
    - "Hello $(FRIEND)"

    variables:                                # (Optional) Specifies environment variables
      FRIEND: World!

    files:                                  # (Optional) Specifies extra files to mount
    - target: /etc/hello-world/config.yaml  #    - Target file path and name
      mode: "666"                           #    - Access mode
      content:                              #    - Inline content (supports templates)
      - "---"
      - ${resources.env.APP_CONFIG}

    volumes:                                # (Optional) Specifies volumes to mount
    - source: ${resources.data}             #    - External volume reference
      path: sub/path                        #    - (Optionla) Sub path in the volume
      target: /mnt/data                     #    - Target mount path on the container
      read_only: true                       #    - (Optional) Mount as read-only

    resources:                              # (Optional) CPU and mempry resources needed
      limits:                               #    - (Optional) Maximum alowed
        memory: "128Mi"
        cpu: "500m"
      requests:                             #    - (Optional) Minimal required
        memory: "64Mi"
        cpu: "250m"

    livenessProbe:                          # (Optional) Liveness probe
      httpGet:                              #    - Only HTTP GET is supported
        path: /alive
        port: 8080
    readinessProbe:                         # (Optional) Liveness probe
      httpGet:                              #    - Only HTTP GET is supported
        path: /ready
        port: 8080
        httpHeaders:                        #    - (Optional) HTTP Headers to include
        - name: Custom-Header
          value: Awesome
```
