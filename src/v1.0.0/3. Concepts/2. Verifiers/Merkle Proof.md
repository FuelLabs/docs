Verifier: Merkle Proofs
===

[Verifies the Merkle proof](https://crypto.stackexchange.com/questions/31871/what-is-the-canonical-way-of-creating-merkle-tree-branches) component of a [transaction proof](./Transaction%20Proof.md).

1. The tree height `proof.merkleProof.length` must be less than `MERKLE_TREE_HEIGHT_MAX` (`256`).
1. Hash transaction leaf `proof.transaction` to get current hash as the leaf hash.
1. For height `i` between `0` and ``proof.merkleProof.length - 1`:
    1. Hash the current hash with its sibling from the Merkle proof. If the `i`th bit of `proof.transactionIndex` is `0`, the sibling is on the right. If it's `1`, the sibling is on the left.
1. The resultant Merkle root must match `proof.rootHeader.merkleTreeRoot`.

Note: when constructing the tree, the number of nodes at a given level may not be even. In such case, the default value `EMPTY_LEAF_HASH` (`0x0000000000000000000000000000000000000000000000000000000000000000`) is used as the sibling hash value.
