---
title: "Quick Start: CI CD with Score "
subtitle: "Score -compose"
date: 2017-01-05
weight: 5
description: >
  A short lead description about this content page. It can be **bold** or _italic_ and can be split over multiple paragraphs.
---

## Sample HTTP microservice

Simple HTTP backend microservice is available at https://github.com/Humanitec-DemoOrg/Score -demo repository:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea28a3fa-bfb1-47f3-bba6-c89c09a8f824/Untitled.png)

When started, the service prints its active configuration and listens for incoming requests on a `PORT` specified (see `./backend/cms/main.go`):

```go
func printConf(w http.ResponseWriter, req *http.Request) {
	rawJson, err := json.Marshal(conf)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(rawJson)
}

func main() {
	if err := loadConfig(conf); err != nil {
		log.Fatalf(`Failed to load application configuration: %v`, err)
	} else {
		log.Printf("HOST: '%v'\n", conf.Host)
		log.Printf("PORT: '%v'\n", conf.Port)
		log.Printf("DEBUG: '%v'\n", conf.Debug)
		log.Printf("CONNECTION_STRING: '%v'\n", conf.ConnStr)
	}

	addr := fmt.Sprintf("%s:%d", conf.Host, conf.Port)
	log.Printf("Starting server on: '%s'\n", addr)
	http.HandleFunc("/", printConf)
	log.Fatal(http.ListenAndServe(addr, nil))
}
```

`Dockerfile` that is used to build the service image:

```docker
FROM golang:1.18-alpine AS builder

WORKDIR /app

# Copy just the files needed for download modules to take advantage of caching in Docker for local development
# go.sum is used for cache invalidation
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

COPY . .

# https://stackoverflow.com/questions/36279253/go-compiled-binary-wont-run-in-an-alpine-docker-container-on-ubuntu-host
ENV CGO_ENABLED=0

RUN GOOS=linux GOARCH=amd64 go build -o /opt/Score -demo/backend ./cmd/main.go

FROM alpine AS final

WORKDIR /bin
COPY --from=builder /opt/Score -demo /opt/Score -demo

WORKDIR /opt/Score -demo
ENTRYPOINT ["/opt/Score -demo/backend"]
```

## Score Configuration

Service Score configuration is defined in `./backend/Score.yaml`:

```yaml
name: backend

container:
  image: registry.humanitec.io/humanitec-demo/Score -demo-backend
  variables:
    PORT: "8080"
    DEBUG: "false"
    CONNECTION_STRING: postgresql://${resources.database.username}:${resources.database.password}@${resources.database.host}:${resources.database.port}/${resources.database.name}

resources:
  database:
    type: postgres
    properties:
      host:
        required: true
        default: localhost
      port:
        required: true
        default: 5432
      name:
        required: true
      username:
        secret: true
        required: false
      password:
        secret: true
        required: false
```

## Local Environment Setup with Docker-Compose

To develop and test the service locally, `./compose.yaml` configuration file is included with the source code:

```yaml
services:

  backend:
    ports:
      - "8080:8080"

  database:
    image: postgres:11
    ports:
      - "${DATABASE_PORT-5432}:5432"
    volumes:
      - /var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${DATABASE_NAME?err}
      POSTGRES_USER: ${DATABASE_USERNAME?err}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD?err}
```

This Docker Compose configuration file uses local environment variables to keep the secrets out of the source control system, and to share configuration between the services (`backend` and `database`).

## Running service locally with `Score -compose`

Every time the service configuration changes in `./backend/Score.yaml`, or when the source code updates are downloaded, the developer can use `Score -compose` CLI tool to produce a fresh compose configuration file for the `backend` service:

```yaml
Score -compose run \
  -f ./backend/Score.yaml -o backend.yaml --env-file backend.env \
  --build ./backend
```

<aside>
💡 The files produced by `Score -compose` CLI tool (`backend.yaml` and `backend.env`) are both considered to be temporary and should not be committed into the source control system. They are excluded in `./gitignore` for this reason.

</aside>

This command would produce the following `backend.yaml`:

```yaml
services:
  backend:
    build:
      context: ./backend
    depends_on:
      database:
        condition: service_started
    environment:
      CONNECTION_STRING: postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST-localhost}:${DATABASE_PORT-5432}/${DATABASE_NAME?err}
      DEBUG: "false"
      PORT: "8080"
    image: registry.humanitec.io/humanitec-demo/Score -demo-backend
```

The developer can also populate environment variables in `backend.env` file, if those are not set by any other mean yet:

```bash
DATABASE_PORT=5432
DATABASE_NAME=backend
DATABASE_USERNAME=root
DATABASE_PASSWORD=PassW0rd
DATABASE_HOST=localhost
```

The developer can now run the service locally with `Docker Compose`:

```bash
docker-compose -f compose.yml -f backend.yaml --env-file backend.env up --build
```

The Docker Compose command output:

```bash
[+] Running 2/2
 ⠿ Container Score -demo-database-1  Created                                                                                                                                                                           0.0s
 ⠿ Container Score -demo-backend-1   Recreated                                                                                                                                                                         0.3s
Attaching to Score -demo-backend-1, Score -demo-database-1
. . .
Score -demo-backend-1   | 2022/06/14 12:16:50 HOST: ''
Score -demo-backend-1   | 2022/06/14 12:16:50 PORT: '8080'
Score -demo-backend-1   | 2022/06/14 12:16:50 DEBUG: 'false'
Score -demo-backend-1   | 2022/06/14 12:16:50 CONNECTION_STRING: 'postgresql://root:PassW0rd@localhost:5432/backend'
Score -demo-backend-1   | 2022/06/14 12:16:50 Starting server on: ':8080'
```

## Remote Environment Setup with Humanitec

The service can be deployed into a remote Kubernetes cluster as a part of an application with `Humanitec`.

<aside>
💡 For the purpose of this guide a sample `Score -demo` application ([link](https://app.humanitec.io/orgs/humanitec-demo/apps/Score -demo)) was setup in `Humanitec Demo` organization and connected to https://github.com/Humanitec-DemoOrg/Score -demo repository as described [here](https://docs.humanitec.com/guides/connect-ci-setup/connect-ci-pipelines).

</aside>

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/37bdd466-6433-4f3d-a1a7-30def84a35ba/Untitled.png)

GitHub workflow in `./github/workflows/ci.yaml` is set to publish an updated image to Humanitec every time a tagged version of the service is pushed into the repository:

```yaml
name: CI

on: [push]

jobs:  
  push-to-humanitec:
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags')

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Version
        id: get_version
        run: |
          echo Version: ${GITHUB_REF/refs\/tags\//}
          echo ::set-output name=VERSION::${GITHUB_REF/refs\/tags\//}

      - name: Build and Push to Humanitec (backend)
        uses: humanitec/build-push-to-humanitec@v1
        with:
          context: ./backend
          image-name: Score -demo-backend
          organization: humanitec-demo
          tag: ${{ steps.get_version.outputs.VERSION }}
          humanitec-token: ${{ secrets.HUMANITEC_TOKEN }}
```

## Deploying updates with `Score -humanitec`

<aside>
🚧 This section describes manual steps on how to use `Score -humanitec` CLI tool to deploy the service updates with Humanitec. In real life scenario GitHub Actions or custom scripts would perform this task automatically as a part of CI/CD pipeline.

</aside>

The developer can quickly deploy updated service to the remote environment with `Score -humanitec`:

```bash
Score -humanitec run \
  -f ./backend/Score.yaml \
  --org humanitec-demo --app Score -demo --env development --token $HT_TOKEN \
  --image=registry.humanitec.io/humanitec-demo/Score -demo-backend:0.3.0
```

The tool would create a new deployment draft and output the deployment delta details:

```json
{
  "id": "0025d1b6b90864ac3995998562e353290e458122",
  "metadata": {
    "env_id": "development",
    "name": "Score -based deployment",
    "created_by": "0110db28-90aa-4c42-bf52-9c49718da796",
    "created_at": "2022-06-14T12:40:42.895793478Z",
    "last_modified_at": "2022-06-14T12:40:42.895793478Z"
  },
  "modules": {
    "add": {
      "backend": {
        "externals": {
          "database": {
            "type": "postgres"
          }
        },
        "profile": "humanitec/default-module",
        "spec": {
          "containers": {
            "backend": {
              "id": "backend",
              "image": "registry.humanitec.io/humanitec-demo/Score -demo-backend:0.3.0",
              "variables": {
                "CONNECTION_STRING": "postgresql://${externals.database.username}:${externals.database.password}@${externals.database.host}:${externals.database.port}/${externals.database.name}",
                "DEBUG": "false",
                "PORT": "8080"
              }
            }
          }
        }
      }
    }
  }
}
```

The developer can now preview and deploy this draft using Humanitec Web UI or Humanitec API directly.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/86354b7d-38aa-42cf-b8ee-9a8cf998c8f8/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e67dd5d-2259-4baa-8294-bad52059272b/Untitled.png)

Once deployed, updated application should report its current configuration properly:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6697285d-ab2c-4d46-827d-e65e25a0757c/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5c7a163-1a75-449f-93ef-6ef9117f22e1/Untitled.png)

## Calling `Score -humanitec` from CI pipeline

<aside>
🚧 This feature is under construction…

</aside>

The idea is to provide an open-source GitHub action (for example, `Score -setup`) that would add `Score -humanitec` to the CI toolset and would allow users to create Humanitec deployment drafts and, possibly, trigger deployments from their CI pipelines directly.

## Deploying Score -enabled services with Humanitec events

<aside>
🚧 This feature is under construction…

</aside>

The idea is to import `Score.yaml` alongside with the workload image details and to use it to create a deployment draft when Humanitec auto-deployment is triggered by one of the configured events.
