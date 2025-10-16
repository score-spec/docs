#!/bin/bash
set -o errexit

implementations=$(ls -d */)
for implementation in $implementations;
do
  echo "## Testing implementation ${implementation}:"
  cd $implementation
  patchers=$(ls *.tpl)
  for patcher in $patchers;
  do
    echo "#### With ${patcher}:"
    ${implementation%?} init --patch-templates $patcher
    ${implementation%?} generate score.yaml
    rm -r .${implementation%?}
  done
  cd ..
done