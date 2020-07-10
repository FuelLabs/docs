Prover: Invalid Transactions
===

Proves that a transaction was malformed. This involves attempting to parse the transaction leaf.

A valid [transaction proof](../2.%20Verifiers/Transaction%20Proof.md), `proof`, must be provided.
1. Get the transaction leaf component of the proof, `leaf = proof.transaction`.
1. Metadata count `leaf.metadata.length` must be less than `0` or more than [`INPUTS_MAX`](../1.%20Data%20Structures/Transactions.md).
1. As a sanity check, witnesses length in bytes `leaf.witnesses.length` must be less than `0` or more than `TRANSACTION_SIZE_MAX`. Same for inputs length `leaf.inputs.length` and outputs length `leaf.outputs.length`.
1. The leaf length `leaf.length` must be at less than `TRANSACTION_SIZE_MIN` or more than `TRANSACTION_SIZE_MAX`.
1. The leaf total length `leaf.length+2` (since the `leaf.length` field itself [is `2` bytes](../1.%20Data%20Structures/Transactions.md)) must not match that size of the leaf component of the proof.
