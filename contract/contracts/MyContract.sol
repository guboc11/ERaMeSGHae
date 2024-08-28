pragma solidity ^0.8.13;

contract MyContract {
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
  }

  // 골조 공사
  struct FramingBuild {
    uint usedSteelFrame;
    uint neededSteelFrame;
    uint usedCement;
    uint neededCement;
  }

  // 마무리 공사
  struct FinishingBuild {
    uint usedTiles;
    uint neededTiles;
    uint usedPipes;
    uint neededPipes;
    uint usedGlue;
    uint neededGlue;
  }

  struct Supervisor {
    uint id;
    uint constructionId;
    string buildName;
    string question1;
    bool result1;
    string rejectReason1;
    string question2;
    bool result2;
    string rejectReason2;
    string question3;
    bool result3;
    string rejectReason3;
  }

  mapping (string => Construction) private constructionMap;
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
    BaseBuild memory newBaseBuild = BaseBuild(0, neededShovelHour, 0, neededSand);
    FramingBuild memory newFrameBuild = FramingBuild(0, neededSteelFrame, 0, neededCement);
    FinishingBuild memory newFinishBuild = FinishingBuild(0, neededTiles, 0, neededPipes, 0, neededGlue);

    uint constructionId = getConstructionId();

    Construction memory newConstruction = Construction(
      constructionId,
      name,
      newBaseBuild,
      newFrameBuild,
      newFinishBuild
    );

    constructionMap[newConstruction.name] = newConstruction;
  }

  function createSupervisor(
    uint constructionId,
    string memory buildName,
    string memory question1,
    string memory question2,
    string memory question3
  ) public {
    uint supervisorId = getSupervisorId();

    Supervisor memory newSupervisor = Supervisor(
      supervisorId,
      constructionId,
      buildName,
      question1,
      false,
      "",
      question2,
      false,
      "",
      question3,
      false,
      ""
    );

    supervisorMap[supervisorId] = newSupervisor;
  }

  function getConstruction(string memory constructionName) public view returns(Construction memory) {
    Construction memory c = constructionMap[constructionName];

    return c;
  }



}