Deposits
===

The deposit registry uniquely indexes deposits so they can be spent on Fuel.

# Deposit

| name          | type      | size | description                             |
| ------------- | --------- | ---- | --------------------------------------- |
| `owner`       | `address` | 20   | Owner of deposit.                       |
| `token`       | `uint256` | 32   | 4-byte [Token ID](./Tokens.md).         |
| `blockNumber` | `uint256` | 32   | Ethereum block number deposit was made. |
| `value`       | `uint256` | 32   | Amount of tokens.                       |

Deposits are uniquely keyed by `{ owner, token, blockNumber }`, with value `value`.

Since the granularity of deposits is in Ethereum blocks, multiple deposits from the same owner of the same token in the same Ethereum block simply update the deposited amount.

Deposits can be spent no earlier than in a Fuel block committed in the next Ethereum block.
