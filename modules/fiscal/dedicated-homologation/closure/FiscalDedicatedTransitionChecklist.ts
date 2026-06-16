export class FiscalDedicatedTransitionChecklist {
  public static getChecklist() {
    return {
      engineeringClosurePermitted: true,
      activationBlockedMessage: 'Ativação real segue bloqueada.',
      allowedNextPhaseActions: [
        'desenho de ambiente dedicado real.',
        'plano de provisionamento real separado.',
        'secrets management formal.',
        'vault real sob aprovação manual.',
        'certificado A1 real sob cofre aprovado.',
        'SEFAZ homologação real em janela controlada.',
        'XML signer real isolado.',
        'DANFE renderer real isolado.',
        'observabilidade persistente real.',
        'rollback/circuit breaker/kill switch real.',
        'load test real em ambiente não produtivo.',
        'plano de incidente.',
        'aprovação jurídica/fiscal.'
      ],
      forbiddenNextPhaseActionsWithoutNewPlan: [
        'ativar ambiente dedicado real neste módulo.',
        'chamar SEFAZ real neste módulo.',
        'carregar certificado real neste módulo.',
        'abrir PFX neste módulo.',
        'assinar XML real neste módulo.',
        'gerar PDF real neste módulo.',
        'alterar tráfego produtivo.',
        'rotear Produção V2.',
        'remover legado.',
        'criar worker de emissão real.'
      ]
    };
  }
}
