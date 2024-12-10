---
title: "Creating a new Score implementation"
linkTitle: "Creating a new Score implementation"
description: "A guide to creating new Score implementations deploying to other platforms"
weight: 3
---

**Prerequisites**

1. Experience using [`score-compose`]({{< relref "/docs/score-implementation/score-compose" >}}) or [`score-k8s`]({{< relref "/docs/score-implementation/score-k8s" >}}).

   It's important to understand the day-to-day development and deployment flow when using Score. These reference command line interfaces help guide the behavior of any new implementations.

2. A good understanding of the parts of the [Score specification]({{< relref "/docs/score-specification" >}}) including resources and supported [placeholders]({{< relref "/docs/score-specification/score-spec-reference#placeholder-references" >}}).

3. A target container runtime or container platform. The minimum requirement is that the platform can run [Docker](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/) or [Open Container](https://github.com/opencontainers/image-spec) images; set the entrypoint command and arguments; and inject environment variables at runtime. This includes everything from local Docker engine to cloud container platforms such as [Amazon Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide), [Google Cloud Platform Cloud Run](https://cloud.google.com/run) Services, [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview), [Fly.io](https://fly.io) and others.

## Requirements for a Score implementation

The core responsibilities of a Score implementation are:

1. **Workload Collection:** Gather and validate Score workload files from the user and local context.

   For example, `score-compose` and `score-k8s` do this in the `generate` command and accept additional Score files along with `--overrides`, and `--image` defaults.

2. **Resource Provisioning**: Provision all of the resources mentioned in the `resources` section of the Score workload files. Do this before converting the workloads into their final format, since `${resource...}` placeholders depend on the outputs of the provisioned resources. "Provision" has no specific meaning other than it either succeeds or fails based on supported resource types and results in a set of outputs for each resource.

3. **Workload Conversion**: Convert the workloads into the desired output manifests while resolving all [placeholders]({{< relref "/docs/score-specification/score-spec-reference#placeholder-references" >}}). The output manifests are specific to the target runtime platform. `score-compose` converts the output to Docker Compose manifests, while `score-k8s` returns a Kubernetes YAML document.

Note that although the reference Score implementations are command line interfaces, some Score implementations run as API and Web-UI based applications and support the same Score specification and core responsibilities.

Also note, that some Score implementations provide more utility operations beyond these such as resource lifecycle management, complex resource provisioning, and application deployment however these aren't required for a Score implementation.

Find more detail on these steps below.

### Workload collection and validation

- **1:** The implementation **must** support collecting one or more YAML-formatted files following the [Score specification]({{< relref "/docs/score-specification" >}}).
  - **1.1:** The implementation **should** support multiple Score workloads deployed together and referring to shared resource outputs, but this isn't required. Multiple Score workloads in one project may share Resource provisioning outputs.
- **2:** The implementation **must** validate the files according to the Score specification JSON schema. This validation should take place _after_ applying any additional overrides or defaults.
  - **2.1:** The implementation **should** apply implementation-specific validation to ensure that workloads abide by platform-specific or implementation-specific limitations. Report any errors clearly to the user. For example, some platforms don't support mounted `containers.*.files` and have no choice but to reject Score workloads that use these attributes.
- **3:** Command line implementations **should** support the following:
  - **3.1:** Implement an `init` subcommand to initialize any local state in the project directory. This isn't required if the implementation requires no local state. The `init` subcommand should generate a sample Score file if one doesn't exist.
  - **3.2:** Implement a `generate` subcommand for accepting Score files and their configuration from the user, provisioning resources, and converting to the final manifests. Running the `generate` subcommand must be additive and idempotent.

### Resource provisioning

As described in the [Resources]({{< relref "/docs/score-specification/score-spec-reference#resources-definition" >}}) section of the specification, each Workload may include a set of resources in the form:

```yaml
resources:
  resource-name:
    type: string # required
    class: string 
    id: string
    params: {}
    ...
```

In the resource provisioning phase, the Score implementation **must** match each resource using its declared type, optional class, and optional id, to a function which returns appropriate outputs for that resource. Use optional resource parameters to configure this process. This "provisioning" function may be very simple and return static known values for the resource, or very complex and result in the provisioning of real infrastructure to meet the need using an external API or external state storage.

- **1:** The implementation **must** produce valid outputs or fail for each declared resource. The implementation **must not** ignore a resource.
- **2:** The implementation **must** treat an empty resource class as equivalent to the `default` class.
- **3:** A non-empty `id` indicates a "shared" instance of a resource which the implementation should only provision once and link to from all resource statements using the same `type`, `class`, and `id`.
- **4:** The outputs for each supported resource type **must** be predictable and documented. For example, resources of type `postgres` return outputs for `host`, `port`, `database`, `username`, and `password`.
- **5:** The outputs of resource provisioning **must** be stable within the project. Maintain any resource state between provisioning executions.
- **6:** The `params` object of each resource **must** support [placeholder references]({{< relref "/docs/score-specification/score-spec-reference#placeholder-references" >}}) or fail with a clear message. Placeholders in the `params` may refer to the outputs of other resources within the same Workload.
- **7:** The implementation **shouldn't** store any private or secret resource outputs as plain text in local state files. The implementation **should** use whatever runtime secret injection mechanisms are available to protect these values and inject them into the Workload Conversion process as necessary. Use [`score-k8s`]({{< relref "/docs/score-implementation/score-k8s" >}}) as an example of such an encoding and resolution mechanism.

Note, the most basic Score implementation might not support any resource types and may return a "not supported" error if a Workload declares any. This is inconvenient but valid behavior.

A common pattern for resource provisioning is to store "provisioner" templates in the local project state and use these to build the outputs of each resource and optionally generate additional deployment manifests. Both `score-compose` and `score-k8s` use this approach to provide `template` and `exec` provisioners via YAML files.

### Workload conversion

Once the implementation has provisioned all resources and determined the outputs, workload conversion can take place.

- **1:** The implementation **must** convert each Workload into a deployment manifest appropriate for the target platform.
- **2:** The implementation **should** configure all containers in the same Workload within the same network context or pod. If this isn't supported, the implementation **must** either fail or warn that runtime behavior may differ from what the user expects.
- **3:** Resolve all [Placeholder references]({{< relref "/docs/score-specification/score-spec-reference#placeholder-references" >}}) or report an appropriate error. If a placeholder resolves to a secret resource output, inject the value securely into the deployment manifest by mounting the secret or decrypting it at runtime.
- **4:** The implementation **must** convert all parts of the Workload that are compatible with the target platform. Any unsupported elements **should** cause the conversion to fail. Use safe defaults necessary for undeclared but required elements.

## Writing a Score implementation in Go

You can write a Score implementation in any language or framework, however [Go](https://go.dev/learn/) is the recommended runtime due to the availability of the [`github.com/score-spec/score-go`](https://github.com/score-spec/score-go) library which provides Go types, validation functions, and utilities for working with Score files. You can use the [`github.com/score-spec/score-implementation-sample`](https://github.com/score-spec/score-implementation-sample) template repository as a basis for a new Go-based Score implementation.

As indicated in the `README.md`, the sample comes complete with:

1. A command line skeleton including `init` and`generate` subcommands
   - `generate --overrides-file` and `generate --override-property` for applying Score overrides before conversion
   - `generate --image` for overriding the workload image before conversion.
   - Full placeholder support for `${metadata...}` and `${resource...}` expressions in the workload variables, files, and resource parameters.
2. State directory storage in `.score-implementation-sample/`
3. `TODO` statements in place of Resource Provisioning and Workload Conversion

To adapt this for your target platform, you should:

1. Fork the repository or use the "use as template" button in GitHub. This flattens the commit history.
2. Rename the go module by replacing all instances of `github.com/score-spec/score-implementation-sample` with your own module name.
3. Replace all other instances of `score-implementation-sample` with your own `score-xyz` name including renaming the `cmd/score-implementation-sample` directory.
4. Run the tests with `go test -v ./...` to ensure the renamed code works correctly.
5. Change the `TODO` in [provisioning.go](./internal/provisioners/provisioning.go) to provision resources and set the resource outputs. The existing implementation resolves placeholders in the resource parameters but doesn't set any resource outputs.
6. Change the `TODO` in [convert.go](./internal/convert/convert.go) to convert workloads into the target manifest form. The existing implementation resolves placeholders in the variables and files sections but just returns the workload spec as YAML content in the manifests.
