import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import Company from './Company';
import { abi, provider, wallet, contractAddress } from './solidityFunctions';

function App() {
  const createConstructionCompany = async() => {

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
          {/* <Company companyID={1}></Company> */}
        </div>

      </div>
    </div>
  );
}

export default App;
