---
title: "Dev Containers"
linkTitle: "Dev Containers"
weight: 6
description: >
    How to use Score in a Dev Containers environment
---

The Visual Studio Code [Dev Containers extension](https://code.visualstudio.com/docs/remote/containers) lets you use a self-contained Docker container as a complete development environment, without installing any additional packages, libraries, or utilities in your local filesystem.

While Score doesn't provide a pre-built Dev Containers, here is an example on how you can take inspiration of this working setup for your own Dev Containers by having these tools pre-packaged:

- The base Dev Containers image used is `mcr.microsoft.com/devcontainers/base:noble`, but you can use others fitting better with your own needs.
- `docker`
- `minikube`
- `kind`
- `score-compose`
- `score-k8s`
- This is also adding the Score specification schema validation for your Score files.

Create a `.devcontainer/devcontainer.json` file:

```json
{
  "name": "Score Dev Containers",
  "image": "mcr.microsoft.com/devcontainers/base:noble",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {
      "moby": true,
      "version": "latest"
    },
    "ghcr.io/devcontainers/features/kubectl-helm-minikube:1": {
      "version": "latest",
      "helm": "latest",
      "minikube": "latest"
    }
  },
  "postCreateCommand": "bash .devcontainer/installMoreTools.sh",
  "customizations": {
    "vscode": {
      "extensions": [
        "redhat.vscode-yaml"
      ],
      "settings": {
        "yaml.schemas": {
          "https://raw.githubusercontent.com/score-spec/spec/main/score-v1b1.json": "score.yaml"
        }
      }
    }
  }
}
```

Create a `.devcontainer/installMoreTools.sh` file:

```bash
#!/bin/bash

mkdir install-more-tools
cd install-more-tools

SCORE_COMPOSE_VERSION=$(curl -sL https://api.github.com/repos/score-spec/score-compose/releases/latest | jq -r .tag_name)
wget https://github.com/score-spec/score-compose/releases/download/${SCORE_COMPOSE_VERSION}/score-compose_${SCORE_COMPOSE_VERSION}_linux_amd64.tar.gz
tar -xvf score-compose_${SCORE_COMPOSE_VERSION}_linux_amd64.tar.gz
chmod +x score-compose
sudo mv score-compose /usr/local/bin

SCORE_K8S_VERSION=$(curl -sL https://api.github.com/repos/score-spec/score-k8s/releases/latest | jq -r .tag_name)
wget https://github.com/score-spec/score-k8s/releases/download/${SCORE_K8S_VERSION}/score-k8s_${SCORE_K8S_VERSION}_linux_amd64.tar.gz
tar -xvf score-k8s_${SCORE_K8S_VERSION}_linux_amd64.tar.gz
chmod +x score-k8s
sudo mv score-k8s /usr/local/bin

KIND_VERSION=$(curl -sL https://api.github.com/repos/kubernetes-sigs/kind/releases/latest | jq -r .tag_name)
curl -Lo ./kind https://kind.sigs.k8s.io/dl/${KIND_VERSION}/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

cd ..
rm -rf install-more-tools
```

And you are all set, ready to [open your folders with this Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-an-existing-folder-in-a-container), enjoy!

_Note: this same Dev Containers setup is also working with [GitHub Codespace](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers)._
