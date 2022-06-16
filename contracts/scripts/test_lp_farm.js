const SimpleToken = artifacts.require("SimpleToken");
const StakingPool = artifacts.require("StakingPool");

const amount = web3.utils.toWei("100000000000000", "ether");
const send = web3.utils.toWei("100000000", "ether");

const METAMASK_PUBLIC_ADDRESS = process.argv.at(-1);

module.exports = async (done) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];

    /**
     * @type { import("../build/polygon-contracts/SimpleToken").SimpleToken }
     */
    const rewardToken = await SimpleToken.new("meetvers", "MIO", amount);
    console.log("rewardToken deployed");
    /**
     * @type { import("../build/polygon-contracts/SimpleToken").SimpleToken }
     */
    const lpMIOWETHToken = await SimpleToken.new(
      "lpMioWETHToken",
      "LP-MIO-WETH",
      amount
    );
    console.log("lpMIOWETHToken deployed");

    /**
     * @type { import("../build/polygon-contracts/StakingPool").StakingPool }
     */
    const startTime = Date.now();
    let stakingPoolMIOWETH = await StakingPool.new(
      lpMIOWETHToken.address,
      rewardToken.address,
      startTime
    );
    console.log("stakingPoolMIOWETH deployed");

    await lpMIOWETHToken.transfer(METAMASK_PUBLIC_ADDRESS, send);
    /**
     * @type { import("../build/polygon-contracts/SimpleToken").SimpleToken }
     */
    const lpMIODAIToken = await SimpleToken.new(
      "lpMioDAIToken",
      "LP-MIO-WETH",
      amount
    );

    console.log("lpMIODAIToken deployed");

    /**
     * @type { import("../build/polygon-contracts/StakingPool").StakingPool }
     */
    let stakingPoolMIODAI = await StakingPool.new(
      lpMIODAIToken.address,
      rewardToken.address,
      startTime
    );
    console.log("stakingPoolMIODAI deployed");

    await lpMIODAIToken.transfer(METAMASK_PUBLIC_ADDRESS, send);

    // await web3.eth.sendTransaction({
    //   from: owner,
    //   to: METAMASK_PUBLIC_ADDRESS,
    //   value: web3.utils.toWei("10", "ether"),
    // });

    console.log("SNOWPACK_PUBLIC_MIO_TOKEN_ADDRESS=" + rewardToken.address);
    console.log("SNOWPACK_PUBLIC_LP_MIO_DAI_ADDRESS=" + lpMIODAIToken.address);
    console.log(
      "SNOWPACK_PUBLIC_STAKING_MIO_DAI_ADDRESS=" + stakingPoolMIODAI.address
    );
    console.log(
      "SNOWPACK_PUBLIC_LP_MIO_WETH_ADDRESS=" + lpMIOWETHToken.address
    );
    console.log(
      "SNOWPACK_PUBLIC_STAKING_MIO_WETH_ADDRESS=" + stakingPoolMIOWETH.address
    );
  } catch (e) {
    console.log(e);
  } finally {
    done();
  }
};
