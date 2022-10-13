---
title: "Score specification"
linkTitle: "Score spec"
weight: 4
---

The Score specification describes how to run a workload in the context of an application. It allows you to specify which containers to use, whether resource or service dependencies exist, if ports are to be opened or what data volumes to reference - whatever it is that a workload requires you to run, it is captured in the `score.yaml` specification file. As a platform-agnostic declaration file, the Score specification presents the single source of truth on a workloads profile of requirements and works to utilize any platform and tooling.

### Score is not a configuration management tool

{{< glossary_definition term_id="config-management-tool" length="short" >}}
