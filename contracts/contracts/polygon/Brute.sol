// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract BruteToken is ERC20PresetMinterPauser("Brute Token", "BRUTE") {
    event Nonce(bytes32 indexed nonce);

    function transferWithNonce(
        address to,
        uint256 amount,
        bytes32 nonce
    ) public virtual returns (bool) {
        emit Nonce(nonce);
        return transfer(to, amount);
    }
}
