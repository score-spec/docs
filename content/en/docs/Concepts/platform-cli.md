---
title: "Platform CLI"
linkTitle: "Platform CLI"
weight: 4
---

The _Target Platform CLI_, or Platform CLI, is the tooling used to convert the Score Specification into the target platform configuration file of your choice.

A Score implementation is a CLI tool which the Score specification file is run against. Is is tied to a platform such as docker compose (score-compose), helm (score-helm) or Humanitec (score-humanitec) and will take care of converting the Score specification into the required platform-specific configuration file such as docker-compose.yaml, chart.yaml or a Humanitec deployment set
