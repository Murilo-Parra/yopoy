export class FiscalHomologationMockResultReadModel {
  public static getReadModel(): any {
    // Retorna baseline inerte, pois dados reais ainda não foram gerados
    return {
      realHomologationExecutions: 0 as 0,
      realSefazCalls: 0 as 0,
      realCertificatesLoaded: 0 as 0,
      realPfxReads: 0 as 0,
      realCertificatePasswordReads: 0 as 0,
      realXmlSigned: 0 as 0,
      realPdfGenerated: 0 as 0,
      realTrafficChanges: 0 as 0,
      realDmlExecutions: 0 as 0,
      payloadIncluded: false as false,
      sensitiveDataIncluded: false as false
    };
  }
}
