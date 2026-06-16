export class FiscalProductionExecutionBoundaryBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEB-01: Gate real bloqueado.',
      'B-PEB-02: Autorização real bloqueada.',
      'B-PEB-03: Deploy real bloqueado.',
      'B-PEB-04: Release real bloqueado.',
      'B-PEB-05: Rollout real bloqueado.',
      'B-PEB-06: Canary real bloqueado.',
      'B-PEB-07: Cutover real bloqueado.',
      'B-PEB-08: Rollback real bloqueado.',
      'B-PEB-09: Pacote real bloqueado.',
      'B-PEB-10: Artefato executável real bloqueado.',
      'B-PEB-11: Produção V2 bloqueada.',
      'B-PEB-12: routeToV2 bloqueado.',
      'B-PEB-13: Legado obrigatório preservado.',
      'B-PEB-14: Tráfego real inalterável.',
      'B-PEB-15: Proxy/middleware/tap real bloqueados.',
      'B-PEB-16: app.use/router.use reais intocados.',
      'B-PEB-17: Handler legado e V2 real bloqueados.',
      'B-PEB-18: Captura/duplicação/espelhamento real bloqueados.',
      'B-PEB-19: Worker/scheduler real bloqueado.',
      'B-PEB-20: Banco/DDL/DML reais bloqueados.',
      'B-PEB-21: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
