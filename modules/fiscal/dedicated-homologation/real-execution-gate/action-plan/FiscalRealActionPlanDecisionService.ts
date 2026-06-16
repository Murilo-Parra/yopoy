import { FiscalRealAuthorizationPayloadInput, FiscalRealActionPlanResult, FiscalRealActionPlanStatus } from './FiscalRealExecutionActionPlanTypes';
import { FiscalRealActionPlanEvaluationService } from './FiscalRealActionPlanEvaluationService';

export class FiscalRealActionPlanDecisionService {
  public static simulateDecision(input: FiscalRealAuthorizationPayloadInput): FiscalRealActionPlanResult {
    const evaluation = FiscalRealActionPlanEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: evaluation.status === FiscalRealActionPlanStatus.BLOCKED_FOR_REAL_EXECUTION ? FiscalRealActionPlanStatus.BLOCKED_FOR_REAL_EXECUTION : FiscalRealActionPlanStatus.LOCKED_ACTION_PLAN_READY,
      evaluationExecuted: true,
      decisionSimulated: true,
      authorizationPayloadBuilt: true,
      lockedActionPlanGenerated: true,
      go: false,
      noGo: true,
      approvedForActionPlanClosure: true,
      approvedForGateUnlock: false,
      approvedForRealExecutionAuthorization: false,
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
