export class FiscalProductionCommandCenterNoSensitiveDataPlan {
  public static getPlan() {
    return {
      commandCenterNoSensitiveDataPlanGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Bloquear retorno/leitura de payload, XML, PDF, tenant data, documento fiscal, token, secrets, API keys, certificates e PFX.'
    };
  }
}
