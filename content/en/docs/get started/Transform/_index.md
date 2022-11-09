---
title: "Run your first transform"
linkTitle: "Run your first transform"
weight: 4
draft: true
description: >
  This section contains pages that show how to apply a transformation on your Score Specification file.
---

Throughout the following sections. You will learn how to run a transform in the following formats:

<!--

```yaml
name: backend

container:
  image: registry.humanitec.io/humanitec-demo/paws-demo-backend
  variables:
    PORT: "8080"
    DEBUG: "false"
    CONNECTION_STRING: postgresql://${resources.database.username}:${resources.database.password}@${resources.database.host}:${resources.database.port}/${resources.database.name}

resources:
  database:
    type: postgres
    properties:
      host:
        required: true
        default: localhost
      port:
        required: true
        default: 5432
      name:
        required: true
      username:
        secret: true
        required: false
      password:
        secret: true
        required: false
```

-->
