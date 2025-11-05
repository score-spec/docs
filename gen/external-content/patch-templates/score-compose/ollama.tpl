- op: set
  path: services.ollama
  value:
    image: ollama/ollama:latest
    ports:
    - target: 11434
      published: "11434"
    volumes:
    - type: volume
      source: ollama_data
      target: /root/.ollama
- op: set
  path: volumes.ollama_data
  value:
      name: ollama_data
      driver: local