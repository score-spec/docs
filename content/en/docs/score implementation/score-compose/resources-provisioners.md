---
title: "score-compose resources provisioners"
linkTitle: "Resources provisioners"
description: "resources provisioners of score-compose"
weight: 3
aliases:
- /docs/reference/score-cli/score-compose/provisioners
- /docs/reference/score-cli/score-compose/resources-provisioners
- /docs/reference/score-cli/score-compose/resources
---

Resource provisioners are the way for Platform Engineers to write concrete implementations of resource types that Developers can use in their Score file in the [`resources` section](/docs/score-specification/score-spec-reference/#resources-definition).

With the `score-compose init` command, a `.score-compose/zz-default.provisioners.yaml` file is created, which is a YAML file holding the definition of the [built-in provisioners](#default-provisioners).

When running `score-compose generate`, all `*.provisioners.yaml` files are loaded in lexicographic order from the `.score-compose` directory. This allows projects to include their own custom provisioners that extend or override the defaults.

To list the provisioners available from the `.score-compose` directory, run the `score-compose provisioners list` command.

## Default provisioners

| Type                | Class | Params                 | Output                                                                                               | Description                                                                             |
| ------------------- | ----- | ---------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `amqp`              | (any) | (none)                 | `host`, `password`, `port`, `username`, `vhost`                                                      | Provisions a dedicated RabbitMQ vhost on a shared instance.                             |
| `dns`               | (any) | (none)                 | `host`                                                                                               | Outputs a *.localhost domain as the hostname.                                           |
| `elasticsearch`     | (any) | (none)                 | `host`, `password`, `port`, `username`                                                               | Provisions a dedicated Elastic Search instance.                                         |
| `kafka-topic`       | (any) | (none)                 | `host`, `name`, `num_partitions`, `port`                                                             | Provisions a dedicated Kafka topic on a shared Kafka broker.                            |
| `mongodb`           | (any) | (none)                 | `connection`, `host`, `password`, `port`, `username`                                                 | Provisions a dedicated MongoDB database.                                                |
| `mssql`             | (any) | (none)                 | `connection`, `database`, `password`, `port`, `server`, `username`                                   | Provisions a dedicated database on a shared MS SQL server instance.                     |
| `mysql`             | (any) | (none)                 | `database`, `host`, `name`, `password`, `port`, `username`                                           | Provisions a dedicated MySQL database on a shared instance.                             |
| `postgres`          | (any) | (none)                 | `database`, `host`, `name`, `password`, `port`, `username`                                           | Provisions a dedicated database on a shared PostgreSQL instance.                        |
| `postgres-instance` | (any) | (none)                 | `host`, `password`, `port`, `username`                                                               | Provisions a dedicated PostgreSQL instance.                                             |
| `redis`             | (any) | (none)                 | `host`, `password`, `port`, `username`                                                               | Provisions a dedicated Redis instance.                                                  |
| `route`             | (any) | `host`, `path`, `port` | (none)                                                                                               | Provisions a ingress route on a shared Nginx instance.                                  |
| `s3`                | (any) | (none)                 | `access_key_id`, `aws_access_key_id`, `aws_secret_key`, `bucket`, `endpoint`, `region`, `secret_key` | Provisions a dedicated S3 bucket with AWS-style credentials on a shared MinIO instance. |
| `service-port`      | (any) | `port`, `workload`     | `hostname`, `port`                                                                                   | Outputs a hostname and port for connecting to another workload.                         |
| `volume`            | (any) | (none)                 | `source`, `type`                                                                                     | Creates a persistent volume that can be mounted on a workload.                          |

The source code of these provisioners implementations can be found in the [`score-compose`'s default provisioners file](https://github.com/score-spec/score-compose/blob/main/internal/command/default.provisioners.yaml).

## Community provisioners

A list of provisioners authored and shared by the community can also be found [here](https://github.com/score-spec/community-provisioners). Users are encouraged to use them and contribute to this growing list of community provisioners:

| Type                        | Class | Params            | Outputs         | Description                                                                               |
| --------------------------- | ----- | ----------------- | --------------- | ----------------------------------------------------------------------------------------- |
| `dapr-pubsub`               | (any) | (none)            | `name`          | Generates a Dapr PubSub `Component` pointing to a Redis `Service`.                        |
| `dapr-state-store`          | (any) | (none)            | `name`          | Generates a Dapr StateStore `Component` pointing to a Redis `Service`.                    |
| `dapr-subscription`         | (any) | `pubsub`, `topic` | `name`, `topic` | Generates a Dapr `Subscription` on a given Topic and `PubSub`.                            |
| `dns`                       | (any) | (none)            | `host`, `url`   | Get the forwarded port URL in current GitHub Codespace on port `8080`.                    |
| `dns`                       | (any) | (none)            | `host`, `url`   | Outputs a `*.localhost` domain as the hostname and associated URL in http on port `8080`. |
| `environment`               | (any) | (none)            | (none)          | Loads environment variables from a local `.env` file.                                     |
| `horizontal-pod-autoscaler` | (any) | (none)            | (none)          | Generates an empty object because HPA is not supported in Docker Compose.                 |
| `service`                   | (any) | (none)            | `name`          | Outputs the name of the Workload dependency if it exists in the list of Workloads.        |

## Install provisioner files

To easily install provisioners, `score-compose` provides the `--provisioners` flag with the `init` command, which downloads the provisioner file via a URL and installs it with the highest priority.

For example, when running the following, the provisioners file B will be matched before A because B was installed after A:

```bash
score-compose init --provisioners https://example.com/provisioner-A.yaml --provisionerss https://example.com/provisioner-B.yaml
```

The provisioners can be loaded from the following kinds of urls:

- HTTP: `http://host/file`
- HTTPS: `https://host/file`
- Git (SSH): `git-ssh://git@host/repo.git/file`
- Git (HTTPS): `git-https://host/repo.git/file`
- OCI: `oci://[registry/][namespace/]repository[:tag|@digest][#file]`
- Local File: `/path/to/local/file`
- Stdin: `-` (read from standard input)

This is commonly used to import custom provisioners or common provisioners used by your team or organization and supported by your platform.

## Write your own provisioners

Users are encouraged to write their own custom provisioners to support new resource types or to modify the default implementations.

Each entry in the file has the following common fields, other fields may also exist for specific provisioner types.

```yaml
- uri: <provisioner uri>
  type: <resource type>
  class: <optional resource class>
  id: <optional resource id>
  description: <optional description>
```

The `uri` of each provisioner is a combination of its implementation (either [`template://`](#the-template-provisioner) or [`cmd://`](#the-cmd-provisioner)) and a unique identifier. Provisioners are matched in first-match order when loading the provisioner files lexicographically, so any custom provisioner files are matched first before `zz-default.provisioners.yaml`.

### The `template://` provisioner

Most built in provisioners are implemented as a series of Go templates using the template provisioner. The implementation can be found [here](https://github.com/score-spec/score-compose/blob/main/internal/provisioners/templateprov/template.go). The Go template engine is [text/template](https://pkg.go.dev/text/template).

The following extra fields can be configured as required on each instance of this provisioner:

| Field              | Type                | Comment                                                                                                                                                                                                                      |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `init`             | String, Go template | A Go template for a valid YAML dictionary. The values here will be provided to the next templates as the `.Init` state.                                                                                                      |
| `state`            | String, Go template | A Go template for a valid YAML dictionary. The values here will be persisted into the state file and made available to future executions and are provided to the next templates as the `.State` state.                       |
| `shared`           | String, Go template | A Go template for a valid YAML dictionary. The values here will be _merged_ using a JSON-patch mechanism with the current shared state across all resources and made available to future executions through `.Shared` state. |
| `outputs`          | String, Go template | A Go template for a valid YAML dictionary. The values here are the outputs of the resource that can be accessed through `${resources.*}` placeholder resolution.                                                             |
| `directories`      | String, Go template | A Go template for a valid YAML dictionary. Each path -> bool mapping will create (true) or delete (false) a directory relative to the mounts directory.                                                                      |
| `files`            | String, Go template | A Go template for a valid YAML dictionary. Each path -> string\|null will create a relative file (string) or delete it (null) relative to the mounts directory.                                                              |
| `networks`         | String, Go template | A Go template for a valid set of named Compose [Networks](https://github.com/compose-spec/compose-spec/blob/master/06-networks.md). These will be added to the output project.                                               |
| `volumes`          | String, Go template | A Go template for a valid set of named Compose [Volumes](https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md).                                                                                            |
| `services`         | String, Go template | A Go template for a valid set of named Compose [Services](https://github.com/compose-spec/compose-spec/blob/master/05-services.md).                                                                                          |
| `info_logs`        | String, Go template | A Go template for informational messages for the user which may help connecting or testing the provisioned resource.                                                                                                         |
| `supported_params` | List of String      | A list of parameters that the provisioner expects to be passed in.                                                                                                                                                           |
| `expected_outputs` | List of String      | A list of expected outputs that the provisioner should return.                                                                                                                                                                |

Each template has access to the [Sprig](http://masterminds.github.io/sprig/) functions library and executes with access to the following structure:

```go
type Data struct {
	Uid      string
	Type     string
	Class    string
	Id       string
	Params   map[string]interface{}
	Metadata map[string]interface{}
	Init   map[string]interface{}
	State  map[string]interface{}
	Shared map[string]interface{}
	WorkloadServices map[string]NetworkService
	ComposeProjectName string
	MountsDirectory    string
}
```

### The `cmd://` provisioner

The command provisioner implementation can be used to execute an external binary or script to provision the resource. The provision IO structures are serialised to json and send on standard-input to the new process, any stdout content is decoded as json and is used as the outputs of the provisioner.

The `uri` of the provisioner encodes the binary to be executed:

- `cmd://python` will execute the `python` binary on the PATH
- `cmd://../my-script` will execute `../my-script`
- `cmd://./my-script` will execute `my-script` in the current directory
- and `cmd://~/my-script` will execute the `my-script` binary in the home directory

Additional arguments can be provided via the `args` configuration key, for example a basic provisioner can be created using python inline scripts:

```yaml
- uri: "cmd://python"
  args: ["-c", "print({\"resource_outputs\":{}})"]
```
