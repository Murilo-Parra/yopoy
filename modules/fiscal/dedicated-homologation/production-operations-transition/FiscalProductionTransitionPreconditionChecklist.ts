export class FiscalProductionTransitionPreconditionChecklist {
  public static getChecklist() {
    return {
      preconditionChecklistGenerated: true,
      activationBlocked: true,
      readOnly: true,
      simulationOnly: true,
      description: 'Consolida pré-condições de transição. Confirma ausência de ativação real.'
    };
  }
}
