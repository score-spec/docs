---
title: "Volumes"
draft: false
mermaid: true
type: examples
excerpt: ''
hasMore: false
parent: "Specification"

---



{{% example-file filename="score.yaml" dir="score/specification/volumes" githubUrl="https://github.com/score-spec/examples/blob/main" %}}

{{< tabs >}}
{{% tab name="score-compose" %}}
## Initialize your local workspace

```bash
score-compose init
```

## Generate the platform specific manifests

```bash
score-compose generate score.yaml --image busybox
```

## Deploy the generated manifests

```bash
docker compose up -d
```

## See the running containers

```bash
docker ps
```
{{%/ tab %}}
{{% tab name="score-k8s" %}}
## Initialize your local workspace

```bash
score-k8s init
```

## Generate the platform specific manifests

```bash
score-k8s generate score.yaml --image busybox
```

## Deploy the generated manifests

```bash
kubectl apply -f manifests.yaml
```

## See the running containers

```bash
kubectl get all
```
{{%/ tab %}}
{{< /tabs >}}
  
