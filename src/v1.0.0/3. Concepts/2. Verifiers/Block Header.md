Verifier: Block Headers
===

Validates the [block header](../1.%20Data%20Structures/Blocks.md) component of a [transaction proof](./Transaction%20Proof.md) is properly formatted.

1. The hash of the block header must be the block hash at `proof.blockHeader.blockHeight`.
1. If checking for finalizable block, then:
    1. The current block number must be at least the block number `proof.blockHeader.ethereumBlockNumber`.
1. If checking for not-finalizable block, then:
    1. The current block number must be less than the block number `proof.blockHeader.ethereumBlockNumber`.

Additional checks must pass if the [root header](./../1.%20Data%20Structures/Roots.md) component of a transaction proof is also being validated at the same time.

1. The root index `proof.rootIndex` must be less than the number of roots `proof.blockHeader.roots.length`.
1. The hash of the root header `proof.rootHeader` must match the root header at index `proof.rootIndex`.
