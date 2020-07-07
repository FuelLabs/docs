Outputs
===

Outputs define which state elements (usually: UTXOs) are produced by a [transaction](./Transactions.md). Each state element can be produced and consumed at most once.

# OutputType

```
enum OutputType : uint8 {
    Transfer = 0,
    Withdraw = 1,
    HTLC = 2,
    Return = 3,
}
```

# Output

| name            | type         | size | description                                                                                                        |
| --------------- | ------------ | ---- | ------------------------------------------------------------------------------------------------------------------ |
| `type`          | `OutputType` | 1    | `OutputType.Transfer` or `OutputType.Withdraw`.                                                                    |
| `token.length`  | `uint8`      | 1    | Next field number of bytes.                                                                                        |
| `token`         | `bytes1[]`   | 1*   | Either token ID (`<= 4` bytes) or token contract address (`= 20` bytes). See: [token registry](./Tokens.md).       |
| `amount.shift`  | `uint8`      | 1    | Amount shifted bytes. See: [serialization](../0.%20Fundamentals/5.%20Serialization.md).                            |
| `amount.length` | `uint8`      | 1    | Next field number of bytes.                                                                                        |
| `amount`        | `uint8[]`    | 1*   | Amount of tokens. See: [serialization](../0.%20Fundamentals/5.%20Serialization.md).                                |
| `owner.length`  | `uint8`      | 1    | Next field number of bytes.                                                                                        |
| `owner`         | `bytes1[]`   | 1*   | Either address ID (`<= 19` bytes) or address (`= 20` bytes) of recipient. See: [address registry](./Addresses.md). |

A simple transfer between two users on Fuel or a withdrawal from Fuel back to Ethereum.

# OutputHTLC

| name                 | type         | size | description                                                                                                                    |
| -------------------- | ------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| `type`               | `OutputType` | 1    | `OutputType.HTLC`.                                                                                                             |
| `token.length`       | `uint8`      | 1    | Next field number of bytes.                                                                                                    |
| `token`              | `bytes1[]`   | 1*   | Either token ID (`<= 4` bytes) or token contract address (`= 20` bytes). See: [token registry](./Tokens.md).                   |
| `amount.shift`       | `uint8`      | 1    | Amount shifted bytes. See: [serialization](../0.%20Fundamentals/5.%20Serialization.md).                                        |
| `amount.length`      | `uint8`      | 1    | Next field number of bytes.                                                                                                    |
| `amount`             | `uint8[]`    | 1*   | Amount of tokens. See: [serialization](../0.%20Fundamentals/5.%20Serialization.md).                                            |
| `owner.length`       | `uint8`      | 1    | Next field number of bytes.                                                                                                    |
| `owner`              | `bytes1[]`   | 1*   | Either address ID (`<= 19` bytes) or address (`= 20` bytes) of recipient. See: [address registry](./Addresses.md).             |
| `digest`             | `bytes32`    | 32   |                                                                                                                                |
| `expiry`             | `uint32`     | 4    |                                                                                                                                |
| `returnOwner.length` | `uint8`      | 1    | Next field number of bytes.                                                                                                    |
| `returnOwner`        | `bytes1[]`   | 1*   | Either address ID (`<= 19` bytes) or address (`= 20` bytes) of owner if HTLC expires. See: [address registry](./Addresses.md). |

TODO define exactly how the HTLC expiry is counted (prevent off-by-one)

See also: [HTLC explainer on Bitcoin Wiki](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts).

# OutputReturn

| name          | type         | size | description                 |
| ------------- | ------------ | ---- | --------------------------- |
| `type`        | `OutputType` | 1    | `OutputType.Return`.        |
| `data.length` | `uint16`     | 2    | Next field number of bytes. |
| `data`        | `bytes1[]`   | 1*   |                             |

Return outputs are provably prunable, i.e. they are not inserted into the state (the UTXO set). They can be used to record and timestamp arbitrary information to the Fuel chain, useful for building applications with client-side execution.

See also: [Bitcoin's OP_RETURN](https://en.bitcoin.it/wiki/OP_RETURN).
