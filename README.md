# Score

_Score_ is a platform-agnostic specification for defining environment configuration for cloud based workloads

The _Platform CLI_ is a tool to synchronize your specification against your platform specific environment.

## Installation

Use the homebrew formula to install the score-cli.

```bash
brew install score-cli
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

## Documentation

## Examples

## Road map

## Contributing

Score is licensed under [Apache 2.0](LICENSE) and accepts contribution through GitHub pull requests.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please read [CONTRIBUTING](CONTRIBUTING.md) for more information.

## License

[Apache 2.0](LICENSE)

## Code of conduct

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Running the website locally

Building and running the site locally requires a recent `extended` version of [Hugo](https://gohugo.io).
You can find out more about how to install Hugo for your environment in our
[Getting started](https://www.docsy.dev/docs/getting-started/#prerequisites-and-installation) guide.

From the repo root folder, run:

Use yarn.

```bash
yarn build
```

or use Hugo.

```bash
hugo server -D
```

## Troubleshooting

As you run the website locally, you may run into the following error:

```
➜ hugo server

INFO 2021/01/21 21:07:55 Using config file:
Building sites … INFO 2021/01/21 21:07:55 syncing static files to /
Built in 288 ms
Error: Error building site: TOCSS: failed to transform "scss/main.scss" (text/x-scss): resource "scss/scss/main.scss_9fadf33d895a46083cdd64396b57ef68" not found in file cache
```

This error occurs if you have not installed the extended version of Hugo.
See this [section](https://www.docsy.dev/docs/get-started/docsy-as-module/installation-prerequisites/#install-hugo) of the user guide for instructions on how to install Hugo.

Or you may encounter the following error:

```
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

## Troubleshooting doc build

```
Error: from config: failed to resolve output format "print" from site config
error Command failed with exit code 255.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

To resolve:

```
open $TMPDIR
```

Delete `hugo_cache`.

Rerun `yarn`, `yarn build`.

Or:

```bash
rm -rf $TMPDIR/hugo_cache
```
