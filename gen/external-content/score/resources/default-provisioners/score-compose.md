Initialize your local workspace, by using the [default provisioners](https://docs.score.dev/docs/score-implementation/score-compose/resources-provisioners/#default-provisioners):

```bash
score-commpose init
```

Get the provisioners definition:

```bash
score-compose provisioners list
```

Generate the platform specific manifests:

```bash
score-commpose generate score.yaml
```

See the resource outputs:

```bash
score-commpose resources list
```

You can run the following command on each resource listed with the previous command to get their `outputs`:

```bash
score-commpose resources get-outputs
```

Deploy the generated manifests:

```bash
docker compose up -d
```

See the running containers:

```bash
docker ps
```
