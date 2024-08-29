pragma solidity ^0.8.13;

contract ConstructionStruct {

  struct Constructor {
    uint id;
    uint criteria;
    bool canProposal;
    uint[] constructions;
  }

  struct Construction {
    uint id;
    uint constructorId;
    string name;
    uint totalEvaluationCount;
    BaseBuild baseBuild;
    FramingBuild framingBuild;
    FinishingBuild finishingBuild;
    bool isAllDone;
    ConstructionAssessmentSheet constructionAssesmentSheet;
  }
  
  // 기초 공사
  struct BaseBuild {
    uint usedShovelHour;
    uint neededShovelHour;
    uint overShover;
    uint usedSand;
    uint neededSand;
    uint overSand;
    bool isDone;
    uint supervisorID;
  }

  // 골조 공사
  struct FramingBuild {
    uint usedSteelFrame;
    uint neededSteelFrame;
    uint overSteelFrame;
    uint usedCement;
    uint neededCement;
    uint overCement;
    bool isDone;
    uint supervisorID;
  }

  // 마무리 공사
  struct FinishingBuild {
    uint usedTiles;
    uint neededTiles;
    uint overTiles;
    uint usedPipes;
    uint neededPipes;
    uint overPipes;
    uint usedGlue;
    uint neededGlue;
    uint overGlue;
    bool isDone;
    uint supervisorID;
  }

  struct ConstructionAssessmentSheet {
    uint overevaluationCount;
    uint overShover;
    uint overSand;
    uint overSteelFrame;
    uint overCement;
    uint overTiles;
    uint overPipes;
    uint overGlue;
  }
}