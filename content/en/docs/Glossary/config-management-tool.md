---
title: Configuration management tool
id: config-management-tool
full_link: /docs/concepts/score/
short_description: >
    Score is not a configuration management tool.
tags:
- name
- fundamental
---

Score doesn't specify any `dns` or `route` attribute values in the specification file. Those values may change based on the target environment, like `testing`, `integration`, or `production`. For example, route table management is a configuration management task and Score is not a configuration management tool.
