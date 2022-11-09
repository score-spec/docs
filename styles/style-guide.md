# Score style guide

1.0

## Introduction

Welcome to the Score documentation style guide. The intended use of this style guide for project
contributors, not necessarily end-users. It provides general guidance to anyone
who contributes to the project's documentation.

## Intended audience and scope

The purpose of this guide is to help enable project contributors to communicate clearly and consistently in Score's end-user documentation.

## Score's preferred style guide

Score's documentation has adopted the following style guide.

[Google developer documentation style guide](https://developers.google.com/style)
for the Score documentation.

- For a quick summary, see the [Google style guide highlights](https://developers.google.com/style/highlights).

Score's documentation uses standard American spelling and its preferred dictionary is the
[American Heritage Dictionary](https://ahdictionary.com/).

When writing documentation for the Score documentation, align with the Google developer style guide's voice and tone.

## Accessible writing

Write documentation that supports people with disabilities and users with various input methods and devices. Improving accessibility also helps make documentation clearer and more useful for everyone.

For resources on making your writing more accessible, see the following guides.

- [Writing accessible documentation - Google developer documentation style guide](https://developers.google.com/style/accessibility)
- [Accessibility guidelines and requirements - Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/accessibility/accessibility-guidelines-requirements)

## Inclusive and bias-free writing

When contributing to this project, strive to write documentation with inclusivity and diversity in mind. Inclusive language recognizes diversity and strives to communicate respectfully to all people. This kind of language is sensitive to differences and seeks to promote equal opportunities.

For resources on making your writing more inclusive, see the following guides.

- [Inclusive documentation - Google developer documentation style guide](https://developers.google.com/style/inclusive-documentation)
- [The Conscious Style Guide - a collection of resources](https://consciousstyleguide.com/)
- [Bias-free communication - Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/bias-free-communication)
- [Guidelines for Inclusive Language - Linguistic Society of America](https://www.linguisticsociety.org/resource/guidelines-inclusive-language)

## Formatters and linters

This project uses the [dprint](https://dprint.dev/overview/) to format documentation. dprint is a command line application that automatically formats code.

Use `dprint` to format your documentation.

```bash
yarn fmt
```

Example output.

```bash
$ dprint fmt
Formatted 1 file.
✨  Done in 0.13s.
```

This project uses the [Vale](https://vale.sh) with a [Vale-compatible implementation of the Google Developer Documentation Style Guide](https://github.com/errata-ai/Google).

To lint your doc run:

```bash
yarn fmt /path/to/your/file.md
```

For example, to lint this document run:

```bash
vale sync
vale styles/style-guide.md
```

Example output.

```
 styles/style-guide.md
 40:71  error  Did you really mean             Vale.Spelling 
               'inclusivity'?                                

✖ 1 error, 0 warnings and 0 suggestions in 1 file.
```
