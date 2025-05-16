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
      ${implementation%?} init --no-sample --provisioners $provisioner
      export NAMESPACE=default
      ${implementation%?} generate $(ls score*.yaml)
      rm -r .${implementation%?}
    done
  done
  cd ..
done