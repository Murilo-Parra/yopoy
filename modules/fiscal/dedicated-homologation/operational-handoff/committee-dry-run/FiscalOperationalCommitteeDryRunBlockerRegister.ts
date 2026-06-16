export class FiscalOperationalCommitteeDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-OCD-01: Aprovação real de comitê bloqueada.',
      'B-OCD-02: Aceitação real de risco bloqueada.',
      'B-OCD-03: Waiver real bloqueado.',
      'B-OCD-04: Notificação externa de aprovador bloqueada.',
      'B-OCD-05: Ticket/incidente real bloqueado.',
      'B-OCD-06: Runbook real bloqueado.',
      'B-OCD-07: Observability/alerting real bloqueados.',
      'B-OCD-08: Produção V2 bloqueada.',
      'B-OCD-09: Tráfego real inalterado.',
      'B-OCD-10: app.use legado intocado.',
      'B-OCD-11: Middleware/tap real bloqueado.',
      'B-OCD-12: Worker/scheduler real bloqueado.',
      'B-OCD-13: Gate unlock real bloqueado.',
      'B-OCD-14: Banco/DDL/DML reais bloqueados.',
      'B-OCD-15: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
