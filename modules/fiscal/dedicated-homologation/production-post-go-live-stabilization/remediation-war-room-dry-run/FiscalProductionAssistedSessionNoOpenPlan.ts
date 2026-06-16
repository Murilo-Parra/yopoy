export class FiscalProductionAssistedSessionNoOpenPlan {
  public static getPlan() {
    return {
      assistedSessionNoOpenPlanGenerated: true,
      realAssistedSessionOpened: false,
      realPayloadRead: false,
      description: 'Modelar sessão assistida sem abertura real. Não abrir sessão break-glass. Não ler dados de tenant.'
    };
  }
}
