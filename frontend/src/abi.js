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
export const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";