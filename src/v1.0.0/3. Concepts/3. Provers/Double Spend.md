Prover: Double Spends
===

Proves that a double spend occurred.

1. Two valid [transaction proofs](../2.%20Verifiers/Transaction%20Proof.md) must be provided.
1. The input metadata for each transaction proof must be different.
1. The referenced input metadata (i.e. the spent state element) for each transaction proof must match.
