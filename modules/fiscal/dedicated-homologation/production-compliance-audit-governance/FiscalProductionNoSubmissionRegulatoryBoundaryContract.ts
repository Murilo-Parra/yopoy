export class FiscalProductionNoSubmissionRegulatoryBoundaryContract {
  public static getContract() {
    return {
      noSubmissionBoundaryContractGenerated: true,
      realRegulatoryFilingSubmitted: false,
      realAuditorPackageSent: false,
      description: 'Declarar fronteira no-submission. Bloquear filing real, auditor package real e envio real.'
    };
  }
}
