import { FiscalRealAuthorizationRequestInput, FiscalRealAuthorizationResult, FiscalRealAuthorizationStatus } from './FiscalRealAuthorizationRequestTypes';
import { FiscalRealAuthorizationEvaluationService } from './FiscalRealAuthorizationEvaluationService';

export class FiscalRealAuthorizationDecisionService {
  public static simulateDecision(input: FiscalRealAuthorizationRequestInput): FiscalRealAuthorizationResult {
    const evaluation = FiscalRealAuthorizationEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: evaluation.status === FiscalRealAuthorizationStatus.BLOCKED_FOR_REAL_AUTHORIZATION ? FiscalRealAuthorizationStatus.BLOCKED_FOR_REAL_AUTHORIZATION : FiscalRealAuthorizationStatus.NON_EXECUTABLE_APPROVAL_ENVELOPE_READY,
      intakeAccepted: true,
      requestValidated: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      nonExecutableEnvelopeGenerated: true,
      go: false,
      noGo: true,
      approvedForAuthorizationRequestIntake: true,
      approvedForNonExecutableEnvelope: true,
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
