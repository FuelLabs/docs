Token Funnels
===

The usual flow for using an [ERC-20 token](https://github.com/ethereum/EIPs/issues/20) with a contract is to first `approve` an amount of tokens to transfer, then use `transferFrom` to actually transfer the tokens. In addition to poor UX, this has a number of issues:
1. Approving with a non-zero approved balance [allows an adversary to front-run the approval](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) and essential double-transfer tokens.
1. Users transferring tokens directly to a contract with `transfer` lose them, as the contract has no way of processing the transfer. This has resulted in [millions of dollars being burned](https://github.com/ethereum/eips/issues/223) through user error.

We provide a _token funnel_, a contract that can accept direct transfers magically. Intuitively, the funnel contract's deterministic [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) address itself is a commitment to a deposit to Fuel (generally, the hash of: the sender address, the token type, and the token amount). After transferring tokens to this address, the funnel contract can be deployed at any time to transfer to deposit properly to Fuel, then immediately self-destruct.

Readers familiar with Bitcoin might notice this bears many similarities to [Pay-to-Script-Hash](https://en.bitcoin.it/wiki/Pay_to_script_hash).

Specific implementation details can be found [here](https://github.com/FuelLabs/fuel/blob/master/src/Funnel.yulp).
