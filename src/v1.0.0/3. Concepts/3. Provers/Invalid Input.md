Prover: Invalid Inputs
===

Proves that an [input](./../1.%20Data%20Structures/Inputs.md) was invalid, i.e. a non-existent state element was spent or the spend wasn't authorized correctly.

A valid [transaction proof](../2.%20Verifiers/Transaction%20Proof.md), `proof`, must be provided. In addition, a valid [transaction proof block header](././../2.%20Verifiers/Block%20Header.md) for the output being spent, `inputProof` must be provided. Since this output might not exist, the transaction proof does not need to be valid, only the block header.
1. Get input `input` as `proof.transaction.inputs[proof.inputIndex]`.
1. If the input's [type](../1.%20Data%20Structures/Inputs.md) is `Deposit`:
    1. The deposit with that [deposit ID](./../1.%20Data%20Structures/Deposits.md) must have amount of `0` (i.e. a non-deposit is being spent).
1. Get metadata `metadata` as `proof.transaction.metadata[proof.inputIndex]`.
1. The metadata's root index `metadata.rootIndex` must be at least `inputProof.rootHeader.rootLength` (i.e. metadata root index out of bounds).
1. If the input's [type](../1.%20Data%20Structures/Inputs.md) is `Transfer` or `HTLC`:
    1. If the input proof is for the rightmost leaf in the root's transaction tree, then the metadata's transaction index `metadata.transactionIndex` must be greater than `inputProof.transactionIndex`. It's impossible to provide an inclusion proof for an out-of-bounds transaction, so this check serves as a check for this condition.
    1. The transaction leaf must be non-empty, i.e. `inputProof.transaction.length` must be greater than `0`.
    1. The metadata's output index `metadata.outputIndex` must be at least `inputProof.transaction.outputs.length` (i.e. metadata output index out of bounds).
    1. The output's [type](./../1.%20Data%20Structures/Outputs.md) must be `Withdraw` or `Return` (i.e. spending a [non-spendable output](../1.%20Data%20Structures/Outputs.md)).
    1. If the input's [type](../1.%20Data%20Structures/Inputs.md) is `Transfer`:
        1. The output's type must not be `Transfer` (i.e. type mismatch).
    1. If the input's [type](../1.%20Data%20Structures/Inputs.md) is `HTLC`:
        1. The output's type must not be `HTLC` (i.e. type mismatch).
        1. If `proof.blockHeader.blockNumber` is less than `inputProof.transaction.outputs[inputProof.outputIndex].expiry` (i.e. the timelock has not expired):
            1. The hashlock digest `inputProof.transaction.outputs[inputProof.outputIndex].digest` must not match the hash of the preimage `input.preImage` (i.e. invalid preimage).
