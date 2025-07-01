Initialize your local workspace

```bash
score-compose init
```

Generate the platform specific manifests

```bash
score-compose generate score.yaml --image busybox
```

Deploy the generated manifests

```bash
docker compose up -d
```

See the running containers

```bash
docker ps
```
