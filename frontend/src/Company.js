import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { ethers } from 'ethers';
import Construction from './Construction';
import { useState } from 'react';
import { abi, provider, wallet, contractAddress } from './abi';

export default function Company(props) {
  const [constructionID, setConstructionID] = useState(0)
  const [construction, setConstruction] = useState(null);

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
    console.log("공사 확인, construction ID : ", constructionID);
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const result = await contract.getConstruction(constructionID);

    console.log('result', result);
    // setConstruction(result);

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

  const getSupervisor = async () => {
    console.log("공사 확인, construction ID : ", constructionID);
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const tx = await contract.getConstruction(constructionID);
    // const [name, neededShovelHour, neededSand] = result;

    // 트랜잭션 해시 출력
    console.log('Transaction Hash:', tx[1]);

    // const receipt = await tx.wait();
    // console.log('Transaction was mined in block:', receipt.blockNumber);
  }
  return(
    <div>
      <div className='m-2 p-4 border-black border-2'>
        <h1 style={{ marginBottom: '1rem' }} className="text-3xl font-bold">
          Construction Company {props.companyID}
        </h1>
        <div>
          <Construction constructionID={0} construction={construction}></Construction>
          {/* <Construction constructionID={1}></Construction> */}
        </div>

      <Grid container spacing={3} justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '30vh' }}>
        <Grid item xs={4} className='flex justify-center'>
          <TextField placeholder='공사 ID' type='number' onChange={(event)=>{if (event.target.value == null) {setConstructionID(0)}; setConstructionID(event.target.value);}}></TextField>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="inherit" onClick={createConstruction}>공사 생성</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="success" onClick={getConstruction}>공사 확인</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="info" onClick={getConstruction}>기초 공사 시행</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="info" onClick={getConstruction}>골조 공사 시행</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="info" onClick={getConstruction}>마무리 공사 시행</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="success" onClick={getConstruction}>기초 공사 감리</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="success" onClick={getConstruction}>골조 공사 감리</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="success" onClick={getConstruction}>마무리 공사 감리</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="warning" onClick={getConstruction}>기초 추가 공사 시행</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="warning" onClick={getConstruction}>골조 추가 공사 시행</Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="warning" onClick={getConstruction}>마무리 추가 공사 시행</Button>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}