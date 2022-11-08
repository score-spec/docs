![Score banner](/images/banner.png)

# ![Score](/images/logo.svg) Score overview

_Score_ provides a developer-centric and platform-agnostic workload specification to improve developer productivity and experience. Score eliminates configuration inconsistencies between local and remote environments.

The _Platform CLI_ is a conversion tool for application developers to generate an environment specific configuration. In combination with environment specific parameters, The Platform CLI tool can run your Workload in the target environment by generating the target platform's configuration file.

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

## ![Manifesto](/images/manifesto.svg) Score manifesto

- Enable local development without risk of configuration inconsistencies in remote environments.
- Offer default configuration while allowing for a large degree of customization.
- Establish a single source of truth for application configuration.
- Separate environment specific from environment agnostic configuration.
- Enable environment agnostic declaration of infrastructure dependencies.
- Enable application centric rather than infrastructure centric development.
- Abstract away infrastructural complexity without sacrificing transparency.

For more information, see the [Score manifesto](https://score.dev/manifesto).

## ![Get involved](/images/get-involved.svg) Get involved

- Give the project a star!
- Contact us via Email:
  - team@score.dev
  - abuse@score.dev
- See our [documentation](https://docs.score.dev).

## ![Contributing](/images/contributing.svg) Contributing

<!-- - Write a [blog](score.dev/blog). -->
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

