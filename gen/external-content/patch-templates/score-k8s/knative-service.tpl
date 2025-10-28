{{ $workloadNames := keys .Workloads }}
{{ range $i, $m := .Manifests }}
{{/* delete the default Service manifest */}}
{{ if and (eq $m.kind "Service") (has $m.metadata.name $workloadNames) }}
- op: delete
  path: {{ $i }}
{{ end }}
{{/* make the generated Deployment compliant with the Knative Service to reuse as many features as we can by default: env, liveness|readinessProbe, resources, etc. */}}
{{ if and (eq $m.kind "Deployment") (has $m.metadata.name $workloadNames) }}
- op: set
  path: {{ $i }}.kind
  value: Service
- op: set
  path: {{ $i }}.apiVersion
  value: serving.knative.dev/v1
- op: delete
  path: {{ $i }}.spec.selector
- op: delete
  path: {{ $i }}.spec.strategy
- op: delete
  path: {{ $i }}.status
{{ end }}
{{ end }}
