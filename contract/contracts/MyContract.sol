pragma solidity ^0.8.13;

import "hardhat/console.sol";
import './ConstructionStruct.sol';
import './SupervisorStruct.sol';


contract MyContract is ConstructionStruct, SupervisorStruct{
  // contract owner
  address private owner;

  event OwnerSet(address indexed oldOwner, address indexed newOwner);

  constructor() {
    owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
  }

  // construction과 supervisor를 담기 위한 map
  mapping (uint => Construction) private constructionMap;
  mapping (uint => Supervisor) private supervisorMap;

  // construction, supervisor ID
  uint private constructionID = 0;
  uint private supervisorID = 1;

  function getNewConstructionID() public returns (uint) {
    return constructionID++;
  }

  function getNewSupervisorID() public returns (uint) {
    return supervisorID++;
  }

  function getConstruction(uint constructionId) public view returns(Construction memory) {
    Construction memory c = constructionMap[constructionId];
    return c;
  }

  function getSupervisor(uint supervisorId) public view returns(Supervisor memory) {
    Supervisor memory s = supervisorMap[supervisorId];
    return s;
  }

  function getSuperviserID(uint constructionId, BuildType buildType) private returns(uint) {
    // supervisor map에서 하나씩 꺼내봐서 cID, bT 와 일치하는 supervisor ID return
    return 0;
  }

  /////////////////////////////////////////////////////
  // create Functions /////////////////////////////////

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
    // 각 시공 과정 객체 생성
    BaseBuild memory newBaseBuild = BaseBuild(0, neededShovelHour, 0, 0, neededSand, 0, false, 0);
    FramingBuild memory newFrameBuild = FramingBuild(0, neededSteelFrame, 0, 0, neededCement, 0, false, 0);
    FinishingBuild memory newFinishBuild = FinishingBuild(0, neededTiles, 0, 0, neededPipes, 0, 0, neededGlue, 0, false, 0);
    ConstructionAssessmentSheet memory newConstructionAssesmentSheet = ConstructionAssessmentSheet(0, 0, 0, 0, 0, 0, 0, 0);

    uint constructionId = getNewConstructionID();

    Construction memory newConstruction = Construction(
      constructionId,
      name,
      0,
      newBaseBuild,
      newFrameBuild,
      newFinishBuild,
      false,
      newConstructionAssesmentSheet
    );

    // construction 데이터 Map에 추가
    constructionMap[constructionId] = newConstruction;
  }

  function createSupervisor(
    uint constructionId,
    BuildType buildType,
    string memory question1,
    string memory question2,
    string memory question3
  ) public {
    Construction memory c = getConstruction(constructionId);

    // if buildType에 따라 각 시공의 isDone이 false면 나가리. true면 supervisor 생성 진행.
    // 시공 다 끝니지도 않았는데 감리 진행 불가하니.
    if (buildType == BuildType.BaseBuild) {
      require(c.baseBuild.isDone, "Not Done Yet");
    } else if (buildType == BuildType.FramingBuild) {
      require(c.framingBuild.isDone, "Not Done Yet");
    } else if (buildType == BuildType.FinishingBuild) {
      require(c.finishingBuild.isDone, "Not Done Yet");
    }

    uint supervisorId = getNewSupervisorID();

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

    if (buildType == BuildType.BaseBuild) {
      c.baseBuild.supervisorID = supervisorId;
    } else if (buildType == BuildType.FramingBuild) {
      c.framingBuild.supervisorID = supervisorId;
    } else if (buildType == BuildType.FinishingBuild) {
      c.finishingBuild.supervisorID = supervisorId;
    }

    supervisorMap[supervisorId] = newSupervisor;
    constructionMap[constructionId] = c;
  }


  /////////////////////////////////////////////////////
  // proceedBuild Functions ///////////////////////////

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

    constructionMap[constructionId] = c;

  }

  /////////////////////////////////////////////////////
  // Evaluate Functions ///////////////////////////////

  function EvaluateExam(
    uint constructionId,
    uint supervisorId,
    ExamStatus result1,
    ExamStatus result2,
    ExamStatus result3
  ) public {

    Construction memory c = constructionMap[constructionId];
    Supervisor memory s = supervisorMap[supervisorId];

    c.totalEvaluationCount += 1;

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
    } else if(s.result2==ExamStatus.No){
      s.rejectReason2= reason2;
    } else if(s.result3==ExamStatus.No){
      s.rejectReason3= reason3;
    }

    supervisorMap[supervisorId] = s;

  }

  function CreateConstructionAssessmentSheet(
    uint constructionId
  ) public {

    Construction memory  c = constructionMap[constructionId];

    uint overevaluationCount = c.totalEvaluationCount -3;

    c.baseBuild.overShover = c.baseBuild.usedShovelHour - c.baseBuild.neededShovelHour;
    c.baseBuild.overSand = c.baseBuild.usedSand - c.baseBuild.neededSand;

    c.framingBuild.overSteelFrame = c.framingBuild.usedSteelFrame - c.framingBuild.neededSteelFrame;
    c.framingBuild.overCement = c.framingBuild.usedCement - c.framingBuild.neededSteelFrame;

    c.finishingBuild.overTiles = c.finishingBuild.usedTiles - c.finishingBuild.neededTiles;
    c.finishingBuild.overPipes = c.finishingBuild.usedPipes - c.finishingBuild.neededPipes;
    c.finishingBuild.overGlue = c.finishingBuild.usedGlue - c.finishingBuild.neededGlue;

    if (c.isAllDone == true){
      ConstructionAssessmentSheet memory constructionAssesmentSheet = ConstructionAssessmentSheet(
        overevaluationCount,
        c.baseBuild.overShover, c.baseBuild.overSand,
        c.framingBuild.overSteelFrame, c.framingBuild.overCement,
        c.finishingBuild.overTiles, c.finishingBuild.overPipes, c.finishingBuild.overGlue
      );
      c.constructionAssesmentSheet = constructionAssesmentSheet;
      
     
    }

    

    constructionMap[constructionId] = c;


  }

  function ConstructionCompleted(
    uint constructionId,
    uint supervisorId
  ) public {
    Construction memory c = constructionMap[constructionId];
    Supervisor memory s = supervisorMap[c.finishingBuild.supervisorID];
    if (c.finishingBuild.isDone && s.result1 == ExamStatus.Yes && s.result2==ExamStatus.Yes && s.result3==ExamStatus.Yes){
      c.isAllDone = true;
    }
    
    constructionMap[constructionId] = c;
    supervisorMap[supervisorId] = s;

  }
  
  

}