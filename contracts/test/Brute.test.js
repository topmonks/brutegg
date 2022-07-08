const BrutteToken = artifacts.require("BruteToken");
contract("BruteToken", (accounts) => {
  /**
   * @type { import("../build/polygon-contracts/BruteToken").BruteToken }
   */
  let bruteToken;

  let owner = accounts[0];
  let holderOne = accounts[1];
  let holderTwo = accounts[2];

  beforeEach(async () => {
    bruteToken = await BrutteToken.new("Brute token", "BRUTE");
  });

  it("create brute token and mint", async () => {
    const lpTokenBalance = 1e3;
    await bruteToken.mint(holderOne, lpTokenBalance, { from: owner });

    const totalSuply = await bruteToken.totalSupply.call();

    assert.equal(lpTokenBalance, totalSuply.toNumber());
  });

  it("mint and transfer with nonce", async () => {
    const lpTokenBalance = 1e3;
    await bruteToken.mint(holderOne, lpTokenBalance, { from: owner });

    await bruteToken.transferWithNonce(
      holderTwo,
      lpTokenBalance,
      web3.utils.fromUtf8("nonce"),
      {
        from: holderOne,
      }
    );

    const balanceHolderOne = await bruteToken.balanceOf(holderOne);
    const balanceHolderTwo = await bruteToken.balanceOf(holderTwo);

    assert.equal(0, balanceHolderOne.toNumber());
    assert.equal(lpTokenBalance, balanceHolderTwo.toNumber());

    const totalSuply = await bruteToken.totalSupply.call();

    assert.equal(lpTokenBalance, totalSuply.toNumber());
  });
});
