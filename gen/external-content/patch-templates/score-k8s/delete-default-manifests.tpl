{{/* range in reverse order */}}
{{ range $i, $m := (reverse .Manifests) }}
{{/* keep Namespace when --create-namespace is used */}}
{{ if ne $m.kind "Namespace" }}
{{/* fix the index to be reversed as well */}}
{{ $i := sub (len $.Manifests) (add $i 1) }}
- op: delete
  path: {{ $i }}
{{ end }}
{{ end }}
