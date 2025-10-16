- op: set
  path: -1
  value:
    apiVersion: networking.k8s.io/v1
    kind: NetworkPolicy
    metadata:
      name: deny-all
      {{ if ne .Namespace "" }}
      namespace: {{ .Namespace }}
      {{ end }}
    spec:
      podSelector: {}
      policyTypes:
      - Ingress
      - Egress