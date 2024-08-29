import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';

 
const abi = [
  "function createConstruction(string name, uint neededShovelHour, uint neededSand, uint neededSteelFrame, uint neededCement, uint neededTiles, uint neededPipes, uint neededGlue) public"
];

function App() {
  const onClickHandle = async () => {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

    const contractAddress = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";

    
    // Create a contract
    const contract = new ethers.Contract(contractAddress, abi, wallet)

    // Create a transaction
    const tx = await contract.createConstruction("construction1", 10,10,10, 10,10,10, 10)

    // 트랜잭션 해시 출력
    console.log('Transaction Hash:', tx.hash);

    const receipt = await tx.wait();
    console.log('Transaction was mined in block:', receipt.blockNumber);
  }
  
  return (
    <div>
    <Grid 
        container 
        direction="column" 
        alignItems="center" 
        justifyContent="center" 
        style={{ minHeight: '50vh', padding: '0 2rem' }} // Added padding here
        >
        <Grid item>
          <h1 style={{ marginBottom: '1rem' }} className="text-3xl font-bold underline">
            Construction
          </h1>
        </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '30vh' }}>
        <Grid item xs={8} sm={4} md={3}>
        <Button fullWidth variant="contained" color="success" onClick={onClickHandle}>기초공사</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Button fullWidth variant="contained" color="success">골조공사</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
        <Button fullWidth variant="outlined">방수</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Button fullWidth variant="outlined">타일</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Button fullWidth variant="outlined">온돌</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Button fullWidth variant="outlined">도배</Button>
        </Grid>
      </Grid>
    </Grid>

    <Grid 
        container 
        direction="column" 
        alignItems="center" 
        justifyContent="center" 
        style={{ minHeight: '50vh', padding: '0 2rem' }} // Added padding here
        >

    <Grid item>
          <h1 style={{ marginTop: '1rem', textAlign: 'center' }} className="text-3xl font-bold underline">
            Supervisor
          </h1>
        </Grid>

        <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '30vh' }}>
        <Grid item xs={8} sm={4} md={3}>
        <Button fullWidth variant="contained">감리1</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
        <Button fullWidth variant="contained">감리2</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
        <Button fullWidth variant="contained">감리3</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Button fullWidth variant="outlined">감리4</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Button fullWidth variant="outlined">감리5</Button>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Button fullWidth variant="outlined">감리6</Button>
        </Grid>
      </Grid>
</Grid>
    </div>
  );
}

export default App;
