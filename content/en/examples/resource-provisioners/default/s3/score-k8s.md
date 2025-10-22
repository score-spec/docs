---
title: "Score K8s"
draft: false
mermaid: true
type: examples
excerpt: 'This resource provides an in-cluster minio based S3 bucket with AWS-style credentials. This provides some common and well known outputs that can be used with any generic AWS s3 client. The outputs of the provisioner are a stateful set, a service, a secret, and a job per bucket.'
hasMore: false
parent: "S3"
flavor: "Default"

---

This resource provides an in-cluster minio based S3 bucket with AWS-style credentials. This provides some common and well known outputs that can be used with any generic AWS s3 client. The outputs of the provisioner are a stateful set, a service, a secret, and a job per bucket.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/s3/score-k8s" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
