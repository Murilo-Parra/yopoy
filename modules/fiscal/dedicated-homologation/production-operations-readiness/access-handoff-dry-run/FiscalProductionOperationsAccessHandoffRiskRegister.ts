export class FiscalProductionOperationsAccessHandoffRiskRegister {
  public static getRisks() {
    return [
      'R-POA-01: Risco de access handoff dry-run ser interpretado como concessão real de acesso.',
      'R-POA-02: Risco de RBAC simulation matrix ser confundida com mutação real de permissões.',
      'R-POA-03: Risco de responsibility handoff ser entendido como delegação operacional real.',
      'R-POA-04: Risco de assisted session no-op ser lida como sessão assistida ativa.',
      'R-POA-05: Risco de data access no-read plan ocultar que nenhum dado real foi lido.',
      'R-POA-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POA-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
