Token Funnels
===

The usual flow for using an [ERC-20 token](https://github.com/ethereum/EIPs/issues/20) with a contract is to first `approve` an amount of tokens to transfer, then use `transferFrom` to actually transfer the tokens. In addition to poor UX, this has a number of issues:
1. Approving with a non-zero approved balance [allows an adversary to front-run the approval](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) and essential double-transfer tokens.
1. Users transferring tokens directly to a contract with `transfer` lose them, as the contract has no way of processing the transfer. This has resulted in [millions of dollars being burned](https://github.com/ethereum/eips/issues/223) through user error.

We provide a _token funnel_, a contract that can accept direct transfers magically. Intuitively, the funnel contract's deterministic [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) address itself is a commitment to a deposit to Fuel (generally, the hash of: the sender address, the token type, and the token amount). After transferring tokens to this address, the funnel contract can be deployed at any time to transfer to deposit properly to Fuel, then immediately self-destruct.

Readers familiar with Bitcoin might notice this bears many similarities to [Pay-to-Script-Hash](https://en.bitcoin.it/wiki/Pay_to_script_hash).

Specific implementation details can be found [here](https://github.com/FuelLabs/fuel/blob/master/src/Funnel.yulp).

## Smart contract details 

Details of the `Funnel.yulp` [smart contract](https://github.com/FuelLabs/fuel/blob/00a85a03589376fa54e1949b1f437735cd80d6a9/src/Funnel.yulp) implementation that matches the above requirements are as follows.

```
// 58 byte Funnel, 32 constructor size for owner
object "Funnel" {

```

The Funnel constructor code that is deployed is 58 bytes of code plus a 32 byte constructor parameter that represents the owner address; the code and parameter total 90 bytes.
 
After constructing a Funnel smart contract, the constructed funnel can be transacted with (as described in more detail below).

```
  code {
    datacopy(0, dataoffset("Runtime"), 90)
    return(0, 90)
  }
  object "Runtime" {
    code {
```

Data values in the EVM are stored after the code. Thus, `codecopy(0, 58, 32)` represents house-keeping wherein the constructor 32-byte `owner` argument is copied into memory.

```
      // Copy owner set in constructor to memory
      codecopy(0, 58, 32)
```

In order for the constructed funnel to function, the caller of the contract must be the owner specified when the funnel was constructed.

```
      // Check owner is caller
      if eq(mload(0), caller()) {
```

The calldata of the transaction intended for the token-capable smart contract is 128 bytes, and represents the 60-byte destination address concatenated with the 68-byte long parameters.

```
        // If calldata is correct length proceed with call
        if eq(calldatasize(), 128) {

          // Copy calldata to memory
          calldatacopy(0, 0, calldatasize())
```

To use `CREATE2` for magically handling token transfers to counterfactual token-capable smart contracts, we first need to understand the parameters needed to define the token-capable smart contract's target address. This target address will then be usable by the funnel when the correct calldata is passed in.

Of the first 60 bytes in the calldata, the starting 32 bytes (20 bytes in actuality) represent the target token-capable smart contract.

The following 68 bytes consists of parameters for the `call` operand to the token-capable smart contract:
* 4 bytes for the function selector
* token (32 bytes)
* amount (32 bytes)
 
FYI `pop` is a necessary operand used to wrap opcodes that return unused addresses.

```
          // Make outward call to destination, first word is destination, the next 68 is the call
          pop(call(gas(), mload(0), 0, 60, 68, 0, 0))
        }
```

If the destination token smart contract exists and the call to it is successful, then return any remaining Ether back to the owner/caller. Ether is also returned if the call data was not correctly sized. Alternative deployments have the option of enforcing additional checks.

```
        // Send ether to caller and self-destruct regardless
        selfdestruct(caller())
      }
    }
  }
}
```