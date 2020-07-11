Withdrawals
===

Withdrawal Metadata
---

| name                  | padded type | compact type | size | description                                                                |
| --------------------- | ----------- | ------------ | ---- | -------------------------------------------------------------------------- |
| `rootIndex`           | `uint256`   | `uint32`     | 4    | Index of root in list of roots.                                            |
| `transactionLeafHash` | `bytes32`   | `bytes32`    | 32   | Hash of transaction leaf in tree rooted at `rootIndex`.                    |
| `outputIndex`         | `bytes32`   | `uint8`      | 1    | Index of output in list of outputs of transaction in the transaction leaf. |

Withdrawal metadata is represented in padded form on Ethereum to simplify processing, and compact form on Fuel. The ID of a withdrawal is the hash of the padded-form withdrawal metadata.

A withdrawal registry keep track of whether a withdrawal has been processed or not (a Boolean value), indexed by the rollup block height and unique withdrawal ID. "Processed" withdrawals are completed withdrawals (i.e. the tokens have been withdrawn from the contract).
