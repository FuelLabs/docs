Outputs
===

# OutputTypes

```
enum OutputTypes : uint8 {
    Transfer = 0,
    Withdraw = 1,
    HTLC = 2,
    Return = 3,
}
```

# Output

| name            | type          | size | description |
| --------------- | ------------- | ---- | ----------- |
| `type`          | `OutputTypes` | 1    |             |
| `token.length`  | `uint8`       | 1    |             |
| `token`         | `bytes1[]`    | 1*   |             |
| `amount.shift`  | `uint8`       | 1    |             |
| `amount.length` | `uint8`       | 1    |             |
| `amount`        | `uint8[]`     | 1*   |             |
| `owner.length`  | `uint8`       | 1    |             |
| `owner`         | `bytes1[]`    | 1*   |             |

# OutputHTLC

| name                 | type          | size | description |
| -------------------- | ------------- | ---- | ----------- |
| `type`               | `OutputTypes` | 1    |             |
| `token.length`       | `uint8`       | 1    |             |
| `token`              | `bytes1[]`    | 1*   |             |
| `amount.shift`       | `uint8`       | 1    |             |
| `amount.length`      | `uint8`       | 1    |             |
| `amount`             | `uint8[]`     | 1*   |             |
| `owner.length`       | `uint8`       | 1    |             |
| `owner`              | `bytes1[]`    | 1*   |             |
| `digest`             | `bytes32`     | 32   |             |
| `expiry`             | `uint32`      | 4    |             |
| `returnOwner.length` | `uint8`       | 1    |             |
| `returnOwner`        | `bytes1[]`    | 1*   |             |

# OutputReturn

| name          | type          | size | description |
| ------------- | ------------- | ---- | ----------- |
| `type`        | `OutputTypes` | 1    |             |
| `data.length` | `uint16`      | 2    |             |
| `data`        | `bytes1[]`    | 1*   |             |
