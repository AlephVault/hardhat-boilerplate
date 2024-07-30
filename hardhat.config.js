require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
require('hardhat-contract-sizer');
require('hardhat-common-tools');
require('hardhat-enquirer-plus');
require('hardhat-servers');
require('hardhat-blueprints');
require('hardhat-method-prompts');
require('hardhat-ignition-deploy-everything');
require('hardhat-openzeppelin-common-blueprints');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      // "hardhat" and "localhost" networks will use this config.
      //
      // Leave the id 31337 by default. It will be used by local
      // networks only. Also, leave the mnemonic BUT NEVER-EVER
      // EVER-EVER-EVER-EVER use it in Production. Seriously.
      chainId: 31337,
      accounts: {
        mnemonic: "dentist whale pattern drastic time black cigar bike person destroy punch hungry",
        // The starting balance in this example is 10000 ETH.
        // You're totally free to change it.
        initialBalance: "10000" + "000000000000000000",
        count: 100
      }
    },
    testnet: {
      // This is an example "testnet" network. In this case, Polygon
      // Amoy. The mnemonic will be read from an environment variable.
      // Setting up the client to a testnet is not different of doing
      // the same again a mainnet, save for the involved chainId and
      // endpoints and the impervious need of taking better care of
      // the involved keys in production.
      chainId: 80002,
      url: "https://rpc-amoy.polygon.technology",
      accounts: {
        mnemonic: process.env.MNEMONIC || 'invalid-mnemonic-please-set-one',
        count: 100
      }
    },
    mainnet: {
      // This is an example "mainnet" network. In this case, Polygon
      // Mainnet. The sample applies here regarding the settings and
      // again: Take special care with your mnemonic in production.
      chainId: 137,
      url: "https://polygon-mainnet.infura.io",
      accounts: {
        mnemonic: process.env.MNEMONIC || 'invalid-mnemonic-please-set-one',
        count: 100
      }
    }
  }
};
