---
title: "Redis"
draft: false
mermaid: true
type: examples
excerpt: ''
hasMore: false
parent: "Default Provisioners"
flavor: "Resources"

---

{{% example-file filename="score.yaml" dir="score/resources/default-provisioners/redis" githubUrl="https://github.com/score-spec/examples/blob/main" %}}

{{< tabs >}}
{{% tab name="score-compose" %}}

## Initialize your local workspace

This will use the default provisioners, you can use other provisioners instead like illustrated [here](https://github.dev/score-spec/community-provisioners).

```bash
score-commpose init
```

## Get the provisioner definition

```bash
score-compose provisioners list
```

## Generate the platform specific manifests

```bash
score-commpose generate score.yaml
```

## See the resource outputs

```bash
score-commpose resources list
```

You can run `score-compose resources get-outputs` on each resource listed to get their `outputs`.

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

This will use the default provisioners, you can use other provisioners instead like illustrated [here](https://github.dev/score-spec/community-provisioners).

```bash
score-k8s init
```

## Get the provisioner definition

```bash
score-k8s provisioners list
```

## Generate the platform specific manifests

```bash
score-k8s generate score.yaml
```

## See the resource outputs

```bash
score-k8s resources list
```

You can run `score-k8s resources get-outputs` on each resource listed to get their `outputs`.

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
