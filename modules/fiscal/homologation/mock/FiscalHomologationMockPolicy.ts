export class FiscalHomologationMockPolicy {
  public static evaluateRequest(forceRealExecution?: boolean): {
    homologationExecuted: false;
    realSefazCalled: false;
    certificateLoaded: false;
    realPfxRead: false;
    certificatePasswordRead: false;
    xmlSigned: false;
    realXmlSigned: false;
    pdfGenerated: false;
    realPdfGenerated: false;
    activationBlocked: true;
    blockers: string[];
  } {
    const blockers: string[] = [];

    if (forceRealExecution === true) {
      blockers.push('forceRealExecution is strictly forbidden in Mock Harness 10.2.');
    }

    blockers.push('Homologation Mock Execution Harness 10.2 usa apenas mocks administrativos. SEFAZ real, certificado real, XML real assinado e PDF real permanecem bloqueados.');

    return {
      homologationExecuted: false,
      realSefazCalled: false,
      certificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      xmlSigned: false,
      realXmlSigned: false,
      pdfGenerated: false,
      realPdfGenerated: false,
      activationBlocked: true,
      blockers
    };
  }
}
