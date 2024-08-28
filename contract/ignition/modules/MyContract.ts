import { ethers } from "hardhat";

async function main() {
    const myContract = await ethers.getContractFactory("MyContract");

    const myDeploy = await myContract.deploy();

    await myDeploy.deploymentTransaction();
}

main();
