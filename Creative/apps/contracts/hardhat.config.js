/**
* @type import('hardhat/config').HardhatUserConfig
*/
const { utils } = require("ethers");
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require("@typechain/hardhat");
require('hardhat-deploy');
//const { mnemonic, maticVigilSecret } = require('./secrets.json');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
const { RINKEBY_API_KEY, PRIVATE_KEY, MUMBAI_API_KEY, MATIC_API_KEY, ETHERSCAN_API_KEY } = process.env;
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    matic: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${MATIC_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  // don't forget to set your provider like:
  // REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
  // (then your frontend will talk to your contracts on the live network!)
  // (you will need to restart the `yarn run start` dev server after editing the .env)
  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.7.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 200000
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        80001: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        4: '0x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260', // but for rinkeby it will be a specific address
        137: 0,
        "goerli": '0x1Fde40a4046Eda0cA0539Dd6c77ABF8933B94260', //it can also specify a specific network name (specified in hardhat.config.js)
    }
  }
}
