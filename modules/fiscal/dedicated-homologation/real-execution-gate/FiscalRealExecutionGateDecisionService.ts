import { FiscalRealExecutionGateInput, FiscalRealExecutionGateResult, FiscalRealExecutionGateStatus } from './FiscalRealExecutionGateTypes';
import { FiscalRealExecutionGateEvaluationService } from './FiscalRealExecutionGateEvaluationService';

export class FiscalRealExecutionGateDecisionService {
  public static simulateDecision(input: FiscalRealExecutionGateInput): FiscalRealExecutionGateResult {
    const evaluation = FiscalRealExecutionGateEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: evaluation.status === FiscalRealExecutionGateStatus.BLOCKED_FOR_GATE_UNLOCK ? FiscalRealExecutionGateStatus.BLOCKED_FOR_GATE_UNLOCK : FiscalRealExecutionGateStatus.EXECUTION_GATE_LOCKED,
      unlockSimulated: true,
      go: false,
      noGo: true,
      approvedForExecutionGateClosure: true,
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
