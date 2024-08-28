// scripts/proceedBaseBuild.js

import { ethers } from "hardhat";
import hardhat from "hardhat";
import promptSync from "prompt-sync";

const prompt = promptSync();

async function main() {
  try {
    
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // MyContract 인스턴스를 가져옵니다.
    const MyContract = await ethers.getContractAt("MyContract", contractAddress);

    // 사용자로부터 constructionId, usedShovelHour, usedSand 입력받기
    const constructionId = parseInt(prompt("Enter construction ID: "), 10);
    const usedShovelHour = parseInt(prompt("Enter used shovel hours: "), 10);
    const usedSand = parseInt(prompt("Enter used sand: "), 10);

    let construction = await MyContract.getConstruction(0);

    // proceedBaseBuild 함수 실행
    const tx = await MyContract.proceedBaseBuild(constructionId, usedShovelHour, usedSand);

    // 트랜잭션이 완료될 때까지 대기
    await tx.wait();
    
    console.log(construction);

    console.log("proceedBaseBuild executed successfully");
  } catch (error) {
    console.error("Error executing proceedBaseBuild:", error);
    process.exitCode = 1;
  }
}

main();
