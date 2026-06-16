export class FiscalProductionBaselineOrchestrationBlockerRegister {
  public static getBlockers() {
    return [
      'B-PBO-01: Orquestração real de cutover bloqueada.',
      'B-PBO-02: Rollout real de endpoint bloqueado.',
      'B-PBO-03: Promoção real de rota bloqueada.',
      'B-PBO-04: Aprovação/cutover/go-live reais bloqueados.',
      'B-PBO-05: Autorização real bloqueada.',
      'B-PBO-06: Gate real bloqueado.',
      'B-PBO-07: Produção V2 bloqueada.',
      'B-PBO-08: routeToV2 bloqueado.',
      'B-PBO-09: Legado obrigatório preservado.',
      'B-PBO-10: Tráfego real inalterável.',
      'B-PBO-11: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PBO-12: Captura, duplicação e espelhamento reais bloqueados.',
      'B-PBO-13: Endpoint e handlers reais bloqueados.',
      'B-PBO-14: Deploy/release/rollback/canary/rollout reais bloqueados.',
      'B-PBO-15: Runtime/queue/job/worker reais bloqueados.',
      'B-PBO-16: Command runner/shell reais bloqueados.',
      'B-PBO-17: Banco/transação/DDL/DML reais bloqueados.',
      'B-PBO-18: SEFAZ real bloqueada.',
      'B-PBO-19: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PBO-20: XML/PDF reais bloqueados.',
      'B-PBO-21: Notificação real bloqueada.',
      'B-PBO-22: Pacote/artefato executável real bloqueado.'
    ];
  }
}
