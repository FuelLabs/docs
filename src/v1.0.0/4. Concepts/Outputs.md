Outputs
===

# OutputTypes

```
enum OutputTypes : uint8 {
    UTXO = 0,
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

# OutputUTXO

| name                | type          | size | description |
| ------------------- | ------------- | ---- | ----------- |
| `type`              | `OutputTypes` | 1    |             |
| `transactionHashId` | `bytes32`     | 32   |             |
| `outputIndex`       | `uint256`     | 32   |             |
| `outputType`        | `uint256`     | 32   |             |
| `owner`             | `bytes32`     | 32   |             |
| `amount`            | `uint256`     | 32   |             |
| `token`             | `uint256`     | 32   |             |
| `digest`            | `bytes32`     | 32   |             |
| `expiry`            | `uint256`     | 32   |             |
| `returnOwner`       | `bytes32`     | 32   |             |

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
