Prover: Invalid Sums
===

Proves that a transaction spent more than allowed (i.e. sum of outputs > sum of inputs + fees).

A valid [transaction proof](../2.%20Verifiers/Transaction%20Proof.md), must be provided. The proof's [witness must also be valid](./../2.%20Verifiers/Witness.md). The proof's [data must also be valid](../2.%20Verifiers/Data.md).
1. For the provided token ID, the sum of the inputs must be greater than the sum of the outputs plus fees.
    1. Fees for a transaction are calculated as the feerate `proof.fee` times the transaction leaf length `proof.transaction.length`.
