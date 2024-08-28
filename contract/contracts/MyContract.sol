pragma solidity ^0.8.13;

contract MyContract {


  struct Construction {
    string id;
    BaseBuild baseBuild;
    FramingBuild framingBuild;
    FinishingBuild finishingBuild;
  }

  struct BaseBuild {
    uint process1;
    uint process2;
    uint process3;
  }

  struct FramingBuild {
    uint process1;
    uint process2;
    uint process3;
  }

  struct FinishingBuild {
    uint process1;
    uint process2;
    uint process3;
  }


  struct Supervisor {
    string id;
    string constructionId;
    string buildId;
    bool result1;
    string question1;
    string rejectReason1;
    bool result2;
    string question2;
    string rejectReason2;
    bool result3;
    string question3;
    string rejectReason3;
  }

}