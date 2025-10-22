---
title: "default-hpa"
draft: false
mermaid: true
type: examples
source: "community"
implementation: "score-k8s"
resourceType: "horizontal-pod-autoscaler"
provisionerType: "template"
flavor: "default"
excerpt: ''
description: 'Generates an HorizontalPodAutoscaler manifest.'
supportedParams: 
  - maxReplicas
  - minReplicas
  - targetCPUUtilizationPercentage
hasMore: false

---

{{% resource-provisioner-content description="Generates an HorizontalPodAutoscaler manifest." type="horizontal-pod-autoscaler" supportedParams="maxReplicas,minReplicas,targetCPUUtilizationPercentage" %}}

{{% example-file filename="10-hpa.provisioners.yaml" dir="resource-provisioners/community/horizontal-pod-autoscaler/score-k8s" githubUrl="https://github.com/score-spec/community-provisioners/blob/main" %}}
