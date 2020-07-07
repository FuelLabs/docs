Blocks
===

# BlockHeader

| name                  | type        | size | description                                                                        |
| --------------------- | ----------- | ---- | ---------------------------------------------------------------------------------- |
| `producer`            | `address`   | 20   | Address of block proposer committing this block.                                   |
| `previousBlockHash`   | `bytes32`   | 32   | Previous block's header hash.                                                      |
| `height`              | `uint256`   | 32   | Block height.                                                                      |
| `ethereumBlockNumber` | `uint256`   | 32   | Ethereum block number when this block is committed.                                |
| `numTokens`           | `uint256`   | 32   | Maximum token ID used through this block.                                          |
| `numAddresses`        | `uint256`   | 32   | Maximum address ID used through this block                                         |
| `roots.length`        | `uint16`    | 2    | Number of transaction roots.                                                       |
| `roots`               | `bytes32[]` | 32*  | List of transaction roots. Each root is the Merkle root of a list of transactions. |

The block header commits to a list of transactions as `roots`. Each individual root is the hash of a [RootHeader](Roots.md)

TRANSACTION_ROOTS_MAX := 128
