![Score banner](/images/banner.png)

# ![Score](/images/logo.svg) Score overview

Score is an open source, platform-agnostic, container-based workload specification. This means you can define your workload once with the _Score Specification_ and then use a _Score Implementation_ CLI to translate it to multiple platforms, such as Helm, Docker Compose or Google Cloud Run.

In the example below, a `score.yaml` file is executed via [score-compose](https://github.com/score-spec/score-compose/tree/main/examples) to generate a `compose.yaml` file, which allows to spins up a container via Docker Compose. The same `score.yaml` file is then used to generate a helm `values.yaml` file to be installed onto Kubernetes.

![demo.gif](/images/demo.gif)

## ![Installation](/images/install.svg) Installation

Read the docs on how to install the [Score implementation CLI](https://docs.score.dev/docs/get-started/install/).

## ![Overview](/images/overview.svg) Overview

The Score Specification file resolves configuration inconsistencies between environments. Compose a `score.yaml` file that describes how to run your Workload. As a platform-agnostic declaration file, `score.yaml` creates a single source of truth on Workload profiles and works to integrate with any platform or tooling.

### Use the Platform CLI tool

```bash
# Generate compose.yaml with score-compose
score-compose run -f /tmp/score.yaml -o /tmp/compose.yaml

# Run the service with docker-compose
docker-compose -f /tmp/compose.yaml up backend
```

## ![Why Score?](/images/manifesto.svg) Why Score?

Cloud-native developers often struggle with configuration inconsistencies between environments. This gets even more complicated when the technology stack in each environment is different. What if you use Docker Compose for local development, but Helm Charts to deploy to the Kubernetes based development environment? Not only do you have to figure out Docker Compose and Helm, but you need to keep them in sync!
This results in various bottlenecks along the application delivery lifecycle.

🎵 Tech & tools that require specialized knowledge and operational expertise are imposed on developers.

🎵 Different configuration rules, constructs and values between local and remote environments increase the risk of configuration inconsistencies.

🎵 Keeping a multitude of platform- and environment-specific configuration files in sync leads to repetitive configuration work.

Score provides a single, easy to understand specification for each workload that describes its runtime requirements in a declarative manner. The `score.yaml` file allows to generate configuration in an automated, standardized and one directional way. By reducing the risk of wrongly specified or inconsistent configuration between environments are we hoping to foster focus and joy for developers in their day-to-day work.

For more information, see [Why Score](https://score.dev/why-score).

## ![Get involved](/images/get-involved.svg) Get involved

- Give the project a star!
- Contact us via email:
  - team@score.dev
  - abuse@score.dev
- See our [documentation](https://docs.score.dev).

## ![Contributing](/images/contributing.svg) Contributing

- Write a [blog](https://score.dev/blog).
- Provide feedback on our [road map and releases board](https://github.com/orgs/score-spec/projects).
- Contribute.

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also open an issue with the tag `enhancement`.

1. Fork the Project.
2. Create your Feature Branch. `git checkout -b feature/feature-name`
3. Commit your Changes. `git commit -s -m "Add some AmazingFeature"`
4. Push to the Branch. `git push origin feature/feature-name`
5. Open a Pull Request.

Read [CONTRIBUTING](CONTRIBUTING.md) for more information.

## ![License](/images/license.svg) License

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## ![Code of conduct](/images/code-of-conduct.svg) Code of conduct

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
