import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { ethers } from 'ethers';
import Construction from './Construction';
import { useEffect, useState } from 'react';
import { abi, provider, wallet, contractAddress } from './solidityFunctions';
import * as solidity from './solidityFunctions'

export default function Company(props) {
  const [constructionID, setConstructionID] = useState(0);
  // const [constructionArray, setConstructionArray] = useState([]);
  const [name, setName] = useState("");
  const [neededShovelHour, setNeededShovelHour] = useState(0);
  const [neededSand, setNeededSand] = useState(0);
  const [neededSteelFrame, setNeededSteelFrame] = useState(0);
  const [neededCement, setNeededCement] = useState(0);
  const [neededTiles, setNeededTiles] = useState(0);
  const [neededPipes, setNeededPipes] = useState(0);
  const [neededGlue, setNeededGlue] = useState(0);
  
  // useEffect(()=>{
  //   const cid = solidity.getCurrentConstructionID();
  //   let array = []
  //   for (let i = 0 ; i <= cid ; i++) {
  //     array.push(i);
  //   }
  //   setConstructionArray(array);

  // },[])

  const getCurrentConstructionID = async () => {
    const cid = await solidity.getCurrentConstructionID();
    console.log(cid)
    
  }

  const createConstruction = async () => {
    await solidity.createConstruction(
      name,
      neededShovelHour,
      neededSand,
      neededSteelFrame,
      neededCement,
      neededTiles,
      neededPipes,
      neededGlue
    );
    console.log("create construction done")
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
          <Grid container spacing={3} justifyContent="center" alignItems="center" >
            <Grid item xs={2}>
              <TextField placeholder='name' type='text' onChange={(e) => {setName(e.target.value)}}></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder='neededShovelHour' type='number' onChange={(e) => {setNeededShovelHour(e.target.value)}}></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder='neededSand' type='number' onChange={(e) => {setNeededSand(e.target.value)}}></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder='neededSteelFrame' type='number' onChange={(e) => {setNeededSteelFrame(e.target.value)}}></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder='neededCement' type='number' onChange={(e) => {setNeededCement(e.target.value)}}></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder='neededTiles' type='number' onChange={(e) => {setNeededTiles(e.target.value)}}></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder='neededPipes' type='number' onChange={(e) => {setNeededPipes(e.target.value)}}></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder='neededGlue' type='number' onChange={(e) => {setNeededGlue(e.target.value)}}></TextField>
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth variant="contained" color="success" onClick={createConstruction}>Construction 생성</Button>
              <Button fullWidth variant="contained" color="success" onClick={getCurrentConstructionID}>ConstructionID 불러오기</Button>
            </Grid>
          </Grid>
          {/* {constructionArray.map((index) => {
            return (<Construction constructionID={index} key={index}></Construction>)
          })} */}
          <Construction constructionID={0} ></Construction>
          <Construction constructionID={1}></Construction>
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