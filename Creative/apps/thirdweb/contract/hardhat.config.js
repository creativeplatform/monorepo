/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    polygon_testnet: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/4QdGUP8BOp3_NdNJAN1c2sWs12LtsfDF",
      ethNetwork: "mumbai",
      chainId: 80001,
    },
    polygon_mainnet: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/NDsioMXTwci91lMdODnh3iBbcJoxCgy8",
      ethNetwork: "polygon",
      chainId: 137,
    },
  },
  paths: {
    artifacts: "./artifacts-poly",
    cache: "./cache-poly",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
