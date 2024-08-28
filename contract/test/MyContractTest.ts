import hre from "hardhat";

describe("Starbucks", function() {
  console.log("Starbucks Test")

  async function test() {
    const MyContract = await hre.ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();

    await myContract.createConstruction(
      "construction1",
      400,
      70,
      200,
      40,
      3000,
      150,
      5
    );

    await myContract.createSupervisor(
      1,
      "baseBuild",
      "baseBuild-question1",
      "baseBuild-question2",
      "baseBuild-question3",
    );

    let construction = await myContract.getConstruction("constrtion1");
    console.log(construction.toString());

  }

  test();

})