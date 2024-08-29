import { ethers } from 'ethers';

export const abi = [
  "function getConstruction(uint256 constructionId) public view returns (tuple(uint256 id, string name, uint256 totalEvaluationCount, tuple(uint256 usedShovelHour, uint256 neededShovelHour, uint256 overShover, uint256 usedSand, uint256 neededSand, uint256 overSand, bool isDone, uint256 supervisorID) baseBuild, tuple(uint256 usedSteelFrame, uint256 neededSteelFrame, uint256 overSteelFrame, uint256 usedCement, uint256 neededCement, uint256 overCement, bool isDone, uint256 supervisorID) framingBuild, tuple(uint256 usedTiles, uint256 neededTiles, uint256 overTiles, uint256 usedPipes, uint256 neededPipes, uint256 overPipes, uint256 usedGlue, uint256 neededGlue, uint256 overGlue, bool isDone, uint256 supervisorID) finishingBuild, bool isAllDone, tuple(uint256 overevaluationCount, uint256 overShover, uint256 overSand, uint256 overSteelFrame, uint256 overCement, uint256 overTiles, uint256 overPipes, uint256 overGlue) constructionAssesmentSheet))",
  "function getSupervisor(uint256 supervisorId) public view returns (tuple(uint256 id, uint256 constructionId, uint8 buildType, string question1, uint8 result1, string rejectReason1, string question2, uint8 result2, string rejectReason2, string question3, uint8 result3, string rejectReason3))",

  "function createConstruction(string name, uint neededShovelHour, uint neededSand, uint neededSteelFrame, uint neededCement, uint neededTiles, uint neededPipes, uint neededGlue) public",
  "function createSupervisor(uint constructionId, uint8 buildType, string question1, string question2, string question3) public",

  "function proceedBaseBuild(uint constructionId, uint usedShovelHour, uint usedSand) public",
  "function proceedBaseBuild( uint constructionId, uint usedShovelHour, uint usedSand) public",
  "function proceedBaseBuildAfterReject( uint constructionId, uint usedShovelHour, uint usedSand) public",
  "function proceedFramingBuild( uint constructionId, uint usedSteelFrame, uint usedCement) public",
  "function proceedFramingBuildAfterReject( uint constructionId, uint usedSteelFrame, uint usedCement) public",
  "function proceedFinishingBuild( uint constructionId, uint usedTiles, uint usedPipes, uint usedGlue) public",
  "function proceedFinishingBuildAfterReject( uint constructionId, uint usedTiles, uint usedPipes, uint usedGlue) public",

  "function EvaluateExam(uint256 constructionId, uint256 supervisorId, uint8 result1, uint8 result2, uint8 result3) public",
  "function UpdateRejectReason( uint supervisorId, string reason1, string reason2, string reason3) public",
  "function ConstructionCompleted( uint constructionId, uint supervisorId) public",
];

export const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
export const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
export const contractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

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