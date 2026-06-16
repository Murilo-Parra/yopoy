export class FiscalFinalGoLiveGateDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-FGD-01: Produção V2 bloqueada.',
      'B-FGD-02: Traffic switch real bloqueado.',
      'B-FGD-03: routeToV2 bloqueado.',
      'B-FGD-04: Legado obrigatório preservado.',
      'B-FGD-05: Release/canary reais bloqueados.',
      'B-FGD-06: Runbook real bloqueado.',
      'B-FGD-07: app.use legado intocado.',
      'B-FGD-08: Middleware/tap real bloqueado.',
      'B-FGD-09: Worker/scheduler real bloqueado.',
      'B-FGD-10: Gate unlock real bloqueado.',
      'B-FGD-11: Autorização real bloqueada.',
      'B-FGD-12: Assinatura legal real bloqueada.',
      'B-FGD-13: Registro legal definitivo bloqueado.',
      'B-FGD-14: Risco/waiver real bloqueados.',
      'B-FGD-15: Notificações externas bloqueadas.',
      'B-FGD-16: Banco/DDL/DML reais bloqueados.',
      'B-FGD-17: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
