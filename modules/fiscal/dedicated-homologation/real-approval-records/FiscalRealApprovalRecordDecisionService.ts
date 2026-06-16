import { FiscalRealApprovalRecordInput, FiscalRealApprovalRecordResult, FiscalRealApprovalRecordStatus } from './FiscalRealApprovalRecordTypes';
import { FiscalRealApprovalRecordEvaluationService } from './FiscalRealApprovalRecordEvaluationService';

export class FiscalRealApprovalRecordDecisionService {
  public static simulateDecision(input: FiscalRealApprovalRecordInput): FiscalRealApprovalRecordResult {
    const evaluation = FiscalRealApprovalRecordEvaluationService.evaluate(input);
    
    if (evaluation.success === false) return evaluation;

    return {
      ...evaluation,
      status: FiscalRealApprovalRecordStatus.NON_EXECUTABLE_SIGNATURE_ENVELOPE_READY,
      blueprintGenerated: true,
      schemaPlanGenerated: true,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      nonExecutableSignatureEnvelopeGenerated: true,
      go: false,
      noGo: true,
      approvalRecordBlueprintOnly: true,
      approvalRecordPersisted: false,
      approvalRecordSigned: false,
      realApprovalRecordCreated: false,
      realAuthorizationGranted: false,
      approvedForApprovalRecordBlueprintClosure: true,
      approvedForNonExecutableSignatureEnvelope: true,
      approvedForRealApprovalRecordCreation: false,
      approvedForRealApprovalRecordPersistence: false,
      approvedForRealApprovalRecordSignature: false,
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
