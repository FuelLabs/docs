Tokens
===

The token registry maintains a mapping of token contract address (20 bytes) to token ID (unsigned integer up to and including 4 bytes). Each time a new token is registered, it is assigned the next token ID in sequence.

New tokens deposited to the contract are automatically assigned a new token ID without any additional interaction.

Native ether (ETH) has token ID `0`.
