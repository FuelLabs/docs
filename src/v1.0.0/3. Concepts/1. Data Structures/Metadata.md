Metadata
===

Each [transaction](./Transactions.md) can have metadata attached to it by the block producer. One metadata is attached per [input](./Inputs.md). This allows for fraud proofs without state commitments. (See also: [Compact Fraud Proofs for UTXO Chains Without Intermediate State Serialization](https://ethresear.ch/t/compact-fraud-proofs-for-utxo-chains-without-intermediate-state-serialization/5885).)

Note that all metadata objects are exactly `8` bytes.

# Metadata

| name               | type     | size | description                  |
| ------------------ | -------- | ---- | ---------------------------- |
| `blockHeight`      | `uint32` | 4    | Rollup block height.         |
| `rootIndex`        | `uint8`  | 1    | Root index in block.         |
| `transactionIndex` | `uint16` | 2    | Transaction index in root.   |
| `outputIndex`      | `uint8`  | 1    | Output index in transaction. |

Metadata uniquely identifies an exact [output](./Outputs.md) in the ledger, first by the [block height](./Blocks.md), then the [root](./Roots.md), [transaction index](./Roots.md), and finally [output index](./Transactions.md). Essentially, metadata "references" an exact output. This allows for both compact fraud proofs without serializing the state, leveraging the property that UTXOs are produced and consumed at most once, and smaller transaction payloads than using [UTXO IDs](./Outputs.md) directly (a 32-byte hash).

# MetadataDeposit

| name          | type     | size | description            |
| ------------- | -------- | ---- | ---------------------- |
| `token`       | `uint32` | 4    | Token ID.              |
| `blockNumber` | `uint32` | 4    | Ethereum block number. |

Deposit metadata partially uniquely identifies a [deposit](Deposits.md). The last part of the deposit registry key is the owner address, which can be recovered from the witness (of valid transactions).
