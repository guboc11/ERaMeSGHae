import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { ethers } from 'ethers';
import Construction from './Construction';
import { useState } from 'react';
import { abi, provider, wallet, contractAddress } from './solidityFunctions';
import * as solidity from './solidityFunctions'

export default function Company(props) {
  const [constructionID, setConstructionID] = useState(0)
  const [construction, setConstruction] = useState(null);

  const createConstruction = async () => {
    await solidity.createConstruction("123",10,10,10,10,10,10,10);
  }

  const getConstruction = async() => {
    await solidity.getConstruction(constructionID);

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