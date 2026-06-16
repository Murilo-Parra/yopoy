export class FiscalProductionDualRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-PDR-01: Dual-run real bloqueado.',
      'B-PDR-02: Duplicação de tráfego real bloqueada.',
      'B-PDR-03: Captura real de request/response bloqueada.',
      'B-PDR-04: Handler V2 operacional bloqueado.',
      'B-PDR-05: app.use legado intocado.',
      'B-PDR-06: Middleware/tap real bloqueado.',
      'B-PDR-07: Produção V2 bloqueada.',
      'B-PDR-08: Rollback/kill-switch real bloqueados.',
      'B-PDR-09: Gate unlock real bloqueado.',
      'B-PDR-10: Autorização real bloqueada.',
      'B-PDR-11: Banco/DDL/DML reais bloqueados.',
      'B-PDR-12: SEFAZ/certificado/XML/PDF reais bloqueados.',
      'B-PDR-13: Worker/scheduler real bloqueado.'
    ];
  }
}
