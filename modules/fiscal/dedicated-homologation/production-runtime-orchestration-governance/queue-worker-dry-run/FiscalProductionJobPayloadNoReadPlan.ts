export class FiscalProductionJobPayloadNoReadPlan {
  public static getPlan() {
    return {
      jobPayloadNoReadPlanGenerated: true,
      realPayloadRead: false,
      realPayloadProcessed: false,
      payloadIncluded: false,
      description: 'Bloquear leitura de payloads de job, fila, DLQ, worker e runtime.'
    };
  }
}
