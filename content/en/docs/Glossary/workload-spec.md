---
title: "Workload specification"
linkTitle: "Workload spec "
weight: 4
---

A Workload Specification file, or Workload Spec, is a single workload specification file.

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
