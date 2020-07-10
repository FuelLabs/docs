Prover: Invalid Transactions
===

Proves that a transaction was malformed. This involves attempting to parse the transaction leaf.

A valid [transaction proof](../2.%20Verifiers/Transaction%20Proof.md), `proof`, must be provided.
1. Get the transaction leaf component of the proof, `leaf = proof.transaction`.
1. Metadata count `leaf.metadata.length` must be less than `0` or more than [`INPUTS_MAX`](../1.%20Data%20Structures/Transactions.md).
1. As a sanity check, witnesses length in bytes `leaf.witnesses.length` must be less than `0` or more than `TRANSACTION_SIZE_MAX`. Same for inputs length `leaf.inputs.length` and outputs length `leaf.outputs.length`.
1. The leaf length `leaf.length` must be at less than [`TRANSACTION_SIZE_MIN`](../1.%20Data%20Structures/Transactions.md) or more than [`TRANSACTION_SIZE_MAX`](../1.%20Data%20Structures/Transactions.md).
1. The leaf total length `leaf.length+2` (since the `leaf.length` field itself [is `2` bytes](../1.%20Data%20Structures/Transactions.md)) must not match that size of the leaf component of the proof.

The witnesses are parsed:
1. For each witness, shift by the length of the witness:
    1. If the witness type is `Caller`:
        1. The transaction ID from the [witness registry](../1.%20Data%20Structures/Witness.md) at the witness ID must be `0` (i.e. the witness has not bee registered).
        1. The block number of the witness must be at least the block number in `proof` (i.e. the witness was not registered _strictly before_ the block was committed).
1. The number of parsed witnesses must be greater than [`INPUTS_MAX`](../1.%20Data%20Structures/Transactions.md).
1. The parsed length of witnesses must not match `leaf.witnesses.length`.

The inputs are parsed:
1. 

The outputs are parsed:
1. 

The sizes are parsed:
1. 

The metadata are parsed:
1. 
