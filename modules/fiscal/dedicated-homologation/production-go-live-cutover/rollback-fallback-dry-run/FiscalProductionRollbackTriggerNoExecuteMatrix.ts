export class FiscalProductionRollbackTriggerNoExecuteMatrix {
  public static getMatrix() {
    return {
      rollbackTriggerNoExecuteMatrixGenerated: true,
      realIncidentCreated: false,
      realTicketCreated: false,
      description: 'Modelar triggers de rollback sem execução. Não abrir incidente real. Não criar ticket real.'
    };
  }
}
