import { 
  FiscalDedicatedClosureStatus, 
  FiscalDedicatedEngineeringApprovalInput, 
  FiscalDedicatedEngineeringApprovalResult 
} from './FiscalDedicatedClosureTypes';

export class FiscalDedicatedEngineeringApprovalService {
  public static evaluateApproval(input: FiscalDedicatedEngineeringApprovalInput): FiscalDedicatedEngineeringApprovalResult {
    const blockers: string[] = [];

    if (input.forceApproveRealEnvironment) blockers.push('forceApproveRealEnvironment true is administratively blocked.');
    if (input.forceApproveRealHomologation) blockers.push('forceApproveRealHomologation true is administratively blocked.');
    if (input.forceApproveSefaz) blockers.push('forceApproveSefaz true is administratively blocked.');
    if (input.forceApproveCertificate) blockers.push('forceApproveCertificate true is administratively blocked.');
    if (input.forceApproveXmlSigning) blockers.push('forceApproveXmlSigning true is administratively blocked.');
    if (input.forceApprovePdfGeneration) blockers.push('forceApprovePdfGeneration true is administratively blocked.');
    if (input.forceApproveProductionV2) blockers.push('forceApproveProductionV2 true is administratively blocked.');

    blockers.push('Dedicated Homologation Closure 11.5 aprova apenas fechamento documental de engenharia. Ambiente real, SEFAZ real, certificado real, XML real assinado, PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.');

    return {
      success: true,
      status: FiscalDedicatedClosureStatus.ENGINEERING_REVIEW_READY,
      approvalEvaluated: true,
      engineeringApproved: true,
      go: false,
      noGo: true,
      blockers,
      warnings: [],
      environmentActivated: false,
      infrastructureProvisioned: false,
      databaseProvisioned: false,
      realDatabaseConnected: false,
      vaultProvisioned: false,
      secretLoaded: false,
      certificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      realSefazCalled: false,
      endpointCalled: false,
      xmlSigned: false,
      realXmlSigned: false,
      pdfGenerated: false,
      realPdfGenerated: false,
      realTrafficCaptured: false,
      realTrafficProcessed: false,
      legacyHandlerCalled: false,
      v2HandlerCalled: false,
      releaseActivated: false,
      canaryActivated: false,
      productionV2Activated: false,
      trafficChanged: false,
      workersCreated: false,
      schedulersCreated: false,
      readOnly: true,
      engineeringApprovalOnly: true,
      transitionClosureOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForEngineeringClosure: true,
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
