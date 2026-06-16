export class FiscalProductionRuntimeDataBoundaryNoReadPlan {
  public static getPlan() {
    return {
      runtimeDataBoundaryNoReadPlanGenerated: true,
      realPayloadRead: false,
      realSecretRead: false,
      description: 'Bloquear leitura de payload, XML, PDF, PFX, certificado, senha, token, segredo e chave privada.'
    };
  }
}
