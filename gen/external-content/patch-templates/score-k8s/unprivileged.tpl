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
