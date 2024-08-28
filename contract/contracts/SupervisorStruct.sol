pragma solidity ^0.8.13;

contract SupervisorStruct {
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