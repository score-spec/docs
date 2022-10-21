```go
package types

// ContainersSpecs is a map of workload containers specifications.
type ContainersSpecs map[string]ContainerSpec

// ContainerSpec is a workload container specification.
type ContainerSpec struct {
	Image          string                             `json:"image"`
	Command        []string                           `json:"command"`
	Args           []string                           `json:"args"`
	Variables      map[string]string                  `json:"variables"`
	Files          []FileMountSpec                    `json:"files"`
	Volumes        []VolumeMountSpec                  `json:"volumes"`
	Resources      ContainerResourcesRequirementsSpec `json:"resources"`
	LivenessProbe  ContainerProbeSpec                 `json:"livenessProbe"`
	ReadinessProbe ContainerProbeSpec                 `json:"readinessProbe"`
}
/

# containerresourcerequirmentspec
limits: map[string]interface{} # a map whose keys are strings and values are any type.
requests: map[string]interface{}  # a map whose keys are strings and values are any type.

# filemountspec
target: string
mode: string
content: []string # slice that references an underling array.

# volumemountspec
source: string
path: string
target: string
read_only: bool

# containerProbeSpec
httpGet: HTTPGetActionSpec
initalDelaySeconds: integer
timeoutSeconds: integer
periodSeconds: integer
successThreshold: integer
failureThreshold: integer
terminationGracePeriodSeconds: integer


# HTTPGetActionSpec is an HTTP GET Action specification.
scheme: string
host: string
port: int
path: string
httpHeaders: ]HTTPHeaderSpec
    name: string
    value: string

// HTTPHeaderSpec is an HTTP Header specification.
type HTTPHeaderSpec struct {
	Name   `json:""`
	Value string `json:""`
}
```
