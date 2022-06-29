const ERC20PresetMinter = artifacts.require("ERC20PresetMinterPauser");

const MAIN_ADDRESS = "0x7C6fFD8065d3938726E23983f28d8175cb027Aec";
// const MAIN_ADDRESS = "0x2004ECACf031bfd0043B555CE54dE1f8d8987bC1";

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ERC20PresetMinter, "Brute Token", "BRUTE");
  const DEPLOYED_BY_ACCOUNT = accounts[0];
  /**
   * @type { import("../build/polygon-contracts/ERC20PresetMinterPauser").ERC20PresetMinterPauser }
   */
  const bruteToken = await ERC20PresetMinter.deployed();

  const ADMIN_ROLE = await bruteToken.DEFAULT_ADMIN_ROLE.call();
  const MINTER_ROLE = await bruteToken.MINTER_ROLE.call();
  const PAUSER_ROLE = await bruteToken.PAUSER_ROLE.call();

  await bruteToken.grantRole(MINTER_ROLE, MAIN_ADDRESS);
  await bruteToken.grantRole(PAUSER_ROLE, MAIN_ADDRESS);
  await bruteToken.grantRole(ADMIN_ROLE, MAIN_ADDRESS);

  await bruteToken.revokeRole(PAUSER_ROLE, DEPLOYED_BY_ACCOUNT);
  await bruteToken.revokeRole(MINTER_ROLE, DEPLOYED_BY_ACCOUNT);
  await bruteToken.revokeRole(ADMIN_ROLE, DEPLOYED_BY_ACCOUNT);
};
