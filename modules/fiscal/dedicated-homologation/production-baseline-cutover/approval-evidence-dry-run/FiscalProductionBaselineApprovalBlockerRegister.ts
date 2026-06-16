export class FiscalProductionBaselineApprovalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PBA-01: Aprovação real de baseline cutover bloqueada.',
      'B-PBA-02: Baseline cutover real bloqueado.',
      'B-PBA-03: Go-live real bloqueado.',
      'B-PBA-04: Autorização real bloqueada.',
      'B-PBA-05: Gate real bloqueado.',
      'B-PBA-06: Produção V2 bloqueada.',
      'B-PBA-07: routeToV2 bloqueado.',
      'B-PBA-08: Legado obrigatório preservado.',
      'B-PBA-09: Tráfego real inalterável.',
      'B-PBA-10: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PBA-11: Captura, duplicação e espelhamento reais bloqueados.',
      'B-PBA-12: Endpoint e handlers reais bloqueados.',
      'B-PBA-13: Deploy/release/rollback/canary/rollout reais bloqueados.',
      'B-PBA-14: Runtime/queue/job/worker reais bloqueados.',
      'B-PBA-15: Command runner/shell reais bloqueados.',
      'B-PBA-16: Banco/transação/DDL/DML reais bloqueados.',
      'B-PBA-17: SEFAZ real bloqueada.',
      'B-PBA-18: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PBA-19: XML/PDF reais bloqueados.',
      'B-PBA-20: Notificação real bloqueada.',
      'B-PBA-21: Pacote/artefato executável real bloqueado.'
    ];
  }
}
