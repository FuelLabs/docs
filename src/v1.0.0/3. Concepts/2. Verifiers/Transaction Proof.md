Verifier: Transaction Proofs
===

Validates a transaction proof is properly formatted.

# TransactionProof

| name                 | type                                                           | size     | description                                    |
| -------------------- | -------------------------------------------------------------- | -------- | ---------------------------------------------- |
| `blockHeader`        | [BlockHeader](../1.%20Data%20Structures/Blocks.md)             | variable | Block header substructure.                     |
| `rootHeader`         | [RootHeader](../1.%20Data%20Structures/Roots.md)               | variable | Root header substructure.                      |
| `rootIndex`          | `uint16`                                                       | 2        | Root index.                                    |
| `merkleProof.length` | `uint16`                                                       | 2        | Number of nodes in Merkle proof.               |
| `merkleProof`        | `bytes32[]`                                                    | 32*      | [Merkle inclusion proof](./Merkle%20Proof.md). |
| `input`              | `uint8`                                                        | 1        | Input index.                                   |
| `output`             | `uint8`                                                        | 1        | Output index.                                  |
| `transactionIndex`   | `uint16`                                                       | 2        | Transaction index.                             |
| `transaction.length` | `uint16`                                                       | 2        | Length of transaction leaf, in bytes.          |
| `transaction`        | [TransactionLeaf](./../1.%20Data%20Structures/Transactions.md) | variable | Transaction leaf substructure.                 |
| `token`              | `address`                                                      | 20       | TODO                                           |
| `selector`           | `address`                                                      | 20       | TODO                                           |
