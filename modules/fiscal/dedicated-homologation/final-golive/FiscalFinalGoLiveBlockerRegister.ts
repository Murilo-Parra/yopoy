export class FiscalFinalGoLiveBlockerRegister {
  public static getBlockers() {
    return [
      'B-FGL-01: Produção V2 bloqueada.',
      'B-FGL-02: Traffic switch real bloqueado.',
      'B-FGL-03: routeToV2 bloqueado.',
      'B-FGL-04: Legado obrigatório preservado.',
      'B-FGL-05: Release/canary reais bloqueados.',
      'B-FGL-06: app.use legado intocado.',
      'B-FGL-07: Middleware/tap real bloqueado.',
      'B-FGL-08: Worker/scheduler real bloqueado.',
      'B-FGL-09: Gate unlock real bloqueado.',
      'B-FGL-10: Autorização real bloqueada.',
      'B-FGL-11: Assinatura legal real bloqueada.',
      'B-FGL-12: Registro legal definitivo bloqueado.',
      'B-FGL-13: Risco/waiver real bloqueados.',
      'B-FGL-14: Notificações externas bloqueadas.',
      'B-FGL-15: Banco/DDL/DML reais bloqueados.',
      'B-FGL-16: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
