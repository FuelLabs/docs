Witness
===

# WitnessTypes

```
enum WitnessTypes : uint8 {
    Signature = 0,
    Caller = 1,
    Producer = 2,
}
```

# Signature

| name   | type    | size | description |
| ------ | ------- | ---- | ----------- |
| `type` | `uint8` | 1    |             |
| `r`    | bytes32 | 32   |             |
| `s`    | bytes32 | 32   |             |
| `v`    | uint8   | 1    |             |

# Caller

| name          | type      | size | description |
| ------------- | --------- | ---- | ----------- |
| `type`        | `uint8`   | 1    |             |
| `owner`       | `address` | 20   |             |
| `blockNumber` | `uint32`  | 4    |             |

# Producer

| name   | type      | size | description |
| ------ | --------- | ---- | ----------- |
| `type` | `uint8`   | 1    |             |
| `hash` | `bytes32` | 32   |             |
