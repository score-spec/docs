- op: set
  path: services.placement
  value:
    image: ghcr.io/dapr/placement:latest
    command: ["./placement", "--port", "50006"]
    ports:
    - target: 50006
      published: "50006"
- op: set
  path: services.scheduler
  value:
    image: ghcr.io/dapr/scheduler:latest
    command: ["./scheduler", "--port", "50007", "--etcd-data-dir", "/data"]
    ports:
    - target: 50007
      published: "50007"
    user: root
    volumes:
    - type: bind
      source: ./dapr-etcd-data/
      target: /data
{{ range $name, $cfg := .Compose.services }}
{{ if dig "annotations" "dapr.io/enabled" false $cfg }}
- op: set
  path: services.{{ $name }}-sidecar
  value:
    image: ghcr.io/dapr/daprd:latest
    command: ["./daprd", "--app-id={{ dig "annotations" "dapr.io/app-id" "" $cfg }}", "--app-port={{ dig "annotations" "dapr.io/app-port" "" $cfg }}", "--enable-api-logging={{ dig "annotations" "dapr.io/enable-api-logging" false $cfg }}", "--placement-host-address=placement:50006", "--scheduler-host-address=scheduler:50007", "--resources-path=/components"]
    network_mode: service:{{ $name }}
    volumes:
    - type: bind
      source: .score-compose/mounts/components/
      target: /components
    depends_on:
      placement:
        condition: service_started
        required: true
{{ end }}
{{ end }}
