{{ $namespace := .Namespace }}
{{ range $i, $m := .Manifests }}
{{ if eq $m.kind "Deployment" }}
- op: set
  path: -1
  value:
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: {{ $m.metadata.name }}
      {{ if ne $namespace "" }}
      namespace: {{ $namespace }}
      {{ end }}
- op: set
  path: {{ $i }}.spec.template.spec.serviceAccountName
  value: {{ $m.metadata.name }}
{{ end }}
{{ end }}
