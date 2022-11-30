---
title: "Humanitec extension reference"
linkTitle: "Humanitec extension"
weight: 10
description: >
  Reference documentation for the Humanitec extension.
---

The `humanitec.score.yaml` is an extension file that contains the following top-level reference definitions.

Use these definitions to supports a set of extra definitions for the score-humanitec tool.

### Extension properties

```yaml
apiVersion: [string]

profile: [string]
spec:
  [string]: Object

resources:
  [string]: Object
```

`apiVersion`: the declared Score Specification version.

- Valid options: `score.dev/v1b1`

`profile`: describes a custom Workload profile name.

- Defaults: `humanitec/default-module`
- Examples: `humanitec/default-cronjob` | `my-org/frontend-service`

`spec`: specifies a map of features to inject into the final Workload module.

- `key`: specifies a [JSON path](https://jsonpath.com/), relative to the `spec` section root.

- `value`: specifies an object to be injected, which replaces any existent content of the node at the path specified by the `key`.

`resources`: specifies a map of the Workload resource specifications.

**Note:** All valid patterns in features objects string properties and string values are parsed and substituted following the same rules as substitution patterns used for the main Score spec.

### Extension example

The following example would help score-humanitec add proper routes to the Deployment Delta, so that the service is available to the outside world.

```yaml
apiVersion: humanitec.org/v1b1
profile: "humanitec/default-module"
spec:
  "labels":
    "tags.datadoghq.com/env": "${resources.env.DATADOG_ENV}"
  "ingress":
    rules:
      "${resources.dns}":
        http:
          "/":
            type: prefix
            port: 80
resources:
  db:
    scope: external
  dns:
    scope: shared
```
