export class FiscalProductionRollbackReversionBlockerRegister {
  public static getBlockers() {
    return [
      'B-PBR-01: Rollback real bloqueado.',
      'B-PBR-02: Abort real bloqueado.',
      'B-PBR-03: Reversão real de tráfego bloqueada.',
      'B-PBR-04: Cutover/orquestração/rollout/promoção reais bloqueados.',
      'B-PBR-05: Go-live real bloqueado.',
      'B-PBR-06: Autorização real bloqueada.',
      'B-PBR-07: Gate real bloqueado.',
      'B-PBR-08: Produção V2 bloqueada.',
      'B-PBR-09: routeToV2 bloqueado.',
      'B-PBR-10: Legado obrigatório preservado.',
      'B-PBR-11: Tráfego real inalterável.',
      'B-PBR-12: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PBR-13: Captura, duplicação e espelhamento reais bloqueados.',
      'B-PBR-14: Endpoint e handlers reais bloqueados.',
      'B-PBR-15: Deploy/release/canary/rollout reais bloqueados.',
      'B-PBR-16: Runtime/queue/job/worker reais bloqueados.',
      'B-PBR-17: Command runner/shell reais bloqueados.',
      'B-PBR-18: Banco/transação/DDL/DML reais bloqueados.',
      'B-PBR-19: SEFAZ real bloqueada.',
      'B-PBR-20: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PBR-21: XML/PDF reais bloqueados.',
      'B-PBR-22: Notificação real bloqueada.',
      'B-PBR-23: Pacote/artefato executável real bloqueado.'
    ];
  }
}
