pragma solidity ^0.8.13;

contract MyStruct {
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
    uint supervisorID;
  }

  // 골조 공사
  struct FramingBuild {
    uint usedSteelFrame;
    uint neededSteelFrame;
    uint usedCement;
    uint neededCement;
    bool isDone;
    uint supervisorID;
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
    uint supervisorID;
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


}