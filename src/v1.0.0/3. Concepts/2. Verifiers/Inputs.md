Verifier: Inputs
===

Validates the [inputs](../2.%20Verifiers/Inputs.md) component of a [transaction proof](./Transaction%20Proof.md) is properly formatted.

One additional proof per input in the primary transaction proof `proof` must be provided, the list `inputProofs`.

For each input in `proof.transaction.inputs` and `inputProof` in `inputProofs`, indexed by `index`:
1. If input's [type](../1.%20Data%20Structures/Inputs.md) is `Transfer` or `HTLC`:
   1. The transaction proof `inputProof` must be [validated](./Transaction%20Proof.md).
   1. The output metadata of `inputProof` must match the metadata of input (i.e. they must be pointing to the same entry in the ledger).
   1. The UTXO ID being produced by the output of `inputProof` must match `proof.data[index]`.
1. If input's [type](../1.%20Data%20Structures/Inputs.md) is `Deposit`:
   1. The deposit object `inputProof` must be validated:
       1. The [deposit ID](./../1.%20Data%20Structures/Deposits.md) of `inputProof` must match `proof.data[index]`.
1. If input's [type](../1.%20Data%20Structures/Inputs.md) is `Root`:
   1. The transaction proof `inputProof` must be [validated](./Transaction%20Proof.md).
   1. The UTXO ID being produced by the output of `inputProof` must match `proof.data[index]`.
