export class FiscalDedicatedHandoffService {
  public static getHandoff() {
    return {
      moduleStatus: 'Encerrado documentalmente (Módulo 11).',
      realActivationRequirement: 'Ativação real exige aprovação em módulo futuro.',
      environmentStatus: 'Ambiente real: bloqueado.',
      sefazStatus: 'SEFAZ real: bloqueada.',
      certificateStatus: 'Certificado real: bloqueado.',
      xmlPdfStatus: 'XML/PDF real: bloqueado.',
      v2Status: 'Produção V2: bloqueada.',
      allowedNextPhaseActions: [
        'desenhar plano real de provisionamento com aprovação externa.',
        'preparar checklist de segurança para vault.',
        'preparar contrato de secrets management.',
        'preparar plano de conexão SEFAZ homologação real.',
        'preparar plano de certificado A1 real.',
        'preparar plano de XML signer real isolado.',
        'preparar plano de DANFE real isolado.',
        'preparar plano de observabilidade persistente.',
        'preparar plano de rollback/circuit breaker real.',
        'preparar plano de load test real em ambiente não produtivo.',
        'preparar matriz de autorização fiscal/jurídica.'
      ],
      forbiddenActionsWithoutNewPlan: [
        'provisionar infraestrutura real.',
        'ativar ambiente dedicado real.',
        'chamar SEFAZ real.',
        'carregar certificado real.',
        'abrir PFX real.',
        'ler senha de certificado.',
        'assinar XML real.',
        'gerar PDF real.',
        'alterar tráfego produtivo.',
        'ativar Produção V2.',
        'remover legado.',
        'criar worker de emissão real.'
      ],
      readOnly: true,
      engineeringApprovalOnly: true,
      transitionClosureOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
