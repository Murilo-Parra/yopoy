import { FiscalRealApprovalMockSignatureInput, FiscalRealApprovalMockSignatureResult, FiscalRealApprovalMockSignatureStatus } from './FiscalRealApprovalMockSignatureTypes';
import { FiscalRealApprovalSignatureEvaluationService } from './FiscalRealApprovalSignatureEvaluationService';

export class FiscalRealApprovalSignatureDecisionService {
  public static simulateDecision(input: FiscalRealApprovalMockSignatureInput): FiscalRealApprovalMockSignatureResult {
    const evaluation = FiscalRealApprovalSignatureEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalRealApprovalMockSignatureStatus.MOCK_SIGNATURE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
