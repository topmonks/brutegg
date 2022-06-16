const SimpleToken = artifacts.require("SimpleToken");
const StakingPool = artifacts.require("StakingPool");
const timeMachine = require("ganache-time-traveler");
const BN = require("bn.js");

const DAY = 24 * 60 * 60;

const e = (n, exp) => `${n}${Array(exp).fill(0).join("")}`;

contract("StakingPool", (accounts) => {
  /**
   * @type { import("../build/polygon-contracts/SimpleToken").SimpleToken }
   */
  let mioToken;
  /**
   * @type { import("../build/polygon-contracts/SimpleToken").SimpleToken }
   */
  let lpMioWETHToken;
  /**
   * @type { import("../build/polygon-contracts/StakingPool").StakingPool }
   */
  let stakingPool;

  let snapshotId;
  let deployTime;

  let owner = accounts[0];
  let holderOne = accounts[1];
  let holderTwo = accounts[2];

  beforeEach(async () => {
    let snapshot = await timeMachine.takeSnapshot();
    snapshotId = snapshot["result"];
  });

  afterEach(async () => {
    if (snapshotId) {
      await timeMachine.revertToSnapshot(snapshotId);
    }
  });

  beforeEach(async () => {
    mioToken = await SimpleToken.new("meetvers", "MIO", new BN(e(375000000,18)));
    lpMioWETHToken = await SimpleToken.new(
      "lpMioWETHToken",
      "LP-MIO-WETH",
      new BN(e(10,18))
    );

    deployTime = Math.floor(Date.now() / 1000);
    stakingPool = await StakingPool.new(
      lpMioWETHToken.address,
      mioToken.address,
      deployTime
    );
    await mioToken.transfer(stakingPool.address, new BN(e(375000000,18)));
    await mioToken.approve(stakingPool.address, new BN(e(375000000,18)));
  });

  it("stakes LP tokens and checks staked balance", async () => {
    const lpTokenBalance = 1e3;
    await lpMioWETHToken.transfer(holderOne, lpTokenBalance);

    const totalSuply = await lpMioWETHToken.totalSupply.call();

    await lpMioWETHToken.approve(stakingPool.address, totalSuply, {
      from: holderOne,
    });

    await stakingPool.stake(lpTokenBalance, { from: holderOne });

    const staked = await stakingPool.balanceOf.call(holderOne);

    assert.equal(staked.toNumber(), lpTokenBalance);
  });

  it("stakes LP tokens and withdraw half", async () => {
    const lpTokenBalance = new BN(e(2,18));
    const lpTokenBalanceHalf = new BN(e(1,18));
    await lpMioWETHToken.transfer(holderOne, lpTokenBalance);

    const totalSuply = await lpMioWETHToken.totalSupply.call();

    await lpMioWETHToken.approve(stakingPool.address, totalSuply, {
      from: holderOne,
    });

    await stakingPool.stake(lpTokenBalance, { from: holderOne });
    await stakingPool.withdraw(lpTokenBalanceHalf, { from: holderOne });

    const staked = await stakingPool.balanceOf.call(holderOne);

    assert(staked.eq(lpTokenBalanceHalf));
  });

  it("reward rate", async () => {
    const lpTokenBalance = new BN(e(1,18));
    await lpMioWETHToken.transfer(holderOne, lpTokenBalance);

    const totalSuply = await lpMioWETHToken.totalSupply.call();

    await lpMioWETHToken.approve(stakingPool.address, totalSuply, {
      from: holderOne,
    });

    await stakingPool.stake(lpTokenBalance, { from: holderOne });
    const staked = await stakingPool.balanceOf.call(holderOne);
    assert(staked.eq(lpTokenBalance));

    const rewardRateExpected = (delta) => (375000000 * 4.23681 * Math.pow((delta / 86400), 0.63093)) / 100;

    let lastUpdateTime = deployTime;
    for (let i = 0; i <= 150; i++) {
      const timestamp = deployTime + DAY * i;
      const rewardRate = await (stakingPool.rewardRate(timestamp));
      const expected = new BN(rewardRateExpected(timestamp - lastUpdateTime)).mul(new BN(e(1,18)));
      // console.log(rewardRate.toString(), expected.toString());
      assert(rewardRate.sub(expected).lte(new BN(e(1,18))),
        `${rewardRate.toString()} != ${expected.toString()}`);
    }
  });

  it("rewardPerToken", async () => {
    const lpTokenBalance = new BN(e(1,18));
    await lpMioWETHToken.transfer(holderOne, lpTokenBalance);

    const totalSuply = await lpMioWETHToken.totalSupply.call();

    await lpMioWETHToken.approve(stakingPool.address, totalSuply, {
      from: holderOne,
    });

    await stakingPool.stake(lpTokenBalance, { from: holderOne });
    const staked = await stakingPool.balanceOf.call(holderOne);
    assert(staked.eq(lpTokenBalance));

    await timeMachine.advanceBlockAndSetTime(deployTime + DAY);

    const rpt = await stakingPool.rewardPerToken();
    const expected = new BN("15888037500000000000000000");
    assert(rpt.eq(expected), `${rpt.toString()} != ${expected.toString()}`);

    await timeMachine.advanceBlockAndSetTime(deployTime + DAY * 2)

    const rpt2 = await (stakingPool.rewardPerToken());
    const expected2 = new BN("24603625000000000000000000");
    assert(rpt2.sub(expected2).lte(new BN(e(1,18))));
  });

  async function stake(holder, balance) {
    await lpMioWETHToken.transfer(holder, balance);

    const totalSuply = await lpMioWETHToken.totalSupply.call({from: holder});
    // const totalSuply = await lpMioWETHToken.balanceOf.call(holder);
    // console.log(totalSuply);

    await lpMioWETHToken.approve(stakingPool.address, totalSuply, {
      from: holder,
    });

    await stakingPool.stake(balance, { from: holder });
  }

  it("two holders earned", async () => {
    await stake(holderOne, new BN(e(1,18)));
    await stake(holderTwo, new BN(e(1,18)));

    await timeMachine.advanceBlockAndSetTime(deployTime + DAY)

    const expected = new BN(e((15888037 / 2) * 10, 17));

    const earned1 = await (stakingPool.earned(holderOne));
    assert(earned1.sub(expected).lte(new BN(e(1,18))));

    const earned2 = await (stakingPool.earned(holderTwo));
    assert(earned2.sub(expected).lte(new BN(e(1,18))));

  });

  it("rewardDistributed", async () => {
    await stake(holderOne, new BN(e(1,18)));

    await timeMachine.advanceBlockAndSetTime(deployTime + DAY);

    // await (stakingPool.getReward({ from: holderOne }));
    // const balance = await mioToken.balanceOf(holderOne);
    // assert.equal(balance.toString(), e(15888037,18));

    const rewardDistributed = await stakingPool.rewardDistributed.call();
    const expected = new BN(e(15888037,18));
    assert(rewardDistributed.sub(expected).lte(new BN(e(1,18))));
  });

  it("getReward", async () => {
    await stake(holderOne, new BN(e(1,18)));

    await timeMachine.advanceBlockAndSetTime(deployTime + DAY);

    await (stakingPool.getReward({ from: holderOne }));
    const balance = await mioToken.balanceOf(holderOne);
    const expected = new BN("15888037500000000000000000");
    assert(balance.eq(expected), `${balance.toString()} != ${expected.toString()}`);
  });
});
