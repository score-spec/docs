- op: set
  path: -1
  value:
    apiVersion: networking.k8s.io/v1
    kind: NetworkPolicy
    metadata:
      name: allow-ingress-within-namespace
      {{ if ne .Namespace "" }}
      namespace: {{ .Namespace }}
      {{ end }}
    spec:
      policyTypes:
        - Ingress
      ingress:
      - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: {{ .Namespace | default "default" }}