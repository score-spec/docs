#!/bin/bash
set -o errexit

categories=$(ls -d */)
for category in $categories;
do
  echo "## Testing category ${category}:"
  cd $category
  features=$(ls -d */)
  for feature in $features;
  do
    echo "#### For ${feature}:"
    cd $feature
    score-compose init --no-sample
    score-compose generate score.yaml
    score-k8s init --no-sample
    score-k8s generate score.yaml
    cd ..
  done
  cd ..
done