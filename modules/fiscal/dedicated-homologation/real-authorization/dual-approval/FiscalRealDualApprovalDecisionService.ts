import { FiscalRealDualApprovalInput, FiscalRealDualApprovalResult, FiscalRealDualApprovalStatus } from './FiscalRealDualApprovalTypes';
import { FiscalRealDualApprovalEvaluationService } from './FiscalRealDualApprovalEvaluationService';

export class FiscalRealDualApprovalDecisionService {
  public static simulateDecision(input: FiscalRealDualApprovalInput): FiscalRealDualApprovalResult {
    const evaluation = FiscalRealDualApprovalEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: evaluation.status === FiscalRealDualApprovalStatus.BLOCKED_FOR_REAL_APPROVAL ? FiscalRealDualApprovalStatus.BLOCKED_FOR_REAL_APPROVAL : FiscalRealDualApprovalStatus.SOD_REVIEW_READY,
      validationExecuted: true,
      simulationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      sodReviewed: true,
      go: false,
      noGo: true,
      dualApprovalSimulated: true,
      dualApprovalCompleted: false,
      realApprovalGranted: false,
      realAuthorizationGranted: false,
      approvedForDualApprovalSimulationClosure: true,
      approvedForRealDualApprovalCompletion: false,
      approvedForRealAuthorizationGrant: false,
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
