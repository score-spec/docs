---
title: "Redis"
draft: false
mermaid: true
type: examples
excerpt: ''
hasMore: false
parent: "Community Provisioners"
flavor: "Resources"

---

{{% example-file filename="score.yaml" dir="score/resources/community-provisioners/redis" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}

{{< tabs >}}
{{% tab name="score-k8s" %}}
{{% example-file filename="10-redis-helm-template.provisioners.yaml" dir="score/resources/community-provisioners/redis/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{% example-file filename="10-redis-helm-upgrade.provisioners.yaml" dir="score/resources/community-provisioners/redis/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{% example-file filename="README.md" dir="score/resources/community-provisioners/redis/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{%/ tab %}}
{{< /tabs >}}
