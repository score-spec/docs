[![release](https://github.com/score-spec/docs/actions/workflows/hugo.yml/badge.svg)](https://github.com/score-spec/docs/actions/workflows/hugo.yml) [![good first issue](https://img.shields.io/github/issues-search/score-spec/docs?query=type%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22&label=good%20first%20issues&style=flat&logo=github)](https://github.com/score-spec/docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

![Score banner](/images/banner.png)

## Docs

This section covers how to build the documentation site with Hugo.
For information on Score's style guide see the [Style guide](styles/style-guide.md).

### Running the website locally

#### `yarn`

We use `yarn` (for MacOS: `brew install yarn`) as a package manager to ensure the versions of Hugo and associated tools are up to date. All commands that execute those tools are prefixed with `yarn run` or are aliased in the `package.json` file.

To install the packages:

```
yarn install
```

To run the server locally:

```
yarn build

OR

yarn run hugo server
```

And then view it at <http://localhost:1313>.

#### `score-compose`

You can [install `score-compose`](https://docs.score.dev/docs/score-implementation/score-compose/installation/) and then build and run this hugo website as a container:

```
score-compose init --no-sample
score-compose generate score.yaml --build main=.

docker compose up --build -d

curl $(score-compose resources get-outputs dns.default#score-docs.dns --format '{{ .host }}:8080/docs/')
```

### Deployment

This site is currently deployed through Github Pages with a CNAME directing `docs.score.dev` to `score-spec.github.io`. The DNS configuration is managed by Humanitec.

### Format docs

The following section covers how to format and lint prose.

### Formatters and linters

This project uses the [dprint](https://dprint.dev/overview/) to format documentation. dprint is a command line application that automatically formats code.

Use `dprint` to format your documentation.

```bash
yarn fmt
```

Example output.

```bash
$ yarn fmt
Formatted 1 file.
✨  Done in 0.13s.
```

This project uses the [Vale](https://vale.sh) with a [Vale-compatible implementation of the Google Developer Documentation Style Guide](https://github.com/errata-ai/Google).

On MacOS, install it through `brew install vale`.

For example, to lint a document run:

```bash
vale sync
vale styles/style-guide.md
```

Example output.

```bash
 styles/style-guide.md
 40:71  error  Did you really mean             Vale.Spelling 
               'inclusivity'?                                

✖ 1 error, 0 warnings and 0 suggestions in 1 file.
```

To lint all documents, run `yarn lint`.

## Autogenerated content

### Score example hub

This site uses content from external Git repositories to create and continuously update the "Score example hub" pages. The external repos are pulled in to the `/gen/external-content` folder.

The commands for the initial integration of the repos are:

```bash
git remote add -f -t main --no-tags examples https://github.com/score-spec/examples.git
git remote add -f -t main --no-tags community-provisioners https://github.com/score-spec/community-provisioners.git
git read-tree --prefix=gen/external-content/score/specification -u examples/main:specification
git read-tree --prefix=gen/external-content/score/resources/default-provisioners -u examples/main:resources
git read-tree --prefix=gen/external-content/score/resources/community-provisioners -u community-provisioners/main
git add gen/external-content
git commit -s -S -m "Integrating external content"
```

These commands will not have to be repeated unless re-creating the repo integration, or moving the source location. In that case, remove the `remote`, delete the local contents, repeat these commands targeting the new location, and update the generation scripts.

To generate the example hub pages based on the external content, execute this command:

```bash
yarn gen-example-pages
```

### Pulling new content

To pull the current content from the remote example library repo, execute this command:

```bash
yarn gen-get-external-content
```

Refer to the [package.json`](./package.json) to see the actual implementation of this command.

## Troubleshooting documentation site builds

This section covers common build issues with Hugo.

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

You can find our documentation at [docs.score.dev](https://docs.score.dev/docs/).

### Contribute

If you have a suggestion to improve our documentation, please fork the repo and create a pull request. You can also open an issue with the tag `enhancement`.

1. Fork the Project.
2. Create your Feature Branch. `git checkout -b feature/feature-name`
3. Commit your Changes. `git commit -s -m "Add some amazing documentation enhancement"`
4. Push to the Branch. `git push origin feature/feature-name`
5. Open a Pull Request.

Read [CONTRIBUTING](CONTRIBUTING.md) for more information.

### Roadmap

See [Roadmap](roadmap.md). You can [submit an idea](https://github.com/score-spec/spec/issues/new) anytime.

### License

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

### Code of conduct

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
