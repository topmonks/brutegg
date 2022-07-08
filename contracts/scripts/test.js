const BruteToken = artifacts.require("BruteToken");
const MAIN_ADDRESS = "0x7C6fFD8065d3938726E23983f28d8175cb027Aec";

module.exports = async (done) => {
  try {
    /**
     * @type { import("../build/polygon-contracts/BruteToken").BruteToken }
     */
    const bruteToken = await BruteToken.deployed();
    const accounts = await web3.eth.getAccounts();
    const DEPLOYED_BY_ACCOUNT = accounts[0];

    const ADMIN_ROLE = await bruteToken.DEFAULT_ADMIN_ROLE.call();
    const MINTER_ROLE = await bruteToken.MINTER_ROLE.call();
    const PAUSER_ROLE = await bruteToken.PAUSER_ROLE.call();

    console.log(await bruteToken.hasRole(ADMIN_ROLE, MAIN_ADDRESS));
    console.log(await bruteToken.hasRole(MINTER_ROLE, MAIN_ADDRESS));
    console.log(await bruteToken.hasRole(PAUSER_ROLE, MAIN_ADDRESS));

    console.log(await bruteToken.hasRole(ADMIN_ROLE, DEPLOYED_BY_ACCOUNT));
    console.log(await bruteToken.hasRole(MINTER_ROLE, DEPLOYED_BY_ACCOUNT));
    console.log(await bruteToken.hasRole(PAUSER_ROLE, DEPLOYED_BY_ACCOUNT));
  } catch (e) {
    console.log(e);
  } finally {
    done();
  }
};
