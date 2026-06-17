---
title: "Local state"
linkTitle: "Local state"
weight: 4
description: >
    What the `.score-compose/` and `.score-k8s/` directories contain, when they matter, and when the platform should own state instead.
---

Both `score-compose` and `score-k8s` keep state on disk between commands. `score-compose` writes to a `.score-compose/` directory, and `score-k8s` writes to a `.score-k8s/` directory. The `init` command creates the directory; the `generate` command reads from and writes to it on every invocation.

## What's in it

Two kinds of files live in the directory.

`state.yaml` records the workloads added by previous `generate` runs and the resource outputs the implementation produced for them. Random passwords, generated keys, port assignments, and other non-hermetic values are stored here so the next call to `generate` can reuse them instead of producing new values.

`*.provisioners.yaml` files hold the provisioner definitions used to resolve `resources.*` entries in the Score file. `init` creates the default file (`zz-default.provisioners.yaml`); any additional files loaded with `--provisioners` are stored alongside it.

A directory immediately after `score-compose init` looks like this:

```text
.score-compose/
├── state.yaml
└── zz-default.provisioners.yaml
```

`score-k8s init` produces an equivalent layout under `.score-k8s/`.

## Is it mandatory?

Yes, when you use `score-compose` or `score-k8s`. Both `generate` commands expect the directory to exist and fail if you call them without running `init` first. The directory is created and managed by the CLI; you don't edit it by hand.

The CLIs hold no state outside this directory. The `score.yaml` file describes the workload, and everything that needs to persist between `generate` calls is written into the local state.

## When local state helps

The local state is most useful during local development, where the same project is generated and deployed repeatedly.

Take a `postgres` resource as an example:

```yaml
resources:
  db:
    type: postgres
```

On the first `score-compose generate`, the default `postgres` provisioner produces a random password and writes it to `.score-compose/state.yaml`. On every subsequent `generate`, the provisioner reads the same password back from the state and reuses it. The running database and the application talking to it stay in sync across successive `generate` runs.

Other values that the local state keeps stable across runs include:

- Generated secrets and signing keys returned by resource provisioners.
- Allocated ports, hostnames, and other non-hermetic resource outputs.
- The set of workloads accumulated across multiple `generate` calls in the same project.

Without the local state, every `generate` would re-randomize these values and the deployed services would drift apart between runs.

## When you don't need it

The local state is a local-development convenience. It is not the system of record for a deployed application.

In production, prefer to let the target platform own this state:

- On Kubernetes, store secrets in the cluster and let the platform create and rotate them. A resource provisioner that, for example, creates a `DatabaseInstance` should produce its secrets inside the cluster rather than writing them to a developer's working directory.
- Managed Score implementations and services store resource state on behalf of the deployment, so a workflow does not need to ship `state.yaml` between runs. See [Moving to a managed Score implementation](/docs/how-to/score-cicd-pipelines/#moving-to-a-managed-score-implementation).

Keep the local state for the inner development loop, and let the target platform own state for deployed environments.

## Excluding local state from version control

The local state contains private and potentially sensitive values, including secrets produced by resource provisioners. It must not be committed to source control.

Add the directory to `.gitignore`:

```gitignore
.score-compose/
.score-k8s/
```

## Persisting state in CI/CD

A CI workflow typically starts from a clean slate, with no on-disk state between runs. If you generate from CI against a target where state cannot be delegated to the platform, `state.yaml` has to be carried between runs to keep generated values stable.

The common pattern is to download the state at the start of the job and upload it again at the end. See [Maintaining `score-k8s` state](/docs/how-to/score-cicd-pipelines/#maintaining-score-k8s-state) for a full example that stores the state in a Kubernetes secret.

## Removing local state

To start over, delete the directory and run `init` again:

```bash
rm -rf .score-compose
score-compose init
```

The next `generate` rebuilds the state from the current Score file. Random outputs will be regenerated with new values, and any drift accumulated across earlier runs is discarded.
