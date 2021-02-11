Prover: Invalid Witnesses
===

Proves that a witness was invalid, and that a spend wasn't authorized.

A [transaction proof](./../1.%20Data%20Structures/Transactions.md) with [valid inputs](./../2.%20Verifiers/Inputs.md) must be provided. In addition, a list of state elements (one for each input of the transaction) must be provided.
1. For each input:
    1. The owner of the input must not match the owner of the corresponding state element.
