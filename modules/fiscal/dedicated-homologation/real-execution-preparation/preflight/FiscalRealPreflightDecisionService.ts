import { FiscalRealPreflightInput, FiscalRealPreflightResult, FiscalRealPreflightStatus } from './FiscalRealPreflightReviewTypes';
import { FiscalRealPreflightEvaluationService } from './FiscalRealPreflightEvaluationService';

export class FiscalRealPreflightDecisionService {
  public static simulateDecision(input: FiscalRealPreflightInput): FiscalRealPreflightResult {
    const evaluation = FiscalRealPreflightEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: evaluation.status === FiscalRealPreflightStatus.BLOCKED_FOR_REAL_EXECUTION ? FiscalRealPreflightStatus.BLOCKED_FOR_REAL_EXECUTION : FiscalRealPreflightStatus.READINESS_EVIDENCE_READY,
      evaluationExecuted: true,
      preflightReviewed: true,
      evidencePackageGenerated: true,
      decisionSimulated: true,
      go: false,
      noGo: true,
      approvedForPreflightClosure: true,
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
