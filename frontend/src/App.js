import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import Company from './Company';



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

function App() {
  const createConstructionCompany = async () => {

  }

  const createConstruction = async () => {
    console.log("공사 생성");
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const tx = await contract.createConstruction("construction1", 10,10,10, 10,10,10, 10);

    // 트랜잭션 해시 출력
    console.log('Transaction Hash:', tx.hash);

    const receipt = await tx.wait();
    console.log('Transaction was mined in block:', receipt.blockNumber);
  }

  const getConstruction = async () => {
    console.log("공사 확인");
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    // const tx = await contract.getConstruction(0);
    const tx = await contract.getConstruction(0);
    // const [name, neededShovelHour, neededSand] = result;

    // 트랜잭션 해시 출력
    console.log('Transaction Hash:', tx);

    // const receipt = await tx.wait();
    // console.log('Transaction was mined in block:', receipt.blockNumber);
  }

  const createSupervisor = async () => {
    console.log("감리 생성");
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const tx = await contract.createSupervisor(0, 0, "Q1", "Q2", "Q3");

    // 트랜잭션 해시 출력
    console.log('Transaction Hash:', tx.hash);

    const receipt = await tx.wait();
    console.log('Transaction was mined in block:', receipt.blockNumber);
  }
  
  return (
    <div>
      <div className='m-2 p-4 border-black border-2'>
        <h1 style={{ marginBottom: '1rem' }} className="text-3xl font-bold underline">
          Construction Companies
        </h1>
        <Button fullWidth variant="contained" color="success" onClick={createConstructionCompany}>시공사 생성</Button>
        <div>
          <Company companyID={0}></Company>
          <Company companyID={1}></Company>
        </div>

      </div>
    </div>
  );
}

export default App;
