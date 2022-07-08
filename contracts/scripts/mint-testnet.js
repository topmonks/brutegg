const BruteToken = artifacts.require("BruteToken");
const TOPMONKS_ADDRESS = "0x1C8fF2d39bf4d08C23A24e24fb6dF4818ac45325";

module.exports = async (done) => {
  try {
    /**
     * @type { import("../build/polygon-contracts/BruteToken").BruteToken }
     */
    const bruteToken = await BruteToken.deployed();

    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];

    const balance = web3.utils.toWei("" + 1, "ether");

    console.log({ TOPMONKS_ADDRESS, balance });
    console.log(
      await bruteToken.mint(TOPMONKS_ADDRESS, balance, {
        gasPrice: web3.utils.toWei("100", "gwei"),
        from: owner,
      })
    );
  } catch (e) {
    console.log(e);
  } finally {
    done();
  }
};
