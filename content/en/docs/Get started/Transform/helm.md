---
title: "Helm"
linkTitle: "Helm"
weight: 4
description: >
  Learn to translate a Score Specification file into a Helm configuration with the target Platform CLI tool.
---

The Score Specification file configures into Helm values, inluding:

- containers
- dependencies

These values are combined with a pre-build Helm chart template that are shipped with the application by default.
This produces a valid Helm chart folder that can be distributed or deployed.
