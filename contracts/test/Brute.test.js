const BrutteToken = artifacts.require("ERC20PresetMinterPauser");
contract("BruteToken", (accounts) => {
  /**
   * @type { import("../build/polygon-contracts/ERC20PresetMinterPauser").ERC20PresetMinterPauser }
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

    // const totalSuply = await lpMioWETHToken.totalSupply.call();

    // await lpMioWETHToken.approve(stakingPool.address, totalSuply, {
    //   from: holderOne,
    // });

    // await stakingPool.stake(lpTokenBalance, { from: holderOne });

    // const staked = await stakingPool.balanceOf.call(holderOne);

    // assert.equal(staked.toNumber(), lpTokenBalance);
  });
});
