---
title: "Get started with Score"
linkTitle: "Get started"
weight: 2
aliases:
- /docs/get-started/install/
- /docs/get-started/score-compose-hello-world/
- /docs/get-started/score-helm-hello-world/
- /docs/get-started/score-humanitec-hello-world/
---

## Overview

If you're new to Score, we recommend starting with the [`score-compose`](https://github.com/score-spec/score-compose) reference implementation. It provides a helpful blueprint for using Score and allows you to become familiar with the [Score specification](/docs/score-specification/score-spec-reference) before exploring further implementation options.

## Hello world with `score-compose`

**1.** To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

**2.** Open your IDE and paste in the following `score.yaml` file, which describes a simple service based on a `busybox` Docker image:

```yaml
apiVersion: score.dev/v1b1

metadata:
  name: hello-world

containers:
  hello:
    image: busybox
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo Hello World!; sleep 5; done"]
```

**3.** To convert the `score.yaml` file into runnable `compose.yaml`, run the following commands in your terminal:

```console
$ score-compose init
$ score-compose generate score.yaml
```

The `init` will create the `.score-compose` directory. The `generate` command will add the input `score.yaml` workload to the `.score-compose/state.yaml` state file and regenerate the output `compose.yaml`.

```console
$ cat compose.yaml
name: 01-hello
services:
    hello-world-hello:
        command:
            - -c
            - while true; do echo Hello World!; sleep 5; done
        entrypoint:
            - /bin/sh
        image: busybox
```

If you make any modifications to the `score.yaml` file, run `score-compose generate score.yaml` to regenerate the output.

**4.** Run `docker compose up` to execute the newly generated `compose.yaml` file:

```console
$ docker compose up -d
[+] Running 1/2
 ⠼ Network 01-hello_default                Created
 ✔ Container 01-hello-hello-world-hello-1  Started
$ docker logs -f 01-hello-hello-world-hello-1
Hello World!
Hello World!
Hello World!
Hello World!
^C%
$ docker compose down
```

Congrats! You’ve successfully run your first Score Implementation with a Hello World workload and provisioned it through Docker.

## Next steps

- **Explore more examples**: Check out the [examples folder](https://github.com/score-spec/score-compose/tree/main/examples) for `score-compose` to dive into further use cases and experiment with different configurations.

- **Learn more about `score-compose`**: Investigate the inner workings of the `score-compose` reference implementation by exploring its CLI reference [here](/docs/score-implementation/score-compose/cli).

- **Explore other implementations**: Play around with [other available open-source Score implementations](/docs/score-implementation/). For example, you could continue by running the same Score file used in the example above via the `score-k8s` CLI to generate a Kubernetes manifest.

- **Join the Score community Slack**: If you encounter any issues or have questions, feel free to reach out to us in the [Score](https://cloud-native.slack.com/archives/C07DN0D1UCW) channel on the CNCF Slack (<https://slack.cncf.io/>).
