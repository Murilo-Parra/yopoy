export class FiscalRealProvisioningHandoffService {
  public static getHandoff() {
    return {
      status: 'HANDOFF_READY',
      permittedAfterModule12: [
        'criar novo módulo de provisionamento real controlado se autorizado.',
        'criar ambiente experimental explicitamente separado se autorizado.',
        'criar pipeline IaC com dry-run adicional se autorizado.',
        'criar Vault bootstrap simulado adicional se autorizado.',
        'criar plano de homologação real futuro.'
      ],
      prohibitedAfterModule12: [
        'executar terraform apply.',
        'executar pulumi up.',
        'executar cloud deploy.',
        'criar recurso real.',
        'criar banco real.',
        'criar vault real.',
        'gravar secret real.',
        'carregar certificado real.',
        'chamar SEFAZ real.',
        'assinar XML real.',
        'gerar PDF real.',
        'ativar Produção V2.',
        'alterar tráfego.'
      ],
      declarations: {
        realExecutionDependentOnNewExplicitModule: true,
        realAuthorizationNotGranted: true,
        productionV2RemainsBlocked: true
      }
    };
  }
}
