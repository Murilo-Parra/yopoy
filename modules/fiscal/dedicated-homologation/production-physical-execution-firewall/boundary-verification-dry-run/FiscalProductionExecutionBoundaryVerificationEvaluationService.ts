import { FiscalProductionExecutionBoundaryVerificationInput } from './FiscalProductionExecutionBoundaryVerificationTypes';
import { FiscalProductionExecutionBoundaryVerificationValidator } from './FiscalProductionExecutionBoundaryVerificationValidator';
import { FiscalProductionExecutionBoundaryVerificationPolicy } from './FiscalProductionExecutionBoundaryVerificationPolicy';
import { FiscalProductionPhysicalBoundaryVerificationPlan } from './FiscalProductionPhysicalBoundaryVerificationPlan';
import { FiscalProductionRuntimeInterlockDriftSimulation } from './FiscalProductionRuntimeInterlockDriftSimulation';
import { FiscalProductionQueueWorkerDriftMatrix } from './FiscalProductionQueueWorkerDriftMatrix';
import { FiscalProductionDatabaseTransactionDriftMatrix } from './FiscalProductionDatabaseTransactionDriftMatrix';
import { FiscalProductionExternalIntegrationDriftMatrix } from './FiscalProductionExternalIntegrationDriftMatrix';
import { FiscalProductionTrafficRouteDriftMatrix } from './FiscalProductionTrafficRouteDriftMatrix';
import { FiscalProductionAuthorizationGateDriftMatrix } from './FiscalProductionAuthorizationGateDriftMatrix';
import { FiscalProductionExecutionBoundaryComplianceMatrix } from './FiscalProductionExecutionBoundaryComplianceMatrix';
import { FiscalProductionNoExecutableDriftEvidence } from './FiscalProductionNoExecutableDriftEvidence';
import { FiscalProductionNoPhysicalBypassEvidence } from './FiscalProductionNoPhysicalBypassEvidence';
import { FiscalProductionExecutionBoundaryVerificationDependencyMatrix } from './FiscalProductionExecutionBoundaryVerificationDependencyMatrix';
import { FiscalProductionExecutionBoundaryVerificationBlockerRegister } from './FiscalProductionExecutionBoundaryVerificationBlockerRegister';
import { FiscalProductionExecutionBoundaryVerificationRiskRegister } from './FiscalProductionExecutionBoundaryVerificationRiskRegister';

export class FiscalProductionExecutionBoundaryVerificationEvaluationService {
  public static evaluate(input: FiscalProductionExecutionBoundaryVerificationInput) {
    FiscalProductionExecutionBoundaryVerificationValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionExecutionBoundaryVerificationPolicy.getPolicyMessage(),
      physicalBoundaryVerificationPlan: FiscalProductionPhysicalBoundaryVerificationPlan.getPlan(),
      runtimeInterlockDriftSimulation: FiscalProductionRuntimeInterlockDriftSimulation.simulate(),
      queueWorkerDriftMatrix: FiscalProductionQueueWorkerDriftMatrix.getMatrix(),
      databaseTransactionDriftMatrix: FiscalProductionDatabaseTransactionDriftMatrix.getMatrix(),
      externalIntegrationDriftMatrix: FiscalProductionExternalIntegrationDriftMatrix.getMatrix(),
      trafficRouteDriftMatrix: FiscalProductionTrafficRouteDriftMatrix.getMatrix(),
      authorizationGateDriftMatrix: FiscalProductionAuthorizationGateDriftMatrix.getMatrix(),
      executionBoundaryComplianceMatrix: FiscalProductionExecutionBoundaryComplianceMatrix.getMatrix(),
      noExecutableDriftEvidence: FiscalProductionNoExecutableDriftEvidence.getEvidence(),
      noPhysicalBypassEvidence: FiscalProductionNoPhysicalBypassEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionExecutionBoundaryVerificationDependencyMatrix.getMatrix(),
      blockers: FiscalProductionExecutionBoundaryVerificationBlockerRegister.getBlockers(),
      risks: FiscalProductionExecutionBoundaryVerificationRiskRegister.getRisks(),
    };
  }
}
