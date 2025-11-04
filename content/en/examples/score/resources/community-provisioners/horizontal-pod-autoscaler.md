---
title: "Horizontal Pod Autoscaler"
draft: false
mermaid: true
type: examples
excerpt: ''
hasMore: false
parent: "Community Provisioners"
flavor: "Resources"

---

{{% example-file filename="score.yaml" dir="score/resources/community-provisioners/horizontal-pod-autoscaler" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}

{{< tabs >}}
{{% tab name="score-compose" %}}
{{% example-file filename="10-hpa.provisioners.yaml" dir="score/resources/community-provisioners/horizontal-pod-autoscaler/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}

---

Initialize your local workspace, by importing a specific community provisioner:

```bash
score-compose init --provisioners REPLACE-ME-WITH-ACTUAL-PROVISIONER-FILE-URL.yaml
```

_Note: you need to replace `REPLACE-ME-WITH-ACTUAL-PROVISIONER-FILE-URL.yaml` by the actual provisioner file you want to use and import. More information [here](https://docs.score.dev/docs/score-implementation/score-compose/resources-provisioners/#install-provisioner-files)._

Get the provisioners definition:

```bash
score-compose provisioners list
```

Generate the platform specific manifests:

```bash
score-compose generate score.yaml
```

See the resource outputs:

```bash
score-compose resources list
```

You can run the following command on each resource listed with the previous command to get their `outputs`:

```bash
score-compose resources get-outputs
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
{{% example-file filename="10-hpa.provisioners.yaml" dir="score/resources/community-provisioners/horizontal-pod-autoscaler/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}

---

Initialize your local workspace, by importing a specific community provisioner:

```bash
score-k8s init --provisioners REPLACE-ME-WITH-ACTUAL-PROVISIONER-FILE-URL.yaml
```

_Note: you need to replace `REPLACE-ME-WITH-ACTUAL-PROVISIONER-FILE-URL.yaml` by the actual provisioner file you want to use and import. More information [here](https://docs.score.dev/docs/score-implementation/score-k8s/resources-provisioners/#install-provisioner-files)._

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
