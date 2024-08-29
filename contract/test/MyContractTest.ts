import hre from "hardhat";

describe("Starbucks", function() {
  console.log("Mycontract Test")

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
    console.log(1);

    await myContract.createSupervisor(
      1,
      0,
      "baseBuild-question1",
      "baseBuild-question2",
      "baseBuild-question3"
    );
    console.log(2);

    let construction = await myContract.getConstruction(0);
    console.log(construction);
    console.log(3);

    await myContract.proceedBaseBuild(0, 10, 2);
    construction = await myContract.getConstruction(0);
    console.log(construction);

  }

  test();

})