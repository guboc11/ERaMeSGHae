import hre from "hardhat";

describe("Starbucks", function() {
  console.log("Starbucks Test")

  async function test() {
    const MyContract = await hre.ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();

    console.log(myContract.customer);
    console.log(myContract.starbucksYonsei);
  }

  test();

})