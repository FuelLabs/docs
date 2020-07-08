Transactions
===

Transactions consume [inputs](./Inputs.md) and produce [outputs](./Outputs.md).

# UnsignedTransaction

| name                | type        | size | description                                  |
| ------------------- | ----------- | ---- | -------------------------------------------- |
| `inputs.length`     | `uint16`    | 2    | Next field number of bytes.                  |
| `inputs`            | `bytes1[]`  | 1*   | List of [inputs](./Inputs.md).               |
| `outputs.length`    | `uint16`    | 2    | Next field number of bytes.                  |
| `outputs`           | `bytes1[]`  | 1*   | List of [outputs](./Outputs.md).             |
| `data.length`       | `uint8`     | 1    | Next field number of elements.               |
| `data`              | `bytes32[]` | 32*  | Implicit unique identifier of what to spend. |
| `signatureFeeToken` | `uint256`   | 32   | Implicit [fee token ID](./Roots.md).         |
| `signatureFee`      | `uint256`   | 32   | Implicit [fee rate](./Roots.md).             |

Transaction data that is signed off-chain. The unsigned transaction data is [serialized](../0.%20Fundamentals/5.%20Serialization.md) then hashed to get a unique transaction ID, which is then signed over to get a [witness](./Witness.md). Essentially, each witness authorizes an _entire_ transaction. This scheme avoids the [quadratic hashing issue present in Bitcoin](https://bitcointalk.org/index.php?topic=102487.0).

Implicit data (`data`) is one 32-byte hash _per input_, and uniquely identifies what is being spent by that input (a [UTXO ID](./Outputs.md) or a [deposit ID](./Deposits.md)).

TODO how is this specifically serialized and packed?

# TransactionLeaf

| name               | type       | size | description                        |
| ------------------ | ---------- | ---- | ---------------------------------- |
| `length`           | `uint16`   | 2    | Total length of leaf in bytes.     |
| `metadata.length`  | `uint8`    | 1    | Next field number of elements.     |
| `metadata`         | `bytes8[]` | 8*   | List of metadata, one per input.   |
| `witnesses.length` | `uint16`   | 2    | Next field number of bytes.        |
| `witnesses`        | `bytes1[]` | 1*   | List of [witnesses](./Witness.md). |
| `inputs.length`    | `uint16`   | 2    | Next field number of bytes.        |
| `inputs`           | `bytes1[]` | 1*   | List of [inputs](./Inputs.md).     |
| `outputs.length`   | `uint16`   | 2    | Next field number of bytes.        |
| `outputs`          | `bytes1[]` | 1*   | List of [outputs](./Outputs.md).   |

A leaf in a transaction [Merkle tree](./../2.%20Verifiers/Merkle%20Proof.md), which is committed to in a [root](./Roots.md).

Note that the implicit data is not included in the leaf, as it can be reconstructed from metadata. Rather, the root producer replaces the larger data (state element) with the smaller metadata (a pointer to an entry in the ledger or a deposit).

Note that the implicit fee token ID and feerate are not included in the leaf. Since the value of those fields must be identical for all transaction under a root, they can be hoisted and declared once [at the root header level](./Roots.md).

The minimum transaction leaf size in bytes is set by the parameter `TRANSACTION_SIZE_MIN` (`44`).
The maximum transaction leaf size in bytes is set by the parameter `TRANSACTION_SIZE_MAX` (`896`).
The maximum number of inputs in a single transaction is `INPUTS_MAX` (`8`).
The maximum number of outputs in a single transaction is `OUTPUTS_MAX` (`8`).

TODO how are lists encoded?
