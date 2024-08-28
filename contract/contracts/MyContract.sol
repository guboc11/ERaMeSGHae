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
    string ConstId;
    string BuildId;
    bool Examination1;
    string ExamQuestion1;
    string NoReason1;
    bool Examination2;
    string ExamQuestion2;
    string NoReason2;
    bool Examination3;
    string ExamQuestion3;
    string NoReason3;
  }

}