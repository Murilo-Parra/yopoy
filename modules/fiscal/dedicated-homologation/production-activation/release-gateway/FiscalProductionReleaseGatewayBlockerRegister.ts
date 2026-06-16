export class FiscalProductionReleaseGatewayBlockerRegister {
  public static getBlockers() {
    return [
      'B-PRG-01: Release real bloqueado.',
      'B-PRG-02: Produção V2 bloqueada.',
      'B-PRG-03: Tráfego real inalterado.',
      'B-PRG-04: Canary real bloqueado.',
      'B-PRG-05: Roteamento V2 real bloqueado.',
      'B-PRG-06: Handler V2 operacional bloqueado.',
      'B-PRG-07: app.use legado intocado.',
      'B-PRG-08: Middleware/tap real bloqueado.',
      'B-PRG-09: Gate unlock real bloqueado.',
      'B-PRG-10: Autorização real bloqueada.',
      'B-PRG-11: Ledger/trilha legal real bloqueados.',
      'B-PRG-12: Banco/DDL/DML reais bloqueados.',
      'B-PRG-13: SEFAZ/certificado/XML/PDF reais bloqueados.',
      'B-PRG-14: Worker/scheduler real bloqueado.'
    ];
  }
}
