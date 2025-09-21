require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    shardeumUnstablenet: {
      url: "https://api-unstable.shardeum.org",
      chainId: 8080,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};