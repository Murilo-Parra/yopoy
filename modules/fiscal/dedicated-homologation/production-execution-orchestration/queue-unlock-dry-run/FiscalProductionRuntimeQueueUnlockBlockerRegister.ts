export class FiscalProductionRuntimeQueueUnlockBlockerRegister {
  public static getBlockers() {
    return [
      'B-PRQ-01: Queue real bloqueada.',
      'B-PRQ-02: Command queue real bloqueada.',
      'B-PRQ-03: Job real bloqueado.',
      'B-PRQ-04: Worker real bloqueado.',
      'B-PRQ-05: Worker dispatch real bloqueado.',
      'B-PRQ-06: Scheduler/cron real bloqueado.',
      'B-PRQ-07: Command runner real bloqueado.',
      'B-PRQ-08: Shell command real bloqueado.',
      'B-PRQ-09: Runtime real bloqueado.',
      'B-PRQ-10: Execução real de produção bloqueada.',
      'B-PRQ-11: Autorização real bloqueada.',
      'B-PRQ-12: Gate real bloqueado.',
      'B-PRQ-13: Deploy/release/rollout reais bloqueados.',
      'B-PRQ-14: Canary/cutover/rollback reais bloqueados.',
      'B-PRQ-15: Pacote/artefato executável real bloqueado.',
      'B-PRQ-16: Produção V2 bloqueada.',
      'B-PRQ-17: routeToV2 bloqueado e legado preservado.',
      'B-PRQ-18: Tráfego real inalterável.',
      'B-PRQ-19: Proxy/middleware/tap real bloqueados.',
      'B-PRQ-20: app.use/router.use reais intocados.',
      'B-PRQ-21: Handler legado e V2 real bloqueados.',
      'B-PRQ-22: Captura/duplicação/espelhamento real bloqueados.',
      'B-PRQ-23: Banco/DDL/DML reais bloqueados.',
      'B-PRQ-24: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
