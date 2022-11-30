---
title: "Implement ports and volumes"
linkTitle: "Implement ports and volumes"
weight: 4
draft: false
---

Using files and volumes or serving incoming requests on selected ports helps to build real world {{< glossary_tooltip text="Workloads" term_id="workload" >}} and applications.

In such a scenario, you'd want to express this in your `score.yaml` file.

```yaml
apiVersion: score.sh/v1b1

metadata:
  name: web-app

service:
  ports:
    www:
      port: 80

containers:
  web-app:
    image: nginx
    files:
      - target: /usr/share/nginx/html/index.html
        mode: "644"
        content: ["${resources.env.MESSAGE}"]

resources:
  env:
    type: environment
    properties:
      MESSAGE:
        type: string
      DATADOG_ENV:
        type: string
  dns:
    type: dns
```

Paired with the `score.yaml` file is the extension file, `humanitec.score.yaml`, which contains additional hints for the score-humanitec CLI tool.

The extension file helps the CLI tool add proper routes to Humanitec's {{< glossary_tooltip text="Deployment Delta" term_id="deployment-delta" >}}, so that the service is available to the outer world.

The following is an implementation of the `humanitec.score.yaml` file.

```yaml
apiVersion: humanitec.org/v1b1

profile: "humanitec/default-module"
spec:
  "labels":
    "tags.datadoghq.com/env": "${resources.env.DATADOG_ENV}"
  "ingress":
    rules:
      "${resources.dns}":
        http:
          "/":
            type: prefix
            port: 80
```

To prepare a new Deployment Delta, use the score-humanitec tool.

```bash
score-humanitec run -f ./score.yaml --extensions ./humanitec.score.yaml --env test-env
```

The generated JSON can then be used as a payload for a [Humanitec API call](https://api-docs.humanitec.com/#tag/Delta/paths/~1orgs~1%7BorgId%7D~1apps~1%7BappId%7D~1deltas/post).

```json
{
  "metadata": {
    "env_id": "test-env",
    "name": "Auto-generated (SCORE)"
  },
  "modules": {
    "add": {
      "web-app": {
        "externals": {
          "dns": {
            "type": "dns"
          }
        },
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "web-app": {
              "files": {
                "/usr/share/nginx/html/index.html": {
                  "mode": "644",
                  "value": "${values.MESSAGE}"
                }
              },
              "id": "web-app",
              "image": "nginx"
            }
          },
          "ingress": {
            "rules": {
              "externals.dns": {
                "http": {
                  "/": {
                    "port": 80,
                    "type": "prefix"
                  }
                }
              }
            }
          },
          "labels": {
            "tags.datadoghq.com/env": "${values.DATADOG_ENV}"
          },
          "service": {
            "ports": {
              "www": {
                "container_port": 80,
                "protocol": "TCP",
                "service_port": 80
              }
            }
          }
        }
      }
    }
  }
}
```

When deploying this service with `Humanitec`, make sure that the shared application value called `MESSAGE` is set for the target environment.

For more information, see the [Humanitec extension reference]({{< relref "/content/en/docs/reference/humanitec-extension.md" >}}).
