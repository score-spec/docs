---
title: Workload specification
id: workload-spec
full_link: /docs/concepts/score-specification/
short_description: >
    A Workload Specification file, or Workload Spec, is a single workload specification file.
aka:
tags:
- workload
- fundamental
---

A Workload Specification file, or Workload Spec, is a single workload specification file.

<!--more-->

For example, the following file is a YAML file for Humanitec defining routes as a service.

```yml
apiVersion: humanitec.org/v1b1
service:
  routes:
    http:
      "/":
        from: ${resources.dns}
        type: prefix
        port: 80
```
