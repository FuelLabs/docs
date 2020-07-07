Transactions
===

# UnsignedTransaction

| name                | type        | size | description |
| ------------------- | ----------- | ---- | ----------- |
| `inputs.length`     | `uint16`    | 2    |             |
| `inputs`            | `bytes1[]`  | 1*   |             |
| `outputs.length`    | `uint16`    | 2    |             |
| `outputs`           | `bytes1[]`  | 1*   |             |
| `data.length`       | `uint8`     | 1    |             |
| `data`              | `bytes32[]` | 32*  |             |
| `signatureFeeToken` | `uint256`   | 32   |             |
| `signatureFee`      | `uint256`   | 32   |             |

# Transaction

| name               | type       | size | description |
| ------------------ | ---------- | ---- | ----------- |
| `length`           | `uint16`   | 2    |             |
| `metadata.length`  | `uint8`    | 1    |             |
| `metadata`         | `bytes8[]` | 8*   |             |
| `witnesses.length` | `uint16`   | 2    |             |
| `witnesses`        | `bytes1[]` | 1*   |             |
| `inputs.length`    | `uint16`   | 2    |             |
| `inputs`           | `bytes1[]` | 1*   |             |
| `outputs.length`   | `uint16`   | 2    |             |
| `outputs`          | `bytes1[]` | 1*   |             |

# TransactionLeaf

| name               | type       | size | description |
| ------------------ | ---------- | ---- | ----------- |
| `length`           | `uint16`   | 2    |             |
| `metadata.length`  | `uint8`    | 1    |             |
| `metadata`         | `bytes8[]` | 8*   |             |
| `witnesses.length` | `uint16`   | 2    |             |
| `witnesses`        | `bytes1[]` | 1*   |             |
| `inputs.length`    | `uint16`   | 2    |             |
| `inputs`           | `bytes1[]` | 1*   |             |
| `outputs.length`   | `uint16`   | 2    |             |
| `outputs`          | `bytes1[]` | 1*   |             |
