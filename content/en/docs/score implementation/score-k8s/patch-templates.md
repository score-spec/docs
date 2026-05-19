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

A common requirement is for Platform Engineers to slightly modify or adjust the output of the conversion process, and this seamlessly for their Developers. This can be done by providing one or more patching templates at `init` time. These patching templates generate JSON patches which are applied on top of the output manifests file, just before being written. Patching templates have access to the current manifests spec as `.Manifests`, the map of workload name to Score Spec as `.Workloads`, the optional name of the namespace in Kubernetes `.Namespace`, and can use any functions from [`Masterminds/sprig`](https://github.com/Masterminds/sprig).

In this way, you can extend the behavior of the `score-k8s` implementation.

Each template file is evaluated as a Golang text/template and should output a yaml/json encoded array of patches. Each patch is an object with required `op` (`set` or `delete`), `path` (a dot-separated json path, use backslash to escape), a `value` if the `op` is `set`, and an optional `description` for showing in the logs.

Example of paths:

```yaml
services.some\.thing     # patches the some.thing service
services.foo.ports.0     # modifies the first item in the ports array
services.foo.ports.-1    # adds to the end of the ports array
something.:0000.xyz      # patches the xyz item in the "0000" item of something (: escapes a numeric index)
```

## Template inputs

Patch templates run after `score-k8s` has converted the Score workloads and provisioned resources, but before the final `manifests.yaml` file is written.
The root template input exposes these fields:

| Field        | Description                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.Manifests` | The generated Kubernetes manifests that will be patched. This is a list, so patch paths start with the manifest index, for example `0.metadata.labels`.                             |
| `.Workloads` | A map of workload name to the original Score workload specification. Use this when the patch decision depends on Score metadata, containers, resources, annotations, or extensions. |
| `.Namespace` | The namespace passed to `score-k8s generate --namespace`. This is an empty string when no namespace is configured.                                                                  |

These inputs are available as maps, lists, and strings in the template, so access fields using their YAML names, for example `$m.metadata.name` or `$spec.containers`.
The template can also use Sprig helpers such as `dig`, `default`, `toJson`, and `b64enc`.

When designing a new patch template, a temporary debugging patch can make the available input easier to inspect.
For example, this writes the full template input as a base64-encoded JSON annotation on generated Deployment manifests:

```yaml
{{ $input := . }}
{{ range $i, $m := .Manifests }}
{{ if eq $m.kind "Deployment" }}
- op: set
  path: {{ $i }}.metadata.annotations.score\.dev/debug-template-input
  value: {{ $input | toJson | b64enc | quote }}
  description: Inspect patch template input
{{ end }}
{{ end }}
```

After running `score-k8s generate`, copy the annotation value from `manifests.yaml` and decode it locally:

```bash
printf '%s' '<annotation-value>' | base64 --decode | jq .
```

Remove this debugging patch once you have identified the fields your final template needs.

## Example

Here is a concrete example showing how to inject more security for each Workload by using this template [`score-k8s/unprivileged.tpl`](https://docs.score.dev/examples/patch-templates/score-k8s/unprivileged/):

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

A list of patch templates for `score-k8s` shared by the community can be found [here](https://docs.score.dev/examples/patch-templates?implementation=score-k8s). Users are encouraged to use them and contribute to this growing list of patch templates.
