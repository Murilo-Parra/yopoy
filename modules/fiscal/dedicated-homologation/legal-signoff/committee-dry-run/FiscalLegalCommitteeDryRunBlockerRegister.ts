export class FiscalLegalCommitteeDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-LCD-01: Aprovação real de comitê bloqueada.',
      'B-LCD-02: Assinatura legal real bloqueada.',
      'B-LCD-03: Persistência de assinatura legal bloqueada.',
      'B-LCD-04: Registro legal definitivo bloqueado.',
      'B-LCD-05: Aceite real de risco bloqueado.',
      'B-LCD-06: Waiver real bloqueado.',
      'B-LCD-07: Notificação externa de aprovador/signatário bloqueada.',
      'B-LCD-08: Webhook/Slack/WhatsApp/email reais bloqueados.',
      'B-LCD-09: Certificado/PFX/senha reais bloqueados.',
      'B-LCD-10: XML/PDF real bloqueado.',
      'B-LCD-11: Produção V2 bloqueada.',
      'B-LCD-12: Tráfego real inalterado.',
      'B-LCD-13: app.use legado intocado.',
      'B-LCD-14: Middleware/tap real bloqueado.',
      'B-LCD-15: Worker/scheduler real bloqueado.',
      'B-LCD-16: Gate unlock real bloqueado.',
      'B-LCD-17: Banco/DDL/DML reais bloqueados.',
      'B-LCD-18: SEFAZ real bloqueada.',
      'B-LCD-19: Autoaprovação simulada bloqueada em comitê.',
      'B-LCD-20: Autoaceite de risco simulado bloqueado.'
    ];
  }
}
