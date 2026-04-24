---
title: "LLM Models with Ollama"
description: "How to deploy local LLM models with Open WebUI and Ollama using `score-compose`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

## `init`

Initialize your current `score-compose` workspace with the Ollama provisioner and patch template. Run the following command in your terminal:

```bash
score-compose init --no-sample \
    --patch-templates https://raw.githubusercontent.com/score-spec/community-patchers/refs/heads/main/score-compose/ollama.tpl \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/llm-model/score-compose/10-ollama-llm-model-service.provisioners.yaml
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available, plus the Ollama-specific provisioner for the `llm-model` resource type.

The `--patch-templates` option adds the [`ollama.tpl`](https://github.com/score-spec/community-patchers/blob/main/score-compose/ollama.tpl) patch template which configures the Ollama service integration in the generated Docker Compose file.

You can see the resource provisioners available by running this command:

```bash
score-compose provisioners list
```

The Score file example illustrated uses two resource types: `llm-model` and `volume`.

```none
+---------------+-------+--------+--------------------+---------------------------------+
|     TYPE      | CLASS | PARAMS |      OUTPUTS       |          DESCRIPTION            |
+---------------+-------+--------+--------------------+---------------------------------+
| llm-model     | (any) | model  | url                | Provisions an LLM model via     |
|               |       |        |                    | Ollama                          |
+---------------+-------+--------+--------------------+---------------------------------+
| volume        | (any) |        | source, type       | Creates a persistent volume     |
|               |       |        |                    | that can be mounted on a        |
|               |       |        |                    | workload.                       |
+---------------+-------+--------+--------------------+---------------------------------+
```

## `generate`

Convert the `score.yaml` file into a deployable `compose.yaml`. Run the following command in your terminal:

```bash
score-compose generate score.yaml \
    --image ghcr.io/open-webui/open-webui:main-slim \
    --publish 8080:open-webui:8080 \
    --override-property containers.open-webui.variables.WEBUI_NAME="Hello, Ollama with Score Compose!" \
    --output compose.yaml
```

The `generate` command will add the input `score.yaml` workload with a particular container image to the `.score-compose/state.yaml` state file and generate the output `compose.yaml`.

The `--publish` flag exposes the Open WebUI port to the host so you can access it in your browser.

See the generated `compose.yaml` by running this command:

```bash
cat compose.yaml
```

If you make any modifications to the `score.yaml` file, run `score-compose generate score.yaml` to regenerate the output `compose.yaml`.

## `docker compose`

Run `docker compose up` to execute the generated `compose.yaml` file:

```bash
docker compose up -d --wait
```

This will pull the Ollama container image, start the Ollama service, pull the requested LLM models (`gemma3:270m` and `smollm2:135m`), and then start the Open WebUI container connected to the Ollama backend.

## Verify

Check the Docker images that were pulled:

```bash
docker images
```

```none
REPOSITORY               TAG            SIZE
ollama/ollama            latest         3.33GB
open-webui               main-slim      ...
```

Check that the LLM models were successfully pulled by Ollama:

```bash
curl localhost:11434/api/tags | jq -r .models[].name
```

```none
gemma3:270m
smollm2:135m
```

See the running containers:

```bash
docker ps
```

You should see the `open-webui` and `ollama` containers running, along with some exited "puller" containers that were used to download the models.

## Access Open WebUI

Open your browser and navigate to [http://localhost:8080](http://localhost:8080) to access the Open WebUI frontend. You can now chat with the LLM models you deployed!

Congrats! You've successfully deployed, with the `score-compose` implementation, local LLM models with Open WebUI and Ollama. You provisioned them through Docker, without writing the Docker Compose file by yourself.
