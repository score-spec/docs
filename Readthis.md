[![](https://img.shields.io/github/workflow/status/spf13/cobra/Test?longCache=tru&label=Test&logo=github%20actions&logoColor=fff)](https://github.com/spf13/cobra/actions?query=workflow%3ATest)
[![Go Reference](https://pkg.go.dev/badge/github.com/spf13/cobra.svg)](https://pkg.go.dev/github.com/spf13/cobra)
[![Go Report Card](https://goreportcard.com/badge/github.com/spf13/cobra)](https://goreportcard.com/report/github.com/spf13/cobra)

# Score

_Score_ is a platform-agnostic specification for defining environment configuration for cloud based workloads

The _Platform CLI_ is a tool to synchronize your specification against your platform specific environment.

## Installation

Use the homebrew formula to install the _Platform CLI_.

**score-compose**

```bash
brew install score-compose
```

## Repositories

## Overview

The Score specification file resolves configuration drift between environments. Compose a `score.yaml` file that describes how to run your workload. As a platform-agnostic declaration file, `score.yaml` creates a single source of truth on workload profiles of requirements and works to integrate with any platform or tooling.

### Use the Platform CLI tool

```bash
# Generate compose.yaml with caws-compose
score-compose run -f /tmp/caws.yaml -o /tmp/compose.yaml

# Run the service with docker-compose
score-compose -f /tmp/compose.yaml up backend
```

## Score manifesto

- Enable local development without risk of configuration inconsistencies in remote environments.
- Establish a single source of truth for application configuration.
- Separate environment specific from environment agnostic configuration.
- Enable agnostic declaration of infrastructure dependencies.
- Abstract away complexity without sacrificing transparency.
- Make each program do one thing well. Build afresh rather than complicate old programs by adding new features.
- Make each program do one thing well. Build afresh rather than complicate old programs by adding new features.
- Offer sensible defaults while allowing for a large degree of customization.
- As a developer, you shouldn’t have to worry about where your code is running.

For more information, see the [Score manifesto](https://score.dev/).

## Get involved

- Give the project a star!
- Write a [blog](score.dev/blog).
- Our community channel on Slack.
- Contact us via Email:
  - team@score.dev
  - abuse@score.dev
- Provide feedback on our [road map and releases board](https://github.com/orgs/score-spec/projects).
- See our [documentation](https://github.com/orgs/docs).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also open an issue with the tag `enhancement`.

1. Fork the Project.
2. Create your Feature Branch. `git checkout -b feature/feature-name`
3. Commit your Changes. `git commit -s -m "Add some AmazingFeature"`
4. Push to the Branch. `git push origin feature/feature-name`
5. Open a Pull Request.

Score is licensed under [Apache 2.0](LICENSE) and accepts contribution through GitHub pull requests.

Read [CONTRIBUTING](CONTRIBUTING.md) for more information.

## License

[Apache 2.0](LICENSE)

## Code of conduct

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
