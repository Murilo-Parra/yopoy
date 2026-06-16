export class FiscalProductionRuntimeStepDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-PRT-01: Runtime real bloqueado.',
      'B-PRT-02: Command queue real bloqueada.',
      'B-PRT-03: Command runner real bloqueado.',
      'B-PRT-04: Shell command real bloqueado.',
      'B-PRT-05: Worker/scheduler/cron real bloqueado.',
      'B-PRT-06: Execução real de produção bloqueada.',
      'B-PRT-07: Autorização real bloqueada.',
      'B-PRT-08: Gate real bloqueado.',
      'B-PRT-09: Deploy real bloqueado.',
      'B-PRT-10: Release real bloqueado.',
      'B-PRT-11: Rollout real bloqueado.',
      'B-PRT-12: Canary real bloqueado.',
      'B-PRT-13: Cutover real bloqueado.',
      'B-PRT-14: Rollback real bloqueado.',
      'B-PRT-15: Pacote real publicado bloqueado.',
      'B-PRT-16: Artefato executável real bloqueado.',
      'B-PRT-17: Produção V2 bloqueada.',
      'B-PRT-18: routeToV2 bloqueado.',
      'B-PRT-19: Legado obrigatório preservado.',
      'B-PRT-20: Tráfego real inalterável.',
      'B-PRT-21: Proxy/middleware/tap real bloqueados.',
      'B-PRT-22: app.use/router.use reais intocados.',
      'B-PRT-23: Handler legado e V2 real bloqueados.',
      'B-PRT-24: Captura/duplicação/espelhamento real bloqueados.',
      'B-PRT-25: Banco/DDL/DML reais bloqueados.',
      'B-PRT-26: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
