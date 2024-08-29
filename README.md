# MyContract Project

`MyContract`는 Solidity로 작성된 스마트 계약으로, 건설 프로젝트의 여러 단계(기초 공사, 골조 공사, 마감 공사)에 대한 시공 및 감리 절차를 관리하고 평가하는 기능을 제공합니다. 각각의 단계에 대해 필요한 자원 관리와 평가 기준을 설정하고, 모든 단계가 완료되면 최종 평가서를 생성할 수 있습니다.

## 프로젝트 기능

이 스마트 계약은 건설 프로젝트의 시공 및 감리를 관리하는 다양한 기능을 제공합니다. 아래는 각 함수의 상세 설명입니다.

### 함수 설명

#### 1. `getNewConstructionID`

- **인자**: 없음
- **기능**: 새로운 시공 ID를 생성하고 반환합니다. 시공 ID는 호출될 때마다 증가합니다.

#### 2. `getNewSupervisorID`

- **인자**: 없음
- **기능**: 새로운 감리 ID를 생성하고 반환합니다. 감리 ID는 호출될 때마다 증가합니다.

#### 3. `getConstruction`

- **인자**: `uint constructionId`
- **기능**: 특정 시공 ID에 해당하는 `Construction` 구조체를 반환합니다.

#### 4. `getSupervisor`

- **인자**: `uint supervisorId`
- **기능**: 특정 감리 ID에 해당하는 `Supervisor` 구조체를 반환합니다.

#### 5. `getSuperviserID`

- **인자**: `uint constructionId`, `BuildType buildType`
- **기능**: 특정 시공 ID와 건축 유형에 맞는 감리 ID를 반환합니다. 

### Create Functions

#### 6. `createConstructor`

- **인자**: `uint _id`
- **기능**: 새로운 `Constructor` 구조체를 생성하고 저장합니다. 

#### 7. `createConstruction`

- **인자**:
  - `uint constructorId`
  - `uint neededShovelHour`
  - `uint neededSand`
  - `uint neededSteelFrame`
  - `uint neededCement`
  - `uint neededTiles`
  - `uint neededPipes`
  - `uint neededGlue`
- **기능**: 새로운 시공을 생성합니다. 각 시공 과정(기초 공사, 골조 공사, 마감 공사)을 위한 필요한 자원을 설정하고, 이를 `constructionMap`에 저장합니다.

#### 8. `createSupervisor`

- **인자**:
  - `uint constructionId`
  - `BuildType buildType`
  - `string memory question1`
  - `string memory question2`
  - `string memory question3`
- **기능**: 시공 단계가 완료된 후 해당 단계에 대한 감리를 생성합니다. 각 시공 단계가 완료되지 않은 경우 감리를 생성할 수 없습니다.

### Proceed Build Functions

#### 9. `proceedBaseBuild`

- **인자**:
  - `uint constructionId`
  - `uint usedShovelHour`
  - `uint usedSand`
- **기능**: 기초 공사를 진행하며, 사용된 자원(삽질 시간과 모래)을 업데이트합니다. 필요한 자원이 충족되면 공사가 완료로 표시됩니다.

#### 10. `proceedBaseBuildAfterReject`

- **인자**:
  - `uint constructionId`
  - `uint usedShovelHour`
  - `uint usedSand`
- **기능**: 기초 공사가 감리에서 거부된 후 재진행합니다. 거부된 경우에만 자원을 업데이트할 수 있습니다.

#### 11. `proceedFramingBuild`

- **인자**:
  - `uint constructionId`
  - `uint usedSteelFrame`
  - `uint usedCement`
- **기능**: 골조 공사를 진행합니다. 기초 공사가 완료되고, 감리에서 승인을 받은 경우에만 진행할 수 있습니다.

#### 12. `proceedFramingBuildAfterReject`

- **인자**:
  - `uint constructionId`
  - `uint usedSteelFrame`
  - `uint usedCement`
- **기능**: 골조 공사가 감리에서 거부된 후 재진행합니다. 거부된 경우에만 자원을 업데이트할 수 있습니다.

#### 13. `proceedFinishingBuild`

- **인자**:
  - `uint constructionId`
  - `uint usedTiles`
  - `uint usedPipes`
  - `uint usedGlue`
- **기능**: 마감 공사를 진행합니다. 골조 공사가 완료되고, 감리에서 승인을 받은 경우에만 진행할 수 있습니다.

#### 14. `proceedFinishingBuildAfterReject`

- **인자**:
  - `uint constructionId`
  - `uint usedTiles`
  - `uint usedPipes`
  - `uint usedGlue`
- **기능**: 마감 공사가 감리에서 거부된 후 재진행합니다. 거부된 경우에만 자원을 업데이트할 수 있습니다.

### Evaluate Functions

#### 15. `EvaluateExam`

- **인자**:
  - `uint constructionId`
  - `uint supervisorId`
  - `ExamStatus result1`
  - `ExamStatus result2`
  - `ExamStatus result3`
- **기능**: 감리 평가를 업데이트합니다. 각 평가 항목의 상태를 변경하고, 총 감리 횟수를 증가시킵니다.

#### 16. `UpdateRejectReason`

- **인자**:
  - `uint supervisorId`
  - `string memory reason1`
  - `string memory reason2`
  - `string memory reason3`
- **기능**: 감리에서 거부된 항목에 대한 이유를 업데이트합니다.

#### 17. `CreateConstructionAssessmentSheet`

- **인자**: `uint constructionId`
- **기능**: 모든 시공 단계가 완료되면 최종 평가서를 생성합니다. 각 시공 단계에서 초과된 자원 양을 계산하고 평가서에 반영합니다.

#### 18. `ConstructionCompleted`

- **인자**:
  - `uint constructionId`
  - `uint supervisorId`
- **기능**: 모든 시공 단계가 완료되고, 감리에서 승인을 받은 경우 건축을 완료로 표시합니다.

#### 19. `beforeBid`

- **인자**: `uint constructorId`
- **기능**: 제안 가능 여부를 평가합니다. 기준치 이상일 경우 제안이 가능하도록 설정합니다.

이 스마트 계약은 복잡한 건설 프로젝트의 관리와 평가를 효과적으로 수행할 수 있도록 다양한 기능을 제공합니다. 각 함수는 특정한 건설 또는 감리 단계의 진행 상황을 관리하거나 평가 결과를 처리합니다.
