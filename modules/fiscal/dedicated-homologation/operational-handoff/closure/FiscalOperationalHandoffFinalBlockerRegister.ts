export class FiscalOperationalHandoffFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-OHC-01: Assinatura legal real bloqueada.',
      'B-OHC-02: Persistência de assinatura legal bloqueada.',
      'B-OHC-03: Aprovação real de comitê bloqueada.',
      'B-OHC-04: Aceitação real de risco bloqueada.',
      'B-OHC-05: Waiver real bloqueado.',
      'B-OHC-06: Notificação externa de aprovador bloqueada.',
      'B-OHC-07: Ticket/incidente real bloqueado.',
      'B-OHC-08: Runbook real bloqueado.',
      'B-OHC-09: Observability/alerting real bloqueados.',
      'B-OHC-10: Produção V2 bloqueada.',
      'B-OHC-11: Tráfego real inalterado.',
      'B-OHC-12: app.use legado intocado.',
      'B-OHC-13: Middleware/tap real bloqueado.',
      'B-OHC-14: Worker/scheduler real bloqueado.',
      'B-OHC-15: Gate unlock real bloqueado.',
      'B-OHC-16: Banco/DDL/DML reais bloqueados.',
      'B-OHC-17: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
