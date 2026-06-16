export class FiscalProductionRouteReroutingClosureBlockerRegister {
  public static getBlockers() {
    return [
      'B-PRRC-01: Re-routing real bloqueado.',
      'B-PRRC-02: Cutover real bloqueado.',
      'B-PRRC-03: Go-live real bloqueado.',
      'B-PRRC-04: Produção V2 bloqueada.',
      'B-PRRC-05: routeToV2 bloqueado.',
      'B-PRRC-06: Legado obrigatório preservado.',
      'B-PRRC-07: Tráfego real inalterável.',
      'B-PRRC-08: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PRRC-09: app.use/router.use reais intocados.',
      'B-PRRC-10: Handler legado e V2 real bloqueados.',
      'B-PRRC-11: Captura/duplicação/espelhamento real bloqueados.',
      'B-PRRC-12: Runtime/queue/job/worker reais bloqueados.',
      'B-PRRC-13: Command runner/shell reais bloqueados.',
      'B-PRRC-14: Transação real de banco bloqueada.',
      'B-PRRC-15: Banco/DDL/DML reais bloqueados.',
      'B-PRRC-16: SEFAZ real bloqueada.',
      'B-PRRC-17: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PRRC-18: XML/PDF reais bloqueados.',
      'B-PRRC-19: Autorização real bloqueada.',
      'B-PRRC-20: Gate real bloqueado.',
      'B-PRRC-21: Deploy/release/rollout/canary/rollback reais bloqueados.',
      'B-PRRC-22: Pacote/artefato executável real bloqueado.'
    ];
  }
}
