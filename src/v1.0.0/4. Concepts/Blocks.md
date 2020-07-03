Blocks
===

# BlockHeader

| name                  | type        | size | description |
| --------------------- | ----------- | ---- | ----------- |
| `producer`            | `address`   | 20   |             |
| `previousBlockHash`   | `bytes32`   | 32   |             |
| `height`              | `uint256`   | 32   |             |
| `ethereumBlockNumber` | `uint256`   | 32   |             |
| `numTokens`           | `uint256`   | 32   |             |
| `numAddresses`        | `uint256`   | 32   |             |
| `roots.length`        | `uint16`    | 2    |             |
| `roots`               | `bytes32[]` | 32*  |             |
