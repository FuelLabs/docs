Inputs
===

Inputs indicate which state elements (usually: UTXOs) are consumed by a [transaction](./Transactions.md). Each state element can be consumed and produced at most once.

InputType
---

```js
enum InputType : uint8 {
    Transfer = 0,
    Deposit = 1,
    HTLC = 2,
    Root = 3,
}
```

Input
---

| name           | type        | size | description                                                  |
| -------------- | ----------- | ---- | ------------------------------------------------------------ |
| `type`         | `InputType` | 1    | `InputType.Transfer` or `InputType.Root`.                    |
| `witnessIndex` | `uint8`     | 1    | Index of witness that authorizes spending the state element. |

There are no spending conditions on plain transfer UTXOs and root UTXOs (collected fees) other than a valid signature from the owner of the UTXO.

InputDeposit
---

| name           | type        | size | description                                            |
| -------------- | ----------- | ---- | ------------------------------------------------------ |
| `type`         | `InputType` | 1    | `InputType.Deposit`.                                   |
| `witnessIndex` | `uint8`     | 1    | Index of witness that authorizes spending the deposit. |
| `owner`        | `address`   | 20   | Deposit owner address.                                 |

There are no spending conditions on deposits other than a valid signature from the owner of the UTXO. The owner of the deposit must be provided as it is needed to compute the unique [deposit ID](./Deposits.md).

InputHTLC
---

| name           | type        | size | description                                                  |
| -------------- | ----------- | ---- | ------------------------------------------------------------ |
| `type`         | `InputType` | 1    | `InputType.HTLC`.                                            |
| `witnessIndex` | `uint8`     | 1    | Index of witness that authorizes spending the state element. |
| `preImage`     | `bytes32`   | 32   | Preimage of digest if spending through hashlock.             |

HTLC UTXOs require a valid signature from the owner of the UTXO. In addition, if using the hashlock condition, the preimage must be provided. If using the timelock condition, HTLC UTXOs are only spendable after the [output](./Outputs.md)'s timelock has expired.
