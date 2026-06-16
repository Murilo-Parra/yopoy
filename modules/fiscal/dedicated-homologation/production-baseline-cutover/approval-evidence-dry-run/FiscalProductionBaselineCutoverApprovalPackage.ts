export class FiscalProductionBaselineCutoverApprovalPackage {
  public static getPackage() {
    return {
      approvalPackageGenerated: true,
      realCutoverApproved: false,
      realCutoverExecuted: false,
      description: 'Modelagem pacote de aprovação simulada do baseline cutover. Não aprova nem executa cutover real.'
    };
  }
}
