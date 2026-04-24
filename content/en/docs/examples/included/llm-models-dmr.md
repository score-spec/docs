---
title: "LLM Models with Docker Model Runner"
description: "How to deploy local LLM models with Open WebUI and Docker Model Runner using `score-compose`"
headless: true
toc_hide: true
---

To begin, follow the [installation instructions](/docs/score-implementation/score-compose/installation) to install the latest version of `score-compose`.

{{% alert title="Prerequisites" %}}
Docker Model Runner (DMR) needs to be set up in your local environment. Follow the [DMR get started guide](https://docs.docker.com/model-runner/get-started/) to set it up.
{{% /alert %}}

## `init`

Initialize your current `score-compose` workspace with the Docker Model Runner provisioner. Run the following command in your terminal:

```bash
score-compose init --no-sample \
    --provisioners https://raw.githubusercontent.com/score-spec/community-provisioners/refs/heads/main/llm-model/score-compose/10-dmr-llm-model.provisioners.yaml
```

The `init` command will create the `.score-compose` directory with the [default resource provisioners]({{< relref "/docs/score-implementation/score-compose/resources-provisioners/" >}}) available, plus the Docker Model Runner-specific provisioner for the `llm-model` resource type.

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
|               |       |        |                    | Docker Model Runner             |
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
    --override-property containers.open-webui.variables.WEBUI_NAME="Hello, DMR with Score Compose!" \
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

This will pull the requested LLM models (`ai/gemma3:270M-UD-IQ2_XXS` and `ai/smollm2:135M-Q2_K`) via Docker Model Runner, and then start the Open WebUI container connected to the DMR backend.

## Verify

Check the Docker images, including the LLM model images pulled by Docker Model Runner:

```bash
docker images
```

```none
REPOSITORY             TAG                  SIZE
open-webui             main-slim            ...
ai/gemma3              270M-UD-IQ2_XXS      182MB
ai/smollm2             135M-Q2_K            56.9MB
```

See the running containers:

```bash
docker ps
```

You should see the `open-webui` container running and connected to the Docker Model Runner backend.

## Access Open WebUI

Open your browser and navigate to [http://localhost:8080](http://localhost:8080) to access the Open WebUI frontend. You can now chat with the LLM models you deployed!

Congrats! You've successfully deployed, with the `score-compose` implementation, local LLM models with Open WebUI and Docker Model Runner. You provisioned them through Docker, without writing the Docker Compose file by yourself.
