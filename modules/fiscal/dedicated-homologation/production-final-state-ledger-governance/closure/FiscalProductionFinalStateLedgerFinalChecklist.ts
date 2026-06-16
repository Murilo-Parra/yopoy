export class FiscalProductionFinalStateLedgerFinalChecklist {
  public static getChecklist() {
    return {
      finalChecklistGenerated: true,
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      description: 'Consolidar checklist final do Domínio 42. Confirmar readOnly, governanceOnly, simulationOnly e activationBlocked.'
    };
  }
}
