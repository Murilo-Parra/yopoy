import { FiscalRealCommandManifestInput, FiscalRealCommandManifestResult, FiscalRealCommandManifestStatus } from './FiscalRealCommandManifestTypes';
import { FiscalRealCommandManifestEvaluationService } from './FiscalRealCommandManifestEvaluationService';

export class FiscalRealCommandManifestDecisionService {
  public static simulateDecision(input: FiscalRealCommandManifestInput): FiscalRealCommandManifestResult {
    const evaluation = FiscalRealCommandManifestEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: evaluation.status === FiscalRealCommandManifestStatus.BLOCKED_FOR_REAL_EXECUTION ? FiscalRealCommandManifestStatus.BLOCKED_FOR_REAL_EXECUTION : FiscalRealCommandManifestStatus.DRY_RUN_MANIFEST_READY,
      evaluationExecuted: true,
      manifestGenerated: true,
      decisionSimulated: true,
      go: false,
      noGo: true,
      approvedForCommandManifestClosure: true,
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
