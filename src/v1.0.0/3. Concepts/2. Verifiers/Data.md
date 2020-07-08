Verifier: Data
===

Verifies the [data](./../1.%20Data%20Structures/Transactions.md) component of a [transaction proof](./Transaction%20Proof.md) is properly formatted.

The data field in an [unsigned transaction](./../1.%20Data%20Structures/Transactions.md) is a list of the unique state elements that are being consumed by the inputs. Since the key for these state elements commits to sufficient information to verify their values, we simply need to provide the preimage to each hash.

For each provided preimage `preimage` and each data `data` in the list of proof data `proof.transactionLeaf.data`:
1. The hash of `preimage` must match `data`.

Note that `preimage` can come in [different types](./Inputs.md), depending on the type of the input (i.e. what is being spent).
