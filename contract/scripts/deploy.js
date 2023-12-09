// scripts/deploy.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploy CricDex contract
  const CricDex = await ethers.getContractFactory("CricDex");
  //Dai on Base
  const cricDex = await upgrades.deployProxy(CricDex, [
    "0x6652e8c2f1bc30ced4fe14ddc8fa4de878e67095", // Add quotes around the address
  ]);

  await cricDex.deployed();
  console.log("CricDex deployed to:", cricDex.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
