import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';

const abi = [
  "function getConstruction(uint256 constructionId) public view returns (tuple(uint256 id, string name, uint256 totalEvaluationCount, tuple(uint256 usedShovelHour, uint256 usedSand), tuple(uint256 usedSteelFrame, uint256 usedCement), tuple(uint256 usedTiles, uint256 usedPipes, uint256 usedGlue), bool isAllDone))",
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

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
const contractAddress = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";

export default function Construction() {
  return (
    <div className='m-2 p-4 border-yellow-700 border-2'>
      <h1 style={{ marginBottom: '1rem' }} className="text-2xl font-bold">
        Construction 1
      </h1>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500 h-8">
            <p>기초 공사</p>
          </Box>
        </Grid>
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500 h-8">
            <p>골조 공사</p>
          </Box>
        </Grid>
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500 h-8">
            <p>마무리 공사</p>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}