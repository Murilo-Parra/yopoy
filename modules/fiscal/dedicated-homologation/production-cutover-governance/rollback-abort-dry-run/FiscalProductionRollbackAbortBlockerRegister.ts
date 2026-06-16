export class FiscalProductionRollbackAbortBlockerRegister {
  public static getBlockers() {
    return [
      'B-PRBA-01: Rollback real bloqueado.',
      'B-PRBA-02: Abort real bloqueado.',
      'B-PRBA-03: Cutover real bloqueado.',
      'B-PRBA-04: Go-live real bloqueado.',
      'B-PRBA-05: Produção V2 bloqueada.',
      'B-PRBA-06: routeToV2 bloqueado.',
      'B-PRBA-07: Legado obrigatório preservado.',
      'B-PRBA-08: Tráfego real inalterável.',
      'B-PRBA-09: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PRBA-10: app.use/router.use reais intocados.',
      'B-PRBA-11: Handler legado e V2 real bloqueados.',
      'B-PRBA-12: Captura/duplicação/espelhamento real bloqueados.',
      'B-PRBA-13: Runtime/queue/job/worker reais bloqueados.',
      'B-PRBA-14: Command runner/shell reais bloqueados.',
      'B-PRBA-15: Transação real de banco bloqueada.',
      'B-PRBA-16: Banco/DDL/DML reais bloqueados.',
      'B-PRBA-17: SEFAZ real bloqueada.',
      'B-PRBA-18: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PRBA-19: XML/PDF reais bloqueados.',
      'B-PRBA-20: Autorização real bloqueada.',
      'B-PRBA-21: Gate real bloqueado.',
      'B-PRBA-22: Deploy/release/rollout/canary reais bloqueados.',
      'B-PRBA-23: Pacote/artefato executável real bloqueado.'
    ];
  }
}
