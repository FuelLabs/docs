Prover: Malformed Blocks
===

Proves that a [block](./../1.%20Data%20Structures/Blocks.md) was malformed. Given initial checks when [committing a new block](./../1.%20Data%20Structures/Blocks.md), the only case is when the Merkle root claimed in a [root header](./../1.%20Data%20Structures/Roots.md) is incorrectly computed.

1. A valid [block header](./../2.%20Verifiers/Block%20Header.md) and [root header](../1.%20Data%20Structures/Roots.md) must be provided, along with the original list of [transaction leaves](../1.%20Data%20Structures/Roots.md) committed to in the root header.
1. [Merkleizing](../2.%20Verifiers/Merkle%20Proof.md) the transaction leaves must not match the `merkleTreeRoot` field in the root header.
