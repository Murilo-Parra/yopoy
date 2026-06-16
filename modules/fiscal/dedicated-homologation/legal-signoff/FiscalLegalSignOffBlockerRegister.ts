export class FiscalLegalSignOffBlockerRegister {
  public static getBlockers() {
    return [
      'B-LSO-01: Assinatura legal real bloqueada.',
      'B-LSO-02: Persistência de assinatura legal bloqueada.',
      'B-LSO-03: Registro legal definitivo bloqueado.',
      'B-LSO-04: Certificado/PFX/senha reais bloqueados.',
      'B-LSO-05: XML/PDF real bloqueado.',
      'B-LSO-06: Notificação externa de signatário bloqueada.',
      'B-LSO-07: Aprovação real de comitê bloqueada.',
      'B-LSO-08: Risco/waiver real bloqueados.',
      'B-LSO-09: Produção V2 bloqueada.',
      'B-LSO-10: Tráfego real inalterado.',
      'B-LSO-11: app.use legado intocado.',
      'B-LSO-12: Middleware/tap real bloqueado.',
      'B-LSO-13: Worker/scheduler real bloqueado.',
      'B-LSO-14: Gate unlock real bloqueado.',
      'B-LSO-15: Banco/DDL/DML reais bloqueados.',
      'B-LSO-16: SEFAZ real bloqueada.'
    ];
  }
}
