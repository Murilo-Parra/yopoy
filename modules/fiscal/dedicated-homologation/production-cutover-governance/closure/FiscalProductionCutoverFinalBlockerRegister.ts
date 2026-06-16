export class FiscalProductionCutoverFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCC-01: Cutover real bloqueado.',
      'B-PCC-02: Go-live real bloqueado.',
      'B-PCC-03: Rollout real bloqueado.',
      'B-PCC-04: Release real bloqueada.',
      'B-PCC-05: Canary real bloqueado.',
      'B-PCC-06: Promoção real de tráfego bloqueada.',
      'B-PCC-07: Produção V2 bloqueada.',
      'B-PCC-08: routeToV2 bloqueado.',
      'B-PCC-09: Legado obrigatório preservado.',
      'B-PCC-10: Tráfego real inalterável.',
      'B-PCC-11: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PCC-12: app.use/router.use reais intocados.',
      'B-PCC-13: Handler legado e V2 real bloqueados.',
      'B-PCC-14: Captura/duplicação/espelhamento real bloqueados.',
      'B-PCC-15: Runtime/queue/job/worker reais bloqueados.',
      'B-PCC-16: Command runner/shell reais bloqueados.',
      'B-PCC-17: Transação real de banco bloqueada.',
      'B-PCC-18: Banco/DDL/DML reais bloqueados.',
      'B-PCC-19: SEFAZ real bloqueada.',
      'B-PCC-20: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PCC-21: XML/PDF reais bloqueados.',
      'B-PCC-22: Autorização real bloqueada.',
      'B-PCC-23: Gate real bloqueado.',
      'B-PCC-24: Deploy/cutover/rollback reais bloqueados.',
      'B-PCC-25: Pacote/artefato executável real bloqueado.'
    ];
  }
}
