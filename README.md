# Score

_Score_ is a platform-agnostic specification for defining environment configuration for cloud based workloads

The _Score CLI_ is a tool to synchronize your specification against your platform specific environment.

## Installation

Use the homebrew formula to install the score-cli.

```bash
brew install score-cli
```

## Repositories

## Overview

## Getting started

### Use the Platform CLI tool

```bash
# Generate compose.yaml with caws-compose
score-compose run -f /tmp/caws.yaml -o /tmp/compose.yaml

# Run the service with docker-compose
score-compose -f /tmp/compose.yaml up backend
```

## Help and feedback

## Documentation

## Examples

## Road map

## Contributing

Score is licensed under **Apache 2.0** and accepts contribution through GitHub pull requests.

## Community

## License

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Code of conduct

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

# Docsy Example

[Docsy][Docsy] is a [Hugo theme module][Hugo theme module] for technical documentation sites, providing easy
site navigation, structure, and more. This **Docsy Example Project** uses the Docsy
theme component as a hugo module and provides a skeleton documentation structure for you to use.
You can clone/copy this project and edit it with your own content, or use it as an example.

In this project, the Docsy theme component is pulled in as a Hugo module, together with other module dependencies:

```bash
$ hugo mod graph
hugo: collected modules in 566 ms
hugo: collected modules in 578 ms
github.com/google/docsy-example github.com/google/docsy@v0.2.0
github.com/google/docsy-example github.com/google/docsy/dependencies@v0.2.0
github.com/google/docsy/dependencies@v0.2.0 github.com/twbs/bootstrap@v4.6.1+incompatible
github.com/google/docsy/dependencies@v0.2.0 github.com/FortAwesome/Font-Awesome@v0.0.0-20210804190922-7d3d774145ac
```

You can find detailed theme instructions in the [Docsy user guide][Docsy user guide].

This Docsy Example Project is hosted on [Netlify][Netlify] at [example.docsy.dev][example.docsy.dev].
You can view deploy logs from the [deploy section of the project's Netlify
dashboard][deploys], or this [alternate dashboard][alternate dashboard].

This is not an officially supported Google product. This project is currently maintained.

## Using the Docsy Example Project as a template

A simple way to get started is to use this project as a template, which gives you a site project that is set up and ready to use. To do this:

1. Click **Use this template**.

2. Select a name for your new project and click **Create repository from template**.

3. Make your own local working copy of your new repo using git clone, replacing https://github.com/me/example.git with your repo’s web URL:

```bash
git clone --depth 1 https://github.com/me/example.git
```

You can now edit your own versions of the site’s source files.

If you want to do SCSS edits and want to publish these, you need to install `PostCSS`

```bash
npm install
```

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

## Running a container locally

You can run docsy-example inside a [Docker](https://docs.docker.com/)
container, the container runs with a volume bound to the `docsy-example`
folder. This approach doesn't require you to install any dependencies other
than [Docker Desktop](https://www.docker.com/products/docker-desktop) on
Windows and Mac, and [Docker Compose](https://docs.docker.com/compose/install/)
on Linux.

1. Build the docker image

   ```bash
   docker-compose build
   ```

1. Run the built image

   ```bash
   docker-compose up
   ```

   > NOTE: You can run both commands at once with `docker-compose up --build`.

1. Verify that the service is working.

   Open your web browser and type `http://localhost:1313` in your navigation bar,
   This opens a local instance of the docsy-example homepage. You can now make
   changes to the docsy example and those changes will immediately show up in your
   browser after you save.

### Cleanup

To stop Docker Compose, on your terminal window, press **Ctrl + C**.

To remove the produced images run:

```console
docker-compose rm
```

For more information see the [Docker Composedocumentation](https://docs.docker.com/compose/gettingstarted/).

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
[Docsy user guide]: https://docsy.dev/docs
[Docsy]: https://github.com/google/docsy
[example.docsy.dev]: https://example.docsy.dev
[Hugo theme module]: https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme
[Netlify]: https://netlify.com
