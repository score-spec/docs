---
title: "Score Compose"
draft: false
mermaid: true
type: examples
excerpt: 'This resource provides a minio based S3 bucket with AWS-style credentials. This provides some common and well known outputs that can be used with any generic AWS s3 client. If the provider has a publish port annotation, it can expose a management port on the local network for debugging and connectivity.'
hasMore: false
parent: "S3"
flavor: "Default"

---

This resource provides a minio based S3 bucket with AWS-style credentials. This provides some common and well known outputs that can be used with any generic AWS s3 client. If the provider has a publish port annotation, it can expose a management port on the local network for debugging and connectivity.

{{% example-file filename="provisioners.yaml" dir="resource-provisioners/default/s3/score-compose" githubUrl="https://github.com/score-spec/examples/blob/main" %}}
