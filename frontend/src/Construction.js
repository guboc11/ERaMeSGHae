import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import { abi, provider, wallet, contractAddress } from './solidityFunctions';
import * as solidity from './solidityFunctions'
import { useEffect, useState } from 'react';

export default function Construction(props) {
  // const [construction, setConstruction] = useState({
  //   id : "",
  //   name : "",
  //   totalEvaluationCount : "",
  //   baseBuild : {
  //     usedShovelHour : "",
  //     neededShovelHour : "",
  //     overShover : "",
  //     usedSand : "",
  //     neededSand : "",
  //     overSand : "",
  //     isDone : "",
  //     supervisorID : ""
  //   },
  //   framingBuild : {
  //     usedSteelFrame : 0,
  //     neededSteelFrame : 0,
  //     overSteelFrame : 0,
  //     usedCement : 0,
  //     neededCement : 0,
  //     overCement : 0,
  //     isDone : false,
  //     supervisorID : 0
  //   },
  //   finishingBuild : {
  //     usedTiles : 0,
  //     neededTiles : 0,
  //     overTiles : 0,
  //     usedPipes : 0,
  //     neededPipes : 0,
  //     overPipes : 0,
  //     usedGlue : 0,
  //     neededGlue : 0,
  //     overGlue : 0,
  //     isDone : false,
  //     supervisorID : 0
  //   },
  //   isAllDone : false,
  //   constructionAssesmentSheet : {
  //     overevaluationCount : 0,
  //     overShover : 0,
  //     overSand : 0,
  //     overSteelFrame : 0,
  //     overCement : 0,
  //     overTiles : 0,
  //     overPipes : 0,
  //     overGlue : 0,
  //   }
  // });
  // Top-level properties
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [totalEvaluationCount, setTotalEvaluationCount] = useState(0);
  const [isAllDone, setIsAllDone] = useState(false);

  // BaseBuild properties
  const [usedShovelHour, setUsedShovelHour] = useState(0);
  const [neededShovelHour, setNeededShovelHour] = useState(0);
  const [overShover, setOverShover] = useState(0);
  const [usedSand, setUsedSand] = useState(0);
  const [neededSand, setNeededSand] = useState(0);
  const [overSand, setOverSand] = useState(0);
  const [baseBuildIsDone, setBaseBuildIsDone] = useState(false);
  const [baseBuildSupervisorID, setBaseBuildSupervisorID] = useState(0);

  // FramingBuild properties
  const [usedSteelFrame, setUsedSteelFrame] = useState(0);
  const [neededSteelFrame, setNeededSteelFrame] = useState(0);
  const [overSteelFrame, setOverSteelFrame] = useState(0);
  const [usedCement, setUsedCement] = useState(0);
  const [neededCement, setNeededCement] = useState(0);
  const [overCement, setOverCement] = useState(0);
  const [framingBuildIsDone, setFramingBuildIsDone] = useState(false);
  const [framingBuildSupervisorID, setFramingBuildSupervisorID] = useState(0);

  // FinishingBuild properties
  const [usedTiles, setUsedTiles] = useState(0);
  const [neededTiles, setNeededTiles] = useState(0);
  const [overTiles, setOverTiles] = useState(0);
  const [usedPipes, setUsedPipes] = useState(0);
  const [neededPipes, setNeededPipes] = useState(0);
  const [overPipes, setOverPipes] = useState(0);
  const [usedGlue, setUsedGlue] = useState(0);
  const [neededGlue, setNeededGlue] = useState(0);
  const [overGlue, setOverGlue] = useState(0);
  const [finishingBuildIsDone, setFinishingBuildIsDone] = useState(false);
  const [finishingBuildSupervisorID, setFinishingBuildSupervisorID] = useState(0);

  // ConstructionAssessmentSheet properties
  const [overevaluationCount, setOverevaluationCount] = useState(0);
  const [assessmentOverShover, setAssessmentOverShover] = useState(0);
  const [assessmentOverSand, setAssessmentOverSand] = useState(0);
  const [assessmentOverSteelFrame, setAssessmentOverSteelFrame] = useState(0);
  const [assessmentOverCement, setAssessmentOverCement] = useState(0);
  const [assessmentOverTiles, setAssessmentOverTiles] = useState(0);
  const [assessmentOverPipes, setAssessmentOverPipes] = useState(0);
  const [assessmentOverGlue, setAssessmentOverGlue] = useState(0);


  const getConstruction = async () => {
    const c = await solidity.getConstruction(props.constructionID);

    // Set top-level properties
    setId(c.id);
    setName(c.name);
    setTotalEvaluationCount(c.totalEvaluationCount);
    setIsAllDone(c.isAllDone);

    // Set BaseBuild properties
    setUsedShovelHour(c.baseBuild.usedShovelHour);
    setNeededShovelHour(c.baseBuild.neededShovelHour);
    setOverShover(c.baseBuild.overShover);
    setUsedSand(c.baseBuild.usedSand);
    setNeededSand(c.baseBuild.neededSand);
    setOverSand(c.baseBuild.overSand);
    setBaseBuildIsDone(c.baseBuild.isDone);
    setBaseBuildSupervisorID(c.baseBuild.supervisorID);

    // Set FramingBuild properties
    setUsedSteelFrame(c.framingBuild.usedSteelFrame);
    setNeededSteelFrame(c.framingBuild.neededSteelFrame);
    setOverSteelFrame(c.framingBuild.overSteelFrame);
    setUsedCement(c.framingBuild.usedCement);
    setNeededCement(c.framingBuild.neededCement);
    setOverCement(c.framingBuild.overCement);
    setFramingBuildIsDone(c.framingBuild.isDone);
    setFramingBuildSupervisorID(c.framingBuild.supervisorID);

    // Set FinishingBuild properties
    setUsedTiles(c.finishingBuild.usedTiles);
    setNeededTiles(c.finishingBuild.neededTiles);
    setOverTiles(c.finishingBuild.overTiles);
    setUsedPipes(c.finishingBuild.usedPipes);
    setNeededPipes(c.finishingBuild.neededPipes);
    setOverPipes(c.finishingBuild.overPipes);
    setUsedGlue(c.finishingBuild.usedGlue);
    setNeededGlue(c.finishingBuild.neededGlue);
    setOverGlue(c.finishingBuild.overGlue);
    setFinishingBuildIsDone(c.finishingBuild.isDone);
    setFinishingBuildSupervisorID(c.finishingBuild.supervisorID);

    // Set ConstructionAssessmentSheet properties
    setOverevaluationCount(c.constructionAssesmentSheet.overevaluationCount);
    setAssessmentOverShover(c.constructionAssesmentSheet.overShover);
    setAssessmentOverSand(c.constructionAssesmentSheet.overSand);
    setAssessmentOverSteelFrame(c.constructionAssesmentSheet.overSteelFrame);
    setAssessmentOverCement(c.constructionAssesmentSheet.overCement);
    setAssessmentOverTiles(c.constructionAssesmentSheet.overTiles);
    setAssessmentOverPipes(c.constructionAssesmentSheet.overPipes);
    setAssessmentOverGlue(c.constructionAssesmentSheet.overGlue);
    
    // Log the updated state values
    console.log('ID:', c.id);
    console.log('Name:', c.name);
    console.log('Total Evaluation Count:', c.totalEvaluationCount);
    console.log('Is All Done:', c.isAllDone);

    // BaseBuild properties
    console.log('BaseBuild - Used Shovel Hour:', c.baseBuild.usedShovelHour);
    console.log('BaseBuild - Needed Shovel Hour:', c.baseBuild.neededShovelHour);
    console.log('BaseBuild - Over Shovel:', c.baseBuild.overShover);
    console.log('BaseBuild - Used Sand:', c.baseBuild.usedSand);
    console.log('BaseBuild - Needed Sand:', c.baseBuild.neededSand);
    console.log('BaseBuild - Over Sand:', c.baseBuild.overSand);
    console.log('BaseBuild - Is Done:', c.baseBuild.isDone);
    console.log('BaseBuild - Supervisor ID:', c.baseBuild.supervisorID);

    // FramingBuild properties
    console.log('FramingBuild - Used Steel Frame:', c.framingBuild.usedSteelFrame);
    console.log('FramingBuild - Needed Steel Frame:', c.framingBuild.neededSteelFrame);
    console.log('FramingBuild - Over Steel Frame:', c.framingBuild.overSteelFrame);
    console.log('FramingBuild - Used Cement:', c.framingBuild.usedCement);
    console.log('FramingBuild - Needed Cement:', c.framingBuild.neededCement);
    console.log('FramingBuild - Over Cement:', c.framingBuild.overCement);
    console.log('FramingBuild - Is Done:', c.framingBuild.isDone);
    console.log('FramingBuild - Supervisor ID:', c.framingBuild.supervisorID);

    // FinishingBuild properties
    console.log('FinishingBuild - Used Tiles:', c.finishingBuild.usedTiles);
    console.log('FinishingBuild - Needed Tiles:', c.finishingBuild.neededTiles);
    console.log('FinishingBuild - Over Tiles:', c.finishingBuild.overTiles);
    console.log('FinishingBuild - Used Pipes:', c.finishingBuild.usedPipes);
    console.log('FinishingBuild - Needed Pipes:', c.finishingBuild.neededPipes);
    console.log('FinishingBuild - Over Pipes:', c.finishingBuild.overPipes);
    console.log('FinishingBuild - Used Glue:', c.finishingBuild.usedGlue);
    console.log('FinishingBuild - Needed Glue:', c.finishingBuild.neededGlue);
    console.log('FinishingBuild - Over Glue:', c.finishingBuild.overGlue);
    console.log('FinishingBuild - Is Done:', c.finishingBuild.isDone);
    console.log('FinishingBuild - Supervisor ID:', c.finishingBuild.supervisorID);

    // ConstructionAssessmentSheet properties
    console.log('Assessment - Over Evaluation Count:', c.constructionAssesmentSheet.overevaluationCount);
    console.log('Assessment - Over Shovel:', c.constructionAssesmentSheet.overShover);
    console.log('Assessment - Over Sand:', c.constructionAssesmentSheet.overSand);
    console.log('Assessment - Over Steel Frame:', c.constructionAssesmentSheet.overSteelFrame);
    console.log('Assessment - Over Cement:', c.constructionAssesmentSheet.overCement);
    console.log('Assessment - Over Tiles:', c.constructionAssesmentSheet.overTiles);
    console.log('Assessment - Over Pipes:', c.constructionAssesmentSheet.overPipes);
    console.log('Assessment - Over Glue:', c.constructionAssesmentSheet.overGlue);
    // setConstruction(c);
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
      <div>
        <p>name {name}</p>
      </div>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500 p-4">
            <p className='font-bold'>기초 공사</p>
            <h1>usedShovelHour : {usedShovelHour.toString()}</h1>
            <p>neededShovelHour : {neededShovelHour.toString()}</p>
            <p>overShover : {overShover.toString()}</p>
            <p>usedSand : {usedSand.toString()}</p>
            <p>neededSand : {neededSand.toString()}</p>
            <p>overSand : {overSand.toString()}</p>
            <p>isDone : {baseBuildIsDone.toString()}</p>
            <p>supervisorID : {baseBuildSupervisorID.toString()}</p>
          </Box>
        </Grid>
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500 p-4">
            <p className='font-bold'>골조 공사</p>
            <p>usedSteelFrame : {usedSteelFrame.toString()}</p>
            <p>neededSteelFrame : {neededSteelFrame.toString()}</p>
            <p>overSteelFrame : {overSteelFrame.toString()}</p>
            <p>usedCement : {usedCement.toString()}</p>
            <p>neededCement : {neededCement.toString()}</p>
            <p>overCement : {overCement.toString()}</p>
            <p>isDone : {framingBuildIsDone.toString()}</p>
            <p>supervisorID : {framingBuildSupervisorID.toString()}</p>
          </Box>
        </Grid>
        <Grid item xs={8} sm={4} md={4}>
          <Box className="border-2 border-red-500 p-4">
            <p className='font-bold'>마무리 공사</p>
            <p>usedTiles : {usedTiles.toString()}</p>
            <p>neededTiles : {neededTiles.toString()}</p>
            <p>overTiles : {overTiles.toString()}</p>
            <p>usedPipes : {usedPipes.toString()}</p>
            <p>neededPipes : {neededPipes.toString()}</p>
            <p>overPipes : {overPipes.toString()}</p>
            <p>usedGlue : {usedGlue.toString()}</p>
            <p>neededGlue : {neededGlue.toString()}</p>
            <p>overGlue : {overGlue.toString()}</p>
            <p>isDone : {finishingBuildIsDone.toString()}</p>
            <p>supervisorID : {finishingBuildSupervisorID.toString()}</p>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}