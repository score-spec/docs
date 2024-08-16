---
title: "Score specification reference"
linkTitle: "Score specification"
weight: 9
description: >
    Reference implementation for the Score Specification
aliases:
- /docs/dependencies
- /docs/annotations
- /docs/reference/score-spec-reference/
---

## Score Specification definitions

The Score Specification is a YAML file that contains the following top-level reference definitions.

Use these definitions to describe a single workload.

- [Workload definition](#workload-definition): (required) defines the API version and metadata.
- [containers](#container-definition): (required) defines how the workload's containers are executed.
- [service](#service-definition): (optional) defines the service that the workload provides.
- [resources](#resources-definition): (optional) defines dependencies needed by the workload.

## Workload definition

Describes the Score Specification API version and metadata. Data in the metadata section can be referenced throughout other parts of the specification as well, for example `${metadata.name}`.

```yaml
apiVersion: string

metadata:
  name: string
  annotations: # optional
    annotations-name: string # optional
```

`apiVersion`: the declared Score Specification version. Find the current version [here](https://github.com/score-spec/spec/blob/main/score-v1b1.json).

`metadata`: the metadata description of your workload.

- `name`: a string that describes your workload.
- `annotations`: a set of optional annotations that apply to the workload and can be passed through to the destination runtime.

### Workload example

The following is a top level description for a workload.

```yaml
apiVersion: score.dev/v1b1

metadata:
  name: hello-world
  annotations:
    example.com/my-annotation: value
containers:
  my-container:
  # . . .
service:
  ports:
  # . . .
resources:
  env:
  # . . .
```

## Container definition

The workload container’s specification describes how the workload's tasks are executed.

```yaml
containers:
  container-name:
    image: string
    command: #optional
      - string
    args: #optional
      - string
    variables: #optional
      VAR_NAME: string
    files: #optional
      - target: string
        mode: string #optional
        source: string # oneOf source or content is required
        content: string # oneOf source or content is required
        noExpand: boolean #optional
    volumes: #optional
      - source: string
        path: string #optional
        target: string
        readOnly: boolean #optional
    resources: #optional
      limits: #optional
        memory: string
        cpu: string
      requests: #optional
        memory: string
        cpu: string
    livenessProbe: #optional
      httpGet:
        scheme: string # optional
        host: string # optional
        path: string
        port: integer
        httpHeaders: # optional
          - name: string
            value: string
    readinessProbe:
      httpGet:
        scheme: string # optional
        host: string # optional
        path: string
        port: integer
        httpHeaders: # optional
          - name: string
            value: string
```

`container-name`: the name of the container.

`image`: the container image name and tag.

`command`: if specified, overrides the entrypoint defined in the container image.

`args`: if specified, overrides the arguments passed to the container entrypoint.

`variables`: the environment variables for the container.

`files`: the extra files to mount into the container.

- `target`: the file path to expose in the container.
- `mode`: the optional file access mode in octal encoding. For example 0600.
- `source`: the relative or absolute path to the content file.
- `content`: the inline content for the file.
- `noExpand`: if set to true, the placeholders expansion will not occur in the contents of the file.

`volumes`: the volumes to mount.

- `source`: the external volume reference.
- `path`: an optional sub path in the volume.
- `target`: the target mount on the container.
- `readOnly`: indicates if the volume should be mounted in a read-only mode.

`resources`: the compute resources for the container.

- `limits`: the maximum allowed resources for the container.
  - `memory`: a string value representing the maximum allowed CPU memory.
  - `cpu`: a string value representing the maximum allowed CPU.
- `requests`: the minimal resources required for the container
  - `memory`: a string value representing the minimum required CPU memory.
  - `cpu`: a string value representing the minimum required CPU.

`livenessProbe`: the liveness probe for the container.

- `httpGet`: performs an HTTP `Get` on a specified path and port.
  - `scheme`: scheme to use for connecting to the host (HTTP or HTTPS). Defaults to HTTP.
  - `host`: host name to connect to. Defaults to the workload IP. The is equivalent to a Host HTTP header.
  - `path`: the path to access on the HTTP server.
  - `port`: the port to access on the workload.
  - `httpHeaders`: additional HTTP headers to send with the request.
    - `name`: the HTTP header name.
    - `value`: the HTTP header value.

`readinessProbe`: the readiness probe for the container. This has the same format as `livenessProbe`.

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

## Service definition

A `service` contains one or more networks ports that can be exposed to external applications.

The `port` specification must include the public `port` and should include the container `targetPort`.

```yaml
service:
  ports:
    port-name: string # required
      port: integer # required
      protocol: string # optional, defaults to TCP
      targetPort: integer # optional
```

`port-name`: the name of the port.

- `port`: the public service port.
- `protocol`: the transport level protocol. Defaults to TCP.
- `targetPort`: the internal service port. This will default to 'port' if not provided.

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

## Resources definition

The resource section of the Score Specification allows users to describe the relationship between workloads and their dependent resources in an environment-agnostic way. The purpose of the resource section is to validate resource references in the same Score file.

resources can be anything and Score doesn't differentiate resources by types. The resource section can be used to provision multiservice setups with platforms like Docker Compose.

It is up to the Score implementation to resolve the resource by name, type, or any other meta information available.

### Resources

```yaml
resources: # optional
  resource-name:
    type: string
    class: string # optional
    id: string # optional
    metadata: # optional
      annotations: # optional
        annotation-name: string
    params: # optional
      param-name: value
```

`resources`: the resource dependencies needed by the workload.

`resource-name`: a required property that specifies the resource name.

- `type`: the resource type. This should be a type supported by the Score implementations being used.
- `class`: an optional specialisation of the resource type.
- `id`: an optional external resource identifier. When two resources share the same type, class, and id, they are considered the same resource when used across related workloads.

`metadata`: an optional property that specifies additional resource metadata.

- `annotations`: An optional property to specify meta data for a resource. This can be utilised to provide additional instructions for the Score CLI Implementation to interpret.

### Reserved resource types

In general, `resource-type` has no meaning for Score, but it can affect how the targeted Score implementation tool resolves the resource. The following conventions are _reserved_ resource types.

| Resource type | `score-compose`                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `environment` | Translates to the environment variables references. For example: `${PROPERTY-NAME}`.                                            |
| `volume`      | Translates into a reference to the external volume. This reference is usually used in a container’s volume mount specification. |
| `service`     | N/A                                                                                                                             |
| `workload`    | N/A                                                                                                                             |

### Referencing resources

Resources declared in the resources section of a Score file can be used in substitution patterns in different places.

### Resource example

The Score implementation (CLI) resolves resource references and performs value substitution in a specific manner.

For example, when using the `score-compose` command, resource references within substitution patterns are replaced with corresponding environment variable references in the resulting `compose.yaml` configuration file. To gather all the required environment variables, you can utilize the `--env-file` command line parameter to generate a reference `.env` file.

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
