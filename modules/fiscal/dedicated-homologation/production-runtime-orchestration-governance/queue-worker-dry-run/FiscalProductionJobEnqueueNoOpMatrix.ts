export class FiscalProductionJobEnqueueNoOpMatrix {
  public static getMatrix() {
    return {
      jobEnqueueNoOpMatrixGenerated: true,
      realJobEnqueued: false,
      description: 'Modelar enfileiramento de jobs como matriz inerte. Não enfileirar job real.'
    };
  }
}
