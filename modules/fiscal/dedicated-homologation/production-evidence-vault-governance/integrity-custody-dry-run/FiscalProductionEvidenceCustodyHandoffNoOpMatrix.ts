export class FiscalProductionEvidenceCustodyHandoffNoOpMatrix {
  public static getMatrix() {
    return {
      custodyHandoffNoOpMatrixGenerated: true,
      chainOfCustodyPersisted: false,
      description: 'Modelar handoff de custódia no-op. Não concluir handoff real. Não persistir cadeia real.'
    };
  }
}
