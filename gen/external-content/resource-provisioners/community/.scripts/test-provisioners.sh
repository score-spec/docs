#!/bin/bash
set -o errexit

types=$(ls -d */)
for type in $types;
do
  echo "## Testing resource type ${type}:"
  cd $type
  implementations=$(ls -d */)
  for implementation in $implementations;
  do
    echo "#### For ${implementation%?}:"
    provisioners=$(ls $implementation*.provisioners.yaml)
    for provisioner in $provisioners;
    do
      echo "###### With ${provisioner}:"
      if [[ "$provisioner" = "score-compose/10-dns-in-codespace.provisioners.yaml" || "$provisioner" = "score-k8s/10-dns-in-codespace.provisioners.yaml" || "$provisioner" = "score-compose/10-dmr-llm-model-via-curl-cmd.provisioners.yaml" ]]; then
        echo "Skipped."
      else
        ${implementation%?} init --no-sample --provisioners $provisioner
        ${implementation%?} generate $(ls score*.yaml)
        rm -r .${implementation%?}
      fi
    done
  done
  cd ..
done