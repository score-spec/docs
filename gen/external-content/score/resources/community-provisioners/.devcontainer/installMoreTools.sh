#!/bin/bash

mkdir install-more-tools
cd install-more-tools

# score-compose
SCORE_COMPOSE_VERSION=$(curl -sL https://api.github.com/repos/score-spec/score-compose/releases/latest | jq -r .tag_name)
wget https://github.com/score-spec/score-compose/releases/download/${SCORE_COMPOSE_VERSION}/score-compose_${SCORE_COMPOSE_VERSION}_linux_amd64.tar.gz
tar -xvf score-compose_${SCORE_COMPOSE_VERSION}_linux_amd64.tar.gz
chmod +x score-compose
sudo mv score-compose /usr/local/bin

# score-k8s
SCORE_K8S_VERSION=$(curl -sL https://api.github.com/repos/score-spec/score-k8s/releases/latest | jq -r .tag_name)
wget https://github.com/score-spec/score-k8s/releases/download/${SCORE_K8S_VERSION}/score-k8s_${SCORE_K8S_VERSION}_linux_amd64.tar.gz
tar -xvf score-k8s_${SCORE_K8S_VERSION}_linux_amd64.tar.gz
chmod +x score-k8s
sudo mv score-k8s /usr/local/bin

# kind
KIND_VERSION=$(curl -sL https://api.github.com/repos/kubernetes-sigs/kind/releases/latest | jq -r .tag_name)
curl -Lo ./kind https://kind.sigs.k8s.io/dl/${KIND_VERSION}/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# yq
sudo wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/bin/yq
sudo chmod +x /usr/bin/yq

# docker model-plugin
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-model-plugin
docker model list

cd ..
rm -rf install-more-tools