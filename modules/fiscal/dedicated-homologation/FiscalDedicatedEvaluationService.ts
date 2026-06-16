import { FiscalDedicatedEvaluationInput, FiscalDedicatedEvaluationResult, FiscalDedicatedHomologationStatus } from './FiscalDedicatedHomologationTypes';

export class FiscalDedicatedEvaluationService {
  public static evaluate(input: FiscalDedicatedEvaluationInput): FiscalDedicatedEvaluationResult {
    const blockers: string[] = [];

    if (input.forceActivateEnvironment) {
      blockers.push('forceActivateEnvironment true is administratively blocked.');
    }
    if (input.forceRealHomologation) {
      blockers.push('forceRealHomologation true is administratively blocked.');
    }
    if (input.forceSefazConnection) {
      blockers.push('forceSefazConnection true is administratively blocked.');
    }
    if (input.requestedAction && input.requestedAction.toLowerCase().includes('prod')) {
      blockers.push('Productive requested actions are blocked.');
    }

    blockers.push('Dedicated Homologation Environment 11.1 é contrato administrativo. Ativação de ambiente real, SEFAZ real, certificado real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.');

    return {
      success: false,
      status: FiscalDedicatedHomologationStatus.BLOCKED_FOR_REAL_ACTIVATION,
      environmentActivated: false,
      realHomologationActivated: false,
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
      endpointsCalled: false,
      workersCreated: false,
      schedulersCreated: false,
      blockers,
      warnings: [],
      readOnly: true,
      infrastructureBlueprintOnly: true,
      contractOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
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
