- op: set
  path: services.microcks
  value:
    image: quay.io/microcks/microcks-uber:latest-native
    read_only: true
    user: "65532"
    cap_drop: ["ALL"]
    ports:
    - target: 8080
      published: "9090"
    volumes:
    - type: tmpfs
      target: /tmp
      tmpfs:
        size: 32768
