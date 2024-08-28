pragma solidity ^0.8.13;

import "hardhat/console.sol";

contract MyContract {

  address private owner;

  event OwnerSet(address indexed oldOwner, address indexed newOwner);

  constructor() {
        console.log("Owner contract deployed by:", msg.sender);
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

  struct Construction {
    uint id;
    string name;
    BaseBuild baseBuild;
    FramingBuild framingBuild;
    FinishingBuild finishingBuild;
  }

  // 기초 공사
  struct BaseBuild {
    uint usedShovelHour;
    uint neededShovelHour;
    uint usedSand;
    uint neededSand;
    bool isDone;
  }

  // 골조 공사
  struct FramingBuild {
    uint usedSteelFrame;
    uint neededSteelFrame;
    uint usedCement;
    uint neededCement;
    bool isDone;
  }

  // 마무리 공사
  struct FinishingBuild {
    uint usedTiles;
    uint neededTiles;
    uint usedPipes;
    uint neededPipes;
    uint usedGlue;
    uint neededGlue;
    bool isDone;
  }

  struct Supervisor {
    uint id;
    uint constructionId;
    BuildType buildType;
    string question1;
    ExamStatus result1;
    string rejectReason1;
    string question2;
    ExamStatus result2;
    string rejectReason2;
    string question3;
    ExamStatus result3;
    string rejectReason3;
  }

  enum BuildType {
    BaseBuild,
    FramingBuild,
    FinishingBuild
  }

  enum ExamStatus {
    Before,
    Yes,
    No
  }


  mapping (uint => Construction) private constructionMap;
  mapping (uint => Supervisor) private supervisorMap;

  uint private constructionId = 0;
  uint private supervisorId = 0;

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
    BaseBuild memory newBaseBuild = BaseBuild(0, neededShovelHour, 0, neededSand, false);
    FramingBuild memory newFrameBuild = FramingBuild(0, neededSteelFrame, 0, neededCement, false);
    FinishingBuild memory newFinishBuild = FinishingBuild(0, neededTiles, 0, neededPipes, 0, neededGlue, false);

    uint constructionId = getConstructionId();

    Construction memory newConstruction = Construction(
      constructionId,
      name,
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

    supervisorMap[supervisorId] = newSupervisor;
  }

  function getConstruction(uint constructionId) public view returns(Construction memory) {
    Construction memory c = constructionMap[constructionId];

    return c;
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

  function proceedFramingBuild(
    uint constructionId,
    uint usedSteelFrame,
    uint usedCement
  ) public {
    Construction memory c = constructionMap[constructionId];
    c.framingBuild.usedSteelFrame += usedSteelFrame;
    c.framingBuild.usedCement += usedCement;

    // if BaseBuild가 isDone이 true일 때 실행 가능
    if (!c.baseBuild.isDone) {
      return ;
    }

    // if used랑 needed랑 같아지거나 used가 더 커지면 isDone true로 해준다.
    if (c.framingBuild.usedSteelFrame >= c.framingBuild.neededSteelFrame &&
     c.framingBuild.usedCement >= c.framingBuild.neededCement) {
      c.framingBuild.isDone = true;
    }

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

    c.finishingBuild.usedTiles += usedTiles;
    c.finishingBuild.usedPipes += usedPipes;
    c.finishingBuild.usedGlue += usedGlue;

    //마무리공사 완료
    if((c.finishingBuild.usedTiles>=c.finishingBuild.neededTiles)&&(c.finishingBuild.usedPipes>=c.finishingBuild.neededPipes)&&(c.finishingBuild.usedGlue>=c.finishingBuild.neededGlue)){
        c.finishingBuild.isDone=true;
    }

    constructionMap[constructionId] = c;

  }

  function EvaluateExam(
    uint supervisorId,
    bool result1,
    bool result2,
    bool result3
  ) public {
      
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



}