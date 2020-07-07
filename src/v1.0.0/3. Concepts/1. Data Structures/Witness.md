Witness
===

# WitnessTypes

```
enum WitnessTypes : uint8 {
    Signature = 0,
    Caller = 1,
    Producer = 2,
}
```

Witnesses come in different types, depending on the origin of the authorization.

# Signature

| name   | type           | size | description          |
| ------ | -------------- | ---- | -------------------- |
| `type` | `WitnessTypes` | 1    | Witness type.        |
| `r`    | `bytes32`      | 32   | Signature `r` value. |
| `s`    | `bytes32`      | 32   | Signature `s` value. |
| `v`    | `uint8`        | 1    | Signature `v` value. |

This is a normal signature that signs over the transaction ID to authorize.

See: [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md).

# Caller

| name          | type           | size | description   |
| ------------- | -------------- | ---- | ------------- |
| `type`        | `WitnessTypes` | 1    | Witness type. |
| `owner`       | `address`      | 20   |               |
| `blockNumber` | `uint32`       | 4    |               |

This witness type is for when a contract on Ethereum authorizes a Fuel transaction. One use is smart contract wallets, rather than externally-owned accounts, authorizing transactions.

TODO describe this more

# Producer

| name   | type           | size | description   |
| ------ | -------------- | ---- | ------------- |
| `type` | `WitnessTypes` | 1    | Witness type. |
| `hash` | `bytes32`      | 32   |               |

TODO describe this
