Verifier: Transaction Proofs
===

# TransactionProof

| name                 | type                                                           | size     | description                    |
| -------------------- | -------------------------------------------------------------- | -------- | ------------------------------ |
| `blockHeader`        | [BlockHeader](../1.%20Data%20Structures/Blocks.md)             | variable | Block header substructure.     |
| `rootHeader`         | [RootHeader](../1.%20Data%20Structures/Roots.md)               | variable | Root header substructure.      |
| `rootIndex`          | `uint16`                                                       | 2        |                                |
| `merkleProof.length` | `uint16`                                                       | 2        |                                |
| `merkleProof`        | `bytes32[]`                                                    | 32*      |                                |
| `input`              | `uint8`                                                        | 1        |                                |
| `output`             | `uint8`                                                        | 1        |                                |
| `transactionIndex`   | `uint16`                                                       | 2        |                                |
| `transaction.length` | `uint16`                                                       | 2        |                                |
| `transaction`        | [TransactionLeaf](./../1.%20Data%20Structures/Transactions.md) | variable | Transaction leaf substructure. |
| `token`              | `address`                                                      | 20       |                                |
| `selector`           | `address`                                                      | 20       |                                |
