import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import Company from './Company';
import { abi, provider, wallet, contractAddress } from './abi';

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
