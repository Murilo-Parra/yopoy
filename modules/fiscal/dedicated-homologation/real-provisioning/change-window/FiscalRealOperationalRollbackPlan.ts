export class FiscalRealOperationalRollbackPlan {
  public static getPlan() {
    return [
      {
        step: 'Destruição de Infraestrutura Adicional',
        trigger: 'Falha crítica na implantação do banco ou rede que afeta outros serviços.',
        ownerRole: 'SRE / Tech Lead Infraestrutura',
        automated: false,
        installedNow: false,
        realRollbackExecuted: false,
        requiresManualApproval: true
      },
      {
        step: 'Revogação de Certificados / Limpeza de Cofre',
        trigger: 'Credencial exposta durante IaC ou logs.',
        ownerRole: 'CISO / Tech Lead Segurança',
        automated: false,
        installedNow: false,
        realRollbackExecuted: false,
        requiresManualApproval: true
      }
    ];
  }
}
