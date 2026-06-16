export class FiscalLegalSignOffFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-LSC-01: Aprovação real de comitê bloqueada.',
      'B-LSC-02: Assinatura legal real bloqueada.',
      'B-LSC-03: Persistência de assinatura legal bloqueada.',
      'B-LSC-04: Registro legal definitivo bloqueado.',
      'B-LSC-05: Aceite real de risco bloqueado.',
      'B-LSC-06: Waiver real bloqueado.',
      'B-LSC-07: Notificação externa de aprovador/signatário bloqueada.',
      'B-LSC-08: Webhook/Slack/WhatsApp/email reais bloqueados.',
      'B-LSC-09: Certificado/PFX/senha reais bloqueados.',
      'B-LSC-10: Biblioteca criptográfica real bloqueada.',
      'B-LSC-11: XML/PDF real bloqueado.',
      'B-LSC-12: Produção V2 bloqueada.',
      'B-LSC-13: Tráfego real inalterado.',
      'B-LSC-14: app.use legado intocado.',
      'B-LSC-15: Middleware/tap real bloqueado.',
      'B-LSC-16: Worker/scheduler real bloqueado.',
      'B-LSC-17: Gate unlock real bloqueado.',
      'B-LSC-18: Banco/DDL/DML reais bloqueados.',
      'B-LSC-19: SEFAZ real bloqueada.'
    ];
  }
}
