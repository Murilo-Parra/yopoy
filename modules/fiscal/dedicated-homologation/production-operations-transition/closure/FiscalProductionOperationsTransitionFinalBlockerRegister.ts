export class FiscalProductionOperationsTransitionFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-POTC-01: Closure real como ativação bloqueado.',
      'B-POTC-02: Autorização real bloqueada.',
      'B-POTC-03: Gate real bloqueado.',
      'B-POTC-04: Produção V2 bloqueada.',
      'B-POTC-05: routeToV2 bloqueado.',
      'B-POTC-06: Legado obrigatório preservado.',
      'B-POTC-07: Tráfego real inalterável.',
      'B-POTC-08: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-POTC-09: Captura, duplicação e espelhamento reais bloqueados.',
      'B-POTC-10: Endpoint e handlers reais bloqueados.',
      'B-POTC-11: Go-live/deploy/release/cutover/rollback/canary/rollout reais bloqueados.',
      'B-POTC-12: Runtime/queue/job/worker reais bloqueados.',
      'B-POTC-13: Command runner/shell reais bloqueados.',
      'B-POTC-14: Banco/DDL/DML reais bloqueados.',
      'B-POTC-15: SEFAZ real bloqueada.',
      'B-POTC-16: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-POTC-17: XML/PDF reais bloqueados.',
      'B-POTC-18: Notificação real bloqueada.',
      'B-POTC-19: Pacote/artefato executável real bloqueado.'
    ];
  }
}
