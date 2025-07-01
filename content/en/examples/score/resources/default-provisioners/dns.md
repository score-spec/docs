---
title: "Dns"
draft: false
mermaid: true
type: examples
excerpt: ''
hasMore: false
parent: "Default Provisioners"
flavor: "Resources"

---

{{% example-file filename="score.yaml" dir="score/resources/default-provisioners/dns" githubUrl="https://github.com/score-spec/examples/blob/main" %}}

{{< tabs >}}
{{% tab name="score-compose" %}}
Initialize your local workspace, by using the [default provisioners](https://docs.score.dev/docs/score-implementation/score-compose/resources-provisioners/#default-provisioners):

```bash
score-commpose init
```

Get the provisioners definition:

```bash
score-compose provisioners list
```

Generate the platform specific manifests:

```bash
score-commpose generate score.yaml
```

See the resource outputs:

```bash
score-commpose resources list
```

You can run the following command on each resource listed with the previous command to get their `outputs`:

```bash
score-commpose resources get-outputs
```

Deploy the generated manifests:

```bash
docker compose up -d
```

See the running containers:

```bash
docker ps
```

{{%/ tab %}}
{{% tab name="score-k8s" %}}
Initialize your local workspace, by using the [default provisioners](https://docs.score.dev/docs/score-implementation/score-k8s/resources-provisioners/#default-provisioners):

```bash
score-k8s init
```

Get the provisioners definition:

```bash
score-k8s provisioners list
```

Generate the platform specific manifests:

```bash
score-k8s generate score.yaml
```

See the resource outputs:

```bash
score-k8s resources list
```

You can run the following command on each resource listed with the previous command to get their `outputs`:

```bash
score-k8s resources get-outputs
```

Deploy the generated manifests:

```bash
kubectl apply -f manifests.yaml
```

See the running containers:

```bash
kubectl get all
```

{{%/ tab %}}
{{< /tabs >}}
