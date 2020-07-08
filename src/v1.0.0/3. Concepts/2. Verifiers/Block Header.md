Verifier: Block Headers
===

Verifies the [block header](./Block%20Header.md) component of a [transaction proof](./Transaction%20Proof.md) is properly formatted.

1. The height `blockHeight` must be greater than `0` and at most the tip height.
1. The previous block hash `previousBlockHash` must match the previous block hash at `blockHeight`.
1. The number of transaction roots `roots.length` must be greater than `0` and at most [`TRANSACTION_ROOTS_MAX`](./../1.%20Data%20Structures/Blocks.md).
1. The hash of the block header must be the block hash at `blockHeight`.
1. If checking for finalizable block, then:
    1. The current block number must be at least the block number `ethereumBlockNumber`.
1. If checking for not-finalizable block, then:
    1. The current block number must be less than the block number `ethereumBlockNumber`.

Additional checks must pass if the [root header](./../1.%20Data%20Structures/Roots.md) component of a transaction proof is also being verified at the same time.

1. The root index `proof.rootIndex` must be less than the number of roots `roots.length`.
1. The hash of the root header `rootHeader` must match the root header at index `proof.rootIndex`.
