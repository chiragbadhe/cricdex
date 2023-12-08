require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    polygontestnet: {
      url: "https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY",
      accounts: [process.env.privateKey],
    },
    scrollsepolia: {
      // Configuration for Scrollsepolia network
      url: "https://scrollsepolia.example.com",
      accounts: [process.env.privateKey],
    },
    basesepolia: {
      // Configuration for Basesepolia network
      url: "https://basesepolia.example.com",
      accounts: [privateKey],
    },
    lineatestnet: {
      // Configuration for Lineatestnet network
      url: "https://lineatestnet.example.com",
      accounts: [privateKey],
    },
  },
};
