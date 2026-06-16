export class FiscalProductionCutoverGovernanceBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCG-01: Cutover real bloqueado.',
      'B-PCG-02: Go-live real bloqueado.',
      'B-PCG-03: Produção V2 bloqueada.',
      'B-PCG-04: routeToV2 bloqueado.',
      'B-PCG-05: Legado obrigatório preservado.',
      'B-PCG-06: Tráfego real inalterável.',
      'B-PCG-07: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PCG-08: app.use/router.use reais intocados.',
      'B-PCG-09: Handler legado e V2 real bloqueados.',
      'B-PCG-10: Captura/duplicação/espelhamento real bloqueados.',
      'B-PCG-11: Runtime/queue/job/worker reais bloqueados.',
      'B-PCG-12: Command runner/shell reais bloqueados.',
      'B-PCG-13: Transação real de banco bloqueada.',
      'B-PCG-14: Banco/DDL/DML reais bloqueados.',
      'B-PCG-15: SEFAZ real bloqueada.',
      'B-PCG-16: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PCG-17: XML/PDF reais bloqueados.',
      'B-PCG-18: Autorização real bloqueada.',
      'B-PCG-19: Gate real bloqueado.',
      'B-PCG-20: Deploy/release/rollout/canary/rollback reais bloqueados.',
      'B-PCG-21: Pacote/artefato executável real bloqueado.'
    ];
  }
}
