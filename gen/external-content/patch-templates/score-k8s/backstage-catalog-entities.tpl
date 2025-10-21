{{/* Adapt this user value as per your own context */}}
{{ $user := "guest" }}

{{ $namespace := .Namespace }}
{{ $componentAndResourcePrefix := ne $namespace "" | ternary (print $namespace "-") "" }}

{{/* remove the default generated manifests */}}
{{ range $i, $m := (reverse .Manifests) }}
{{ $i := sub (len $.Manifests) (add $i 1) }}
- op: delete
  path: {{ $i }}
{{ end }}

{{/* generate System if --generate-namespace is supplied */}}
{{ range $i, $m := .Manifests }}
{{ if eq $m.kind "Namespace" }}
- op: set
  path: -1
  value:
    apiVersion: backstage.io/v1alpha1
    kind: System
    metadata:
      name: {{ $namespace }}
      description: {{ $namespace }}
      annotations:
        github.com/project-slug: $GITHUB_REPO
      links:
        - url: https://github.com/$GITHUB_REPO
          title: Repository
          icon: github
    spec:
      owner: user:{{ $user }}
{{ end }}
{{ end }}

{{/* generate a Component per Workload */}}
{{ range $name, $spec := .Workloads }}
- op: set
  path: -1
  value:
    apiVersion: backstage.io/v1alpha1
    kind: Component
    metadata:
      name: {{ $componentAndResourcePrefix }}{{ $name }}
      title: {{ $name }}
      description: {{ $name }}
      annotations:
        github.com/project-slug: $GITHUB_REPO
        {{/* add more annotations on this Workload based on your own needs */}}
      links:
        - url: https://github.com/$GITHUB_REPO
          title: Repository
          icon: github
      {{ $tags := dig "metadata" "annotations" "tags" "" $spec }}
      {{ if ne $tags "" }}
      tags:
      {{ range $tag := $tags | splitList "," }}
      - {{ $tag }}
      {{ end }}
      {{ end }}
    spec:
      type: service
      lifecycle: experimental
      owner: user:{{ $user }}
      {{ if ne $namespace "" }}
      system: {{ $namespace }}
      {{ end }}
      {{ if $spec.resources }}
      dependsOn:
      {{ range $rname, $rspec := $spec.resources }}
      {{ if eq $rspec.type "service" }}
      - 'component:{{ $componentAndResourcePrefix }}{{ $rname }}'
      {{ else }}
      {{ if ne $rspec.type "route" }}
      {{ if ne ($rspec.id | default "") "" }}
      - 'resource:shared-{{ $rname }}'
      {{ else }}
      - 'resource:{{ $componentAndResourcePrefix }}{{ $name }}-{{ $rname }}'
      {{ end }}
      {{ end }}
      {{ end }}
      {{ end }}
      {{ end }}
{{ end }}

{{/* generate a Resource per Workload's resource (non shared resources) and skip route that we don't want in Backstage Catalog */}}
{{ range $name, $spec := .Workloads }}
{{ range $rname, $rspec := $spec.resources }}
{{ if and (and (ne $rspec.type "route") (ne $rspec.type "service")) (eq ($rspec.id | default "") "") }}
- op: set
  path: -1
  value:
    apiVersion: backstage.io/v1alpha1
    kind: Resource
    metadata:
      name: {{ $componentAndResourcePrefix }}{{ $name }}-{{ $rname }}
      title: {{ $rname }}
      description: {{ $componentAndResourcePrefix }}{{ $name }}-{{ $rname }}
    spec:
      type: {{ $rspec.type }}
      owner: user:{{ $user }}
      {{ if ne $namespace "" }}
      system: {{ $namespace }}
      {{ end }}
{{ end }}
{{ end }}
{{ end }}

{{/* generate shared Resources across the project/environment */}}
{{ $sharedResources := "" }}
{{ range $name, $spec := .Workloads }}
{{ range $rname, $rspec := $spec.resources }}
{{ if and (ne ($rspec.id | default "") "") (not (contains $rname $sharedResources)) }}
{{ $sharedResources = cat $sharedResources $rname }}
- op: set
  path: -1
  value:
    apiVersion: backstage.io/v1alpha1
    kind: Resource
    metadata:
      name: {{ print "shared-" $rname }}
      title: {{ $rname }}
      description: {{ print "shared-" $rname }}
    spec:
      type: {{ $rspec.type }}
      owner: user:{{ $user }}
      {{ if ne $namespace "" }}
      system: {{ $namespace }}
      {{ end }}
{{ end }}
{{ end }}
{{ end }}