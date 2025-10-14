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
  path: -1
  value:
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
      name: {{ $m.metadata.name }}-cluster-admin
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: cluster-admin
    subjects:
    - kind: ServiceAccount
      name: {{ $m.metadata.name }}
      {{ if ne $namespace "" }}
      namespace: {{ $namespace }}
      {{ end }}
- op: set
  path: {{ $i }}.spec.template.spec.serviceAccountName
  value: {{ $m.metadata.name }}
{{ end }}
{{ end }}
