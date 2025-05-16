## Initialize your local workspace

This will use the default provisioners, you can use other provisioners instead like illustrated [here](https://github.dev/score-spec/community-provisioners).

```bash
score-commpose init
```

## Get the provisioner definition

```bash
score-compose provisioners list
```

## Generate the platform specific manifests

```bash
score-commpose generate score.yaml
```

## See the resource outputs

```bash
score-commpose resources list
```

You can run `score-compose resources get-outputs` on each resource listed to get their `outputs`.

## Deploy the generated manifests

```bash
docker compose up -d
```

## See the running containers

```bash
docker ps
```