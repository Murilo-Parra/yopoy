export class FiscalProductionExecutionOrchestrationBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEO-01: Execução real de produção bloqueada.',
      'B-PEO-02: Autorização real bloqueada.',
      'B-PEO-03: Gate real bloqueado.',
      'B-PEO-04: Deploy real bloqueado.',
      'B-PEO-05: Release real bloqueado.',
      'B-PEO-06: Rollout real bloqueado.',
      'B-PEO-07: Canary real bloqueado.',
      'B-PEO-08: Cutover real bloqueado.',
      'B-PEO-09: Rollback real bloqueado.',
      'B-PEO-10: Pacote real publicado bloqueado.',
      'B-PEO-11: Artefato executável real bloqueado.',
      'B-PEO-12: Produção V2 bloqueada.',
      'B-PEO-13: routeToV2 bloqueado.',
      'B-PEO-14: Legado obrigatório preservado.',
      'B-PEO-15: Tráfego real inalterável.',
      'B-PEO-16: Proxy/middleware/tap real bloqueados.',
      'B-PEO-17: app.use/router.use reais intocados.',
      'B-PEO-18: Handler legado e V2 real bloqueados.',
      'B-PEO-19: Captura/duplicação/espelhamento real bloqueados.',
      'B-PEO-20: Worker/scheduler real bloqueado.',
      'B-PEO-21: Banco/DDL/DML reais bloqueados.',
      'B-PEO-22: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
