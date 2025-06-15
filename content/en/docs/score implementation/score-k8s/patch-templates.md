---
title: "score-k8s patch templates"
linkTitle: "Patch templates"
description: "patch templates of score-k8s"
weight: 4
aliases:
- /docs/reference/score-cli/score-k8s/patchers
- /docs/reference/score-cli/score-k8s/patch-templates
---

## Overview

A common requirement is for Platform Engineers to slightly modify or adjust the output of the conversion process, and this seemlessly for their Developers. This can be done by providing one or more patching templates at `init` time. These patching templates generate JSON patches which are applied on top of the output manifests file, just before being written. Patching templates have access to the current manifests spec as `.Manifests`, the map of workload name to Score Spec as `.Workloads`, the optional name of the namespace in Kubernetes `.Namespace`, and can use any functions from [`Masterminds/sprig`](https://github.com/Masterminds/sprig).

In this way, you can extend the behavior of the `score-k8s` implementation.

Each template file is evaluated as a Golang text/template and should output a yaml/json encoded array of patches. Each patch is an object with required `op` (`set` or `delete`), `patch` (a dot-separated json path, use backslash to escape), a `value` if the `op` is `set`, and an optional `description` for showing in the logs.

Example of paths:

```yaml
services.some\.thing     # patches the some.thing service
services.foo.ports.0     # modifies the first item in the ports array
services.foo.ports.-1    # adds to the end of the ports array
something.:0000.xyz      # patches the xyz item in the "0000" item of something (: escapes a numeric index)
```

## Example

Here is a concrete example showing how to inject more security for each Workload by using this template [`score-k8s/unprivileged.tpl`](https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-k8s/unprivileged.tpl):

```yaml
{{ range $i, $m := .Manifests }}
{{ if eq $m.kind "Deployment" }}
- op: set
  path: {{ $i }}.spec.template.spec.automountServiceAccountToken
  value: false
- op: set
  path: {{ $i }}.spec.template.spec.securityContext
  value:
    fsGroup: 65532
    runAsGroup: 65532
    runAsNonRoot: true
    runAsUser: 65532
    seccompProfile:
      type: "RuntimeDefault"
{{ range $cname, $_ := $m.spec.template.spec.containers }}
- op: set
  path: {{ $i }}.spec.template.spec.containers.{{ $cname }}.securityContext
  value:
    allowPrivilegeEscalation: false
    privileged: false
    readOnlyRootFilesystem: true
    capabilities:
      drop:
        - ALL
{{ end }}
{{ end }}
{{ end }}
```

## Use a patch template

Run this command to import this patch template:

```bash
score-k8s init --patch-templates https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-k8s/unprivileged.tpl
```

Run the `generate` command:

```bash
score-k8s generate score.yaml
```

And then see that this patch template was applied on the final generated `manifests.yaml` file.

## Write your own patch template

A list of patch templates shared by the community can be found [here](https://github.com/score-spec/community-patchers). Users are encouraged to use them and contribute to this growing list of patch templates.
