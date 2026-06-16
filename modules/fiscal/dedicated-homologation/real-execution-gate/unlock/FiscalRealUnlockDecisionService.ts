import { FiscalRealUnlockInput, FiscalRealUnlockResult, FiscalRealUnlockStatus } from './FiscalRealUnlockSimulationTypes';
import { FiscalRealUnlockEvaluationService } from './FiscalRealUnlockEvaluationService';

export class FiscalRealUnlockDecisionService {
  public static simulateDecision(input: FiscalRealUnlockInput): FiscalRealUnlockResult {
    const evaluation = FiscalRealUnlockEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: evaluation.status === FiscalRealUnlockStatus.BLOCKED_FOR_REAL_UNLOCK ? FiscalRealUnlockStatus.BLOCKED_FOR_REAL_UNLOCK : FiscalRealUnlockStatus.UNLOCK_SIMULATION_READY,
      evaluationExecuted: true,
      dualApprovalSimulated: true,
      go: false,
      noGo: true,
      approvedForUnlockSimulationClosure: true,
      approvedForGateUnlock: false,
      approvedForRealExecutionAuthorization: false,
      approvedForRealChangeWindow: false,
      approvedForExecutionStart: false,
      approvedForIacApply: false,
      approvedForInfrastructureProvisioning: false,
      approvedForEnvironmentActivation: false,
      approvedForRealHomologation: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false
    };
  }
}
