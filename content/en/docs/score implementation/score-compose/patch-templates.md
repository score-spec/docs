---
title: "score-compose patch templates"
linkTitle: "Patch templates"
description: "patch templates of score-compose"
weight: 4
aliases:
- /docs/reference/score-cli/score-compose/patchers
- /docs/reference/score-cli/score-compose/patch-templates
---

A common requirement is for Platform Engineers to slightly modify or adjust the output of the conversion process, and this seemlessly for their Developers. This can be done by providing one or more patching templates at `init` time. These patching templates generate JSON patches which are applied on top of the output compose file, just before being written. Patching templates have access to the current compose spec as `.Compose`, the map of workload name to Score Spec as `.Workloads`, and can use any functions from [`Masterminds/sprig`](https://github.com/Masterminds/sprig).

In this way, you can extend the behavior of the `score-compose` implementation.

Each template file is evaluated as a Golang text/template and should output a yaml/json encoded array of patches. Each patch is an object with required `op` (`set` or `delete`), `patch` (a dot-separated json path, use backslash to escape), a `value` if the `op` is `set`, and an optional `description` for showing in the logs.

Example of paths:

```yaml
services.some\.thing     # patches the some.thing service
services.foo.ports.0     # modifies the first item in the ports array
services.foo.ports.-1    # adds to the end of the ports array
something.:0000.xyz      # patches the xyz item in the "0000" item of something (: escapes a numeric index)
```

Here is a concrete example showing how to inject more security for each Workload by using this template [`score-compose/unprivileged.tpl`](https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-compose/unprivileged.tpl):

```yaml
{{ range $name, $spec := .Workloads }}
{{ range $cname, $_ := $spec.containers }}
- op: set
  path: services.{{ $name }}-{{ $cname }}.read_only
  value: true
- op: set
  path: services.{{ $name }}-{{ $cname }}.user
  value: "65532"
- op: set
  path: services.{{ $name }}-{{ $cname }}.cap_drop
  value: ["ALL"]
{{ end }}
{{ end }}
```

Run this command to import this patch template:

```bash
score-compose init --patch-templates https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-compose/unprivileged.tpl
```

Run the `generate` command:

```bash
score-compose generate score.yaml
```

And then see that this patch template was applied on the final generated `compose.yaml` file.

A list of patch templates shared by the community can be found [here](https://github.com/score-spec/community-patchers). Users are encouraged to use them and contribute to this growing list of patch templates.
