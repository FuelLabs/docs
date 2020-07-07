Withdrawals
===

# Withdrawal Metadata

| name                  | type      | size | description                                                                |
| --------------------- | --------- | ---- | -------------------------------------------------------------------------- |
| `rootIndex`           | `uint256` | 32   | Index of root in list of roots.                                            |
| `transactionLeafHash` | `bytes32` | 32   | Hash of transaction leaf in tree rooted at `rootIndex`.                    |
| `outputIndex`         | `bytes32` | 32   | Index of output in list of outputs of transaction in the transaction leaf. |

