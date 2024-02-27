---
title: "Score Specification reference"
linkTitle: "Score specification"
weight: 9
description: >
    Reference implementation for the Score Specification.
---

## Score Specification definitions

The Score Specification is a YAML file that contains the following top-level reference definitions.

Use these definitions to describe a single Workload.

- [Workload definition](#workload-definition): (required) defines the metadata and `apiVersion`.
- [`containers`](#container-definition): (required) defines how the Workload's tasks are executed.
- [`resources`](#resources-definition): (optional) defines dependencies needed by the Workload.
- [`service`](#service-definition): (optional) defines how an application can expose its resources when executed.

## Workload definition

Describes the Score Specification API version and metadata. Data in the metadata section can be referenced throughout other parts of the specification as well, for example `${metadata.name}`.

```yaml
apiVersion: string

metadata:
  name: string
```

`apiVersion`: the declared Score Specification version.

- **Valid options**: `score.dev/v1b1`

`metadata`: the metadata description of your Workload.

- `name`: specifies a string that can describe your Workload.

You can reference any information available in the metadata section too.

### Workload example

The following is a top level description for a Workload.

```yaml
apiVersion: score.dev/v1b1

metadata:
  name: hello-world
service:
  ports:
  # . . .
containers:
  my-container:
  # . . .
resources:
  env:
  # . . .
```

## Resources definition

The Resource section of the Score Specification allows users to describe the relationship between Workloads and their dependent resources in an environment-agnostic way. The purpose of the Resource section is to validate resource references in the same Score file.

Resources can be anything and Score doesn't differentiate resources by types. The resource section can be used to provision multiservice setups with platforms like Docker Compose.

It is up to {{< glossary_tooltip text="Score implementation (CLI)" term_id="score" >}} to resolve the resource by name, type, or any other meta information available.

### Resources

```yaml
resources:
  [resource-name]:
    metadata:                       # optional
      annotations:                  # optional
        [annotation-name]: [value]
    type: [resource-type]
    class: [resource-class]
```

**`resources`**: defines dependencies needed by the Workload.

**`resource-name`**: a required property that specifies the resource name.

- **Type**: string.
- **Constraints**: alphanumeric characters and dashes "-".

**`metadata`**: an optional property that specifies additional resource metadata.

- **`Type`**: object.
  - **`annotations`**: an optional property that specifies metadata annotations.
    - **`Type`**: object.
    - **`Constraints`**: key-value pairs with alphanumeric characters and dashes "-".

`type`: specifies the resource type.

- **Type**: string.
- **Constraints**: alphanumeric characters and dashes "-".

`class`: a specialisation of the resource type. For example, a workload that needs an externally accessible storage bucket might set the class to external while the workload that requires an encrypted resource might have a class of sensitive.

- **Type**: string.
- **Constraints**: alphanumeric characters and dashes "-".

### Reserved resource types

In general, `resource-type` has no meaning for Score, but it can affect how the targeted Score implementation tool resolves the resource. The following conventions are _reserved_ resource types.

| Resource type | `score-compose`                                                                                                                 | `score-humanitec`                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `environment` | Translates to the environment variables references. For example: `${PROPERTY-NAME}`.                                            | Translates to the application values references. For example: `${values.property-name}`.                                                                     |
| `volume`      | Translates into a reference to the external volume. This reference is usually used in a container’s volume mount specification. | Translates into a reference to the external volume. This reference is usually used in a container’s volume mount specification.                              |
| `service`     | N/A                                                                                                                             | Translates to the module properties references.                                                                                                              |
| `workload`    | N/A                                                                                                                             | Reserved resource type. Its usage may lead to compatibility issues with future releases of [score-humanitec](https://github.com/score-spec/score-humanitec). |

### Referencing resources

Resources declared in the resources section of a Score file can be used in substitution patterns in different places.

### Resource example

The Score implementation (CLI) resolves resource references and performs value substitution in a specific manner.

For example, when using the `score-compose` command, resource references within substitution patterns are replaced with corresponding environment variable references in the resulting `compose.yaml` configuration file. To gather all the required environment variables, you can utilize the `--env-file` command line parameter to generate a reference `.env` file. This file can be populated with the necessary values by the user.
For more instructions, see to the [.env file documentation](https://docs.docker.com/compose/environment-variables/#the-env-file).

The following Score file contains a single resource.

```yaml
apiVersion: score.dev/v1b1

metadata:
  name: backend

containers:
  container-id:
    image: busybox
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo Hello $${FRIEND}!; sleep 5; done"]
    variables:
        CONNECTION_STRING: postgresql://${resources.db.username}:${resources.db.password}@${resources.db.host}:${resources.db.port}/${resources.db.name}

resources:
  db:
    type: postgres
```

## Service definition

A `service` contains one or more networks ports that can be exposed to external applications.

The `port` specification can include `public port` and should include `container port`.

```yaml
service:
  ports:
    port-name: string        # (required)
      port: integer          # (required)
      protocol: string       # (optional)
      targetPort: integer    # (optional)
```

`port-name`: describes the name of the port.

`port`: contains the port to expose to an external application.

`protocol`: describes the transportation layer protocol.

- Defaults: `TCP`
- Valid values: `TCP` | `UDP`

`targetPort`: describes the port to expose on the host. If the `targetPort` isn't specified, then it defaults to the required `port` property in the container.

### Service example

The following example advertises two public ports `80`, which points to the container's port `8080`, and `8080`, which also points to the container's port.

```yaml
apiVersion: score.dev/v1b1

metadata:
  name: web-app

service:
  ports:
    www:
      port: 80
      targetPort: 8080
    admin:
      port: 8080
      protocol: UDP
# . . .
```

## Container definition

The {{< glossary_tooltip text="Workload" term_id="workload" >}} container’s specification describes how the Workload's tasks are executed.

```yaml
image: string
command: []string
args: []string
variables: map[string]string
files:
  - target: string
    mode: string
    content: string
    source: string
    noExpand: boolean
volumes:
  - target: string
    source: string
    path: string
    readOnly: [true | false]
resources:
  limits:
    cpu: string
    memory: string
  requests:
    cpu: string
    memory: string
livenessProbe: ContainerProbeSpec
  httpGet:
    scheme: [HTTP or HTTPS]
    path: string
    port: int
    httpHeaders:
      name: string
      value: string
readinessProbe:
  httpGet:
    scheme: [HTTP or HTTPS]
    path: string
    port: int
    httpHeaders:
      name: string
      value: string
```

<!-- string workload containers -->

`container-id`: specifies a name of the container image.

`image`: image name or tag.

`command`: overrides image entry point.

`args`: overrides entry point arguments.

`variables`: specifies environment variables.

`files`: specifies extra files to mount.

- `target`: specifies a path and name.
- `mode`: specifies access mode.
- `content`: specifies inline content and supports templates. Exactly one of content or source must be defined.
- `source`: specifies a path to a file to make available. Exactly one of content or source must be defined.
- `noExpand`:  If true, the content or file referenced in source will be used literally with no placeholder expansion in the running container.

`volumes`: specifies volumes to mount.

- `source`: specifies external volume reference.
- `path` specifies a sub path in the volume.
- `target`: specifies a target mount on the container.
- `readOnly`: if true, mounts as read only.

<!-- Optional CPU and memory resources needed -->

`limits`: maximum allowed CPU memory.

- `memory`: a string value representing the maximum allowed CPU memory.
- `cpu`: a string value representing the maximum allowed CPU.

`requests`: minimum required CPU memory.

- `memory`: a string value representing the minimum required CPU memory.
- `cpu`: a string value representing the minimum required CPU.

`livenessProbe`: indicates if the container is running.

- `httpGet`: performs an HTTP `Get` on a specified path and port.
  - `scheme`: specifies the identifier used for connecting to the host.
    - Defaults: `HTTP`
    - Valid values: `HTTP` | `HTTPS`
  - `host`: specifies the Hostname in the HTTP request. Defaults to the target IP address.
  - `path`: specifies a path for the HTTP `Get` method.
  - `port`: specifies a port for the HTTP `Get` method.
  - `httpHeaders`: headers to set in the request. Allows repeated headers.
    - `name`: custom header to set in the request.
    - `value`: specifies a value.

`readinessProbe`: indicates if the container is ready to respond to requests. This has the same format as `livenessProbe`.

### Container example

The following example creates a container with the `busybox` image.

```yaml
containers:
  container-id:
    image: busybox                            # Docker image name and tag

    command:                                  # (Optional) Overrides image entry point
    - "/bin/echo"
    args:                                     # (Optional) Overrides entry point point
    - "Hello $(FRIEND)"

    variables:                                # (Optional) Specifies environment variable
      FRIEND: World!

    files:                                  # (Optional) Specifies extra files to mount
    - target: /etc/hello-world/config.yaml  #    - Target file path and name
      mode: "666"                           #    - Access mode
      content: |                            #    - Inline content (supports templates)
        "---"
        ${resources.env.APP_CONFIG}

    volumes:                                # (Optional) Specifies volumes to mount
    - source: ${resources.data}             #    - External volume reference
      path: sub/path                        #    - (Optional) Sub path in the volume
      target: /mnt/data                     #    - Target mount path on the container
      readOnly: true                       #    - (Optional) Mount as read-only

    resources:                              # (Optional) CPU and memory resources needed
      limits:                               #    - (Optional) Maximum allowed
        memory: "128Mi"
        cpu: "500m"
      requests:                             #    - (Optional) Minimal required
        memory: "64Mi"
        cpu: "250m"

    livenessProbe:                          # (Optional) Liveness probe
      httpGet:                              #    - Only HTTP GET is supported
        scheme: http                        #    - Specify the schema (http or https)
        path: /alive
        port: 8080
    readinessProbe:                         # (Optional) Readiness probe
      httpGet:                              #    - Only HTTP GET is supported
        scheme: http                        #    - Specify the schema (http or https)
        path: /ready
        port: 8080
        httpHeaders:                        #    - (Optional) HTTP Headers to include
        - name: Custom-Header
          value: Awesome
```
