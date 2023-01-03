---
title: "score-helm install and build from a Docker image"
description: "Installation for score-helm from Docker."
headless: true
toc_hide: true
---

Some Score Implementation CLI contain a Dockerfile for building a Docker container that runs the command line application.

To use this Dockerfile, first [install Docker](https://docs.docker.com/get-docker/) on your machine and run the application.

1. Download the repository.
   The following example uses the GitHub CLI to download the project.

```bash
gh repo clone score-spec/score-helm
```

2. Change directories into `score-helm`.

```bash
cd score-helm
```

3. Build the Docker image by running the following command in the same directory as the Dockerfile.

```bash
docker build -t score-helm:latest .
```

4. Run the Docker image by using the `docker run` command.

```bash
docker run -it score-helm:latest
```

If you want to run `score-helm` with the `--help` flag to view the available options, you would run the following command.

```bash
docker run -it score-helm:latest --help
```

This will start a new container based on the image you built, run `score-helm` with the `--help` flag, and then stop the container.
