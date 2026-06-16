import { FiscalRealProvisioningSecurityInput, FiscalRealProvisioningSecurityResult } from './FiscalRealProvisioningSecurityTypes';
import { FiscalRealSecurityEvaluationService } from './FiscalRealSecurityEvaluationService';
import { FiscalRealSecurityWorkflowService } from './FiscalRealSecurityWorkflowService';

export class FiscalRealSecurityDecisionService {
  public static simulateDecision(input: FiscalRealProvisioningSecurityInput): FiscalRealProvisioningSecurityResult {
    const evaluation = FiscalRealSecurityEvaluationService.evaluate(input);
    
    // The evaluation service already blocks execution and sets needed flags via the policy enforcement.
    const simulation = FiscalRealSecurityWorkflowService.simulateWorkflow(input.approvalStage);
    
    return {
      ...evaluation,
      status: simulation.currentStage === 'BLOCKED_FOR_REAL_APPROVAL' ? 'BLOCKED_FOR_REAL_APPROVAL' : evaluation.status,
      evaluationExecuted: true,
      approvalSimulated: true,
      go: false,
      noGo: true,
      approvedForSecurityReviewClosure: true,
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
