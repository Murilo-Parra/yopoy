export class FiscalDay2OperationsBlockerRegister {
  public static getBlockers() {
    return [
      'B-D2O-01: Operação day-2 real bloqueada.',
      'B-D2O-02: Runbook real bloqueado.',
      'B-D2O-03: Incidente real bloqueado.',
      'B-D2O-04: Alerta produtivo real bloqueado.',
      'B-D2O-05: Observability real bloqueada.',
      'B-D2O-06: Notificação externa real bloqueada.',
      'B-D2O-07: Produção V2 bloqueada.',
      'B-D2O-08: routeToV2 bloqueado.',
      'B-D2O-09: Legado obrigatório preservado.',
      'B-D2O-10: Tráfego real inalterável.',
      'B-D2O-11: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-D2O-12: app.use/router.use reais intocados.',
      'B-D2O-13: Handler legado e V2 real bloqueados.',
      'B-D2O-14: Captura/duplicação/espelhamento real bloqueados.',
      'B-D2O-15: Runtime/queue/job/worker reais bloqueados.',
      'B-D2O-16: Command runner/shell reais bloqueados.',
      'B-D2O-17: Transação real de banco bloqueada.',
      'B-D2O-18: Banco/DDL/DML reais bloqueados.',
      'B-D2O-19: SEFAZ real bloqueada.',
      'B-D2O-20: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-D2O-21: XML/PDF reais bloqueados.',
      'B-D2O-22: Autorização real bloqueada.',
      'B-D2O-23: Gate real bloqueado.',
      'B-D2O-24: Deploy/cutover/rollback reais bloqueados.',
      'B-D2O-25: Pacote/artefato executável real bloqueado.'
    ];
  }
}
