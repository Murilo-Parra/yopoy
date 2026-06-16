export class FiscalOperationalHandoffBlockerRegister {
  public static getBlockers() {
    return [
      'B-OHB-01: Runbook real bloqueado.',
      'B-OHB-02: Incidente real bloqueado.',
      'B-OHB-03: Notificação externa bloqueada.',
      'B-OHB-04: Observability real bloqueada.',
      'B-OHB-05: Alerta produtivo bloqueado.',
      'B-OHB-06: Produção V2 bloqueada.',
      'B-OHB-07: Tráfego real inalterado.',
      'B-OHB-08: app.use legado intocado.',
      'B-OHB-09: Middleware/tap real bloqueado.',
      'B-OHB-10: Worker/scheduler real bloqueado.',
      'B-OHB-11: Gate unlock real bloqueado.',
      'B-OHB-12: Banco/DDL/DML reais bloqueados.',
      'B-OHB-13: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
