import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import { abi, provider, wallet, contractAddress } from './abi';

export default function Construction(props) {
  const getConstruction = async () => {
    console.log("공사 확인, construction ID : ", props.constructionID);
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const result = await contract.getConstruction(props.constructionID);

    console.log('result', result);
    // setConstruction(result);

    // const receipt = await tx.wait();
    // console.log('Transaction was mined in block:', receipt.blockNumber);
  }

  return (
    <div className='m-2 p-4 border-yellow-700 border-2'>
      <div className='flex'>
        <h1 style={{ marginBottom: '1rem' }} className="text-2xl font-bold">
          Construction {props.constructionID}
        </h1>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="success" onClick={getConstruction}>공사 확인</Button>
        </Grid>

      </div>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500">
            <p className='font-bold'>기초 공사</p>
            {/* <p>usedShovelHour : {props.construction[3][0]}</p> */}
            <p>neededShovelHour : </p>
            <p>overShover : </p>
            <p>usedSand : </p>
            <p>neededSand : </p>
            <p>overSand : </p>
            <p>isDone : </p>
            <p>supervisorID : </p>
          </Box>
        </Grid>
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500">
            <p className='font-bold'>골조 공사</p>
            <p>usedSteelFrame : </p>
            <p>neededSteelFrame : </p>
            <p>overSteelFrame : </p>
            <p>usedCement : </p>
            <p>neededCement : </p>
            <p>overCement : </p>
            <p>isDone : </p>
            <p>supervisorID : </p>
          </Box>
        </Grid>
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500">
            <p className='font-bold'>마무리 공사</p>
            <p>usedTiles : </p>
            <p>neededTiles : </p>
            <p>overTiles : </p>
            <p>usedPipes : </p>
            <p>neededPipes : </p>
            <p>overPipes : </p>
            <p>usedGlue : </p>
            <p>neededGlue : </p>
            <p>overGlue : </p>
            <p>isDone : </p>
            <p>supervisorID : </p>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}