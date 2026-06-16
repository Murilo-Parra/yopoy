import { FiscalRealExecutionPreparationInput, FiscalRealExecutionPreparationResult, FiscalRealExecutionPreparationStatus } from './FiscalRealExecutionPreparationTypes';
import { FiscalRealExecutionPreparationEvaluationService } from './FiscalRealExecutionPreparationEvaluationService';

export class FiscalRealExecutionPreparationDecisionService {
  public static simulateDecision(input: FiscalRealExecutionPreparationInput): FiscalRealExecutionPreparationResult {
    const evaluation = FiscalRealExecutionPreparationEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: evaluation.status === FiscalRealExecutionPreparationStatus.BLOCKED_FOR_REAL_EXECUTION ? FiscalRealExecutionPreparationStatus.BLOCKED_FOR_REAL_EXECUTION : FiscalRealExecutionPreparationStatus.OPERATIONAL_ENVELOPE_READY,
      evaluationExecuted: true,
      preparationSimulated: true,
      operationalEnvelopeGenerated: true,
      go: false,
      noGo: true,
      approvedForExecutionPreparationClosure: true,
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
