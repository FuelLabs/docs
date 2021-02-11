Verifier: Witnesses
===

Validates the [witness](../1.%20Data%20Structures/Witness.md) component of a [transaction proof](./Transaction%20Proof.md) is properly formatted.

This is needed to ensure that the preimage to the transaction ID provided in the transaction proof `proof` (i.e. the [unsigned transaction](./../1.%20Data%20Structures/Transactions.md)) is actually valid. [Data](./../1.%20Data%20Structures/Transactions.md) is elided when being posting transactions to Ethereum, so the integrity of the data provided in the proof must be checked.

For the provided state element `stateElement`, `witness = proof.transaction.witnesses[0]`, and `input = proof.transaction.inputs[0]`:
1. If `witness`'s type is `Signature`:
    1. Recover the address with signature `witness` and the transaction ID of computed from `proof.transaction` and `proof.data[0]` as message.
    1. If `input`'s [type](../1.%20Data%20Structures/Inputs.md) is `Transfer` or `HTLC`:
        1. The recovered address must match `stateElement.owner`.
    1. If `input`'s [type](../1.%20Data%20Structures/Inputs.md) is `Deposit`:
        1. The recovered address must match `stateElement.owner`.
    1. If `input`'s [type](../1.%20Data%20Structures/Inputs.md) is `Root`:
        1. The recovered address must match `proof.blockProducer`.
1. If `witness`'s type is `Caller`:
    1. The [witness registered](../1.%20Data%20Structures/Witness.md) indexed by `stateElement.owner` and `stateElement.blockNumber` must match the transaction ID of computed from `proof.transaction` and `proof.data[0]`
1. If `witness`'s type is `Producer`:
    1. The `stateElement.hash` must match the transaction ID of computed from `proof.transaction` and `proof.data[0]`.

Note that `stateElement` can come in [different types](./Inputs.md), depending on the type of the input (i.e. what is being spent).
