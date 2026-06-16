import { FiscalHomologationMockExecutionInput, FiscalHomologationMockExecutionResult, FiscalHomologationMockStatus } from './FiscalHomologationMockTypes';
import { FiscalHomologationMockPayloadValidator } from './FiscalHomologationMockPayloadValidator';
import { FiscalHomologationMockPolicy } from './FiscalHomologationMockPolicy';
import { FiscalHomologationMockScenarioCatalog } from './FiscalHomologationMockScenarioCatalog';
import { FiscalMockSefazCommunicator } from './FiscalMockSefazCommunicator';
import { FiscalMockCertificateProvider } from './FiscalMockCertificateProvider';
import { FiscalMockXmlSigner } from './FiscalMockXmlSigner';
import { FiscalMockDanfeRenderer } from './FiscalMockDanfeRenderer';

export class FiscalHomologationMockExecutionHarness {
  public static async executeMock(input: FiscalHomologationMockExecutionInput): Promise<FiscalHomologationMockExecutionResult> {
    const policyResult = FiscalHomologationMockPolicy.evaluateRequest(input.forceRealExecution);
    const blockers = [...policyResult.blockers];

    if (!input.scenario || !FiscalHomologationMockScenarioCatalog.isValidScenario(input.scenario as string)) {
      blockers.push(`Unknown scenario: ${input.scenario}`);
    }

    const validation = FiscalHomologationMockPayloadValidator.validate(input.safeShape);
    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    const status = blockers.length > 1 ? FiscalHomologationMockStatus.MOCK_BLOCKED_BY_POLICY : FiscalHomologationMockStatus.MOCK_EXECUTION_SIMULATED;

    return {
      success: blockers.length <= 1, // Only the policy blocker is allowed
      status,
      scenario: input.scenario as string || 'UNKNOWN',
      validationPassed: validation.valid,
      mockSefazResponse: FiscalMockSefazCommunicator.simulateSefazCall(input.scenario as string),
      mockCertificateResult: FiscalMockCertificateProvider.simulateCertificateLoad(),
      mockXmlResult: FiscalMockXmlSigner.simulateSignature(),
      mockDanfeResult: FiscalMockDanfeRenderer.simulateRendering(),
      homologationExecuted: false,
      realSefazCalled: false,
      certificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      xmlSigned: false,
      realXmlSigned: false,
      pdfGenerated: false,
      realPdfGenerated: false,
      releaseActivated: false,
      canaryActivated: false,
      productionV2Activated: false,
      trafficChanged: false,
      readOnly: true,
      mockOnly: true,
      sandboxOnly: true,
      dryRunOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForHomologationExecution: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false,
      blockers,
      warnings: ['All execution paths were simulated using inert mocks.']
    };
  }
}
