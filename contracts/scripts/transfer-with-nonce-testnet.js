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

    await bruteToken.mint(owner, balance, {
      gasPrice: web3.utils.toWei("100", "gwei"),
      from: owner,
    });

    const res = await bruteToken.transferWithNonce(
      owner,
      balance,
      web3.utils.fromUtf8("foo_10000010221"),
      {
        gasPrice: web3.utils.toWei("100", "gwei"),
        from: owner,
      }
    );

    const tx = await web3.eth.getTransaction(res.tx);

    const erc20TransferABI = [
      {
        type: "address",
        name: "receiver",
      },
      {
        type: "uint256",
        name: "amount",
      },
      {
        type: "bytes32",
        name: "nonce",
      },
    ];
    const decoded = web3.eth.abi.decodeParameters(
      erc20TransferABI,
      tx.input.slice(10)
    );

    console.log(web3.utils.toUtf8(decoded.nonce));
  } catch (e) {
    console.log(e);
  } finally {
    done();
  }
};
