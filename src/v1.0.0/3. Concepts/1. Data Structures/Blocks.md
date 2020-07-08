Blocks
===

# BlockHeader

| name                  | type        | size | description                                         |
| --------------------- | ----------- | ---- | --------------------------------------------------- |
| `producer`            | `address`   | 20   | Address of block proposer committing this block.    |
| `previousBlockHash`   | `bytes32`   | 32   | Previous block's header hash.                       |
| `height`              | `uint256`   | 32   | Block height.                                       |
| `ethereumBlockNumber` | `uint256`   | 32   | Ethereum block number when this block is committed. |
| `numTokens`           | `uint256`   | 32   | Maximum token ID used through this block.           |
| `numAddresses`        | `uint256`   | 32   | Maximum address ID used through this block          |
| `roots.length`        | `uint16`    | 2    | Number of transaction roots.                        |
| `roots`               | `bytes32[]` | 32*  | List of root header hashes.                         |

## Number of Tokens

Tokens IDs are registered contract-side to allow for more compact transactions. The maximum token ID used in this block and all previous blocks is included in the block header.

This is needed to prevent a griefing attack where a fraudulent rollup block is committed that spends a token ID that is not yet registered. The fraud proof can then be front-run with a transaction that registers the token ID, thereby invalidating the fraud proof.

See: [token registry](./Tokens.md).

## Number of Addresses

Address IDs are registered contract-side to allow for more compact transactions. The maximum address ID used in this block and all previous blocks is included in the block header.

This is needed to prevent a griefing attack where a fraudulent rollup block is committed that sends to an address ID that is not yet registered. The fraud proof can then be front-run with a transaction that registers the address ID, thereby invalidating the fraud proof.

See: [address registry](./Addresses.md).

## Roots

The block header includes a list of root header hashes, `roots`. Each individual root header hash is the hash of a [root header](./Roots.md), which commits to a list of transactions and other important metadata. For more information of why multiple roots are used instead of the more traditional single-transactions-root, see [Block Architecture](../0.%20Fundamentals/3.%20Block%20Architecture.md).

The number of root header hashes is upper-bounded by the `TRANSACTION_ROOTS_MAX` parameter (`128`).

# Committing a New Block Header

When a new block header is produced and committed to Ethereum, the following checks **must** pass, and are enforced by the smart contract.

1. The height `blockHeight` must be greater than `0` and at most the tip height.
1. The previous block hash `previousBlockHash` must match the previous block hash at `blockHeight`.
1. The number of transaction roots `roots.length` must be greater than `0` and at most [`TRANSACTION_ROOTS_MAX`].
1. Every root in `roots` must exist in the root registry.
1. TODO describe penalty mode
