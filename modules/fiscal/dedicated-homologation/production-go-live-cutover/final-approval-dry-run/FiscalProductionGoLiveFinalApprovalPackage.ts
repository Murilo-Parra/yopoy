export class FiscalProductionGoLiveFinalApprovalPackage {
  public static getPackage() {
    return {
      finalApprovalPackageGenerated: true,
      realGoLiveApproved: false,
      realCutoverApproved: false,
      description: 'Modelar pacote final de aprovação como no-op. Não aprovar go-live real. Não aprovar cutover real.'
    };
  }
}
