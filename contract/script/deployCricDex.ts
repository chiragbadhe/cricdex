import {ethers, upgrades} from "hardhat";
import hre  from "hardhat";

async function main () {
    const CricDex = await ethers.getContractFactory("CricDex");
    const discordId = await CricDex.deploy('0x88ac0393DC7015a64Dc7A72485e566DA054D8D62')
    await discordId.waitForDeployment();
    console.log("discordId deployed to:", discordId.target);
    await new Promise(resolve => setTimeout(resolve, 10000));
    await hre.run("verify:verify", {address: discordId.target});

}
 main()


//  npx hardhat verify 0x02E1393d234EABBD58c3dd502f2C899bf31E0e36 "0x88ac0393DC7015a64Dc7A72485e566DA054D8D62"  --network scrollSepolia 
