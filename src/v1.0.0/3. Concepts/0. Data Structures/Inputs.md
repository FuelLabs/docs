Inputs
===

# InputTypes

```
enum InputTypes : uint8 {
    Transfer = 0,
    Deposit = 1,
    HTLC = 2,
    Root = 3,
}
```

# Input

| name               | type         | size | description |
| ------------------ | ------------ | ---- | ----------- |
| `type`             | `InputTypes` | 1    |             |
| `witnessReference` | `uint8`      | 1    |             |

# InputDeposit

| name               | type         | size | description |
| ------------------ | ------------ | ---- | ----------- |
| `type`             | `InputTypes` | 1    |             |
| `witnessReference` | `uint8`      | 1    |             |
| `owner`            | `address`    | 20   |             |

# InputHTLC 

| name               | type         | size | description |
| ------------------ | ------------ | ---- | ----------- |
| `type`             | `InputTypes` | 1    |             |
| `witnessReference` | `uint8`      | 1    |             |
| `preImage`         | `bytes32`    | 32   |             |
