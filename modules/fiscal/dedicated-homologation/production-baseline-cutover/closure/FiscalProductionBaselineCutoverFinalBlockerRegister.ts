export class FiscalProductionBaselineCutoverFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PBCF-01: Closure operacional real bloqueado.',
      'B-PBCF-02: Cutover real bloqueado.',
      'B-PBCF-03: Go-live real bloqueado.',
      'B-PBCF-04: Rollback/abort/reversion reais bloqueados.',
      'B-PBCF-05: Autorização real bloqueada.',
      'B-PBCF-06: Gate real bloqueado.',
      'B-PBCF-07: Produção V2 bloqueada.',
      'B-PBCF-08: routeToV2 bloqueado.',
      'B-PBCF-09: Legado obrigatório preservado.',
      'B-PBCF-10: Tráfego real inalterável.',
      'B-PBCF-11: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PBCF-12: Captura, duplicação e espelhamento reais bloqueados.',
      'B-PBCF-13: Endpoint e handlers reais bloqueados.',
      'B-PBCF-14: Deploy/release/canary/rollout reais bloqueados.',
      'B-PBCF-15: Runtime/queue/job/worker reais bloqueados.',
      'B-PBCF-16: Command runner/shell reais bloqueados.',
      'B-PBCF-17: Banco/transação/DDL/DML reais bloqueados.',
      'B-PBCF-18: SEFAZ real bloqueada.',
      'B-PBCF-19: Certificado/PFX/senha/crypto/XML/PDF reais bloqueados.',
      'B-PBCF-20: Notificação real bloqueada.',
      'B-PBCF-21: Pacote/artefato executável real bloqueado.'
    ];
  }
}
