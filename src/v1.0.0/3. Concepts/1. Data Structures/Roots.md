Roots
===

# RootHeader

| name             | type      | size | description                                                       |
| ---------------- | --------- | ---- | ----------------------------------------------------------------- |
| `rootProducer`   | `address` | 20   | Address of root producer.                                         |
| `merkleTreeRoot` | `bytes32` | 32   | Claimed Merkle root of list of [transactions](./Transactions.md). |
| `commitmentHash` | `bytes32` | 32   | Simple hash of list of [transactions](./Transactions.md).         |
| `rootLength`     | `uint256` | 32   | Number of roots.                                                  |
| `feeToken`       | `uint256` | 32   | [Token ID](./Tokens.md) of all fees paid in this root.            |
| `fee`            | `uint256` | 32   | Feerate of all fees paid in this root.                            |

Each _root header_ commits to a list of transactions. Each _root_ is a root header and a list of transactions (and does not exist as a canonical data structure).  [Blocks](./Blocks.md) contain one or more root header hashes (i.e. hashes of root headers), and so implicitly commit to a list of transactions. For more information of why multiple roots are used instead of the more traditional single-transactions-root, see [Block Architecture](../0.%20Fundamentals/3.%20Block%20Architecture.md).

When committing a new root to the contract, the root header minus the `commitmentHash` is provided, along with a list of transactions. The `commitmentHash` is then computed by simply hashing the list of transactions. This means that root headers _claim_ a Merkle root of their transactions, which is assumed to be correct optimistically to save gas. If the claimed Merkle root is incorrect, [a fraud proof](../3.%20Provers/Malformed%20Block.md) can be constructed to show this.

The maximum size in bytes of the list of transactions in a single root is the `MAX_ROOT_SIZE` parameter (`57600`). This limit is placed to ensure that the transactions can always be Merkleized within the gas limit of a single Ethereum block in a fraud proof.

The maximum number of transactions in a single root is the `MAX_TRANSACTIONS_IN_ROOT` parameter (`2048`).
