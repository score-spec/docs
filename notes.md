# workload with container

provide dns

# no db

routes:

name: docs
container:
image: registry.humnitec.io/documenation/

resources:
docs-dns:
type: dns
routes:

- from: $
- proto: http
- type: prefix
- path: "/:
- port: 80

Lucka
(Integrations) -
Drivers - what we have drivers for

Limits

Add a future reference documentation:

- limits
- Document history
- Observability
