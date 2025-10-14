{{ range $i, $m := .Manifests }}
{{ if eq $m.kind "Deployment" }}
- op: set
  path: {{ $i }}.kind
  value: StatefulSet
{{ end }}
{{ end }}
