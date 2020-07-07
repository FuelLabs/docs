Metadata
===

Each [transaction](./Transactions.md) can have metadata attached to it by the block producer. One metadata is attached per [input](./Inputs.md). This allows for fraud proofs without state commitments. (See also: [Compact Fraud Proofs for UTXO Chains Without Intermediate State Serialization](https://ethresear.ch/t/compact-fraud-proofs-for-utxo-chains-without-intermediate-state-serialization/5885).)

Note that all metadata objects are exactly `8` bytes.

# Metadata

| name               | type     | size | description |
| ------------------ | -------- | ---- | ----------- |
| `blockHeight`      | `uint32` | 4    |             |
| `rootIndex`        | `uint8`  | 1    |             |
| `transactionIndex` | `uint16` | 2    |             |
| `outputIndex`      | `uint8`  | 1    |             |

# MetadataDeposit

| name          | type     | size | description |
| ------------- | -------- | ---- | ----------- |
| `token`       | `uint32` | 4    |             |
| `blockNumber` | `uint32` | 4    |             |
