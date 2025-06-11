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

Describes the Score Specification API version and metadata including the Workload name.

```yaml
apiVersion: string

metadata:
  name: string
  annotations: # optional
    annotations-name: string # optional
  other-key: other-value # arbitrary properties and values can also be set here
```

`apiVersion`: the declared Score Specification version. Find the current version [here](https://github.com/score-spec/spec/blob/main/score-v1b1.json).

`metadata`: the metadata description of your workload. Keys in the metadata section can be referenced using the `${metadata.KEY.SUBKEY}` syntax and can be used in the container variable values, container files, and resource params.

- `name`: a string that describes your workload.
- `annotations`: a set of optional annotations that apply to the workload and can be passed through to the destination runtime.
- Other properties can be defined here and referenced but do not have any official meaning in the Score specification.

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
    command: # optional
      - string
    args: # optional
      - string
    variables: # optional
      VAR_NAME: string
    files: # optional
      target:
        mode: string # optional
        source: string # oneOf source or content is required
        content: string # oneOf source or content is required
        noExpand: boolean # optional
    volumes: # optional
      target:
        source: string
        path: string # optional
        readOnly: boolean # optional
    resources: # optional
      limits: # optional
        memory: string
        cpu: string
      requests: # optional
        memory: string
        cpu: string
    livenessProbe: # optional
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

`image`: the container image name and tag. This may be set to `.` to indicate that the image must be supplied at deploy time.

`command`: if specified, overrides the entrypoint defined in the container image.

`args`: if specified, overrides the arguments passed to the container entrypoint.

`variables`: the environment variables for the container. Container variables support both metadata and resource output [placeholders]({{< relref "#placeholder-references" >}}).

`files`: the extra files to mount into the container. Either `content`, `binaryContent` or `source` must be specified.

- `target`: the file path to expose in the container.
  - `mode`: the optional file access mode in octal encoding. For example 0600.
  - `source`: the relative or absolute path to the content file. File content supports both metadata and resource output [placeholders]({{< relref "#placeholder-references" >}}) unless `noExpand` is true.
  - `content`: the inline content for the file. File content supports both metadata and resource output [placeholders]({{< relref "#placeholder-references" >}}) unless `noExpand` is true.
  - `binaryContent`: base64-encoded inline content for the file. This field supports non-utf-8 bytes for binary or archive files. Placeholder expansion is never supported.
  - `noExpand`: if set to true, the placeholders expansion will not occur in the contents of the `content` or `source` file.

Note: Since [`score-compose` `0.28.0`](https://github.com/score-spec/score-compose/releases/tag/0.28.0) and [`score-k8s` `0.5.0`](https://github.com/score-spec/score-k8s/releases/tag/0.5.0), the list of `files` is now a `map` which is the recommended approach moving forward. The previous and other option as an `array`, like illustrated below is still supported for backward compatibility (and may be deprecated in the future).

```yaml
containers:
  container-name:
...
    files: # optional as an array
      - target: string
        mode: string # optional
        source: string # oneOf source or content is required
        content: string # oneOf source or content is required
        noExpand: boolean # optional
```

`volumes`: the volumes to mount.

- `target`: the target mount on the container.
  - `source`: the external volume reference. The volume source supports resource output [placeholders]({{< relref "#placeholder-references" >}}).
  - `path`: an optional sub path in the volume.
  - `readOnly`: indicates if the volume should be mounted in a read-only mode.

Note: Since [`score-compose` `0.28.0`](https://github.com/score-spec/score-compose/releases/tag/0.28.0) and [`score-k8s` `0.5.0`](https://github.com/score-spec/score-k8s/releases/tag/0.5.0), the list of `volumes` is now a `map` which is the recommended approach moving forward. The previous and other option as an `array`, like illustrated below is still supported for backward compatibility (and may be deprecated in the future).

```yaml
containers:
  container-name:
...
    volumes: # optional as an array
      - target: string
        source: string
        path: string # optional
        readOnly: boolean # optional
```

`resources`: the compute resources for the container.

- `limits`: the maximum allowed resources for the container.
  - `memory`: a string value representing the maximum allowed CPU memory.
  - `cpu`: a string value representing the maximum allowed CPU.
- `requests`: the minimal resources required for the container
  - `memory`: a string value representing the minimum required CPU memory.
  - `cpu`: a string value representing the minimum required CPU.

`livenessProbe`: the liveness probe for the container. Both `httpGet` and `exec` are supported and implementations should support one or both options.

- `httpGet`: performs an HTTP `Get` on a specified path and port.
  - `scheme`: scheme to use for connecting to the host (HTTP or HTTPS). Defaults to HTTP.
  - `host`: host name to connect to. Defaults to the workload IP. The is equivalent to a Host HTTP header.
  - `path`: the path to access on the HTTP server.
  - `port`: the port to access on the workload.
  - `httpHeaders`: additional HTTP headers to send with the request.
    - `name`: the HTTP header name.
    - `value`: the HTTP header value.
- `exec`: executes a command within the container.
  - `command`: the array of arguments to execute within the container for the health check.

`readinessProbe`: the readiness probe for the container. This has the same format as `livenessProbe`.

### Container example

The following example creates a container with the `busybox` image. It assumes that an `env` and `data` resource are specified in the Resources definitions of the Workload.

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
      MESSAGE: Hello ${metadata.name}

    files:                                    # (Optional) Specifies extra files to mount
      /etc/hello-world/config.yaml:           #    - Target file path and name
        mode: "666"                           #    - Access mode
        content: |                            #    - Inline content (supports templates)
          "---"
          ${resources.env.APP_CONFIG}

    volumes:                                  # (Optional) Specifies volumes to mount
      /mnt/data:                              #    - Target mount path on the container
        source: ${resources.data}             #    - External volume reference
        path: sub/path                        #    - (Optional) Sub path in the volume       
        readOnly: true                        #    - (Optional) Mount as read-only

    resources:                                # (Optional) CPU and memory resources needed
      limits:                                 #    - (Optional) Maximum allowed
        memory: "128Mi"
        cpu: "500m"
      requests:                               #    - (Optional) Minimal required
        memory: "64Mi"
        cpu: "250m"

    livenessProbe:                            # (Optional) Liveness probe
      httpGet:                                #    - Only HTTP GET is supported
        scheme: http                          #    - Specify the schema (http or https)
        path: /alive
        port: 8080

    readinessProbe:                           # (Optional) Readiness probe
      httpGet:                                #    - Only HTTP GET is supported
        scheme: http                          #    - Specify the schema (http or https)
        path: /ready
        port: 8080
        httpHeaders:                          #    - (Optional) HTTP Headers to include
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

The resource section of the Score Specification allows users to describe the relationship between workloads and their dependent resources in an environment-agnostic way. The resource name is used as a key for any placeholder references to this resource in the same Workload.

Resources can be anything and Score doesn't differentiate resources by types. The resource section can be used to provision multiservice setups with platforms like Docker Compose.

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

`resource-name`: a required property that specifies the resource name.

- `type`: the resource type. This should be a type supported by the Score implementations being used.
- `class`: an optional specialisation of the resource type.
- `id`: an optional external resource identifier. When two resources share the same type, class, and id, they are considered the same resource when used across related Workloads.
- `params`: an optional map of parameters that may configure this resource. Params support both metadata and resource placeholders local to this Workload.
- `metadata`: an optional property that specifies additional resource metadata.
- `annotations`: An optional property to specify meta data for a resource. This can be utilised to provide additional instructions for the Score CLI Implementation to interpret.

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

## Placeholder References

Score Workloads support `${..}` placeholder references in order to support dynamic configuration within the Workload. Placeholders operate within the context of their Workload and can be used to interpolate values from either Workload metadata or the outputs of named resources. References to unknown keys will result in a failure. The `${}` syntax can be escaped with an additional dollar sign, for example: `$${not a placeholder}` and any `.`'s in a key can be escaped with a backslash: `${some\.thing}`.

Placeholders are supported in the following locations:

- `containers.*.variables.*`: The value of a variable may contain one or more placeholders.
- `containers.*.files.*.content`: The inline content of a file may contain one or more placeholders.
- `containers.*.files.*.source`: The file source may contain one or more placeholders.
- `containers.*.volumes.*.source`: The volume source may contain placeholders. This usually refers to a particular named resource of type `volume`.
- `resources.*.params.*`: The resource params may accept placeholder resolutions.

### Workload metadata references

Workload metadata references return data from the Workload that defines the container or resource. For example, given the following Score file:

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: my-workload
  other: 
    key: other-value
containers:
  example:
    image: some-image
    variables:
      WORKLOAD_NAME: ${metadata.name}
      COMBINED: ${metadata.name}_${metadata.other.key}
resources:
  some-resource:
    type: something
    params:
      workload: ${metadata.name}
```

At deploy time, the `WORKLOAD_NAME` container variable will be set to the Workload name `"my-workload"`, while the `COMBINED` variable will be interpolated as `"my-workload_other-value"`.

When provisioning resources, the `some-resource` resource will have the `workload` parameter set to `"my-workload"`. When the Resource has an `id` field set, metadata references will come from the metadata of the workload that first defined the resource.

### Resource output references

Placeholders may also refer to outputs of Resources within the Workload. Each provisioned resource may have a set of implementation specific outputs for the Workload to consume. The outputs of a Resource depend on the resource type, class, id, params, and any other environmental state at deploy time. For example, given the following Score file:

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: my-workload
  other: 
    key: other-value
containers:
  example:
    image: some-image
    variables:
      RESOURCE_HOOK: ${resources.some-resource.hook}
      COMBINED: ${resources.some-resource.a}-${resources.other-resource.b}
    files:
      /something.properties:
        content: |
          xyz=${resources.some-resource.a}
resources:
  some-resource:
    type: something
  other-resource:
    type: something-else
    params:
      workload: ${metadata.name}
      related: ${resources.some-resource.hook}
```

At deploy time resources are evaluated first as an acyclic graph: first `some-resource` is provisioned followed by `other-resource` which has the `workload` param set to `"my-workload"` and the `related` param set to the `hook` output of `some-resource` if it exists. Once the resources are provisioned, the placeholders on the Workload can be evaluated: `RESOURCE_HOOK` is set to the same `hook` output, while `COMBINED` is set to combination of outputs from both resources. A file is mounted at path `/something.properties` and it contains a setting that has the `hook` output interpolated into it.

As a practical example, a resource of type `postgres` may have outputs like `host`, `port`, `username`, and `password` which we may pass to the Workload variables or to a related resource to consume.

### Resource id references

The `${resources.name}` reference format will return a unique resource id for the named resource. This is rarely used, but is most frequently used for historical reasons in the container volumes `source` field which links the container to a resource dependency. The Score implementation is responsible for validating this reference and returning the resource in a form that allows the volume to be mounted.

For example:

```yaml
apiVersion: score.dev/v1b1
metadata:
  name: my-workload
containers:
  example:
    image: some-image
    volumes:
      /mnt/volume:
        source: ${resources.my-volume}
resources:
  my-volume:
    type: volume
```

### Supporting secret or sensitive resource outputs

Some resources may return outputs that are expected to be secret and not stored or interpolated as plaintext. For example, a database password should be kept as a secret where possible.

The Score specification itself does not provide any explicit support for indicating whether something is secret or how that should be handled by the runtime since each platform has different support and interpolation options. Instead, each Score implementation should provide native support be ensuring that resource outputs are appropriately marked and stored securely and any interpolated values are mounted into the Workload in a secure way.

For example, `score-compose` explicitely does not support any kinds of secret outputs since it is a reference implementation intended for local development. `score-k8s` on the other hand, allows resource outputs to refer to the contents of a Kubernetes Secret and for the interpolation to intelligently convert these into Volume Mounts where possible and fail when the interpolation is not possible.
