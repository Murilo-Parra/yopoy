import { FiscalRealApprovalMockSignatureInput, FiscalRealApprovalMockSignatureResult } from './FiscalRealApprovalMockSignatureTypes';
import { FiscalRealApprovalSignaturePolicy } from './FiscalRealApprovalSignaturePolicy';
import { FiscalRealApprovalSignatureBlockerRegister } from './FiscalRealApprovalSignatureBlockerRegister';
import { FiscalRealApprovalSignatureRiskRegister } from './FiscalRealApprovalSignatureRiskRegister';
import { FiscalRealApprovalMockSignatureEnvelope } from './FiscalRealApprovalMockSignatureEnvelope';
import { FiscalRealApprovalMockCertificateProvider } from './FiscalRealApprovalMockCertificateProvider';
import { FiscalRealApprovalMockSigner } from './FiscalRealApprovalMockSigner';
import { FiscalRealApprovalExternalAuthorizationSimulator } from './FiscalRealApprovalExternalAuthorizationSimulator';

export class FiscalRealApprovalSignatureEvaluationService {
  public static evaluate(input: FiscalRealApprovalMockSignatureInput): FiscalRealApprovalMockSignatureResult {
    const policyResult = FiscalRealApprovalSignaturePolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalRealApprovalMockSignatureResult;
    }

    const envelope = FiscalRealApprovalMockSignatureEnvelope.generateEnvelope();
    const cert = FiscalRealApprovalMockCertificateProvider.getMockCertificate();
    const signer = FiscalRealApprovalMockSigner.simulateSignature();
    const authSim = FiscalRealApprovalExternalAuthorizationSimulator.simulateAuthorization();

    const baseResult = FiscalRealApprovalSignaturePolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalRealApprovalSignatureBlockerRegister.getBlockers(),
      warnings: FiscalRealApprovalSignatureRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
