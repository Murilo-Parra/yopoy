export class FiscalDedicatedEvidencePackageService {
  public static getEvidencePackage() {
    return {
      modulesConsolidated: ['11.1', '11.2', '11.3', '11.4'],
      counters: {
        realEnvironmentActivations: 0,
        realInfrastructureProvisionings: 0,
        realDatabaseConnections: 0,
        realVaultCreations: 0,
        realSecretLoads: 0,
        realCertificateLoads: 0,
        realPfxReads: 0,
        realCertificatePasswordReads: 0,
        realSefazCalls: 0,
        realXmlSignatures: 0,
        realPdfGenerations: 0,
        realTrafficCaptures: 0,
        realTrafficProcesses: 0,
        realEndpointCalls: 0,
        realLegacyHandlerCalls: 0,
        realV2HandlerCalls: 0,
        realWorkerCreations: 0,
        realDmlExecutions: 0
      },
      flagsNotTriggered: [
        'hasRuntimeSideEffects',
        'forceApproveRealEnvironment',
        'forceApproveSefaz',
        'forceApproveCertificate',
        'forceApproveXmlSigning',
        'forceApprovePdfGeneration'
      ],
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      readOnly: true
    };
  }
}
