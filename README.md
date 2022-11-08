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


## Running the website locally

Building and running the site locally requires a recent `extended` version of [Hugo](https://gohugo.io).
You can find out more about how to install Hugo for your environment in our
[Getting started](https://www.docsy.dev/docs/getting-started/#prerequisites-and-installation) guide.

From the repo root folder, run:

To use yarn.

```bash
yarn build
```

To use Hugo.

```bash
hugo server -D
```

## Troubleshooting documentation site builds

### Extended version of Hugo

As you run the website locally, you may run into the following error:

```bash
➜ hugo server

INFO 2021/01/21 21:07:55 Using config file:
Building sites … INFO 2021/01/21 21:07:55 syncing static files to /
Built in 288 ms
Error: Error building site: TOCSS: failed to transform "scss/main.scss" (text/x-scss): resource "scss/scss/main.scss_9fadf33d895a46083cdd64396b57ef68" not found in file cache
```

This error occurs if you have not installed the extended version of Hugo.
See this [section](https://www.docsy.dev/docs/get-started/docsy-as-module/installation-prerequisites/#install-hugo) of the user guide for instructions on how to install Hugo.

Or you may encounter the following error:

```bash
➜ hugo server

Error: failed to download modules: binary with name "go" not found
```

This error occurs if you have not installed the `go` programming language on your system.
See this [section](https://www.docsy.dev/docs/get-started/docsy-as-module/installation-prerequisites/#install-go-language) of the user guide for instructions on how to install `go`.

[alternate dashboard]: https://app.netlify.com/sites/goldydocs/deploys
[deploys]: https://app.netlify.com/sites/docsy-example/deploys
[docsy user guide]: https://docsy.dev/docs
[docsy]: https://github.com/google/docsy
[example.docsy.dev]: https://example.docsy.dev
[hugo theme module]: https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme
[netlify]: https://netlify.com

### Failed to resolve output format `print`

When building the server, you may receive the following error message.

```bash
Error: from config: failed to resolve output format "print" from site config
error Command failed with exit code 255.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

To resolve this issue, delete the temporary Hugo cache directory. By default, [`-cacheDir`](https://gohugo.io/commands/hugo_server/) is stored at `$TMPDIR/hugo_cache`.

```bash
rm -rf $TMPDIR/hugo_cache
```

<!-- https://github.com/google/docsy/issues/805#issuecomment-1245110883 -->

### `package-lock.json` locked files

When running `yarn`, you may receive the following error message.

```bash
warning package-lock.json found. Your project contains lock files generated by tools other than Yarn. It is advised not to mix package managers in order to avoid resolution inconsistencies caused by unsynchronized lock files. To clear this warning, remove package-lock.json.
```

To resolve this issue, delete the `package-lock.json` file.

```bash
rm package-lock.json
```
