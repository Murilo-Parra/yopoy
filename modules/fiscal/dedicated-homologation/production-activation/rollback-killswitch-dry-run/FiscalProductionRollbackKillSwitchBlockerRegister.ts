export class FiscalProductionRollbackKillSwitchBlockerRegister {
  public static getBlockers() {
    return [
      'B-PRK-01: Rollback real bloqueado.',
      'B-PRK-02: Kill-switch real bloqueado.',
      'B-PRK-03: Tráfego real inalterado.',
      'B-PRK-04: Roteamento V2 real bloqueado.',
      'B-PRK-05: Handler V2 operacional bloqueado.',
      'B-PRK-06: app.use legado intocado.',
      'B-PRK-07: Middleware/tap real bloqueado.',
      'B-PRK-08: Worker/scheduler real bloqueado.',
      'B-PRK-09: Gate unlock real bloqueado.',
      'B-PRK-10: Autorização real bloqueada.',
      'B-PRK-11: Banco/DDL/DML reais bloqueados.',
      'B-PRK-12: SEFAZ/certificado/XML/PDF reais bloqueados.',
      'B-PRK-13: Produção V2 bloqueada.'
    ];
  }
}
