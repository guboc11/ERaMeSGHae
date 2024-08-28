pragma solidity ^0.8.13;

import "hardhat/console.sol";
import './MyStruct.sol';

contract MyContract is MyStruct{

  address private owner;

  event OwnerSet(address indexed oldOwner, address indexed newOwner);

  constructor() {
        // console.log("Owner contract deployed by:", msg.sender);
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        // emit OwnerSet(address(0), owner);
    }

  mapping (uint => Construction) private constructionMap;
  mapping (uint => Supervisor) private supervisorMap;

  uint private constructionId = 0;
  uint private supervisorId = 1;

  function getConstructionId() public returns (uint) {
    return constructionId++;
  }

  function getSupervisorId() public returns (uint) {
    return supervisorId++;
  }


  function createConstruction(
    string memory name,
    uint neededShovelHour,
    uint neededSand,
    uint neededSteelFrame,
    uint neededCement,
    uint neededTiles,
    uint neededPipes,
    uint neededGlue
  ) public {
    BaseBuild memory newBaseBuild = BaseBuild(0, neededShovelHour, 0, 0, neededSand, 0, false, 0);
    FramingBuild memory newFrameBuild = FramingBuild(0, neededSteelFrame, 0, 0, neededCement, 0, false, 0);
    FinishingBuild memory newFinishBuild = FinishingBuild(0, neededTiles, 0, 0, neededPipes, 0, 0, neededGlue, 0, false, 0);

    uint constructionId = getConstructionId();

    Construction memory newConstruction = Construction(
      constructionId,
      name,
      0,
      newBaseBuild,
      newFrameBuild,
      newFinishBuild
    );

    constructionMap[constructionId] = newConstruction;
  }

  function createSupervisor(
    uint constructionId,
    BuildType buildType,
    string memory question1,
    string memory question2,
    string memory question3
  ) public {
    uint supervisorId = getSupervisorId();

    Supervisor memory newSupervisor = Supervisor(
      supervisorId,
      constructionId,
      buildType,
      question1,
      ExamStatus.Before,
      "",
      question2,
      ExamStatus.Before,
      "",
      question3,
      ExamStatus.Before,
      ""
    );

    Construction memory c = getConstruction(constructionId);
    
    if (buildType == BuildType.BaseBuild) {
      c.baseBuild.supervisorID = supervisorId;
    } else if (buildType == BuildType.FramingBuild) {
      c.framingBuild.supervisorID = supervisorId;
    } else if (buildType == BuildType.FinishingBuild) {
      c.finishingBuild.supervisorID = supervisorId;
    }

    supervisorMap[supervisorId] = newSupervisor;
  }

  function getConstruction(uint constructionId) public view returns(Construction memory) {
    Construction memory c = constructionMap[constructionId];

    return c;
  }

  function getSuperviserId(uint constructionId, BuildType buildType) private returns(uint) {

    // supervisor map에서 하나씩 꺼내봐서 cID, bT 와 일치하는 supervisor ID return
    return 0;
  }

  function getSupervisor(uint supervisorId) public view returns(Supervisor memory) {
    Supervisor memory s = supervisorMap[supervisorId];

    return s;
  }

  function proceedBaseBuild(
    uint constructionId,
    uint usedShovelHour,
    uint usedSand
  ) public {
    Construction memory c = constructionMap[constructionId];
    c.baseBuild.usedShovelHour += usedShovelHour;
    c.baseBuild.usedSand += usedSand;

    // if used랑 needed랑 같아지거나 used가 더 커지면 isDone true로 해준다.
    if (c.baseBuild.usedShovelHour >= c.baseBuild.neededShovelHour && c.baseBuild.usedSand >= c.baseBuild.neededSand) {
      c.baseBuild.isDone = true;
    }

    constructionMap[constructionId] = c;
  }

  function proceedBaseBuildAfterReject(
    uint constructionId,
    uint usedShovelHour,
    uint usedSand
  ) public {

    Construction memory c = constructionMap[constructionId];
    Supervisor memory s = supervisorMap[c.baseBuild.supervisorID];
    require(s.result1==ExamStatus.No || s.result2==ExamStatus.No || s.result3==ExamStatus.No, "You don't have to do this.");
    
    c.baseBuild.usedShovelHour += usedShovelHour;
    c.baseBuild.usedSand += usedSand;
    c.baseBuild.isDone = true;

    constructionMap[constructionId] = c;

  } 

  function proceedFramingBuild(
    uint constructionId,
    uint usedSteelFrame,
    uint usedCement
  ) public {
    Construction memory c = constructionMap[constructionId];

    // if BaseBuild가 isDone이 true일 때 실행 가능
    require(c.baseBuild.isDone, "not completed");

    // if BaseBuild의 Supervisor의 모든 평가가 YYY일 때 실행 가능
    Supervisor memory s = supervisorMap[c.baseBuild.supervisorID];
    require(s.result1==ExamStatus.Yes && s.result2==ExamStatus.Yes && s.result3==ExamStatus.Yes, "not accepted");

    c.framingBuild.usedSteelFrame += usedSteelFrame;
    c.framingBuild.usedCement += usedCement;

    // if used랑 needed랑 같아지거나 used가 더 커지면 isDone true로 해준다.
    if (c.framingBuild.usedSteelFrame >= c.framingBuild.neededSteelFrame &&
     c.framingBuild.usedCement >= c.framingBuild.neededCement) {
      c.framingBuild.isDone = true;
    }

    constructionMap[constructionId] = c;
  }

  function proceedFramingBuildAfterReject(
    uint constructionId,
    uint usedSteelFrame,
    uint usedCement
  ) public {

    Construction memory c = constructionMap[constructionId];
    Supervisor memory s = supervisorMap[c.framingBuild.supervisorID];
    require(s.result1==ExamStatus.No || s.result2==ExamStatus.No || s.result3==ExamStatus.No, "You don't have to do this.");  

    c.framingBuild.usedSteelFrame += usedSteelFrame;
    c.framingBuild.usedCement += usedCement;
    c.framingBuild.isDone = true;

    constructionMap[constructionId] = c;

  } 

  function proceedFinishingBuild(
    uint constructionId,
    uint usedTiles,
    uint usedPipes,
    uint usedGlue
  ) public {


    Construction memory c = constructionMap[constructionId];
    //전단계 확인
    require(c.framingBuild.isDone, "not completed");

    // if FramingBuild의 Supervisor의 모든 평가가 YYY일 때 실행 가능
    Supervisor memory s = supervisorMap[c.framingBuild.supervisorID];
    require(s.result1==ExamStatus.Yes && s.result2==ExamStatus.Yes && s.result3==ExamStatus.Yes, "not accepted");

    c.finishingBuild.usedTiles += usedTiles;
    c.finishingBuild.usedPipes += usedPipes;
    c.finishingBuild.usedGlue += usedGlue;

    //마무리공사 완료
    if((c.finishingBuild.usedTiles>=c.finishingBuild.neededTiles)&&(c.finishingBuild.usedPipes>=c.finishingBuild.neededPipes)&&(c.finishingBuild.usedGlue>=c.finishingBuild.neededGlue)){
        c.finishingBuild.isDone=true;
    }

    constructionMap[constructionId] = c;

  }

  function proceedFinishingBuildAfterReject(
    uint constructionId,
    uint usedTiles,
    uint usedPipes,
    uint usedGlue
  ) public {
    
    Construction memory c = constructionMap[constructionId];
    Supervisor memory s = supervisorMap[c.finishingBuild.supervisorID];
    require(s.result1==ExamStatus.No || s.result2==ExamStatus.No || s.result3==ExamStatus.No, "You don't have to do this.");
    
    c.finishingBuild.usedTiles += usedTiles;
    c.finishingBuild.usedPipes += usedPipes;
    c.finishingBuild.usedGlue += usedGlue;
    c.finishingBuild.isDone= true;

    constructionMap[constructionId] = c;

  }

  function EvaluateExam(
    uint constructionId,
    uint supervisorId,
    ExamStatus result1,
    ExamStatus result2,
    ExamStatus result3
  ) public {

    Construction memory c = constructionMap[constructionId];
    Supervisor memory s = supervisorMap[supervisorId];

    c.evaluationCount += 1;

    //3개의 result 업데이트
    s.result1 = result1;
    s.result2 = result2;
    s.result3 = result3;

    supervisorMap[supervisorId] = s;
  }

  function UpdateRejectReason(
    uint supervisorId,
    string memory reason1,
    string memory reason2,
    string memory reason3
  ) public {

    Supervisor memory s = supervisorMap[supervisorId];
    
    if(s.result1==ExamStatus.No){
      s.rejectReason1= reason1;
    }

     if(s.result2==ExamStatus.No){
      s.rejectReason2= reason2;
    }

     if(s.result3==ExamStatus.No){
      s.rejectReason3= reason3;
    }

    supervisorMap[supervisorId] = s;

  }

  /*
  function finalCalculation(
    uint constructionId
  ) public {

    Construction memory  c = constructionMap[constructionId];

    c.count += c.baseBuild.count + c.framingBuild.count + c.finishingBuild.count;

    c.baseBuild.overShover = c.baseBuild.usedShovelHour - c.baseBuild.neededShovelHour;
    c.baseBuild.overSand = c.baseBuild.usedSand - c.baseBuild.neededSand;

    c.framingBuild.overSteelFrame = c.framingBuild.usedSteelFrame - c.framingBuild.neededSteelFrame;
    c.framingBuild.overCement = c.framingBuild.usedCement - c.framingBuild.neededSteelFrame;

    c.finishingBuild.overTiles = c.finishingBuild.usedTiles - c.finishingBuild.neededTiles;
    c.finishingBuild.overPipes = c.finishingBuild.usedPipes - c.finishingBuild.neededPipes;
    c.finishingBuild.overGlue = c.finishingBuild.usedGlue - c.finishingBuild.neededGlue;

    constructionMap[constructionId] = c;

  }
  */

}