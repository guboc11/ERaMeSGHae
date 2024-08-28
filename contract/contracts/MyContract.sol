// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BuildingSupervision {
    
    struct Building {
        string buildingID;
        bool process1;
        bool process2;
        bool process3;
    }
    
    struct Supervision {
        string supervisionID;
        string buildingID;
        string constructionID;
        bool checklist1;
        string comment1;
        bool checklist2;
        string comment2;
        bool checklist3;
        string comment3;
    }
    
    // 상태 변수로 Building 구조체 배열 선언
    Building[] public buildings;

    // Mapping to store Supervision records
    mapping(string => Supervision) public supervisionRecords;

    // Building 객체를 생성하고 상태 변수에 저장하는 함수
    function setBuilding(
        string memory _buildingID,
        bool _process1,
        bool _process2,
        bool _process3
    ) public returns (Building memory) {
        Building memory newBuilding = Building(_buildingID, _process1, _process2, _process3);
        buildings.push(newBuilding); // 상태 변수에 저장
        return newBuilding;
    }

    // setBuilding에서 생성한 Building 객체를 사용하여 Supervision을 설정하는 함수
    function setSupervision(uint index) public returns (Supervision memory) {
        // 인덱스가 올바른지 확인
        require(index < buildings.length, "Invalid building index.");

        Building memory _building = buildings[index];

        // Building 객체가 모든 프로세스를 완료했는지 확인
        require(checkComplete(_building), "Building processes are not complete.");

        // Supervision ID 및 Construction ID 생성
        string memory supervisionID = string(abi.encodePacked(_building.buildingID, "_supervision"));
        string memory constructionID = string(abi.encodePacked(_building.buildingID, "_construction"));

        // Supervision 구조체 생성 및 저장
        Supervision memory newSupervision = Supervision({
            supervisionID: supervisionID,
            buildingID: _building.buildingID,
            constructionID: constructionID,
            checklist1: true,
            comment1: "Process 1 completed.",
            checklist2: true,
            comment2: "Process 2 completed.",
            checklist3: true,
            comment3: "Process 3 completed."
        });

        supervisionRecords[supervisionID] = newSupervision; // 매핑에 저장

        return newSupervision;
    }

    function checkComplete(Building memory _building) public pure returns (bool) {
        return _building.process1 && _building.process2 && _building.process3;
    }

    // 특정 인덱스의 Building 객체를 조회하는 view 함수
    function getBuilding(uint index) public view returns (string memory, bool, bool, bool) {
        require(index < buildings.length, "Invalid building index."); // 인덱스가 배열 범위 내에 있는지 확인
        Building memory building = buildings[index];
        return (building.buildingID, building.process1, building.process2, building.process3);
    }
}
