export class FiscalDay2SupportAccessRiskRegister {
  public static getRisks() {
    return [
      'R-D2SA-01: Risco de support team access blueprint ser interpretado como acesso concedido.',
      'R-D2SA-02: Risco de RBAC simulation matrix ser confundida com alteração real de permissões.',
      'R-D2SA-03: Risco de no-privilege-escalation boundary ser usado como aprovação para suporte real.',
      'R-D2SA-04: Risco de data access no-read plan ser entendido como autorização de leitura.',
      'R-D2SA-05: Risco de assisted session no-op ser interpretada como sessão aberta.',
      'R-D2SA-06: Risco de support audit no-persistence ser confundido com auditoria legal persistida.',
      'R-D2SA-07: Risco de escalation no-notification ser convertido em notificação real por automação externa.',
      'R-D2SA-08: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-D2SA-09: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
