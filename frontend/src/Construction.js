import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import { abi, provider, wallet, contractAddress } from './solidityFunctions';
import * as solidity from './solidityFunctions'
import { useEffect, useState } from 'react';

export default function Construction(props) {
  const [construction, setConstruction] = useState({
    id : 0,
    name : "",
    totalEvaluationCount : 0,
    baseBuild : {
      usedShovelHour : 0,
      neededShovelHour : 0,
      overShover : 0,
      usedSand : 0,
      neededSand : 0,
      overSand : 0,
      isDone : false,
      supervisorID : 0
    },
    framingBuild : {
      usedSteelFrame : 0,
      neededSteelFrame : 0,
      overSteelFrame : 0,
      usedCement : 0,
      neededCement : 0,
      overCement : 0,
      isDone : false,
      supervisorID : 0
    },
    finishingBuild : {
      usedTiles : 0,
      neededTiles : 0,
      overTiles : 0,
      usedPipes : 0,
      neededPipes : 0,
      overPipes : 0,
      usedGlue : 0,
      neededGlue : 0,
      overGlue : 0,
      isDone : false,
      supervisorID : 0
    },
    isAllDone : false,
    constructionAssesmentSheet : {
      overevaluationCount : 0,
      overShover : 0,
      overSand : 0,
      overSteelFrame : 0,
      overCement : 0,
      overTiles : 0,
      overPipes : 0,
      overGlue : 0,
    }
  });

  const getConstruction = async () => {
    const c = await solidity.getConstruction(props.constructionID);
    console.log("construction : ", c)
    setConstruction(c);
  }
  // useEffect(()=>{
  //   getConstruction();
  // },[])

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
            <p>neededShovelHour :{construction.name} </p>
            {/* <p>neededShovelHour : </p> */}
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