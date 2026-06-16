export class FiscalProductionFinalStateNoExportHandoffPlan {
  public static getPlan() {
    return {
      noExportHandoffPlanGenerated: true,
      realOperationalHandoffConcluded: false,
      realDisclosurePackageSent: false,
      description: 'Modelar handoff sem exportação. Não concluir handoff real. Não enviar pacote externo.'
    };
  }
}
