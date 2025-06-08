---
title: "Dapr Pubsub"
draft: false
mermaid: true
type: examples
excerpt: ''
hasMore: false
parent: "Community Provisioners"
flavor: "Resources"

---



{{% example-file filename="score.yaml" dir="score/resources/community-provisioners/dapr-pubsub" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}

{{< tabs >}}
{{% tab name="score-compose" %}}
{{% example-file filename="10-redis-dapr-pubsub.provisioners.yaml" dir="score/resources/community-provisioners/dapr-pubsub/score-compose" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{%/ tab %}}
{{% tab name="score-k8s" %}}
{{% example-file filename="10-rabbitmq-dapr-pubsub.provisioners.yaml" dir="score/resources/community-provisioners/dapr-pubsub/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{% example-file filename="10-redis-dapr-pubsub.provisioners.yaml" dir="score/resources/community-provisioners/dapr-pubsub/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
{{%/ tab %}}
{{< /tabs >}}
  
