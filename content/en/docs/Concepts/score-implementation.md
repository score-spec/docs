---
title: "Score implementation"
linkTitle: "Score implementation"
weight: 4
---

A Score implementation is a CLI tool which the Score specification file is run against. Is is tied to a platform such as docker compose (score-compose), helm (score-helm) or Humanitec (score-humanitec) and will take care of converting the Score specification into the required platform-specific configuration file such as docker-compose.yaml, chart.yaml or a Humanitec deployment set
