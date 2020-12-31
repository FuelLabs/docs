Outputs
===

Outputs define which state elements (usually: UTXOs) are produced by a [transaction](./Transactions.md). Each state element can be produced and consumed at most once.

OutputType
---

```js
enum OutputType : uint8 {
    Transfer = 0,
    Withdraw = 1,
    HTLC = 2,
    Return = 3,
}
```

Output
---

| name            | type         | size | description                                                                                                        |
| --------------- | ------------ | ---- | ------------------------------------------------------------------------------------------------------------------ |
| `type`          | `OutputType` | 1    | `OutputType.Transfer` or `OutputType.Withdraw`.                                                                    |
| `token.length`  | `uint8`      | 1    | Next field number of bytes.                                                                                        |
| `token`         | `bytes1[]`   | 1*   | The token ID (`<= 4` bytes). See: [token registry](./Tokens.md).                                                   |
| `amount.shift`  | `uint8`      | 1    | Amount shifted bytes. See: [serialization](../0.%20Fundamentals/5.%20Serialization.md).                            |
| `amount.length` | `uint8`      | 1    | Next field number of bytes.                                                                                        |
| `amount`        | `uint8[]`    | 1*   | Amount of tokens. See: [serialization](../0.%20Fundamentals/5.%20Serialization.md).                                |
| `owner.length`  | `uint8`      | 1    | Next field number of bytes.                                                                                        |
| `owner`         | `bytes1[]`   | 1*   | Either address ID (`<= 19` bytes) or address (`= 20` bytes) of recipient. See: [address registry](./Addresses.md). |

A simple transfer between two users on Fuel or a withdrawal from Fuel back to Ethereum.

OutputHTLC
---

| name                 | type         | size | description                                                                                                                    |
| -------------------- | ------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| `type`               | `OutputType` | 1    | `OutputType.HTLC`.                                                                                                             |
| `token.length`       | `uint8`      | 1    | Next field number of bytes.                                                                                                    |
| `token`              | `bytes1[]`   | 1*   | The token ID (`<= 4` bytes). See: [token registry](./Tokens.md).                                                               |
| `amount.shift`       | `uint8`      | 1    | Amount shifted bytes. See: [serialization](../0.%20Fundamentals/5.%20Serialization.md).                                        |
| `amount.length`      | `uint8`      | 1    | Next field number of bytes.                                                                                                    |
| `amount`             | `uint8[]`    | 1*   | Amount of tokens. See: [serialization](../0.%20Fundamentals/5.%20Serialization.md).                                            |
| `owner.length`       | `uint8`      | 1    | Next field number of bytes.                                                                                                    |
| `owner`              | `bytes1[]`   | 1*   | Either address ID (`<= 19` bytes) or address (`= 20` bytes) of recipient. See: [address registry](./Addresses.md).             |
| `digest`             | `bytes32`    | 32   | Hashlock digest. The preimage to this digest must be revealed to spend this output.                                            |
| `expiry`             | `uint32`     | 4    | Timelock as an Ethereum block number.                                                                                          |
| `returnOwner.length` | `uint8`      | 1    | Next field number of bytes.                                                                                                    |
| `returnOwner`        | `bytes1[]`   | 1*   | Either address ID (`<= 19` bytes) or address (`= 20` bytes) of owner if HTLC expires. See: [address registry](./Addresses.md). |

The timelock expiry is an _absolute_ Ethereum block number. Any rollup block committed _at or after_ this Ethereum block number can spend the UTXO with the timelock condition.

See also: [HTLC explainer on Bitcoin Wiki](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts).

OutputReturn
---

| name          | type         | size | description                                        |
| ------------- | ------------ | ---- | -------------------------------------------------- |
| `type`        | `OutputType` | 1    | `OutputType.Return`.                               |
| `data.length` | `uint16`     | 2    | Next field number of bytes.                        |
| `data`        | `bytes1[]`   | 1*   | Data blob. Between `1` and `512` bytes, inclusive. |

Return outputs are provably prunable, i.e. they are not inserted into the state (the UTXO set). They can be used to record and timestamp arbitrary information to the Fuel chain, useful for building applications with client-side execution.

See also: [Bitcoin's OP_RETURN](https://en.bitcoin.it/wiki/OP_RETURN).

UTXO
---

| name            | type      | size | description                                                                                |
| --------------- | --------- | ---- | ------------------------------------------------------------------------------------------ |
| `transactionId` | `bytes32` | 32   | [Transaction ID](./Transactions.md), the hash of the serialized unsigned transaction data. |
| `outputIndex`   | `uint256` | 32   | Index of output in transaction.                                                            |
| `outputType`    | `uint256` | 32   | Output's type.                                                                             |
| `owner`         | `bytes32` | 32   | Owner of UTXO, either a raw address or an [address ID](./Addresses.md).                    |
| `amount`        | `uint256` | 32   | Amount of tokens.                                                                          |
| `token`         | `uint256` | 32   | [Token ID](./Tokens.md).                                                                   |
| `digest`        | `bytes32` | 32   | HTLC only: hashlock.                                                                       |
| `expiry`        | `uint256` | 32   | HTLC only: timelock.                                                                       |
| `returnOwner`   | `bytes32` | 32   | HTLC only: return owner.                                                                   |

The UTXO ID is simply the hash of the UTXO.

The HTLC-only fields are set to zero (`0`) if the output is not an HTLC output.
