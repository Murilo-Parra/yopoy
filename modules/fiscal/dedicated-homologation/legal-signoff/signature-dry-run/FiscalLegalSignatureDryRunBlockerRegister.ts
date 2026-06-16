export class FiscalLegalSignatureDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-LSD-01: Assinatura legal real bloqueada.',
      'B-LSD-02: Persistência de assinatura legal bloqueada.',
      'B-LSD-03: Registro legal definitivo bloqueado.',
      'B-LSD-04: Certificado/PFX/senha reais bloqueados.',
      'B-LSD-05: XML/PDF real bloqueado.',
      'B-LSD-06: Notificação externa de signatário bloqueada.',
      'B-LSD-07: Webhook/Slack/WhatsApp/email reais bloqueados.',
      'B-LSD-08: Aprovação real de comitê bloqueada.',
      'B-LSD-09: Risco/waiver real bloqueados.',
      'B-LSD-10: Produção V2 bloqueada.',
      'B-LSD-11: Tráfego real inalterado.',
      'B-LSD-12: app.use legado intocado.',
      'B-LSD-13: Middleware/tap real bloqueado.',
      'B-LSD-14: Worker/scheduler real bloqueado.',
      'B-LSD-15: Gate unlock real bloqueado.',
      'B-LSD-16: Banco/DDL/DML reais bloqueados.',
      'B-LSD-17: SEFAZ real bloqueada.',
      'B-LSD-18: Autoassinatura simulada bloqueada.',
      'B-LSD-19: Mesmo signatário em dupla assinatura bloqueado.'
    ];
  }
}
