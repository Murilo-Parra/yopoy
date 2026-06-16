export class FiscalProductionJobDispatchNoOpMatrix {
  public static getMatrix() {
    return {
      jobDispatchNoOpMatrixGenerated: true,
      realJobEnqueued: false,
      description: 'Modelar despacho de jobs como no-op. Não enfileirar job real.'
    };
  }
}
