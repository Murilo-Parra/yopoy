export class FiscalProductionRolloutApprovalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PRA-01: Rollout real bloqueado.',
      'B-PRA-02: Release real bloqueada.',
      'B-PRA-03: Canary real bloqueado.',
      'B-PRA-04: Go-live real bloqueado.',
      'B-PRA-05: Promoção real de tráfego bloqueada.',
      'B-PRA-06: Produção V2 bloqueada.',
      'B-PRA-07: routeToV2 bloqueado.',
      'B-PRA-08: Legado obrigatório preservado.',
      'B-PRA-09: Tráfego real inalterável.',
      'B-PRA-10: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PRA-11: app.use/router.use reais intocados.',
      'B-PRA-12: Handler legado e V2 real bloqueados.',
      'B-PRA-13: Captura/duplicação/espelhamento real bloqueados.',
      'B-PRA-14: Runtime/queue/job/worker reais bloqueados.',
      'B-PRA-15: Command runner/shell reais bloqueados.',
      'B-PRA-16: Transação real de banco bloqueada.',
      'B-PRA-17: Banco/DDL/DML reais bloqueados.',
      'B-PRA-18: SEFAZ real bloqueada.',
      'B-PRA-19: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PRA-20: XML/PDF reais bloqueados.',
      'B-PRA-21: Autorização real bloqueada.',
      'B-PRA-22: Gate real bloqueado.',
      'B-PRA-23: Deploy/cutover/rollback reais bloqueados.',
      'B-PRA-24: Pacote/artefato executável real bloqueado.'
    ];
  }
}
