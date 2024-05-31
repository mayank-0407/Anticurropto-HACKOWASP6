require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.0",
  networks: {
    polygonAmoy: {
      url: "https://eth-sepolia.g.alchemy.com/v2/DoOCypCcsa4S7MiscIxQIa9ee6pZh4-A",
      accounts: [
        "b7c9c339b65dcca2a05c9bc0a4b6943860f9f16a3a4ce6174ca29354bc84f186",
      ],
      gasPrice: "auto",
    },
  },
};
