export class FiscalProductionActivationFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PAC-01: Produção V2 real bloqueada.',
      'B-PAC-02: Release real bloqueado.',
      'B-PAC-03: Canary real bloqueado.',
      'B-PAC-04: Tráfego real inalterado.',
      'B-PAC-05: Roteamento V2 real bloqueado.',
      'B-PAC-06: Dual-run real bloqueado.',
      'B-PAC-07: Captura request/response real bloqueada.',
      'B-PAC-08: Rollback real bloqueado.',
      'B-PAC-09: Kill-switch real bloqueado.',
      'B-PAC-10: Handler V2 operacional bloqueado.',
      'B-PAC-11: app.use legado intocado.',
      'B-PAC-12: Middleware/tap real bloqueado.',
      'B-PAC-13: Worker/scheduler real bloqueado.',
      'B-PAC-14: Gate unlock real bloqueado.',
      'B-PAC-15: Autorização real bloqueada.',
      'B-PAC-16: Banco/DDL/DML reais bloqueados.',
      'B-PAC-17: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
