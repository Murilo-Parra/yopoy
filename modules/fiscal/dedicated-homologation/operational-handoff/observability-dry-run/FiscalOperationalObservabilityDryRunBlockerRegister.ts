export class FiscalOperationalObservabilityDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-OOD-01: Observability real bloqueada.',
      'B-OOD-02: Alerta produtivo bloqueado.',
      'B-OOD-03: Incidente real bloqueado.',
      'B-OOD-04: Notificação externa bloqueada.',
      'B-OOD-05: Webhook/Slack/WhatsApp/email reais bloqueados.',
      'B-OOD-06: Captura real de request/response bloqueada.',
      'B-OOD-07: Runbook real bloqueado.',
      'B-OOD-08: Produção V2 bloqueada.',
      'B-OOD-09: Tráfego real inalterado.',
      'B-OOD-10: app.use legado intocado.',
      'B-OOD-11: Middleware/tap real bloqueado.',
      'B-OOD-12: Worker/scheduler real bloqueado.',
      'B-OOD-13: Banco/DDL/DML reais bloqueados.',
      'B-OOD-14: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
