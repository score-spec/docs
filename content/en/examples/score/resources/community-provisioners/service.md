---
title: "Service"
draft: false
mermaid: true
type: examples
excerpt: ''
hasMore: false
parent: "Community Provisioners"
flavor: "Resources"

---

{{% example-file filename="score-backend.yaml" dir="score/resources/community-provisioners/service" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{% example-file filename="score-frontend.yaml" dir="score/resources/community-provisioners/service" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}

{{< tabs >}}
{{% tab name="score-compose" %}}
{{% example-file filename="10-service.provisioners.yaml" dir="score/resources/community-provisioners/service/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{%/ tab %}}
{{% tab name="score-k8s" %}}
{{% example-file filename="10-service.provisioners.yaml" dir="score/resources/community-provisioners/service/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{%/ tab %}}
{{< /tabs >}}
