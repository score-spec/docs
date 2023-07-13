---
title: "Override a property through the CLI"
linkTitle: "Override properties"
weight: 6
description: >
  Override properties with the CLI.
---

You can use inline arguments to override declared values in your Score configuration file.

This is an alternative approach to using a `overrides.score.yaml` file.

## Overview

There might be times in which you need to override the declared value in your Score configuration file, without directly modifying the file.
For example, you might want to override the value for your container name.

With Score, you can override the declared values in your command line arguments with the `--property` flag.

## Override a property

Use the `--property` flag and specify the path to the property and the new value.

For example, the following looks for the `containers.my-service.image` property and overrides the default image name with a value of `python3`.

```bash
score-compose run -f score.yaml --property containers.my-service.image=python3
```

### Remove a property

Set the path of the property to an empty value to remove the property.

```bash
score-compose run -f score.yaml --property metadata.my-service=
```

For more information, see the [Score CLI reference]({{< relref "docs/reference/score-cli/" >}}).
