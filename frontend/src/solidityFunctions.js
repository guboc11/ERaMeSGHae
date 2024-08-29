import { ethers } from 'ethers';

export const abi = [
  "function getConstruction(uint256 constructionId) public view returns (tuple(uint256 id, string name, uint256 totalEvaluationCount, tuple(uint256 usedShovelHour, uint256 neededShovelHour, uint256 overShover, uint256 usedSand, uint256 neededSand, uint256 overSand, bool isDone, uint256 supervisorID) baseBuild, tuple(uint256 usedSteelFrame, uint256 neededSteelFrame, uint256 overSteelFrame, uint256 usedCement, uint256 neededCement, uint256 overCement, bool isDone, uint256 supervisorID) framingBuild, tuple(uint256 usedTiles, uint256 neededTiles, uint256 overTiles, uint256 usedPipes, uint256 neededPipes, uint256 overPipes, uint256 usedGlue, uint256 neededGlue, uint256 overGlue, bool isDone, uint256 supervisorID) finishingBuild, bool isAllDone, tuple(uint256 overevaluationCount, uint256 overShover, uint256 overSand, uint256 overSteelFrame, uint256 overCement, uint256 overTiles, uint256 overPipes, uint256 overGlue) constructionAssesmentSheet))",
  "function getConstructor(uint256 constructorId) public view returns (tuple(uint256 id, uint256 criteria, bool canProposal, tuple(uint256 id, string name, uint256 totalEvaluationCount, tuple(uint256 usedShovelHour, uint256 neededShovelHour, uint256 overShover, uint256 usedSand, uint256 neededSand, uint256 overSand, bool isDone, uint256 supervisorID) baseBuild, tuple(uint256 usedSteelFrame, uint256 neededSteelFrame, uint256 overSteelFrame, uint256 usedCement, uint256 neededCement, uint256 overCement, bool isDone, uint256 supervisorID) framingBuild, tuple(uint256 usedTiles, uint256 neededTiles, uint256 overTiles, uint256 usedPipes, uint256 neededPipes, uint256 overPipes, uint256 usedGlue, uint256 neededGlue, uint256 overGlue, bool isDone, uint256 supervisorID) finishingBuild, bool isAllDone, tuple(uint256 overevaluationCount, uint256 overShover, uint256 overSand, uint256 overSteelFrame, uint256 overCement, uint256 overTiles, uint256 overPipes, uint256 overGlue) constructionAssesmentSheet)[] constructions))",
  "function getSupervisor(uint256 supervisorId) public view returns (tuple(uint256 id, uint256 constructionId, uint8 buildType, string question1, uint8 result1, string rejectReason1, string question2, uint8 result2, string rejectReason2, string question3, uint8 result3, string rejectReason3))",
  "function getNewConstructorID() public returns (uint256)",
  "function getNewConstructionID() public returns (uint256)",
  "function getNewSupervisorID() public returns (uint256)",
  "function createConstructor() public",
  "function createConstruction(string memory name, uint256 neededShovelHour, uint256 neededSand, uint256 neededSteelFrame, uint256 neededCement, uint256 neededTiles, uint256 neededPipes, uint256 neededGlue) public",
  "function createSupervisor(uint256 constructionId, uint8 buildType, string memory question1, string memory question2, string memory question3) public",
  "function proceedBaseBuild(uint256 constructionId, uint256 usedShovelHour, uint256 usedSand) public",
  "function proceedBaseBuildAfterReject(uint256 constructionId, uint256 usedShovelHour, uint256 usedSand) public",
  "function proceedFramingBuild(uint256 constructionId, uint256 usedSteelFrame, uint256 usedCement) public",
  "function proceedFramingBuildAfterReject(uint256 constructionId, uint256 usedSteelFrame, uint256 usedCement) public",
  "function proceedFinishingBuild(uint256 constructionId, uint256 usedTiles, uint256 usedPipes, uint256 usedGlue) public",
  "function proceedFinishingBuildAfterReject(uint256 constructionId, uint256 usedTiles, uint256 usedPipes, uint256 usedGlue) public",
  "function EvaluateExam(uint256 constructionId, uint256 supervisorId, uint8 result1, uint8 result2, uint8 result3) public",
  "function UpdateRejectReason(uint256 supervisorId, string memory reason1, string memory reason2, string memory reason3) public",
  "function CreateConstructionAssessmentSheet(uint256 constructionId) public",
  "function ConstructionCompleted(uint256 constructionId, uint256 supervisorId) public",
  "function beforeBid(uint256 constructorId) public"
];



export const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
export const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
export const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const createConstructionCompany = async () => {

}

export const createConstruction = async (name, neededShovelHour, neededSand, neededSteelFrame, neededCement, neededTiles, neededPipes, neededGlue) => {
  console.log("공사 생성");
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const tx = await contract.createConstruction(
    name,
    neededShovelHour,
    neededSand,
    neededSteelFrame,
    neededCement,
    neededTiles,
    neededPipes,
    neededGlue
  );

  // 트랜잭션 해시 출력
  console.log('Transaction Hash:', tx.hash);

  const receipt = await tx.wait();
  console.log('Transaction was mined in block:', receipt.blockNumber);
}

export const getConstruction = async (constructionID) => {
  console.log("공사 확인, construction ID : ", constructionID);
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const result = await contract.getConstruction(constructionID);

  console.log('result', result);

  return result;
}

export const createSupervisor = async () => {
  console.log("감리 생성");
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const tx = await contract.createSupervisor(0, 0, "Q1", "Q2", "Q3");

  // 트랜잭션 해시 출력
  console.log('Transaction Hash:', tx.hash);

  const receipt = await tx.wait();
  console.log('Transaction was mined in block:', receipt.blockNumber);
}

export const getSupervisor = async (supervisorID) => {
  console.log("공사 확인, construction ID : ", supervisorID);
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const tx = await contract.getSupervisor(supervisorID);
  // const [name, neededShovelHour, neededSand] = result;

  // 트랜잭션 해시 출력
  console.log('Transaction Hash:', tx[1]);

  // const receipt = await tx.wait();
  // console.log('Transaction was mined in block:', receipt.blockNumber);
}