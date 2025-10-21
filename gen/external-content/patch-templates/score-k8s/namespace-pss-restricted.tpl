{{ range $i, $m := .Manifests }}
{{ if eq $m.kind "Namespace" }}
- op: set
  path: {{ $i }}.metadata.labels.pod-security\.kubernetes\.io/enforce
  value: restricted
{{ end }}
{{ end }}