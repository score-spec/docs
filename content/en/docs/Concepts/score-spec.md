---
title: "Score specification"
linkTitle: "Score spec"
weight: 4
---

## Score Specification overview

The Score specification describes how to run a Workload in the context of an application.

## What it does

It allows you to specify which containers to use, whether resource or service dependencies exist, if ports are to be opened or what data volumes to reference - whatever it is that a Workload requires you to run, it is captured in the `score.yaml` specification file.

As a platform-agnostic declaration file, the Score specification presents the single source of truth on a Workloads profile of requirements and works to utilize any platform and tooling.

## Score is not a configuration management tool

Score doesn't declare who, when, and how it should provision the resource in the target environment.

The only purpose for the resource definition is to validate resources references in the same Score Specification file.

{{< glossary_definition term_id="config-management-tool" length="short" >}}
