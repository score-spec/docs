Initialize your local workspace

```bash
score-k8s init
```

Generate the platform specific manifests

```bash
score-k8s generate score.yaml --image busybox
```

Deploy the generated manifests

```bash
kubectl apply -f manifests.yaml
```

See the running containers

```bash
kubectl get all
```
