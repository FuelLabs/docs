Verifier: Transaction Proofs
===

Validates a transaction proof is properly formatted.

1. The header of the transaction proof [must be valid](./Block%20Header.md).
1. The Merkle proof of the transaction proof [must be valid](./Merkle%20Proof.md).
1. The length of the transaction leaf `transaction.length` must be greater than `0`.

TransactionProof
---

| name                 | type                                                           | size     | description                                                              |
| -------------------- | -------------------------------------------------------------- | -------- | ------------------------------------------------------------------------ |
| `blockHeader`        | [BlockHeader](../1.%20Data%20Structures/Blocks.md)             | variable | Block header substructure.                                               |
| `rootHeader`         | [RootHeader](../1.%20Data%20Structures/Roots.md)               | variable | Root header substructure.                                                |
| `rootIndex`          | `uint16`                                                       | 2        | Root index.                                                              |
| `merkleProof.length` | `uint16`                                                       | 2        | Number of nodes in Merkle proof.                                         |
| `merkleProof`        | `bytes32[]`                                                    | 32*      | [Merkle inclusion proof](./Merkle%20Proof.md).                           |
| `inputIndex`         | `uint8`                                                        | 1        | Input index.                                                             |
| `outputIndex`        | `uint8`                                                        | 1        | Output index.                                                            |
| `transactionIndex`   | `uint16`                                                       | 2        | Transaction index.                                                       |
| `transaction`        | [TransactionLeaf](./../1.%20Data%20Structures/Transactions.md) | variable | Transaction leaf substructure.                                           |
| `data.length`        | `uint8`                                                        | 1        | Next field number of elements.                                           |
| `data`               | `bytes32[]`                                                    | 32*      | List of state elements being spent.                                      |
| `signatureFeeToken`  | `uint256`                                                      | 32       | Implicit [fee token ID](../1.%20Data%20Structures/Roots.md).             |
| `signatureFee`       | `uint256`                                                      | 32       | Implicit [fee rate](./../1.%20Data%20Structures/Roots.md).               |
| `token`              | `address`                                                      | 20       | Token address, used for [invalid sum](../3.%20Provers/Invalid%20Sum.md). |
| `returnOwner`        | `address`                                                      | 20       | For HTLC outputs only, the return owner.                                 |
