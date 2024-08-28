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

}